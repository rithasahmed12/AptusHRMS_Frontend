import companyRoutes from "../endpoints/companyEndpoints";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CompanyApi = axios.create({ baseURL: BASE_URL , withCredentials:true});




const getDomainFromSubdomain = () => {
  const url = new URL(window.location.href);
  const hostname = url.hostname;
  const domain = hostname.includes('.') ? hostname.split('.')[0] : null;
  return domain;
};


CompanyApi.interceptors.request.use(
  (config) => {
 
    const tenantId = localStorage.getItem('tenantId')||localStorage.getItem('portalId');
    
    const domain = getDomainFromSubdomain();

    const companyInfo:any = localStorage.getItem('compnayInfo')||undefined;

    if (tenantId) {
      config.headers['x-tenant-id'] = tenantId;
    }
    if (domain) {
      config.headers['x-domain'] = domain;
    }

    if(companyInfo){
      config.headers['token'] = companyInfo.token;
    }

    return config;
  },
  (error) => {
    console.log(error);
    
    return Promise.reject(error);
  }
);

export const verifyTenant = async (tenantId: string) => {
  try {
    localStorage.setItem('tenantId', tenantId);

    const response = await CompanyApi.post(companyRoutes.verifyTenant);

    localStorage.removeItem('tenantId');

    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const companyLogin = async (body: { email: string; password: string }) => {
  try {
    const response = await CompanyApi.post(companyRoutes.login, body);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

interface Annoucement{
  title: string,
  details:string,
  author: string,
}

export const addAnnouncements = async (body:Annoucement)=>{
  try {
    const response = await CompanyApi.post(companyRoutes.announcements,body);
    return response;
  } catch (error:any) {
    return error.response;
  }
}

export const getAnnouncements = async()=>{
  try {
    const response = await CompanyApi.get(companyRoutes.announcements);
    return response;
  } catch (error:any) {
    return error.response;
  }
}

export const AnnoucementmarkAsRead = async(id:string)=>{
  try {
      const response = await CompanyApi.patch(companyRoutes.read(id));
      return response;
  } catch (error:any) {
    return error.response;
  }
}

export const editAnnouncement = async(id:string|undefined,body:Annoucement)=>{
  try {
    const response = await CompanyApi.put(companyRoutes.Announcements(id),body);
    return response;
  } catch (error:any) {
    return error.response;
  }
}

export const deleteAnnouncement = async(id:string)=>{
  try {
    const response = await CompanyApi.delete(companyRoutes.Announcements(id));
    return response;
  } catch (error:any) {
    return error.response;
  }
}

export const getDepartment = async()=>{
  try {
    const response = await CompanyApi.get(companyRoutes.department);
    return response;
  } catch (error:any) {
    throw Error;
  }
}

interface Department{
  name:string;
  head:string
}

export const createDepartment = async (body:Department)=>{
  try {
    const response = await CompanyApi.post(companyRoutes.department,body);
    return response;
  } catch (error:any) {
    return error.response;
  }
}

export const editDepartment = async(id:string|undefined,body:Department)=>{
  try {
    const response = await CompanyApi.put(companyRoutes.Department(id),body);
    return response;
  } catch (error:any) {
    return error.response;
  }
}

export const deleteDepartment = async(id:string)=>{
  try {
    const response = await CompanyApi.delete(companyRoutes.Department(id));
    return response;
  } catch (error:any) {
    return error.response;
  }
}

interface Designation {
  name: string;
  departmentId: string;
}

export const createDesignation = async (designation:Designation) => {
  try { 
    const response = await CompanyApi.post(companyRoutes.designation, designation);
    return response;
  } catch (error:any) {
    return error.response;
  }
};

export const deleteDesignation = async (id:string) => {
  try {
    const response = await CompanyApi.delete(companyRoutes.Designation(id));
    return response;
  } catch (error:any) {
    return error.response;
  }
};

export const editDesignation = async (id:string|undefined, designation:Designation) => {
  try {
    const response = await CompanyApi.put(companyRoutes.Designation(id), designation);
    return response;
  } catch (error:any) {
    return error.response;
  }
};

export const getDesignations = async () => {
  try {
    const response = await CompanyApi.get(companyRoutes.designation);
    return response;
  } catch (error:any) {
    return error.response;
  }
};


export const createEmployee = async (formData: FormData) => {
  try {
    console.log('formData:',formData);
    
    const response = await CompanyApi.post(companyRoutes.employee, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error: any) {
    console.error('Error in createEmployee:', error.response?.data || error.message);
    throw error;
  }
};

export const getEmployees = async()=>{
  try {
    const response = await CompanyApi.get(companyRoutes.employee);
    return response 
  } catch (error) {
    console.log(error);
    throw Error;
  }
}

export const getEmployee = async(id:string)=>{
  try {
    const response = await CompanyApi.get(companyRoutes.Employee(id));
    return response;
  } catch (error) {
    throw Error;
  } 
}

export const updateEmployee = async(id:string,formData:FormData)=>{
  try {
    console.log('Employee:',formData);
    const response = await CompanyApi.put(companyRoutes.Employee(id),formData,{
      headers:{
        'Content-Type': 'multipart/form-data',
      }
    });
    return response;
  } catch (error) {
    console.log(error); 
    throw Error;
  } 
}

export const deleteEmployee = async(id:string)=>{
  try {
    const response = await CompanyApi.delete(companyRoutes.Employee(id));
    return response;
  } catch (error) {
    throw Error;
  } 
}

interface Project {
  name: string;
  description: string;
  status: "Not Started" | "In Progress" | "Completed";
  progress: number;
  priority: "Low" | "Medium" | "High";
  startDate: Date;
  endDate: Date;
  assignedPerson:{_id:string};
}


export const createProject = async (body: Omit<Project, '_id'>) => {
  try {
    const response = await CompanyApi.post(companyRoutes.project, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.log('ERROR:', error);
    throw new Error("Failed to create project");
  }
};


export const getProjects = async()=>{
  try {
    const response = await CompanyApi.get(companyRoutes.project);
    return response;
  } catch (error) {
    console.log(error);
    throw Error;
  }
}

export const editProject = async (id: string, body: Project) => {
  try {
    console.log('body:',body);
    const response = await CompanyApi.put(companyRoutes.Project(id), body);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to edit project");
  }
};

export const deleteProject = async(id:string)=>{
  try {
    const response = await CompanyApi.delete(companyRoutes.Project(id));
    return response;
  } catch (error) {
    console.log(error);
    throw Error;
  }
}

export const sentOTP = async(email:string) => {
  try{
    console.log('API:',email);
    
      const response = await CompanyApi.post(companyRoutes.sentOtp,{email});
      return response;
  } catch (error) {
      console.log(error);
      throw Error;
  }
}

export const verifyOTP = async(body:{email:string,otpString:string})=>{
  try {
      const response = await CompanyApi.post(companyRoutes.verifyOtp,body);
      return response;
  } catch (error) {
      console.log(error);
      throw Error;
  }
}

export const changePassword = async(body:{email:string,newPassword:string})=>{
  try {
    const response = await CompanyApi.post(companyRoutes.changePassword,body)
    return response;
} catch (error) {
    console.log(error);
    throw Error;
}
}

export const getCompanyInfo = async()=>{
  try {
    const response = await CompanyApi.get(companyRoutes.company);
    return response;
  } catch (error) {
    console.log(error);
    throw Error;
  }
}

export const companyDataUpsert = async(formData:FormData)=>{
  try {
    const response = await CompanyApi.post(companyRoutes.upsert,formData,{
      headers:{'Content-Type': 'multipart/form-data'},
    });
    return response;
  } catch (error) {
    console.log(error);
    throw Error;
  }
}


interface WorkShift {
  shiftName: string;
  workingDays: string[];
  shiftIn: string;
  shiftOut: string;
  lateThreshold?: number;
  halfdayThreshold?: number;
  shiftOutNextDay?: boolean;
}

export const getAllWorkShifts = async () => {
  try {
    const response = await CompanyApi.get(companyRoutes.workShift);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getWorkShift = async (id: string|undefined) => {
  try {
    const response = await CompanyApi.get(companyRoutes.WorkShift(id));
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const createWorkShift = async (workShift: WorkShift) => {
  try {
    const response = await CompanyApi.post(companyRoutes.workShift, workShift);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const editWorkShift = async (id: string|undefined, workShift: Partial<WorkShift>) => {
  try {
    const response = await CompanyApi.put(companyRoutes.WorkShift(id), workShift);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const deleteWorkShift = async (id: string) => {
  try {
    const response = await CompanyApi.delete(companyRoutes.WorkShift(id));
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export interface Holiday {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
}

export const getAllHolidays = async () => {
  try {
    const response = await CompanyApi.get(companyRoutes.holiday);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const createHoliday = async (holiday: Omit<Holiday, '_id'>) => {
  try {
    const response = await CompanyApi.post(companyRoutes.holiday, holiday);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const updateHoliday = async (id: string|undefined, holiday: Partial<Omit<Holiday, '_id'>>) => {
  try {
    const response = await CompanyApi.put(companyRoutes.Holiday(id), holiday);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const deleteHoliday = async (id: string) => {
  try {
    const response = await CompanyApi.delete(companyRoutes.Holiday(id));
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export interface LeaveType {
  _id: string;
  name: string;
  numberOfDays: number;
  status: 'Active' | 'Inactive';
}

export const getAllLeaveTypes = async () => {
  try {
    const response = await CompanyApi.get(companyRoutes.leaveType);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const createLeaveType = async (leaveType: Omit<LeaveType, '_id'>) => {
  try {
    const response = await CompanyApi.post(companyRoutes.leaveType, leaveType);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const updateLeaveType = async (id: string|undefined, leaveType: Partial<Omit<LeaveType, '_id'>>) => {
  try {
    const response = await CompanyApi.put(companyRoutes.LeaveType(id), leaveType);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const deleteLeaveType = async (id: string) => {
  try {
    const response = await CompanyApi.delete(companyRoutes.LeaveType(id));
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export interface Asset {
  _id: string;
  name: string;
  type: string;
  status: 'In Use' | 'Available' | 'Maintenance';
  assignedTo?: { name: string; _id: string };
  image: string | null;
}

export const getAllAssets = async () => {
  try {
    const response = await CompanyApi.get(companyRoutes.asset);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const createAsset = async (asset: FormData) => {
  try {
    const response = await CompanyApi.post(companyRoutes.asset, asset, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const updateAsset = async (id: string|undefined, asset: FormData) => {
  try {
    
    const response = await CompanyApi.put(companyRoutes.Asset(id), asset, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response;
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};

export const deleteAsset = async (id: string) => {
  try {
    const response = await CompanyApi.delete(companyRoutes.Asset(id));
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const assignAsset = async (id: string, assignedTo: string) => {
  try {
    const response = await CompanyApi.put(companyRoutes.AssetAssign(id), { assignedTo });
    return response;
  } catch (error: any) {
    return error.response;
  }
};


  export const requestAsset = async (assetId: string, userId: string) => {
    try {
      const response = await CompanyApi.put(companyRoutes.AssetRequest(assetId, userId));
      return response;
    } catch (error: any) {
      return error.response;
    }
  };

export const getAssetById = async (id: string|undefined) => {
  try {
    const response = await CompanyApi.get(companyRoutes.Asset(id));
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getAllAssetApplications = async()=>{
  try {
    const response = await CompanyApi.get(companyRoutes.assetRequest);
    return response;
  } catch (error) {
    console.log(error);
    throw Error;
    
  }
}

// api/company.ts

export const getAllLeaveRequests = async () => {
  try {
    const response = await CompanyApi.get(companyRoutes.leaveRequest);
    return response;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

interface LeaveRequestData {
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  reason: string;
  userId: string;
}

export const submitLeaveRequest = async (leaveData: LeaveRequestData) => {
  try {
    console.log('leaveData:',leaveData);
    
    const response = await CompanyApi.post(companyRoutes.leaveRequest, leaveData);
    return response;
  } catch (error: any) {
    console.log('ERROR:',error);
    
    throw Error;
  }
};

export const updateLeaveRequestStatus = async (requestId: string, status: string) => {
  try {
    const response = await CompanyApi.put(companyRoutes.updateLeaveRequestStatus(requestId), { status });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getEmployeeLeaveDays = async (employeeId: string) => {
  try {
    const response = await CompanyApi.get(companyRoutes.employeeLeaveDays(employeeId));
    return response;
  } catch (error: any) {
    return error.response;
  }
};



