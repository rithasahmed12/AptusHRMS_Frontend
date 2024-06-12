import companyRoutes from "../endpoints/companyEndpoints";
import Api from "./axiosConfig";


export const verifyTenant = async (tenantId:string, domain:string|null) => {
    try {
        console.log('ttetet:',tenantId,domain);
        
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
      return response.data;
    } catch (error:any) {
     console.log(error);
     
    }
  };