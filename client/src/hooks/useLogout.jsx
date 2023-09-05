import { useAuthContext } from "./useAuthContext";
import { usePokemonContext } from "./usePokemonContext";

export const useLogout = () => {
  const { resetPokemonCount } = usePokemonContext();
  const { dispatch } = useAuthContext();

  const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  const logout = () => {
    deleteCookie('user');
    dispatch({ type: "LOGOUT" });
  };

  const reset = () => {
    resetPokemonCount();
  }


  return { logout, reset };
};