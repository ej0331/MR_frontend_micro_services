import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderComponent from "./header";
import SideComponent from "./side";
import "./style.css";
import { Auth } from "../api/API";

const LayoutWithRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authMiddleware = async () => {
      try {
        const res = await Auth();
        if (res.status === "success") {
          setIsLoggedIn(true); 
        } else {
          setIsLoggedIn(false);
          navigate("/navigate");
        }
      } catch (error) {
        console.error("Error:", error);
        setIsLoggedIn(false);
        navigate("/navigate");
      }
    };
    authMiddleware();
  }, [navigate]);

  return (
    <div id="global">
      <HeaderComponent />
      <div className="contain">
        <SideComponent />
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutWithRoute;
