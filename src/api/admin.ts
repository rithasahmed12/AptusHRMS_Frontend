import Api from './axiosConfig';
import adminRoutes from '../endpoints/adminEndPoints';
import { AxiosResponse } from 'axios';
import * as axios from 'axios';

export const adminLogin = async (body: { email: string, password: string }): Promise<AxiosResponse<any> | undefined> => {
    try {
        const response = await Api.post(adminRoutes.login, body, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response;
        } else {
            console.error('Unexpected error:', error);
            throw error; // or handle accordingly
        }
    }
}

export const adminRequests = async()=>{
    try {
        const response = await Api.get(adminRoutes.requests,{
            withCredentials:true
        });
        return response;
    } catch (error) {
        console.log(error);  
    }
}

export const approveRequest = async (id: string) => {
    try {
      const response = await Api.patch(adminRoutes.approveRequest(id), {}, { withCredentials: true });
      return response;
    } catch (error) {
      return error;
    }
  };

  export const declineRequest = async (id: string) => {
    try {
      const response = await Api.patch(adminRoutes.declineRequest(id), {}, { withCredentials: true });
      return response;
    } catch (error) {
      return error;
    }
  };

  export const adminCustomers = async()=>{
    try {
        const response = await Api.get(adminRoutes.customers,{withCredentials:true});
        return response
    } catch (error) {
        console.log(error);      
    }
  }

  export const blockCustomer = async (id: string) => {
    try {
      const response = await Api.patch(adminRoutes.blockCustomer(id), {}, { withCredentials: true });
      return response;
    } catch (error) {
      return error;
    }
  };

  export const unblockCustomer = async (id: string) => {
    try {
      const response = await Api.patch(adminRoutes.unblockCustomer(id), {}, { withCredentials: true });
      return response;
    } catch (error) {
      return error;
    }
  };

  interface Plans{
    planName:string,
    planAmount:string,
    planDuration:string,
    maxEmployees:string
  }

  export const createPlan = async(body:Plans)=>{
    try {
        const response = await Api.post(adminRoutes.createPlan,body,{withCredentials:true});
        return response;   
    } catch (error) {
        console.log(error);
        
    }
  }
  
