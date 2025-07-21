import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProjectRequirement from "./pages/ProjectRequirement";
import Home from "./pages/Home";

const Router = createBrowserRouter([
    {
        path:'/',
        element: <Home/>
    },
    {
        path:'/project',
        element: <ProjectRequirement/>
    },
])
export default Router;