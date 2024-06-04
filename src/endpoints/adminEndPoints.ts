
const adminRoutes={
    login:'admin/login',
    requests:'admin/requests',
    approveRequest:(id:string)=> `admin/approveRequest/${id}`,
    declineRequest:(id:string)=> `admin/declineRequest/${id}`,
    customers:'admin/customers',
    blockCustomer:(id:string)=> `admin/blockCustomer/${id}`,
    unblockCustomer:(id:string)=> `admin/unblockCustomer/${id}`,
    getPlans:'admin/plan',
    createPlan:'admin/createPlan',
    editPlan:(id:string)=>`admin/editPlan/${id}`,
    listPlan:(id:string)=> `admin/listPlan/${id}`,
    unlistPlan:(id:string)=> `admin/unlistPlan/${id}`,
}

export default adminRoutes;