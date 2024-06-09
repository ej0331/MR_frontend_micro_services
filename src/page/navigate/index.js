import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
function Auth() {
  const navigate = useNavigate();
  const click = () => {
    navigate("/");
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <button class="glowing-btn" onClick={click}>
        <span class="glowing-txt">
          請<span class="faulty-letter">登入</span>
        </span>
      </button>
    </div>
  );
}
export default Auth;
