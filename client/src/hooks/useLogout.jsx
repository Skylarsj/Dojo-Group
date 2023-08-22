import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  const logout = () => {
    deleteCookie('user');
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};