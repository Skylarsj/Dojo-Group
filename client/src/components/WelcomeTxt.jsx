import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/check-login', { withCredentials: true })
      .then(response => response.data)
      .then(data => {
        console.log(data);
        if (data.logged_in) {
          // User is logged in, perform necessary actions
          setUser(data.username);
          console.log("Logged in as:", data.username);
        } else {
          // User is not logged in, redirect to login page or perform other actions
          Navigate("/");
          console.log("User is not logged in");
        }
      })
      .catch(error => {
        // Handle error if the request fails
        console.error("An error occurred:", error);
      });
  }, []);

  console.log("Welcome username:", user);

  return (
    <div className="flex">
      <p className="font-mono justify-start pl-1 text-black">Hello {user} Go Catch em' All!  </p>
    </div>
  );
}

export default Welcome;