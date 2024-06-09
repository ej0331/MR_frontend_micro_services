import axios from "axios";

export const userRequest = axios.create({
  baseURL: `http://${process.env.REACT_APP_USER_DOMAIN}/api`,
  withCredentials: true
});

//login
export const TeacherLogin = async (account, password) => {
  try {
        const response = await userRequest.post("/teacher/login", { account, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//signout
export const Signout = async () => {
  try {
    const response = await userRequest.post("/logout");
    console.log("Logout successful");
    return response.data;
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};

export const Auth = async () => {
  try {
    const response = await userRequest.get("/me");
    return response.data;
  } catch (error) {
    console.error("failed", error);
    throw error;
  }
};

