
const companyRoutes={
    company:'company',
    verifyTenant:'company/verify-tenant',
    login:'company/login',
    upsert:'company/upsert',
    sentOtp:'company/sent-otp',
    verifyOtp:'company/verify-otp',
    changePassword:'company/change-password',
    announcements:'announcements',
    read:(id:string)=>`announcements/read/${id}`,
    Announcements:(id:string|undefined)=>`announcements/${id}`,
    department:'department',
    Department:(id:string|undefined)=>`department/${id}`,
    designation:'designation',
    Designation:(id:string|undefined)=>`designation/${id}`,
    employee:'employee',
    Employee:(id:string|undefined)=>`employee/${id}`,
    project:'project',
    Project:(id:string|undefined)=>`project/${id}`,
    workShift:'workshift',
    WorkShift:(id:string|undefined)=>`workshift/${id}`,
    holiday:'holiday',
    Holiday:(id:string|undefined)=>`holiday/${id}`,
    leaveType:'leave',
    LeaveType:(id:string|undefined)=>`leave/${id}`,
    asset:'asset',
    Asset:(id:string|undefined)=>`asset/${id}`,
    AssetAssign:(id:string|undefined)=>`asset/${id}/assign`,
    AssetRequest:(id:string|undefined)=>`asset/${id}/request`,

}

export default companyRoutes;