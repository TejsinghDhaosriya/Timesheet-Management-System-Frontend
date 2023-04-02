import axios from "axios";

export const getApprovalByWeek = async (approval: {
  userId: any;
  organizationId: any;
  startDate: string;
  endDate: string;
  orgId:number;
}) =>
  axios.get(
    `timesheet?withApproval=true&startDate=${approval.startDate}&endDate=${approval.endDate}&userid=${approval.userId}&organizationId=${approval.orgId}`
  );
export const getApprovalAPI = async () =>
  axios.get(`timesheet?withApproval=true`);
export const updateApprovalAPI = async (approval: { id: any }) =>
  axios.patch(`timesheet/approval/${approval.id}`, approval);
export const updateAllApprovalsAPI = async (approvals: any) =>
  axios.patch(`timesheet/approvals`, approvals);
export const deleteApprovalByIdAPI = async (id: any) =>
  axios.delete(`timesheet/approval/${id}`);
