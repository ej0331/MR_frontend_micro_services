import { recordRequest } from "./API";

export const quantityLimitedPracticeHealthCheck = async () => {
  try {
    const res = await recordRequest.get("/quantity_limited_practices/health-check");
    return res.status;
  } catch (error) {
    console.error("Error fetching healthcheck:", error);
    throw error;
  }
};

export const getQuantityLimitedPracticeList = (
  classes,
  name,
  type_id_list_str,
  startDate,
  endDate,
  page,
  per_page
) => {
  const queryParams = [];
  if (classes) {
    queryParams.push(`class_id_list=${classes}`);
  }

  if (name) {
    queryParams.push(`name=${name}`);
  }

  if (type_id_list_str) {
    queryParams.push(`type_id_list=${type_id_list_str}`);
  }

  if (
    startDate &&
    endDate &&
    startDate !== "1970-01-01" &&
    endDate !== "1970-01-01"
  ) {
    queryParams.push(`finished_start=${startDate}&finished_end=${endDate}`);
  }

  if (page) {
    queryParams.push(`page=${page}`);
  }

  if (per_page) {
    queryParams.push(`per_page=${per_page}`);
  }

  const queryString = queryParams.join("&");
  return recordRequest.get(`/quantity_limited_practices?${queryString}`);
};

export const getQuantityLimitedPracticeChartData = (
  user_id,
  startDate,
  endDate
) => {
  const queryParams = [];

  if (
    startDate &&
    endDate &&
    startDate !== "1970-01-01" &&
    endDate !== "1970-01-01"
  ) {
    queryParams.push(`finished_start=${startDate}&finished_end=${endDate}`);
  }

  const queryString = queryParams.join("&");
  return recordRequest.get(
    `/quantity_limited_practices/chart/users/${user_id}?${queryString}`
  );
};
