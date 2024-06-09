import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import image from "../../config/image";
import { TeacherLogin } from "../../api/API";
import { useNavigate } from "react-router-dom";
import { studentHealthCheck } from "../../api/account";
import { classHealthCheck } from "../../api/class";
import { quantityLimitedPracticeHealthCheck } from "../../api/quantityLimitedPractice";
import { quantityLimitedTestHealthCheck } from "../../api/quantityLimitedTest";

function Login() {
  const navigate = useNavigate();

  const [healthDict, setHealthDict] = useState({
    "學生練習": false,
    "學生測驗": false,
    "學生帳號": false,
    "班級管理": false,
  })

  const paths = {
    "學生練習": "/home",
    "學生測驗": "/test",
    "學生帳號": "/account",
    "班級管理": "/class",
  };

  const checkQuantityLimitedPracticeHealth = async () => {
    try {
      const status = await quantityLimitedPracticeHealthCheck();
      if (status === 200) {
        setHealthDict((prevHealthDict) => {
          return { ...prevHealthDict, "學生練習": true };
        })
      }
    } catch (error) {
      console.error("Error fetching class health check:", error);
    }
  };

  const checkQuantityLimitedTestHealth = async () => {
    try {
      const status = await quantityLimitedTestHealthCheck();
      if (status === 200) {
        setHealthDict((prevHealthDict) => {
          return { ...prevHealthDict, "學生測驗": true };
        })
      }
    } catch (error) {
      console.error("Error fetching class health check:", error);
    }
  };

  const checkStudentIsHealth = async () => {
    try {
      const status = await studentHealthCheck();
      if (status === 200) {
        setHealthDict((prevHealthDict) => {
          return { ...prevHealthDict, "學生帳號": true };
        })
      }
    } catch (error) {
      console.error("Error fetching student health check:", error);
    }
  };

  const checkClassHealth = async () => {
    try {
      const status = await classHealthCheck();
      if (status === 200) {
        setHealthDict((prevHealthDict) => {
          return { ...prevHealthDict, "班級管理": true };
        })
      }
    } catch (error) {
      console.error("Error fetching class health check:", error);
    }
  };

  useEffect(() => {
    checkQuantityLimitedPracticeHealth()
    checkQuantityLimitedTestHealth()
    checkStudentIsHealth()
    checkClassHealth()
  }, [])

  const LoginSchema = Yup.object().shape({
    account: Yup.string()
      .required("帳號為必填項目")
      .matches(/^[a-zA-Z0-9]*$/, "請勿輸入特殊符號"),
    password: Yup.string()
      .required("密碼為必填項目")
      .matches(/^[a-zA-Z0-9]*$/, "請勿輸入特殊符號"),
  });

  const formik = useFormik({
    initialValues: {
      account: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      // 處理提交邏輯
      try {
        const userData = await TeacherLogin(values.account, values.password);
        localStorage.setItem('user', JSON.stringify(userData));
        for (const [key, path] of Object.entries(paths)) {
          if (healthDict[key]) {
            navigate(path);
            break;
          }
        }
      } catch (error) {
        if (error.name === "ValidationError") {
          error.inner.forEach((validationError) => {
            formik.setFieldError(validationError.path, validationError.message);
          });
        } else {
          formik.setStatus("帳號或密碼錯誤");
        }
      }
    },
  });

  return (
    <div className="w-screen h-screen bg-login flex justify-center items-center">
      <div className="min-w-80 max-w-1/2 h-1/2 flex p-2">
        <div className="flex-1 flex justify-center bg-thirdcolor">
          <div className="flex flex-col justify-center w-4/5">
            <h2 className="text-2xl font-bold mb-3">登入</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="account"
                >
                  帳號
                </label>
                <input
                  className="border border-none px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                  type="text"
                  id="account"
                  name="account"
                  placeholder="帳號"
                  value={formik.values.account}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.account && formik.errors.account && (
                  <div className="text-red text-left text-xs">
                    {formik.errors.account}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  密碼
                </label>
                <input
                  className="border border-none px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="密碼"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red text-left text-xs">
                    {formik.errors.password}
                  </div>
                )}
              </div>
              {formik.status && (
                <div className="text-red text-xs text-center">
                  {formik.status}
                </div>
              )}
              <button
                className="bg-loginbtn text-white px-4 py-2 rounded-md focus:outline-none w-full mt-2"
                type="submit"
              >
                登入
              </button>
            </form>
          </div>
        </div>
        <div className="hidden md:flex sm:flex-1">
          <img
            className="object-cover w-full rounded-lg  h-full  md:rounded-none "
            src={image.school}
            alt=""
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Login;
