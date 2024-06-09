import { userRequest } from "./API";

export const students = (classes, name, account) => {
  const queryParams = [];
  if (classes) {
    queryParams.push(`class_id_list=${classes}`);
  }

  if (name) {
    queryParams.push(`name=${name}`);
  }

  if (account) {
    queryParams.push(`account=${account}`);
  }
  const queryString = queryParams.join("&");
  return userRequest.get(`/students?${queryString}`);
};

export const addstudents = async (data) => {
  try {
    const response = await userRequest.post('/students', data);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const updatestudents = async (id, updatedData) => {
  try {
    const response = await userRequest.patch(`/students/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletestudents = async (id) => {
  try {
    const response = await userRequest.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error delete :', error);
    throw error;
  }
};