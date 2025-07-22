import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProjectRequirement from "./pages/ProjectRequirement";
import Home from "./pages/Home";
import BlogContent from "./pages/BlogContent";
const Router = createBrowserRouter([
    {
        path:'/',
        element: <Home/>
    },
    {
        path:'/project',
        element: <ProjectRequirement/>
    },
    {
        path:'/blog/:blogId',
        element: <BlogContent/>
    }
])
export default Router;
