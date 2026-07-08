import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "../../../lib/supabase";


const ICE_SERVERS: RTCConfiguration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

type SignalType = "offer" | "answer" | "ice-candidate";

type WebRTCSdpPayload = {
  sdp: string | null;
};

type IceCandidatePayload = RTCIceCandidateInit;

type WeRTCSignalRow = {
  sender_id: string;
  type: SignalType;
  payload: WebRTCSdpPayload | IceCandidatePayload;
};

export function useWebRTC(roomId: string) {
  const [isJoined, setIsJoined] = useState(false);
  const [participants, setParticipants] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [micError, setMicError] = useState<null | { type: "NotAllowedError" | "NotFoundError" | "Unknown"; message?: string }>(null);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);


  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const userIdRef = useRef<string | null>(null);

  // Get current user id
  useEffect(() => {
    supabase.auth.getUser().then(({ data }: any) => {
      userIdRef.current = data.user?.id ?? null;
    });
  }, []);

  // Start local media
  const startLocalStream = useCallback(async () => {
    try {
      // Keep existing constraints minimal to avoid WebRTC logic changes.
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStream.current = stream;
      setMicError(null);
      return stream;
    } catch (err: any) {
      console.warn("Microphone access denied or not available.");
      const name: string | undefined = err?.name;
      if (name === "NotAllowedError") {
        setMicError({ type: "NotAllowedError", message: err?.message });
      } else if (name === "NotFoundError") {
        setMicError({ type: "NotFoundError", message: err?.message });
      } else {
        setMicError({ type: "Unknown", message: err?.message });
      }
      return null;
    }
  }, []);



  const createPeerConnection = useCallback(() => {
    const pc = new RTCPeerConnection(ICE_SERVERS);
    peerConnection.current = pc;

    // Add local tracks
    localStream.current?.getTracks().forEach((track) => {
      pc.addTrack(track, localStream.current!);
    });

    // Handle remote stream
    pc.ontrack = (event) => {
      if (!remoteAudioRef.current) {
        remoteAudioRef.current = new Audio();
        remoteAudioRef.current.autoplay = true;
        document.body.appendChild(remoteAudioRef.current);
      }
      remoteAudioRef.current.srcObject = event.streams[0];
    };

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (!event.candidate) return;
      if (!userIdRef.current) return;

      (supabase as any).from("webrtc_signals").insert({
        room_id: roomId,
        sender_id: userIdRef.current,
        receiver_id: undefined,
        type: "ice-candidate",
        payload: event.candidate.toJSON(),
      });
    };

    return pc;
  }, [roomId]);

  const sendOffer = useCallback(async () => {
    const pc = createPeerConnection();

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    if (!userIdRef.current) return;

    await (supabase as any).from("webrtc_signals").insert({
      room_id: roomId,
      sender_id: userIdRef.current,
      receiver_id: null,
      type: "offer",
      payload: { sdp: offer.sdp },
    });
  }, [createPeerConnection, roomId]);

  const handleSignal = useCallback(
    async (signal: WeRTCSignalRow) => {
      if (!userIdRef.current) return;
      if (signal.sender_id === userIdRef.current) return;

      const pc = peerConnection.current ?? createPeerConnection();

      if (signal.type === "offer") {
        const payload = signal.payload as WebRTCSdpPayload;
        if (!payload.sdp) return;
        await pc.setRemoteDescription({ type: "offer", sdp: payload.sdp } as RTCSessionDescriptionInit);

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        await (supabase as any)
          .from("webrtc_signals")
          .insert({
            room_id: roomId,
            sender_id: userIdRef.current,
            receiver_id: undefined,
            type: "answer",
            payload: { sdp: answer.sdp },
          });
      } else if (signal.type === "answer") {
        const payload = signal.payload as WebRTCSdpPayload;
        if (!payload.sdp) return;
        await pc.setRemoteDescription({ type: "answer", sdp: payload.sdp } as RTCSessionDescriptionInit);
      } else if (signal.type === "ice-candidate") {
        const payload = signal.payload as IceCandidatePayload;
        await pc.addIceCandidate(new RTCIceCandidate(payload));
      }
    },
    [createPeerConnection, roomId]
  );

  const joinRoom = useCallback(async () => {
    const stream = await startLocalStream();
    if (!stream) {
      alert("Microphone not available. Please check your device settings.");
      return;
    }

    await sendOffer();
    setIsJoined(true);
    if (userIdRef.current) setParticipants([userIdRef.current]);
  }, [startLocalStream, sendOffer]);

  const leaveRoom = useCallback(() => {
    peerConnection.current?.close();
    localStream.current?.getTracks().forEach((t) => t.stop());
    if (remoteAudioRef.current?.srcObject) {
      remoteAudioRef.current.srcObject = null;
    }
    remoteAudioRef.current?.remove();

    peerConnection.current = null;
    localStream.current = null;
    remoteAudioRef.current = null;

    setIsJoined(false);
    setParticipants([]);
    setMicError(null);
    setIsSpeakerOn(false);
  }, []);

  const toggleMute = useCallback(() => {
    if (!localStream.current) return;
    localStream.current.getAudioTracks().forEach((t) => (t.enabled = !isMuted));
    setIsMuted((prev) => !prev);
  }, [isMuted]);

  const toggleSpeaker = useCallback(() => {
    // Placeholder UI toggle only. (Real output-device switching can be added later.)
    setIsSpeakerOn((prev) => !prev);
  }, []);


  // Realtime subscription for signals
  useEffect(() => {
    const userId = userIdRef.current;
    if (!roomId || !userId) return;

    const channel = supabase
      .channel(`webrtc-${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "webrtc_signals",
          filter: `room_id=eq.${roomId}`,
        },
    (payload: any) => {
          // Cast payload.new to our runtime shape; TS Supabase typing won't include this table.
          handleSignal(payload.new as WeRTCSignalRow);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, handleSignal]);

  return {
    isJoined,
    participants,
    isMuted,
    joinRoom,
    leaveRoom,
    toggleMute,
    micError,
    isSpeakerOn,
    toggleSpeaker,
  };
}

