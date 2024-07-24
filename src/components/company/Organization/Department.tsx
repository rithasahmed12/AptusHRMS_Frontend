import React, { useEffect, useState } from "react";
import {
  ConfigProvider,
  Modal,
  Form,
  Input,
  Button,
  Tooltip,
  Table,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import {
  createDepartment,
  deleteDepartment,
  editDepartment,
  getDepartment,
} from "../../../api/company";
import { toast } from "react-toastify";

interface Department {
  _id: string;
  name: string;
  head: string;
}

interface Employee {
  _id: string;
  name: string;
  email: string;
  position: string;
}

const DepartmentPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingDepartment, setDeletingDepartment] =
    useState<Department | null>(null);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees] = useState<Employee[]>([]);
  const [form] = Form.useForm();

  const fetchDepartments = async () => {
    try {
      const response = await getDepartment();
      setDepartments(response.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const showAddModal = () => {
    setIsAddModalOpen(true);
  };

  const showViewModal = async (_departmentId: string) => {
    try {
      //   const response = await getEmployeesInDepartment(departmentId);
      //   setEmployees(response.data);
      setIsViewModalOpen(true);
    } catch (error) {
      toast.error("Failed to fetch employees");
    }
  };

  const handleAddOk = async () => {
    try {
      const values = await form.validateFields();
      const response = await createDepartment(values);

      setDepartments([response.data.department, ...departments]);
      setIsAddModalOpen(false);
      form.resetFields();
      toast.success("Department added successfully");
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
    form.resetFields();
  };

  const showEditModal = (department: Department) => {
    setEditingDepartment(department);
    form.setFieldsValue({
      name: department.name,
      head: department.head,
    });
    setIsEditModalOpen(true);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditingDepartment(null);
    form.resetFields();
  };

  const showDeleteModal = (department: Department) => {
    setDeletingDepartment(department);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOk = async () => {
    try {
      if (deletingDepartment) {
        await deleteDepartment(deletingDepartment._id);

        setDepartments(
          departments.filter((d) => d._id !== deletingDepartment._id)
        );
        setIsDeleteModalOpen(false);
        setDeletingDepartment(null);
        toast.success("Department deleted successfully");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeletingDepartment(null);
  };

  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();
      await editDepartment(editingDepartment?._id, values);
        setDepartments(
          departments.map((d) =>
            d._id === editingDepartment?._id ? { ...d, ...values } : d
          )
        );
        setIsEditModalOpen(false);
        setEditingDepartment(null);
        form.resetFields();
        toast.success("Department updated successfully");
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  const modalTheme = {
    token: {
      colorPrimary: "#000000",
    },
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
  ];

  return (
    <div className="p-4 flex-1">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Department</h1>
        <ConfigProvider theme={modalTheme}>
          <Button
            className="bg-black text-white rounded-md px-3 py-1 hover:bg-slate-700 duration-300"
            onClick={showAddModal}
          >
            Add Department
          </Button>
        </ConfigProvider>
      </div>

      <div className="bg-white p-6 rounded-md shadow-lg mb-6">
        <h2 className="text-xl font-medium mb-4">Departments</h2>
        <div className="space-y-4">
          {departments.map((department) => (
            <div key={department._id} className="p-4 bg-gray-100 rounded-md">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{department.name}</h3>
                <div className="flex space-x-2">
                  <Tooltip title="Edit">
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => showEditModal(department)}
                    >
                      Edit
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => showDeleteModal(department)}
                    >
                      Delete
                    </Button>
                  </Tooltip>
                  <Tooltip title="View Employees">
                    <Button
                      type="text"
                      icon={<EyeOutlined />}
                      onClick={() => showViewModal(department._id)}
                    >
                      View Employees
                    </Button>
                  </Tooltip>
                </div>
              </div>
              <p className="text-gray-700">Head: {department.head}</p>
            </div>
          ))}
        </div>
      </div>

      <ConfigProvider theme={modalTheme}>
        {/* Modal for adding department */}
        <Modal
          title="Add Department"
          open={isAddModalOpen}
          onOk={handleAddOk}
          onCancel={handleAddCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input the department name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Head"
              name="head"
              rules={[
                {
                  required: true,
                  message: "Please input the department head!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal for editing department */}
        <Modal
          title="Edit Department"
          open={isEditModalOpen}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input the department name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Head"
              name="head"
              rules={[
                {
                  required: true,
                  message: "Please input the department head!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal for viewing employees in department */}
        <Modal
          title="Employees in Department"
          open={isViewModalOpen}
          onOk={() => setIsViewModalOpen(false)}
          onCancel={() => setIsViewModalOpen(false)}
          footer={null}
        >
          <Table dataSource={employees} columns={columns} rowKey="_id" />
        </Modal>

        {/* Modal for delete confirmation */}
        <Modal
          title="Delete Department"
          open={isDeleteModalOpen}
          onOk={handleDeleteOk}
          onCancel={handleDeleteCancel}
          okText="Delete"
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to delete this department?</p>
          {deletingDepartment && (
            <p>
              <strong>Name:</strong> {deletingDepartment.name}
            </p>
          )}
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default DepartmentPage;
