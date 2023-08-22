import React, { useContext, useState } from 'react';
import React from 'react'
import axios from "axios";
import Cookies from 'js-cookie';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLogin } from '../hooks/useLogin';


const LoginForm = () => {
  const [account, setAccount] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();
  const { login, error, isLoading } = useLogin();

  const handleAccountChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(account.username, account.password);
    navigate('/');
  };

  return (
    <div>
      <div className="bg-[#626466]">
        <form className="flex pb-1" onSubmit={handleSubmit}>
          <div>
            {error && (
              <p className="absolute bottom-20 left-[80px] text-lg text-red-500 placeholder-black">
                {error.message}
              </p>
            )}
            <input
              className="border rounded-md h-10 w-[149px] border-gray-500 bg-[#00C247] font-mono placeholder-black text-lg pl-1"
              placeholder="username"
              type="text"
              id="username"
              name="username"
              value={account.username}
              onChange={handleAccountChange}
            />
          </div>
          <div>
            <input
              className="border rounded-md border-gray-500 h-10 w-[150px] bg-[#00C247] font-mono  placeholder-black text-lg pl-1"
              placeholder="password"
              type="password"
              id="password"
              name="password"
              value={account.password}
              onChange={handleAccountChange}
            />
          </div>
          <button disabled={isLoading} className="flex items-center border rounded-md border-gray-500 h-10 w-10 bg-[#00C247] font-mono placeholder-black text-lg pl-2">
            Go
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;