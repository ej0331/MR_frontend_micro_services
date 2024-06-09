import { userRequest } from "./API";

export const QuantityLimitedPracticelist = async () => {
  try {
    const res = await userRequest.get("/quantity_limited_practices/list");
    return res.data.data;
  } catch (error) {
    console.error("List Error:", error);
    throw error;
  }
};

export const QuantityLimitedTestlist = async () => {
  try {
    const res = await userRequest.get("/quantity_limited_tests/list");
    return res.data.data;
  } catch (error) {
    console.error("List Error:", error);
    throw error;
  }
};

export const TimeLimitedPracticelist = async () => {
  try {
    const res = await userRequest.get("/time_limited_practices/list");
    return res.data.data;
  } catch (error) {
    console.error("List Error:", error);
    throw error;
  }
};

export const TimeLimitedTestlist = async () => {
  try {
    const res = await userRequest.get("/time_limited_tests/list");
    return res.data.data;
  } catch (error) {
    console.error("List Error:", error);
    throw error;
  }
};
