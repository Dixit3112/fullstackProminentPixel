import { createBrowserRouter } from "react-router-dom";
import Login from "../components/pages/Login";
import SignUp from "../components/pages/SignUp";
import DefaultPage from "./DefaultPage";
// import DixitHomePage from "../components/pages/DixitHomePage";
import Home from "../components/pages/UserHome";
// import EmployeeProfile from "../components/pages/EmployeeProfile";
import HODDashboard from "../components/pages/HODDashboard";
import HRDashboard from "../components/pages/HRDashboard";
import GenManagerDashboard from "../components/pages/GenManager";
import PunchTime from "../components/pages/EmployeeWorkTime.jsx";
import RegisterEmployee from "@/components/pages/PostForEmployee";
import UpdateEmployeeInfo from "@/components/pages/UpdateEmployeeInfo";
import { lazy, Suspense } from "react";
import LoadingDots from "@/components/loading/Loading";
// import ProtectedRoute from "./ProtectedRoute";

const EmployeeProfile = lazy(() => wait(1000).then(() => import("../components/pages/EmployeeProfile")));

const wait = (time) => {
    return new Promise(resolve => {
        resolve()
    }, time)
}

const user = JSON.parse(localStorage.getItem('loggedInUser'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultPage />,
        children: [
            {
                path: "/",
                // element: <DixitHomePage />,
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: `/${user.firstName}/update-info`,
                element: <UpdateEmployeeInfo />
            },
            {
                path: `/${user.firstName}/punching`, 
                element: <PunchTime />
            },
            {
                path: `/employee/${user.firstName}`,
                element: <Suspense fallback={<LoadingDots />}><EmployeeProfile /></Suspense>,
            },
            {
                path: `/hod/${user.firstName}/dashboard`,
                element: <><HODDashboard /></>,
            },
            {
                path: `/hr/${user.firstName}/dashboard`,
                element: <><HRDashboard /></>,
            },
            {
                path: `/gm/${user.firstName}/dashboard`,
                element: <><GenManagerDashboard /></>,
            },
            {
                path: "*",
                element: <ErrorEvent />,
            }
        ]
    },
])

export default router;