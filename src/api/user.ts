import Api from './axiosConfig';
import userRoutes from '../endpoints/userEndPoints';



export const sentOTP = async(email:{email:string}) => {
    try{
        const response = await Api.post(userRoutes.sentOTP,email);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const verifyOTP = async(data:{otp:number,email:string})=>{
    try {
        const response = await Api.post(userRoutes.verifyOTP,data);
        return response;
    } catch (error) {
        console.log(error);
    }
}