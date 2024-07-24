import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, getEmployees } from "../../../api/company";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface Designation {
  _id: string;
  name: string;
  departmentId: string;
}

interface Department {
  _id: string;
  name: string;
  head: string;
}

// Define the interface for employee data
interface Employee {
  readonly _id:string;
  readonly name?: string;
  readonly gender?: string;
  readonly dob?: Date;
  readonly streetAddress?: string;
  readonly city?: string;
  readonly country?: string;
  readonly postalCode?: string;
  readonly phone?: string;
  readonly email: string;
  readonly hireDate?: Date;
  readonly joiningDate?: Date;
  readonly basicSalary?: number;
  readonly employeeType?: string;
  readonly departmentId?: Department;
  readonly designationId?: Designation;
  readonly employeeId?: string;
  readonly status?: string;
  readonly role: string;
  readonly shift?: string;
  readonly profilePic?: string;
}

const EmployeeList: React.FC = () => {
  const userRole = useSelector((state: any) => state.companyInfo.companyInfo.role); 
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      if(response.status ===  200){
        console.log('response:', response);
        setEmployees(response.data);
      }
    } catch (error) {
      message.error("Failed to fetch employees");
    }
  };

  const showDeleteModal = (employee: Employee) => {
    setDeletingEmployee(employee);
    setIsDeleteModalOpen(true);
  };



  const handleDeleteOk = async () => {
    try {
      // Implement deleteEmployee function in your API
      const response = await deleteEmployee(deletingEmployee?._id!);
      if (response.status === 200) {
        setEmployees(employees.filter(e => e._id !== deletingEmployee?._id));
        setIsDeleteModalOpen(false);
        setDeletingEmployee(null);
        message.success("Employee deleted successfully");
      }
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeletingEmployee(null);
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "_id",
    },
    {
      title: "Info",
      key: "info",
      render: (_text: any, record: Employee) => (
        <div className="flex items-center">
            <img 
              src={record.profilePic||"https://via.placeholder.com/150"} 
              alt="Profile Pic" 
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
              className="w-10 h-10 rounded-full mr-3"
            />
          <div>
            <div className="font-semibold">{record.name}</div>
            <div className="text-xs text-gray-500">
              {record.departmentId  && <span>{record.departmentId.name}</span>}
              {record.departmentId && record.designationId && <span> | </span>}
              {record.designationId && <span>{record.designationId.name}</span>}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Contacts",
      key: "contacts",
      render: (_text: any, record: Employee) => (
        <>
          <p>Phone: {record.phone}</p>
          <p>Email: {record.email}</p>
        </>
      ),
    },
    {
      title: "Date of Joining",
      dataIndex: "joiningDate",
      key: "joiningDate",
      render: (joiningDate: Date) => joiningDate ? format(new Date(joiningDate), 'dd/MM/yyyy') : '',
    },
    ...(userRole === 'admin' || userRole === 'hr' ? [{
      title: "Action",
      key: "action",
      render: (_text: any, record: Employee) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="dashed" icon={<DeleteOutlined />} onClick={() => showDeleteModal(record)}>
            Delete
          </Button>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record)}>
            View More
          </Button>
        </Space>
      ),
    }] : []),
  ];

  const handleAddEmployee = () => {
    navigate("/c/employees/add"); 
  };

  const handleEdit = (employee: Employee) => {
    navigate(`/c/employees/edit/${employee._id}`);
  };

  const handleView = (employee: Employee) => {
    navigate(`/c/employees/view/${employee._id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Employee List</h1>
         {(userRole === 'admin' || userRole === 'hr') && (
        <Button type="primary" onClick={handleAddEmployee}>
          Add Employee
        </Button>
      )}
      </div>

      <Table columns={columns} dataSource={employees} rowKey="_id" />

      {/* Modal for delete confirmation */}
      <Modal
        title="Delete Employee"
        open={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this employee?</p>
        {deletingEmployee && (
          <p>
            <strong>Name:</strong> {deletingEmployee.name}
          </p>
        )}
      </Modal>
    </div>
  );
};

export default EmployeeList;
