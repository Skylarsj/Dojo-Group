import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const registerForm = () => {
    const [register, setRegister] = useState({
        firstName: "",
        lastName: "",
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
        axios.post('http://localhost:8000/api/RecRoomUsers', register)
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
            <div className="relative bg-black p-10 pb-8 h-auto w-80 mt-16">
                <div className="absolute left-0 top-0 border-t-logoColor border-l-logoColor border-t-8 border-l-8 mr-20 p-1 w-11 h-11"/>
                <form onSubmit={handleSubmit} className="txt-center pb-1">
                    <div className="">
                        {errors.firstName ? <p className="absolute top-6 left-[60px] text-xs text-logoColor">{errors.firstName}</p> : null}
                        <input
                            className="mb-5 border h-10 border-gray-500 bg-black text-lg pl-1"
                            placeholder="first name"
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={register.firstName}
                            onChange={handleRegisterChange}
                            />
                    </div>
                    <div>
                    {errors.lastName ? <p className="absolute top-[84px] left-[60px] text-xs text-logoColor">{errors.lastName}</p> : null}
                        <input
                            className="mb-5 border border-gray-500 h-10 bg-black text-lg pl-1"
                            placeholder="last name"
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={register.lastName}
                            onChange={handleRegisterChange}
                        />
                        {errors.email ? <p className="absolute top-[144px] left-[60px] text-xs text-logoColor">{errors.email}</p> : null}
                        <input
                            className="mb-5 border border-gray-500 h-10 bg-black text-lg pl-1"
                            placeholder="e-mail"
                            type="text"
                            id="email"
                            name="email"
                            value={register.email}
                            onChange={handleRegisterChange}
                        />
                        {errors.password ? <p className="absolute top-[204px] left-[60px] text-xs text-logoColor">{errors.password}</p> : null}
                        <input
                            className="mb-5 border border-gray-500 h-10 bg-black text-lg pl-1"
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
                            className="mb-8 border border-gray-500 h-10 bg-black text-lg pl-1"
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
                        className="w-full h-10 bg-gray active:bg-gray-500-500 text-3xl font-light pb-1"
                        type="submit">register</button>
                </form>
                <a
                href="/login"
                className="underline text-[9px] text-gray-500">Already have an account? Login here</a>
                <div className="absolute bottom-0 right-0 border-b-logoColor border-r-logoColor border-b-8 border-r-8 ml-20 w-10 h-11"/>  
            </div>
        </>
    );
};

export default registerForm;