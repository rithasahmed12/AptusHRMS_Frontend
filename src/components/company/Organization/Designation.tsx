import React, { useEffect, useState } from "react";
import {
  ConfigProvider,
  Modal,
  Form,
  Input,
  Button,
  Tooltip,
  Table,
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import {
  createDesignation,
  deleteDesignation,
  editDesignation,
  getDesignations,
  getDepartment, // Fetch departments for the selector
} from "../../../api/company";
import { toast } from "react-toastify";

const { Option } = Select;

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

interface Employee {
  _id: string;
  name: string;
  email: string;
  position: string;
}

const DesignationPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingDesignation, setDeletingDesignation] =
    useState<Designation | null>(null);
  const [editingDesignation, setEditingDesignation] =
    useState<Designation | null>(null);
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [form] = Form.useForm();

  const fetchDesignations = async () => {
    setIsLoading(true);
    try {
      const response = await getDesignations();
      setDesignations(response.data || []);
    } catch (error:any) {
      console.error("Failed to fetch designations:", error);
      toast.error(error.message);
      setDesignations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await getDepartment();
      setDepartments(response.data || []);
    } catch (error:any) {
      console.error("Failed to fetch departments:", error);
      toast.error(error.message);
      setDepartments([]);
    }
  };

  useEffect(() => {
    fetchDesignations();
    fetchDepartments();
  }, []);

  const showAddModal = () => {
    setIsAddModalOpen(true);
  };

  const showViewModal = async (designationId: string) => {
    try {
      //   const response = await getEmployeesInDesignation(designationId);
      //   setEmployees(response.data);
      setIsViewModalOpen(true);
    } catch (error) {
      toast.error("Failed to fetch employees");
    }
  };

  const handleAddOk = async () => {
    try {
      const values = await form.validateFields();
      const response = await createDesignation(values);

      setDesignations([response.data.designation, ...designations]);
      setIsAddModalOpen(false);
      form.resetFields();
      toast.success("Designation added successfully");
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
    form.resetFields();
  };

  const showEditModal = (designation: Designation) => {
    setEditingDesignation(designation);
    form.setFieldsValue({
      name: designation.name,
      departmentId: designation.departmentId,
    });
    setIsEditModalOpen(true);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditingDesignation(null);
    form.resetFields();
  };

  const showDeleteModal = (designation: Designation) => {
    setDeletingDesignation(designation);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOk = async () => {
    try {
      if (deletingDesignation) {
         await deleteDesignation(deletingDesignation._id);
          setDesignations(
            designations.filter((d) => d._id !== deletingDesignation._id)
          );
          setIsDeleteModalOpen(false);
          setDeletingDesignation(null);
          toast.success("Designation deleted successfully");
        }
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeletingDesignation(null);
  };

  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();
       await editDesignation(editingDesignation?._id, values);
        setDesignations(
          designations.map((d) =>
            d._id === editingDesignation?._id ? { ...d, ...values } : d
          )
        );
        setIsEditModalOpen(false);
        setEditingDesignation(null);
        form.resetFields();
        toast.success("Designation updated successfully");
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
        <h1 className="text-2xl font-semibold">Designation</h1>
        <ConfigProvider theme={modalTheme}>
          <Button
            className="bg-black text-white rounded-md px-3 py-1 hover:bg-slate-700 duration-300"
            onClick={showAddModal}
          >
            Add Designation
          </Button>
        </ConfigProvider>
      </div>

      <div className="bg-white p-6 rounded-md shadow-lg mb-6">
        <h2 className="text-xl font-medium mb-4">Designations</h2>
        {isLoading ? (
          <p>Loading designations...</p>
        ) : designations.length > 0 ? (
          <div className="space-y-4">
            {designations.map((designation) => (
              <div key={designation._id} className="p-4 bg-gray-100 rounded-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{designation.name}</h3>
                  <div className="flex space-x-2">
                    <Tooltip title="Edit">
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => showEditModal(designation)}
                      >
                        Edit
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => showDeleteModal(designation)}
                      >
                        Delete
                      </Button>
                    </Tooltip>
                    <Tooltip title="View Employees">
                      <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => showViewModal(designation._id)}
                      >
                        View Employees
                      </Button>
                    </Tooltip>
                  </div>
                </div>
                <p className="text-gray-700">
                  Department:{" "}
                  {departments.find((d) => d._id === designation.departmentId)
                    ?.name || "Unknown"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No designations available.</p>
        )}
      </div>

      <ConfigProvider theme={modalTheme}>
        {/* Modal for adding designation */}
        <Modal
          title="Add Designation"
          open={isAddModalOpen}
          onOk={handleAddOk}
          onCancel={handleAddCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Department"
              name="departmentId"
              rules={[
                { required: true, message: "Please select a department!" },
              ]}
            >
              <Select>
                {departments.map((department) => (
                  <Option key={department._id} value={department._id}>
                    {department.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input the designation name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal for editing designation */}
        <Modal
          title="Edit Designation"
          open={isEditModalOpen}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Department"
              name="departmentId"
              rules={[
                { required: true, message: "Please select a department!" },
              ]}
            >
              <Select>
                {departments.map((department) => (
                  <Option key={department._id} value={department._id}>
                    {department.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input the designation name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal for viewing employees in designation */}
        <Modal
          title="Employees in Designation"
          open={isViewModalOpen}
          onOk={() => setIsViewModalOpen(false)}
          onCancel={() => setIsViewModalOpen(false)}
          footer={null}
        >
          <Table dataSource={employees} columns={columns} rowKey="_id" />
        </Modal>

        {/* Modal for delete confirmation */}
        <Modal
          title="Delete Designation"
          open={isDeleteModalOpen}
          onOk={handleDeleteOk}
          onCancel={handleDeleteCancel}
          okText="Delete"
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to delete this designation?</p>
          {deletingDesignation && (
            <p>
              <strong>Name:</strong> {deletingDesignation.name}
            </p>
          )}
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default DesignationPage;
