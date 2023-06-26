import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {

    const [register, setRegister] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        
        setRegister((prevFormInput) => ({
            ...prevFormInput,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
//ADD IN THE ROUTE FOR THE BACKEND
        axios.post('TO BE ADDED IN AT A LATER TIME', register)
        .then(res=>{
            navigate("/dashboard")
        })
        .catch(err => {
            const errorResponse = err.response.data.errors;
            const errorObj ={};

            for ( const key of Object.keys(errorResponse)) {
                errorObj[key] = errorResponse[key].message;
            }
            console.log(errorObj);
            setErrors(errorObj);
        });

    };

    return (
        <>
            <div className="relative bg-[#626466] h-auto w-full mt-16 font-mono">
                <form onSubmit={handleSubmit} className="txt-center pb-1">
                    <div>
                    {errors.username ? <p className="absolute top-[84px] left-[60px] text-xs text-black placeholder-black">{errors.username}</p> : null}
                        <input
                            className="mb-5 border rounded border-gray-500 h-10 bg-[#00C247] placeholder-black text-lg pl-1"
                            placeholder="username"
                            type="text"
                            id="lastName"
                            name="username"
                            value={register.username}
                            onChange={handleRegisterChange}
                        />
                        {errors.email ? <p className="absolute top-[144px] left-[60px] text-xs text-black placeholder-black">{errors.email}</p> : null}
                        <input
                            className="mb-5 border rounded border-gray-500 h-10 bg-[#00C247] placeholder-black text-lg pl-1"
                            placeholder="e-mail"
                            type="text"
                            id="email"
                            name="email"
                            value={register.email}
                            onChange={handleRegisterChange}
                        />
                        {errors.password ? <p className="absolute top-[204px] left-[60px] text-xs text-black placeholder-black">{errors.password}</p> : null}
                        <input
                            className="mb-5 border rounded border-gray-500 h-10 bg-[#00C247] placeholder-black text-lg pl-1"
                            placeholder="password"
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            value={register.password}
                            onChange={handleRegisterChange}
                        />
                        {errors.confirmPassword ? <p className="absolute bottom-[173px] left-[60px] text-xs text-logoColor">{errors.confirmPassword}</p> : null}
                        <input
                            className="border rounded border-gray-500 h-10 bg-[#00C247] placeholder-black text-lg pl-1"
                            placeholder="confirm password"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            autoComplete="new-password"
                            value={register.confirmPassword}
                            onChange={handleRegisterChange}
                        />
                    </div>
                    <button
                        className="w-1/2 h-10 bg-gray text-md font-ligh pb-8 mt-2 font-mono"
                        type="submit">register</button>
                </form>
                <a
                href="/"
                className="underline text-[9px] text-black">Already have an account? Login here</a>
            </div>
        </>
    );
};

export default RegisterForm;