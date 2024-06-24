import companyRoutes from "../endpoints/companyEndpoints";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CompanyApi = axios.create({ baseURL: BASE_URL });

CompanyApi.defaults.withCredentials = true;


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