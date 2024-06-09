import React, { useState } from "react";
import Button from "../button/index";
import "./modal.css";
import { deleteclass } from "../../api/class";

const DeleteModal = ({ onClose, id, name ,fetchData}) => {
  const handleConfirm = async () => {
    try {
      await deleteclass(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting:", error);
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="modal-overlay row" onClick={handleCancel}>
      <div
        className="modal-content w-1/3 min-w-80 aspect-auto text-center rounded-xl relative bg-modalcolor"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={handleCancel}
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
        <div class="flex flex-col justify-around p-5 text-center">
          <svg
            class="mx-auto mb-4 text-red w-12 h-12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 class="mb-5 font-bold text-xl  text-gray-500 dark:text-gray-400">
            確定要刪除{name}這個班級嗎?
          </h3>
          <span class="mb-5 font-medium text-gray-500 dark:text-gray-400">
            此操作將會刪除一切有關這個班級的資料，且不可恢復
          </span>
          <div className="w-full flex flex-row justify-around">
            <Button
              text="刪除"
              className="delete modal mx-4"
              onClick={handleConfirm}
            />
            <Button
              text="取消"
              className="cancel modal mx-4 "
              onClick={handleCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
