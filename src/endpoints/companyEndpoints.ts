
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
    assetRequest:'asset/request',
    AssetRequest:(id:string|undefined,userId:string)=>`asset/${id}/${userId}/request`,
    leaveRequest: 'leave/request',
    LeaveRequest: (id: string | undefined) => `leave/request/${id}`,
    updateLeaveRequestStatus: (id: string) => `leave/request/${id}/status`,
    employeeLeaveDays: (employeeId: string) => `leave/employee/${employeeId}/days`,
    jobs: 'job',
    Job: (id: string | undefined) => `job/${id}`,
    jobApplication: 'job/application',
    JobApplication: (id: string | undefined) => `job/application/${id}`,
    updateJobApplicationStatus: (id: string) => `job/application/${id}/status`,
    jobApplicants:`job/applicants`,
    shortlistedCandidates: 'job/candidates/shortlisted',
    candidateStatus: (candidateId: string) => `job/candidate/${candidateId}/status`,

}

export default companyRoutes;