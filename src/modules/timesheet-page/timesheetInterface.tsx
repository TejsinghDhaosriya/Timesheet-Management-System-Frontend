interface Project_Info {
  project_name: string;
  project_manager:string[];
}

interface TimesheetInterface {
  id:string;
  date: string;
  description: string;
  totalHours: number;
  timeSheetSubmitted: boolean;
}

export default interface TimesheetData {
  project_info: Project_Info;
  timesheet: TimesheetInterface[];
  isLoading:boolean;
  error:boolean;
}
