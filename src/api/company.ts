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

interface Employee {
  readonly name?: string;
  readonly gender?: string;
  readonly dob?: Date;
  readonly streetAddress?: string;
  readonly city?: string;
  readonly country?: string;
  readonly postalCode?: string;
  readonly phone?: string;
  readonly email: string;
  readonly hireDate?: Date;
  readonly joiningDate?: Date;
  readonly basicSalary?: number;
  readonly employeeType?: string;
  readonly departmentId?: string;
  readonly designationId?: string;
  readonly employeeId?: string;
  readonly status?: string;
  readonly role: string;
  readonly shift?: string;
  readonly profilePic?: string;
}

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


