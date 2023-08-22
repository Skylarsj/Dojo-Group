import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';


const Welcome = () => {
  const { state } = useAuthContext();
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


  return (
    <div className="flex">
      <p className="font-mono justify-start pl-1 text-black">
        {username ? `Go catch em' all, ${username}!` : 'Start your journey today!'}
      </p>
    </div>
  );
};

export default Welcome;