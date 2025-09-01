import { useAuthContext } from "./authContext.jsx";

export function useAuth() {
  const ctx = useAuthContext();
  return ctx;
}