import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route,useNavigate } from "react-router-dom";

import GloballLayout from "../layout/globalllayout";

import Login from "./login/index";
import Home from "./home/index";
import Practice from "./pratice/index";
import Navigate from "./navigate/index";
import Test from "./test/index";
import Account from "./account/index";
import AddQuestion from "./addQuestion/index";
import Class from "./class/index";

import { Auth } from "../api/API";

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/navigate" element={<Navigate />} />
        <Route element={<GloballLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/test" element={<Test />} />
          <Route path="/account" element={<Account />} />
          <Route path="/addQuestion" element={<AddQuestion />} />
          <Route path="/class" element={<Class />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
