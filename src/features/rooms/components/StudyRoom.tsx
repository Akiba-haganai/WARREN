import { useParams, useNavigate } from "react-router-dom";
import AppShell from "../../../components/layout/AppShell";
import { useWebRTC } from "../hooks/useWebRTC";
import { Mic, MicOff, PhoneOff, Phone, Users, ArrowLeft } from "lucide-react";

export default function StudyRoom() {
  const { id: roomId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { isJoined, participants, isMuted, joinRoom, leaveRoom, toggleMute } =
    useWebRTC(roomId!);

  return (
    <AppShell>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Real-Time Study Rooms</h1>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Users size={18} />
            <h2 className="font-semibold">Participants ({participants.length})</h2>
          </div>
          {participants.length === 0 && (
            <p className="text-sm text-slate-500">No one else is here yet.</p>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          {!isJoined ? (
            <button
              onClick={joinRoom}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
            >
              <Phone size={20} />
              Join Room
            </button>
          ) : (
            <>
              <button
                onClick={toggleMute}
                className={`p-4 rounded-full ${
                  isMuted
                    ? "bg-red-100 dark:bg-red-900/30 text-red-600"
                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                }`}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
              </button>
              <button
                onClick={leaveRoom}
                className="p-4 rounded-full bg-red-600 text-white"
                aria-label="Leave room"
              >
                <PhoneOff size={24} />
              </button>
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}

