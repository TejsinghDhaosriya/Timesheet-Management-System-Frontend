import axios from "axios";

export const getTimesheetApi = async (timesheeet: any) =>
  axios.get(
    `timesheet?userId=${timesheeet.userId}&organizationId=${timesheeet.organizationId}`
  );

export const getTimesheetByIdApi = async (id: any) =>
  axios.get(`timesheet/${id}`);

export const createTimesheetAPI = async (
  timesheet: any,
  user: any,
  orgId: any,
  pId: any
) => {
  const config: any = {
    headers: { user_id: user, organization_id: orgId, project_id: pId },
  };
  return axios.post(
    `timesheet`,
    timesheet,
    config
  );
};

export const updateTimesheetAPI = async (timesheet: {
  id: any;
  timesheetData: any;
}) => axios.patch(`timesheet/${timesheet.id}`, timesheet.timesheetData);

export const deleteTimesheetByIdAPI = async (id: any) =>
  axios.delete(`timesheet/${id}`);
