import { userRequest } from "./API";

export const classes = async () => {
  try {
    const res = await userRequest.get("/classes");
    return res.data.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

export const addclass = async (data) => {
  try {
    const response = await userRequest.post(`/classes`, data);
    return response.data;
  } catch (error) {
    console.error("Error update :", error);
    throw error;
  }
};

export const updateclass = async (id, updatedData) => {
  try {
    const response = await userRequest.patch(`/classes/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error update :", error);
    throw error;
  }
};

export const deleteclass = async (id) => {
  try {
    const response = await userRequest.delete(`/classes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error delete :", error);
    throw error;
  }
};
