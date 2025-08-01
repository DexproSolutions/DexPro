import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProjectRequirement from "./pages/ProjectRequirement";
import Home from "./pages/Home";
import BlogContent from "./pages/BlogContent";
import Career from "./pages/Career";
import CareerDetail from "./pages/CareerDetail";
import AllArticles from "./pages/AllArticles";

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
    },
    {

        path:'/career',
        element:<Career/>
    },
    {
        path:'/career-detail/:id',
        element:<CareerDetail/>
    },

        path:'/blogs',
        element: <AllArticles/>
    }

])
export default Router;
