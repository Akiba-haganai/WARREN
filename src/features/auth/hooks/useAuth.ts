import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/authStore";

export function useLogin() {
  const storeLogin = useAuthStore((s) => s.login);
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const result = await storeLogin(email, password);
      if (result.error) throw new Error(result.error);
      return result;
    },
    onError: () => {},
  });
}

export function useRegister() {
  const storeRegister = useAuthStore((s) => s.register);
  return useMutation({
    mutationFn: async ({
      email,
      password,
      username,
    }: {
      email: string;
      password: string;
      username: string;
    }) => {
      const result = await storeRegister(email, password, username);
      if (result.error) throw new Error(result.error);
      return result;
    },
    onError: () => {},
  });
}

export function useLogout() {
  const storeLogout = useAuthStore((s) => s.logout);
  return useMutation({
    mutationFn: async () => {
      await storeLogout();
    },
  });
}