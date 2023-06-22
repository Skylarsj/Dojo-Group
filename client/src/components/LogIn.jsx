import React from 'react'

const LogIn = () => {
    return (
        <div className="">
            <div className="relative bg-[#626466] p-10 pb-8 h-70">
                <form className="txt-center pb-1">
                    <div className="flex items-center justify-center">
                        <input
                            className="mb-5 border rounded-md h-10 border-gray-500 bg-black text-lg pl-1"
                            placeholder="e-mail"
                            type="text"
                            id="email"
                            name="email"
                            value=""
                            onChange=""
                        />
                    </div>
                    <div>
                        <input
                            className="mb-8 border rounded-md border-gray-500 h-10 bg-black text-lg pl-1"
                            placeholder="password"
                            type="password"
                            id="password"
                            name="password"
                            value=""
                            onChange=""
                        />
                    </div>
                </form>
                <a
                href="#" //this will be the link to the sign up page
                className="underline text-[9px] text-gray-500">Don't have an account?</a>
            </div>
        </div>
    )
}

export default LogIn