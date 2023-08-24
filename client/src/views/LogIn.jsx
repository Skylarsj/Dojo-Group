import React from "react";
import { useState, useEffect } from "react";
// components
import LoginForm from "../components/LogInForm.jsx";


const Login = () => {

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img className="w-[300px] h-auto py-[80px]" src="./src/img/PokeAPI.png" alt="Logo"/>
            <a className="text-xs" href="/register">Don't have an account?</a>
            <LoginForm/>
        </div>
    )
}
export default Login