import React from "react";
import { useState, useEffect } from "react";
// components
import LoginForm from "../components/LogInForm.jsx";


const Login = () => {

    return (
        <>
        <div className="flex flex-col w-full h-full items-center justify-center">
            <img className="w-[300px] h-auto py-[77px]" src="./src/img/PokeAPI.png" alt="Logo"/>
            <a href="/register">Don't have an account?</a>
            <LoginForm/>
        </div>
        </>
)
}
export default Login