import React from "react";
import { useState, useEffect } from "react";  
import { useNavigate  } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const NavMenu = () => {
  const Navigate = useNavigate();
  const { logout, reset } = useLogout();
  const {state} = useAuthContext();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (state.user) {
      setUsername(state.user.results.user.username);
    }
  }, [state.user]);

  useEffect(() => {
    if (!state.user) {
      setUsername(null);
    }
  }, [state.user]);

  const handleLogout = () => {
    logout();
    reset();
  }

  return (
    <div className="flex justify-between  w-full items-center h-16 text-white border-t-2 border-black" >
      <div className="ml-4">
        {username && <p className="text-normal text-black font-mono"> Safe Travels, {username}! </p>}
      </div>
      <div className="mr-8"> {/* Increased right margin to create more space */}
        {username && (
          <button
            onClick={handleLogout}
            className="w-20 border border-black h-auto m-4 ml-20 p-1 text-xs font-mono text-black bg-[#00C247]"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
  
};

export default NavMenu;