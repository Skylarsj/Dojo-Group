import { useAuthContext } from "./useAuthContext";
import { usePokemonContext } from "./usePokemonContext";
import {useBackground} from "./useBackground";

export const useLogout = () => {
  const { resetPokemonCount } = usePokemonContext();
  const { resetBg } = useBackground();
  const { dispatch } = useAuthContext();

  const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  const logout = () => {
    deleteCookie('user');
    dispatch({ type: "LOGOUT" });
    resetBg();
    
  };

  const reset = () => {
    resetPokemonCount();
  }


  return { logout, reset };
};