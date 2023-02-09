export interface Timesheet{
    id:number,
    description:string,
    date:string,
    totalHours:number,
    createdBy:number,
    organizationId:number,
    approvals:Approval[]
    }
export interface Approval{
        id: number,
        timesheetId:number,
        status: number,
        reasonForRejection:string,
        approvalDate: string,
        managerId: number,
        organizationId: number,
        createdAt:string,
        modifiedAt:string
    }