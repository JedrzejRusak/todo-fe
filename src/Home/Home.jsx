import React from "react";
import baner from "../images/banner-bg.jpg"
import footer from "../images/footer.jpg"
import Navigation from "./Navigation"
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <>
            <Navigation />
            <div className="flex justify-center items-center" style={{ backgroundImage: 'url(' + baner + ')', height: '100vh' }}>
                <h1 className="mb-4 font-bold leading-none tracking-tight text-7xl text-white">CREATE YOUR NEW EXPERIENCE</h1>
            </div>

            <div className="flex justify-center items-center bg-gray-100">
                <h1 className="mb-8 mt-8  text-lg text-gray-800 font-medium   leading-none tracking-tight ">Jędrzej Rusak, Michał Fręśko</h1>
            </div>

            <div className="max-w-screen-xl flex flex-col flex-wrap items-start  justify-between mx-auto p-8">
                <p className="mb-4 mt-6  text-base  text-cyan-500 font-medium   leading-none tracking-tight ">Services</p>
                <p className=" mb-6  text-3xl text-gray-900 font-bold   leading-none tracking-tight ">Services we provide</p>
                <p className=" text-base text-gray-500 leading-none tracking-tight ">App that manages appearance of the night sky</p>
            </div>
            <div className="max-w-screen-xl pb-8 flex flex-wrap items-center  justify-between mx-auto p-4">
                <Link to="/category" className="flex mt-8 flex-col justify-center items-center block w-96 h-48 p-6 rounded-lg  bg-gray-100 hover:bg-gray-200">
                    <h5 className="mb-4  text-2xl font-bold tracking-tight text-gray-800">Category Management</h5>
                    <p className="font-normal   text-gray-800">Create, edit or delete your categry.</p>
                </Link>
                <Link to="/task" className="flex mt-8 flex-col justify-center items-center block w-96 p-6  h-48 rounded-lg  bg-gray-100 hover:bg-gray-200">
                    <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-800">Task Management</h5>
                    <p className="font-normal  text-gray-800">Create, edit or delete your tasks.</p>
                </Link>
                <Link to="/login" className="flex justify-center mt-8 flex-col items-center block w-96 h-48  rounded-lg  bg-gray-100 hover:bg-gray-200">
                    <h5 className="mb-4 text-2xl font-semibold tracking-tight text-gray-800">User Panel</h5>
                    <p className="font-normal text-gray-800">Manage yours account sky however you want.</p>
                </Link>

            </div>
            <div className="w-full mt-8 p-8 mx-auto flex justify-center flex-col items-center " style={{ backgroundImage: 'url(' + footer + ')' }}>
                <hr className="my-8 mt-8 border-gray-400 h-px" style={{ width: '70%' }} />
                <p className="mb-5 mt-6 font-normal text-sm  text-white">Designed by Jędrzej &amp; Michał</p>
            </div>
        </>
    )
}

export default Home;