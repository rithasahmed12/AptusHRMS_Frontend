
const adminRoutes={
    login:'admin/login',
    requests:'admin/requests',
    approveRequest:(id:string)=> `admin/approveRequest/${id}`,
    declineRequest:(id:string)=> `admin/declineRequest/${id}`,
    customers:'admin/customers',
    blockCustomer:(id:string)=> `admin/blockCustomer/${id}`,
    unblockCustomer:(id:string)=> `admin/unblockCustomer/${id}`,
    createPlan:'admin/createPlan'
}

export default adminRoutes;