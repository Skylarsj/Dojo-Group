import React from 'react'

const LogIn = () => {
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
                            value=""
                            onChange=""
                        />
                    </div>
                    <div>
                        <input
                            className="border rounded-md border-gray-500 h-10 w-[150px] bg-[#00C247] font-mono placeholder-black text-lg pl-1"
                            placeholder="password"
                            type="password"
                            id="password"
                            name="password"
                            value=""
                            onChange=""
                        />
                    </div>
                        <button className="flex items-center border rounded-md border-gray-500 h-10 w-10 bg-[#00C247] font-mono placeholder-black text-lg pl-2">Go</button>
                </form>
            </div>
        </div>
    )
}

export default LogIn