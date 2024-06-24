
const companyRoutes={
    verifyTenant:'company/verify-tenant',
    login:'company/login',
    announcements:'announcements',
    read:(id:string)=>`announcements/read/${id}`,
    Announcements:(id:string|undefined)=>`announcements/${id}`
}

export default companyRoutes;