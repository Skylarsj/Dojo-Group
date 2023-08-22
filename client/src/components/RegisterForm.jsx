import { useState } from 'react';
import { useRegister } from '../hooks/useRegister';

const RegisterForm = () => {
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const { register, error, isLoading } = useRegister()


    const [errors, setErrors] = useState({});


    const handleSubmit = async(e) => {
        e.preventDefault();
        await register(username, email, password, confirmPassword);
            };
    return (
        <>
            <div className="relative bg-[#626466] h-auto w-full mt-20 font-mono z-50">
                <form onSubmit={handleSubmit} className="txt-center pb-1">
                    <div>
                    {error && (
                        <p className="absolute bottom-20 left-[80px] text-lg text-red-500 placeholder-black">
                        {error.message}
                    </p> )}
                        <input
                            className="mb-3 border rounded border-gray-500 h-10 bg-[#00C247] placeholder-black text-lg pl-1"
                            placeholder="username"
                            type="text"
                            id="lastName"
                            name="username"
                            value={register.username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.message?.oldEmail ? <p className="absolute top-10 left-8 text-xs text-black placeholder-black">{errors.message.oldEmail}</p> : null}
                        {errors.message?.email ? <p className="absolute top-10 left-8 text-xs text-black placeholder-black">{errors.message.email}</p> : null}
                        <input
                            className="mb-3 border rounded border-gray-500 h-10 bg-[#00C247] placeholder-black text-lg pl-1"
                            placeholder="e-mail"
                            type="text"
                            id="email"
                            name="email"
                            value={register.email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.message?.password ? <p className="absolute top-[90px] left-8 text-xs text-black placeholder-black">{errors.message.password}</p> : null}
                        <input
                            className="mb-3 border rounded border-gray-500 h-10 bg-[#00C247] placeholder-black text-lg pl-1"
                            placeholder="password"
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            value={register.password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.message?.confirmPassword ? <p className="absolute bottom-[114px] left-8 text-xs text-black">{errors.message.confirmPassword}</p> : null}
                        <input
                            className="border rounded border-gray-500 h-10 bg-[#00C247] placeholder-black text-lg pl-1"
                            placeholder="confirm password"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            autoComplete="new-password"
                            value={register.confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-1/2 h-10 bg-gray text-md font-ligh mt-2 font-mono"
                        type="submit" onChange={handleSubmit} disabled= {isLoading}>Register</button>
                </form>
                <a
                href="/"
                className="underline text-[9px] text-black">Already have an account? Login here</a>
            </div>
        </>
    );
};

export default RegisterForm;