import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const User = localStorage.getItem("loggedInUser");
    if (User) {
        return children
    } else {
        return <Navigate to={'/'} />
    }

}