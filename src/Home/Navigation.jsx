import React from "react";
import { Link } from "react-router-dom";


const Navigation = () => {
    return (
        <>
            <nav className=" border-gray-200 bg-gray-900/30 fixed w-full" >
                <div className="max-w-screen-xl flex flex-wrap items-center  justify-between mx-auto p-4">
                    <a href="#" className="flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white ">TODO<span className="text-sm">PROJECT</span></span>
                    </a>
                    <div className="hidden md:block w-auto" id="navbar-default">
                        <ul className=" flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  border-gray-700">
                            <li>
                                <a href="/" className="block py-2 pl-3 pr-4 text-white  rounded text-blue-600 p-0 text-white" aria-current="page">Home</a>
                            </li>
                            <li>
                                <Link to="/category" className="block py-2 pl-3 pr-4 rounded  border-0  p-0 text-white hover:text-blue-500  text-white hover:bg-transparent">Category Management</Link>
                            </li>
                            <li>
                                <Link to="/task" className="block py-2 pl-3 pr-4 rounded  border-0  p-0 text-white hover:text-blue-500  text-white hover:bg-transparent">Task Management</Link>
                            </li>
                            <li>
                                <Link to="/login" className="block py-2 pl-3 pr-4 rounded  border-0  p-0 text-white hover:text-blue-500  text-white hover:bg-transparent">{localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")).name : 'Login'}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navigation;