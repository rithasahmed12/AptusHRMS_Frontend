// EmployeeList.tsx
import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal,message } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import { getEmployees, deleteEmployee } from "../../api/company"; // Adjust path as per your project structure


interface Employee {
  _id: string;
  name: string;
  contacts: {
    phone: string;
    email: string;
    profilePic: string;
  };
  dateOfJoining: string; // Assuming date is stored as string in ISO format
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
    //   const response = await getEmployees(); // Implement getEmployees function in your API
    //   setEmployees(response.data); // Assuming response.data contains an array of employees
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
      if (deletingEmployee) {
        // Implement deleteEmployee function in your API
        // const response = await deleteEmployee(deletingEmployee._id);
        // if (response.status === 200) {
          setEmployees(employees.filter(e => e._id !== deletingEmployee._id));
          setIsDeleteModalOpen(false);
          setDeletingEmployee(null);
          message.success("Employee deleted successfully");
        // }
      }
    } catch (error) {
      message.error("Failed to delete employee");
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeletingEmployee(null);
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contacts",
      dataIndex: "contacts",
      key: "contacts",
      render: (contacts: { phone: string; email: string; profilePic: string }) => (
        <>
          <p>Phone: {contacts.phone}</p>
          <p>Email: {contacts.email}</p>
          <img src={contacts.profilePic} alt="Profile Pic" style={{ width: 50, borderRadius: "50%" }} />
        </>
      ),
    },
    {
      title: "Date of Joining",
      dataIndex: "dateOfJoining",
      key: "dateOfJoining",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: Employee) => (
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
    },
  ];

  const handleAddEmployee = () => {
    navigate("/c/employees/add "); // Navigate to the route where you add employees
  };

  const handleEdit = (employee: Employee) => {
    // Implementation for editing employee details
  };

  const handleView = (employee: Employee) => {
    // Implementation for viewing more details of employee
    // This could open a modal or navigate to another page with detailed information
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Employee List</h1>
        <Button type="primary" onClick={handleAddEmployee}>
          Add Employee
        </Button>
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
