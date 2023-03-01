import axios from "axios";

export const getApprovalByWeek = async (approval: {
  userId: any;
  organizationId: any;
  startDate: string;
  endDate: string;
}) =>
  axios.get(
    `http://localhost:5295/api/v1/timesheet?withApproval=true&startDate=${approval.startDate}&endDate=${approval.endDate}`
  );
export const getApprovalAPI = async () =>
  axios.get(`http://localhost:5295/api/v1/timesheet?withApproval=true`);
export const updateApprovalAPI = async (approval: { id: any }) =>
  axios.patch(
    `http://localhost:5295/api/v1/timesheet/approval/${approval.id}`,
    approval
  );
export const updateAllApprovalsAPI = async (approvals: any) =>
  axios.patch(
    `http://localhost:5295/api/v1/timesheet/approvals`,
    approvals
  );
export const deleteApprovalByIdAPI = async (id: any) =>
  axios.delete(`http://localhost:5295/api/v1/timesheet/approval/${id}`);
