import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Tag,
  Space,
  Typography,
  Tooltip,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
  Row,
  Col,
  Slider,
} from "antd";
import {
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { format } from "date-fns";
import {
  createProject,
  deleteProject,
  editProject,
  getEmployees,
  getProjects,
} from "../../../api/company";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface Project {
  _id: string;
  name: string;
  description: string;
  status: "Not Started" | "In Progress" | "Completed";
  progress: number;
  priority: "Low" | "Medium" | "High";
  startDate: Date;
  endDate: Date;
  assignedPerson?: Employee;
}

interface Employee {
  _id: string;
  name: string;
}

const ProjectList: React.FC = () => {
  const userRole = useSelector(
    (state: any) => state.companyInfo.companyInfo.role
  );
  const userId = useSelector((state: any) => state.companyInfo.companyInfo.id);

  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [form] = Form.useForm();

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      if (response.status === 200) {
        setEmployees(response.data);
      }
    } catch (error) {
      message.error("Failed to fetch employees");
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      console.log("Projectresponse:", response);
      console.log("UserId:", userId);

      if (userRole === "admin" || userRole === "hr") {
        setProjects(response.data);
      } else {
        const assignedProjects = response.data.filter(
          (project: Project) => project.assignedPerson?._id === userId
        );
        setProjects(assignedProjects);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchEmployees();
  }, []);

  const columns = [
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "20%",
      render: (text: string) => (
        <Tooltip title={text}>
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status: string) => (
        <Tag
          color={
            status === "Completed"
              ? "green"
              : status === "In Progress"
              ? "blue"
              : "orange"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      width: "10%",
      render: (progress: number) => `${progress}%`,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: "10%",
      render: (priority: string) => (
        <Tag
          color={
            priority === "High"
              ? "red"
              : priority === "Medium"
              ? "yellow"
              : "green"
          }
        >
          {priority}
        </Tag>
      ),
    },
    {
      title: "Dates",
      key: "dates",
      width: "15%",
      render: (_: any, record: Project) => (
        <div>
          <div>Start: {format(new Date(record.startDate), "PP")}</div>
          <div>End: {format(new Date(record.endDate), "PP")}</div>
        </div>
      ),
    },
    {
      title: "Assigned",
      dataIndex: "assignedPerson",
      key: "assignedPerson",
      width: "10%",
      render: (assignedPerson: Employee | undefined) =>
        assignedPerson?.name || "Not Assigned",
    },
    {
      title: "Actions",
      key: "actions",
      width: "10%",
      render: (_: any, record: Project) => (
        <Space size="small">
          {(userRole === "admin" || userRole === "hr") && (
            <>
              <Tooltip title="Delete">
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(record)}
                  size="small"
                />
              </Tooltip>
            </>
          )}
          {(userRole === "admin" ||
            userRole === "hr" ||
            record.assignedPerson?._id === userId) && (
            <>
              <Tooltip title="Edit">
                <Button
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(record)}
                  size="small"
                />
              </Tooltip>
              <Tooltip title="View More">
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  onClick={() => handleViewMore(record)}
                  size="small"
                />
              </Tooltip>
            </>
          )}
        </Space>
      ),
    },
  ];

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    form.setFieldsValue({
      name: project.name,
      description: project.description,
      priority: project.priority,
      status: project.status || "Not Started",
      progress: project.progress || 0,
      startDate: moment(project.startDate),
      endDate: moment(project.endDate),
      assignedPerson: project.assignedPerson?._id || null,
    });
    setIsEditModalVisible(true);
  };

  const handleViewMore = (project: Project) => {
    setSelectedProject(project);
    setIsViewModalVisible(true);
  };

  const handleDelete = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteModalVisible(true);
  };

  const handleAdd = () => {
    form.resetFields();
    setIsAddModalVisible(true);
  };

  const handleAddOk = async (values: any) => {
    try {
      const newProject: Omit<Project, "_id"> = {
        ...values,
        startDate: values.startDate.toDate(),
        endDate: values.endDate.toDate(),
        assignedPerson: values.assignedPerson || null,
      };
      await createProject(newProject);
      fetchProjects();
      setIsAddModalVisible(false);
      message.success("Project created successfully!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEditOk = async (values: any) => {
    if (!selectedProject?._id) {
      message.error("Unable to edit project.");
      return;
    }
    try {
      const updatedProject: Project = {
        ...values,
        _id: selectedProject._id,
        startDate: values.startDate.toDate(),
        endDate: values.endDate.toDate(),
        assignedPerson: values.assignedPerson || null,
      };
      await editProject(selectedProject._id, updatedProject);
      fetchProjects();
      setIsEditModalVisible(false);
      message.success("Project edited successfully!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
  };

  const handleDeleteOk = async () => {
    if (!selectedProject?._id) {
      message.error("Unable to delete project.");
      return;
    }
    try {
      await deleteProject(selectedProject._id);
      setProjects(
        projects.filter((project) => project._id !== selectedProject._id)
      );
      setIsDeleteModalVisible(false);
      message.success("Project deleted successfully!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Row justify="space-between">
        <Col>
          <Title level={2}>Project List</Title>
        </Col>
        {(userRole === "admin" || userRole === "hr") && (
          <Col>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              Add Project
            </Button>
          </Col>
        )}
      </Row>
      <Table columns={columns} dataSource={projects} rowKey="_id" />

      <Modal
        title="Add Project"
        open={isAddModalVisible}
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleAddOk(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Project Name"
            rules={[
              { required: true, message: "Please input the project name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: "Please select the priority!" }]}
          >
            <Select placeholder="Select project priority">
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[
                  { required: true, message: "Please select the start date!" },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={() => {
                    // Revalidate the end date when start date changes
                    form.validateFields(["endDate"]);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="End Date"
                dependencies={["startDate"]}
                rules={[
                  { required: true, message: "Please select the end date!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const startDate = getFieldValue("startDate");
                      if (!value || !startDate) {
                        return Promise.resolve();
                      }
                      if (value.isSameOrAfter(startDate)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("End date must be after start date!")
                      );
                    },
                  }),
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={(current) => {
                    const startDate = form.getFieldValue("startDate");
                    return (
                      startDate && current && current.isBefore(startDate, "day")
                    );
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="assignedPerson" label="Assigned Person">
            <Select placeholder="Select an employee">
              {employees.map((employee) => (
                <Option key={employee._id} value={employee._id}>
                  {employee.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Project"
        open={isEditModalVisible}
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleEditOk(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Project Name"
            rules={[
              { required: true, message: "Please input the project name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: "Please select the priority!" }]}
          >
            <Select>
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select>
              <Option value="Not Started">Not Started</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
          <Form.Item name="progress" label="Progress">
            <Slider min={0} max={100} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[
                  { required: true, message: "Please select the start date!" },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={() => {
                    // Revalidate the end date when start date changes
                    form.validateFields(["endDate"]);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="End Date"
                dependencies={["startDate"]}
                rules={[
                  { required: true, message: "Please select the end date!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const startDate = getFieldValue("startDate");
                      if (!value || !startDate) {
                        return Promise.resolve();
                      }
                      if (
                        value.isAfter(startDate) ||
                        value.isSame(startDate, "day")
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "End date must be same as or after start date!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={(current) => {
                    const startDate = form.getFieldValue("startDate");
                    return (
                      startDate &&
                      current &&
                      current.endOf("day").isBefore(startDate)
                    );
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="assignedPerson" label="Assigned Person">
            <Select>
              {employees.map((employee) => (
                <Option key={employee._id} value={employee._id}>
                  {employee.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="View Project"
        open={isViewModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedProject && (
          <div>
            <p>
              <strong>Project Name:</strong> {selectedProject.name}
            </p>
            <p>
              <strong>Description:</strong> {selectedProject.description}
            </p>
            <p>
              <strong>Priority:</strong> {selectedProject.priority}
            </p>
            <p>
              <strong>Status:</strong> {selectedProject.status}
            </p>
            <p>
              <strong>Progress:</strong> {selectedProject.progress}%
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {format(new Date(selectedProject.startDate), "PP")}
            </p>
            <p>
              <strong>End Date:</strong>{" "}
              {format(new Date(selectedProject.endDate), "PP")}
            </p>
            <p>
              <strong>Assigned Person:</strong>{" "}
              {selectedProject.assignedPerson?.name || "Not Assigned"}
            </p>
          </div>
        )}
      </Modal>

      <Modal
        title="Delete Project"
        open={isDeleteModalVisible}
        onCancel={handleCancel}
        onOk={handleDeleteOk}
      >
        <p>Are you sure you want to delete this project?</p>
      </Modal>
    </div>
  );
};

export default ProjectList;
