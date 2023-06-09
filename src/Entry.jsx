import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import NotFound from "./reusable/NotFound/NotFound";
import Category from "./Category/CategoryManagement";
import Task from "./Task/TaskManagement";
import User from "./User/UserManagement"




const Entry = () => {
    return (
        <>
            <BrowserRouter>
                { }
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/task" element={<Task />} />
                    <Route path="/login" element={<User />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                { }
            </BrowserRouter>
        </>
    );
};

export default Entry;