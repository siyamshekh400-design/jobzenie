import { IApplication } from "@/database/applicaton.model";

interface ISignUpEmailParams {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeOnTerms: boolean;
  accountType: "candidate" | "employee";
}

interface ISignInEmailParams {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface PaginatedSearchParams {
  search?: string;
  country?: string;
  status?: string;
  skill?: string;
  page?: number;
  experience?: string;
  location?: string;
  jobType?: string;
  filter?: string;
  limit?: number;
}

interface PaginationResponse {
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}
interface PopulatedJob {
  _id: string;
  title: string;
  companyName?: string;
  location?: string;
}

interface RecentApplication {
  _id: string;
  status: IApplication["status"];
  createdAt: Date;
  updatedAt: Date;
  job: PopulatedJob;
  resumeSnapshot: string;
}

interface CandidateDashboardStats {
  totalApplications: number;
  applicationStatusBreakdown: {
    submitted: number;
    reviewed: number;
    interviewing: number;
    offered: number;
    rejected: number;
    withdrawn: number;
  };
  savedJobsCount: number;
  profileStrength: number; // percentage
  recentApplications: RecentApplication[];
}
