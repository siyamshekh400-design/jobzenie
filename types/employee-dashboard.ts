export interface JobStatusBreakdown {
  _id: "open" | "closed" | "filled";
  count: number;
}

export interface ApplicationStatusBreakdown {
  _id: "submitted" | "reviewed" | "interviewing" | "offered" | "rejected" | "withdrawn";
  count: number;
}

export interface EmployeeBarChartData {
  jobTitle: string;
  applications: number;
}

export interface IRecentApplication {
  _id: string;
  candidate: {
    _id: string;
    name: string;
    email: string;
  };
  job: {
    _id: string;
    title: string;
  };
  status: string;
  createdAt: Date;
}

export interface EmployeeDashboardStats {
  totalJobs: number;
  jobStatusBreakdown: JobStatusBreakdown[];
  totalApplications: number;
  applicationStatusBreakdown: ApplicationStatusBreakdown[];
  recentApplications: IRecentApplication[];
}
