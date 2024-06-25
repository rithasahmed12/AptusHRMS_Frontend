
const companyRoutes={
    verifyTenant:'company/verify-tenant',
    login:'company/login',
    announcements:'announcements',
    read:(id:string)=>`announcements/read/${id}`,
    Announcements:(id:string|undefined)=>`announcements/${id}`,
    department:'department',
    Department:(id:string|undefined)=>`department/${id}`,
    designation:'designation',
    Designation:(id:string|undefined)=>`designation/${id}`,
    employee:'employee',

}

export default companyRoutes;