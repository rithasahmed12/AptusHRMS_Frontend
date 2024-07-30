import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, message } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  Holiday,
  getAllHolidays,
  createHoliday,
  updateHoliday,
  deleteHoliday,
} from "../../../api/company";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const HolidayList: React.FC = () => {
  const userRole = useSelector(
    (state: any) => state.companyInfo.companyInfo.role
  );
  const isAdminOrHR = userRole === "admin" || userRole === "hr";

  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null);
  const [form] = Form.useForm();

  const validateDates = (_: any, _value: any) => {
    const { startDate, endDate } = form.getFieldsValue();
    if (startDate && endDate && endDate.isBefore(startDate)) {
      return Promise.reject(new Error("End date must be after start date"));
    }
    return Promise.resolve();
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    const response = await getAllHolidays();
    if (response.status === 200) {
      setHolidays(response.data);
    } else {
      toast.error("Failed to fetch holidays");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate: Date) =>
        startDate ? format(new Date(startDate), "dd/MM/yyy") : "",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate: Date) =>
        endDate ? format(new Date(endDate), "dd/MM/yyy") : "",
    },
    {
      title: "Day",
      key: "day",
      render: (_text: string, record: Holiday) => {
        const start = moment(record.startDate);
        const end = moment(record.endDate);
        return end.diff(start, "days") + 1;
      },
    },
    ...(isAdminOrHR
      ? [
          {
            title: "Action",
            key: "action",
            render: (_text: string, record: Holiday) => (
              <span>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => showEditModal(record)}
                >
                  Edit
                </Button>
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => showDeleteModal(record)}
                  danger
                >
                  Delete
                </Button>
              </span>
            ),
          },
        ]
      : []),
  ];

  const showAddModal = () => {
    form.resetFields();
    setIsAddModalVisible(true);
  };

  const showEditModal = (holiday: Holiday) => {
    setEditingHoliday(holiday);
    form.setFieldsValue({
      name: holiday.name,
      startDate: moment(holiday.startDate),
      endDate: moment(holiday.endDate),
    });
    setIsEditModalVisible(true);
  };

  const showDeleteModal = (holiday: Holiday) => {
    setEditingHoliday(holiday);
    setIsDeleteModalVisible(true);
  };

  const handleAdd = async (values: any) => {
    if (values.endDate.isBefore(values.startDate)) {
      message.error('End date must be after start date');
      return;
    }
    const newHoliday = {
      name: values.name,
      startDate: values.startDate.format("YYYY-MM-DD"),
      endDate: values.endDate.format("YYYY-MM-DD"),
    };
    try {
      await createHoliday(newHoliday);
      setIsAddModalVisible(false);
      message.success("Holiday added successfully");
      fetchHolidays();
    } catch (error:any) {
      toast.error(error.message);
    }
  };
  
  const handleEdit = async (values: any) => {
    if (values.endDate.isBefore(values.startDate)) {
      message.error('End date must be after start date');
      return;
    }
    if (editingHoliday) {
      const updatedHoliday = {
        name: values.name,
        startDate: values.startDate.format("YYYY-MM-DD"),
        endDate: values.endDate.format("YYYY-MM-DD"),
      };
      
      try {   
        await updateHoliday(editingHoliday._id, updatedHoliday);
        setIsEditModalVisible(false);
        message.success("Holiday updated successfully");
        fetchHolidays();
      } catch (error:any) {
        toast.error(error.message)
      }
    }
  };

  const handleDelete = async () => {
    if (editingHoliday) {
      try {
        await deleteHoliday(editingHoliday._id);
        setIsDeleteModalVisible(false);
        message.success("Holiday deleted successfully");
        fetchHolidays();
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Holiday List</h1>
      {isAdminOrHR && (
        <Button icon={<PlusOutlined />} onClick={showAddModal} className="mb-4">
          Add Holiday
        </Button>
      )}
      <Table columns={columns} dataSource={holidays} rowKey="id" />

      <Modal
        title="Add Holiday"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAdd} layout="vertical">
          <Form.Item
            name="name"
            label="Holiday Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[
              { required: true, message: "Please select a start date" },
              { validator: validateDates },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[
              { required: true, message: "Please select an end date" },
              { validator: validateDates },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Holiday"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleEdit} layout="vertical">
          <Form.Item
            name="name"
            label="Holiday Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[
              { required: true, message: "Please select a start date" },
              { validator: validateDates },
            ]}
            dependencies={["endDate"]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[
              { required: true, message: "Please select an end date" },
              { validator: validateDates },
            ]}
            dependencies={["startDate"]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete Holiday"
        visible={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>Are you sure you want to delete this holiday?</p>
      </Modal>
    </div>
  );
};

export default HolidayList;
