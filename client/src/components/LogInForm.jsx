import {useState } from 'react';
import { useLogin } from '../hooks/useLogin';

//login form
const LoginForm = () => {
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  console.log("login form", error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div>   
      <div style={{ height: error ? "2rem" : "0" }}>
        {error && <p className="error-message2">{error.json.message}</p>}
      </div>
      
      <div className="bg-[#626466]">
        <form className="flex pb-1" onSubmit={handleSubmit}>
          <div>
            <input
              className="border rounded-md h-10 w-[149px] border-gray-500 bg-[#00C247] font-mono placeholder-black text-lg pl-1"
              placeholder="username"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              className="border rounded-md border-gray-500 h-10 w-[150px] bg-[#00C247] font-mono  placeholder-black text-lg pl-1"
              placeholder="password"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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