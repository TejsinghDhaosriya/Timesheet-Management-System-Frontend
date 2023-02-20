import axios from "axios";

export const getApprovalByWeek = async (approval: {
  userId: any;
  organizationId: any;
  startDate: string;
  endDate: string;
}) =>
  axios.get(
    `https://143.110.248.171:5001/api/v1/timesheet??withApproval=true&userId=${approval.userId}&organizationId=${approval.organizationId}&startDate=${approval.startDate}&endDate=${approval.endDate}`
  );
export const getApprovalAPI = async () =>
  axios.get(`https://143.110.248.171:5001/api/v1/timesheet?withApproval=true`);
export const updateApprovalAPI = async (approval: { id: any }) =>
  axios.patch(
    `https://143.110.248.171:5001/api/v1/timesheet/approval/${approval.id}`,
    approval
  );
export const updateAllApprovalsAPI = async (approvals: any) =>
  axios.patch(
    `https://143.110.248.171:5001/api/v1/timesheet/approvals`,
    approvals
  );
export const deleteApprovalByIdAPI = async (id: any) =>
  axios.delete(`https://143.110.248.171:5001/api/v1/timesheet/approval/${id}`);
