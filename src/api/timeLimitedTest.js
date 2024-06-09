import { recordRequest } from "./API";

const baseUrl = '/time_limited_tests';

export const getTimeLimitedTestList = (
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
    return recordRequest.get(`${baseUrl}?${queryString}`);
};

export const getTimeLimitedTestChartData = (user_id, startDate, endDate) => {
    const queryParams = [];

    if (startDate && endDate && startDate !== '1970-01-01' && endDate !== '1970-01-01') {
        queryParams.push(`finished_start=${startDate}&finished_end=${endDate}`);
    }

    const queryString = queryParams.join('&');
    return recordRequest.get(`${baseUrl}/chart/users/${user_id}?${queryString}`);
};
