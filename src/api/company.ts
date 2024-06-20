import companyRoutes from "../endpoints/companyEndpoints";
import Api from "./axiosConfig";


export const verifyTenant = async (tenantId:string, domain:string|null) => {
    try { 
      const response = await Api.post(
        companyRoutes.verifyTenant,
        {},
        {
          headers: {
            'x-tenant-id': tenantId,
            'x-domain': domain
          }
        }
      );
      return response;
    } catch (error:any) {
     return error.response;
    }
  };

export const companyLogin = async(body:{email:string,password:string},headers:any)=>{
  try {
    const response = await Api.post(
      companyRoutes.login,
      body,
      {withCredentials:true,headers}
    )
    return response;
  } catch (error:any) {
    return error.response;
  }
}   