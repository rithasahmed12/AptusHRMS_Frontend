import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Space, Typography, Tooltip, Modal, Form, Input, DatePicker, Select, message, Row, Col, InputNumber } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { format } from 'date-fns'; // Import date-fns format function
import { getEmployees } from '../../../api/company';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  progress: number;
  priority: 'Low' | 'Medium' | 'High';
  startDate: string;
  endDate: string;
  assignedPerson: string;
}

interface Employee {
  id: string;
  name: string;
}

const ProjectList: React.FC = () => {
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
        console.log('response:', response);
        setEmployees(response.data);
      }
    } catch (error) {
      message.error("Failed to fetch employees");
    }
  };

  useEffect(() => {
    const dummyProjects: Project[] = [
      {
        id: '1',
        name: 'Project Alpha',
        description: 'A cutting-edge software development project',
        status: 'In Progress',
        progress: 60,
        priority: 'High',
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        assignedPerson: 'John Doe',
      },
      {
        id: '2',
        name: 'Project Beta',
        description: 'A cutting-edge software development project',
        status: 'In Progress',
        progress: 60,
        priority: 'High',
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        assignedPerson: 'John Doe',
      },
    ];
    setProjects(dummyProjects);

    fetchEmployees();
  }, []);

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '20%',
      render: (text: string) => (
        <Tooltip title={text}>
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (status: string) => (
        <Tag color={status === 'Completed' ? 'green' : status === 'In Progress' ? 'blue' : 'orange'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      width: '10%',
      render: (progress: number) => `${progress}%`,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: '10%',
      render: (priority: string) => (
        <Tag color={priority === 'High' ? 'red' : priority === 'Medium' ? 'yellow' : 'green'}>
          {priority}
        </Tag>
      ),
    },
    {
      title: 'Dates',
      key: 'dates',
      width: '15%',
      render: (_: any, record: Project) => (
        <div>
          <div>Start: {record.startDate}</div>
          <div>End: {record.endDate}</div>
        </div>
      ),
    },
    {
      title: 'Assigned',
      dataIndex: 'assignedPerson',
      key: 'assignedPerson',
      width: '10%',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '10%',
      render: (_: any, record: Project) => (
        <Space size="small">
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
          <Tooltip title="Delete">
            <Button 
              type="primary" 
              danger
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(record)}
              size="small"
            />
          </Tooltip>
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
      status: project.status,
      progress: project.progress,
      startDate: project.startDate, // Ensure proper moment formatting if using Ant Design's DatePicker
      endDate: project.endDate,     // Ensure proper moment formatting if using Ant Design's DatePicker
      assignedPerson: project.assignedPerson,
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
    setIsAddModalVisible(true);
  };

  const handleAddOk = (values: Project) => {
    setProjects([...projects, { ...values, id: `${projects.length + 1}` }]);
    setIsAddModalVisible(false);
  };

  const handleEditOk = (values: Project) => {
    const updatedProjects = projects.map(project => 
      project.id === values.id ? { ...values } : project
    );
    setProjects(updatedProjects);
    setIsEditModalVisible(false);
  };

  const handleViewModalOk = () => {
    setIsViewModalVisible(false);
  };

  const handleDeleteOk = () => {
    if (selectedProject) {
      setProjects(projects.filter(project => project.id !== selectedProject.id));
      setIsDeleteModalVisible(false);
      setSelectedProject(null);
    }
  };

  const handleModalCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
    setSelectedProject(null);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Current Projects</Title>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
        Add Project
      </Button>
      <Table 
        columns={columns} 
        dataSource={projects} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }} 
      />

      <Modal
        title="Add New Project"
        open={isAddModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form}
          layout="vertical"
          onFinish={handleAddOk}
        >
          <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true, message: 'Please enter the project name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the project description' }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: 'Please select the project priority' }]}
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
                rules={[{ required: true, message: 'Please select the start date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[{ required: true, message: 'Please select the end date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="assignedPerson"
            label="Assign Employee"
            rules={[{ required: true, message: 'Please select the assigned employee' }]}
          >
            <Select placeholder="Select an Employee">
              {employees.map(employee => (
                <Option key={employee.id} value={employee.id}>
                  {employee.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Project
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Project"
        open={isEditModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form}
          layout="vertical"
          onFinish={handleEditOk}
          initialValues={selectedProject ? selectedProject : undefined}
        >
          <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true, message: 'Please enter the project name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the project description' }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: 'Please select the project priority' }]}
          >
            <Select placeholder="Select project priority">
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the project status' }]}
          >
            <Select placeholder="Select project status">
              <Option value="Not Started">Not Started</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="progress"
            label="Progress"
            rules={[{ required: true, message: 'Please enter the project progress' }]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[{ required: true, message: 'Please select the start date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[{ required: true, message: 'Please select the end date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="assignedPerson"
            label="Assign Employee"
            rules={[{ required: true, message: 'Please select the assigned employee' }]}
          >
            <Select placeholder="Select an Employee">
              {employees.map(employee => (
                <Option key={employee.id} value={employee.id}>
                  {employee.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Project Details"
        open={isViewModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="close" onClick={handleViewModalOk}>
            Close
          </Button>,
        ]}
      >
        {selectedProject && (
          <div>
            <p><strong>Project Name:</strong> {selectedProject.name}</p>
            <p><strong>Description:</strong> {selectedProject.description}</p>
            <p><strong>Status:</strong> {selectedProject.status}</p>
            <p><strong>Progress:</strong> {selectedProject.progress}%</p>
            <p><strong>Priority:</strong> {selectedProject.priority}</p>
            <p><strong>Start Date:</strong> {selectedProject.startDate}</p>
            <p><strong>End Date:</strong> {selectedProject.endDate}</p>
            <p><strong>Assigned Person:</strong> {selectedProject.assignedPerson}</p>
          </div>
        )}
      </Modal>

      <Modal
        title="Confirm Delete"
        visible={isDeleteModalVisible}
        onOk={handleDeleteOk}
        onCancel={handleModalCancel}
        okText="Delete"
        okType="danger"
      >
        <p>Are you sure you want to delete this project?</p>
        {selectedProject && (
          <p><strong>{selectedProject.name}</strong></p>
        )}
      </Modal>
    </div>
  );
};

export default ProjectList;
