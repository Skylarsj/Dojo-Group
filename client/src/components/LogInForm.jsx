import React from 'react'
import { useState } from 'react'

const LoginForm = () => {
    const [account, setAccount] = useState({
        username: "",
        password: ""
    });

const [errors, setErrors] = useState({});

    const handleAccountChange = (e) => {
        const { name, value } = e.target;
        
        setAccount((prevFormInput) => ({
            ...prevFormInput,
            [name]: value
        }));
    };
//T O D O: Add handleSubmit function for backend
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const payload = {
            email: account.email,
            password: account.password
        };
    }


    return (
        <div>
            <div className="bg-[#626466]">
                <form className="flex pb-1">
                    <div>
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
                        <button className="flex items-center border rounded-md border-gray-500 h-10 w-10 bg-[#00C247] font-mono placeholder-black text-lg pl-2">Go</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm