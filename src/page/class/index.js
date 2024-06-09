import React, { useState, useEffect } from "react";
import Button from "../../component/button/index";
import DeleteModal from "../../component/modal/deleteClass";
import UpdateModal from "../../component/modal/updateclass";
import InsertModal from "../../component/modal/insertClass";
import { classes } from "../../api/class";

function Class() {
  const [classData, setClassData] = useState([]);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [isInsertModalVisible, setInsertModalVisible] = useState(false);
  const [Name, setModalName] = useState(null);
  const [Id, setModalId] = useState(null);
  const fetchData = async () => {
    try {
      const res = await classes();
      setClassData(res);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // 控制顯示或隱藏 Delete Modal
  const handleDeleteButtonClick = (id, name) => {
    setModalId(id);
    setModalName(name);
    setDeleteModalVisible(!isDeleteModalVisible);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  // 控制顯示或隱藏 Update Modal
  const handleUpdateButtonClick = (id, name) => {
    setModalId(id);
    setModalName(name);
    setUpdateModalVisible(!isUpdateModalVisible);
  };
  const handleCloseUpdateModal = () => {
    setUpdateModalVisible(false);
  };

  // 控制顯示或隱藏 Insert Modal
  const handleInsertButtonClick = () => {
    if (classData.length < 6) {
      setInsertModalVisible(true);
    }
  };
  const handleCloseInsertModal = () => {
    setInsertModalVisible(false);
  };
  return (
    <div
      className=" flex flex-col h-full p-1 bg-backgroundcolor"
      style={{ width: `calc(100% - 160px)` }}
    >
      <div className="p-5 bg-containbackground h-full flex items-center justify-center">
        <div
          className="min-w-full block justify-center items-center"
          style={{ height: `calc(100% - 53px)` }}
        >
          <div class="w-full mx-auto max-w-screen-xl flex justify-end mb-3">
            <Button
              text={classData.length < 6 ? "新增班級" : "已達上限"}
              className={classData.length < 6 ? "insert" : "none-inser"}
              onClick={handleInsertButtonClick}
              disabled={classData.length >= 6}
            />
          </div>
          <div class="mx-auto max-w-screen-xl relative overflow-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-textcolor dark:text-textcolor ">
              <thead
                class="text-xs text-white uppercase bg-secondcolor dark:text-white sticky top-0"
                style={{ height: `53px` }}
              >
                <tr className="relative">
                  <th
                    scope="col"
                    class="px-3 w-24 font-black text-base  bg-secondcolor "
                  >
                    編號
                  </th>
                  <th
                    scope="col"
                    class="px-3 w-28 font-black text-base  bg-secondcolor "
                  >
                    班級名稱
                  </th>
                  <th
                    scope="col"
                    class="px-3 min-w-12 font-black text-base max-w-64"
                  >
                    功能
                  </th>
                </tr>
              </thead>
              <tbody>
                {classData.length != 0 ? (
                classData.map((item, index) => (
                  <tr key={item.id} class="ring-1 ring-white">
                    <td
                      scope="row"
                      class="px-3 w-24 py-4 font-bold  text-textcolor whitespace-nowrap dark:text-textcolor  ring-1 ring-black "
                    >
                      {index + 1}
                    </td>
                    <td class="px-3 w-28 py-4 font-bold">{` ${item.name}`}</td>
                    <td class="px-3 py-4 min-w-12">
                      <Button
                        text="修改班級"
                        className="update mr-0 sm:mr-2 my-1 sm:my-0"
                        onClick={() =>
                          handleUpdateButtonClick(item.id, item.name)
                        }
                      />
                      <Button
                        text="刪除班級"
                        className="delete ml-1 sm:ml-2 my-1 sm:my-0"
                        onClick={() =>
                          handleDeleteButtonClick(item.id, item.name)
                        }
                      />
                    </td>
                  </tr>
                ))):(
                  <tr class="font-bold text-lg text-center text-darkgray py-20">
                  <td class="p-8 bg-maincolor" colSpan={3}>
                    查無資料
                  </td>
                </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isDeleteModalVisible && (
        <DeleteModal
          onClose={handleCloseDeleteModal}
          id={Id}
          name={Name}
          fetchData={fetchData}
        />
      )}
      {isUpdateModalVisible && (
        <UpdateModal
          onClose={handleCloseUpdateModal}
          id={Id}
          name={Name}
          fetchData={fetchData}
        />
      )}
      {isInsertModalVisible && (
        <InsertModal onClose={handleCloseInsertModal} fetchData={fetchData} />
      )}
    </div>
  );
}

export default Class;
