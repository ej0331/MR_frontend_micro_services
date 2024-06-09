import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../button/index";
import "./modal.css";
import { addclass } from "../../api/class";
const InsertModal = ({ onClose,fetchData }) => {
  const handleCancel = () => {
    onClose();
  };


  const validationSchema = Yup.object().shape({
    name: Yup.string().required("名稱為必填項目"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await addclass(values);
        fetchData();
        onClose();
      } catch (error) {
        console.error("Error creating class:", error);
      }
    },
  });

  return (
    <div className="modal-overlay row" onClick={handleCancel}>
      <div
        className="modal-content w-1/3 min-w-80 aspect-auto text-center rounded-xl relative bg-modalcolor"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={handleCancel}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
        <div className="flex flex-col justify-around p-5 text-center">
          <svg
            className="mx-auto mb-4 text-green w-12 h-12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <h3 className="mb-5 font-bold text-xl  text-gray-500 dark:text-gray-400">
            新增班級
          </h3>
          <div className="w-full flex flex-row justify-around">
            <form
              id="class"
              className="space-y-4"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                >
                  班級：
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border border-none px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="班級"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  required
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red text-left text-xs">
                    {formik.errors.name}
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <Button
                  text="取消"
                  className="cancel modal mx-4 "
                  onClick={handleCancel}
                />
                <Button
                  text="新增"
                  className="insert modal mx-4 "
                  type="submit"
                  form="class"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertModal;
