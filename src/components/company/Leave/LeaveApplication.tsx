import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
  Tooltip,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  getAllLeaveRequests,
  submitLeaveRequest,
  updateLeaveRequestStatus,
  getAllLeaveTypes,
} from "../../../api/company";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { toast } from "react-toastify";

const { RangePicker } = DatePicker;

interface LeaveApplication {
  _id: string;
  userId: {
    _id: string;
    name: string;
    employeeId: string;
  };
  leaveTypeId: {
    _id: string;
    name: string;
  } | null;
  startDate: string;
  endDate: string;
  status: "Pending" | "Approved" | "Rejected";
  reason: string;
}

const LeaveApplicationList: React.FC = () => {
  const { companyInfo } = useSelector((state: any) => state.companyInfo);
  const isAdminOrHR = companyInfo.role === "admin" || companyInfo.role === "hr";

  const [leaveApplications, setLeaveApplications] = useState<
    LeaveApplication[]
  >([]);
  const [leaveTypes, setLeaveTypes] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
const [confirmAction, setConfirmAction] = useState<{
  id: string;
  status: "Approved" | "Rejected";
} | null>(null);
  const [isReasonModalVisible, setIsReasonModalVisible] = useState(false);
  const [editingApplication, _setEditingApplication] =
    useState<LeaveApplication | null>(null);
  const [viewingReason, setViewingReason] = useState<string>("");
  const [form] = Form.useForm();

  useEffect(() => {
    fetchLeaveApplications();
    fetchLeaveTypes();
  }, []);

  const fetchLeaveApplications = async () => {
    try {
      const response = await getAllLeaveRequests();
      if (response.status === 200) {
        setLeaveApplications(response.data);
      } else {
        message.error("Failed to fetch leave applications");
      }
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  const fetchLeaveTypes = async () => {
    try {
      const response = await getAllLeaveTypes();
      if (response.status === 200) {
        setLeaveTypes(response.data);
      } else {
        message.error("Failed to fetch leave types");
      }
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  const columns = [
    { title: "Employee Name", dataIndex: ["userId", "name"], key: "_id" },
    { title: "EmployeeID", dataIndex: ["userId", "employeeId"], key: "_id" },
    {
      title: "Leave Type",
      dataIndex: ["leaveTypeId", "name"],
      key: "_id",
      render: (name: string | undefined) => name || "Other",
    },
    {
      title: "Leave Start Date",
      dataIndex: "startDate",
      key: "_id",
      render:(startDate:Date) => startDate ? format(new Date(startDate),'dd/MM/yyy') : '',
    },
    { 
      title: "Leave End Date",
      dataIndex: "endDate",
      key: "_id",
      render:(endDate:Date) => endDate ? format(new Date(endDate),'dd/MM/yyy') : '',
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "_id",
      render: (status: string) => (
        <span
          style={{
            color:
              status === "Approved"
                ? "green"
                : status === "Rejected"
                ? "red"
                : "orange",
          }}
        >
          {status}
        </span>
      ),
    },
    ...isAdminOrHR ? [{
      title: "Action",
      key: "_id",
      render: (_: any, record: LeaveApplication) => (
        <span>
          {record.status === "Pending" && (
            <>
              <Tooltip title="Approve">
                <Button
                  icon={<CheckOutlined />}
                  onClick={() => handleStatusUpdate(record._id, "Approved")}
                  style={{ marginRight: "5px" }}
                />
              </Tooltip>
              <Tooltip title="Decline">
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => handleStatusUpdate(record._id, "Rejected")}
                  style={{ marginRight: "5px" }}
                />
              </Tooltip>
            </>
          )}
          <Tooltip title="View Reason">
            <Button
              icon={<EyeOutlined />}
              onClick={() => showReasonModal(record.reason)}
            />
          </Tooltip>
        </span>
      ),
    }]:[],
  ];


  const showReasonModal = (reason: string) => {
    setViewingReason(reason);
    setIsReasonModalVisible(true);
  };

  const handleStatusUpdate = (id: string, status: "Approved" | "Rejected") => {
    setConfirmAction({ id, status });
    setIsConfirmModalVisible(true);
  };

  const handleConfirm = async () => {
    if (confirmAction) {
      try {
        const response = await updateLeaveRequestStatus(
          confirmAction.id,
          confirmAction.status
        );
        if (response.status === 200) {
          message.success(
            `Leave application ${confirmAction.status.toLowerCase()} successfully`
          );
          fetchLeaveApplications();
        } else {
          message.error(`Failed to ${confirmAction.status.toLowerCase()} leave application`);
        }
      } catch (error) {
        toast.error(`Failed to ${confirmAction.status.toLowerCase()} leave application`);
      }
    }
    setIsConfirmModalVisible(false);
    setConfirmAction(null);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingApplication) {
        // Update existing application
        const response = await updateLeaveRequestStatus(
          editingApplication._id,
          values.status
        );
        if (response.status === 200) {
          message.success("Leave application updated successfully");
          fetchLeaveApplications();
        } else {
          toast.error("Failed to update leave application");
        }
      } else {
        // Submit new application
        const [startDate, endDate] = values.dateRange;
        const leaveData = {
          leaveTypeId:
            values.leaveTypeId === "other" ? null : values.leaveTypeId,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          reason: values.reason,
          userId: companyInfo.id,
        };
        const response = await submitLeaveRequest(leaveData);
        if (response.status === 201) {
          message.success("Leave application submitted successfully");
          fetchLeaveApplications();
        } else {
          toast.error("Failed to submit leave application");
        }
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Leave Application</h1>
      {/* <Button
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        className="mb-4"
      >
        Apply for Leave
      </Button> */}
      <Table columns={columns} dataSource={leaveApplications} rowKey="_id" />

      <Modal
        title={
          editingApplication ? "Update Leave Application" : "Apply for Leave"
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          {!editingApplication && (
            <>
              <Form.Item
                name="leaveTypeId"
                label="Leave Type"
                rules={[{ required: true }]}
              >
                <Select>
                  {leaveTypes.map((type) => (
                    <Select.Option key={type._id} value={type._id}>
                      {type.name}
                    </Select.Option>
                  ))}
                  <Select.Option key="other" value="other">
                    Other
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="dateRange"
                label="Leave Date Range"
                rules={[{ required: true }]}
              >
                <RangePicker className="w-full" />
              </Form.Item>
              <Form.Item
                name="reason"
                label="Reason"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </>
          )}
          {editingApplication && (
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="Pending">Pending</Select.Option>
                <Select.Option value="Approved">Approved</Select.Option>
                <Select.Option value="Rejected">Rejected</Select.Option>
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>

      <Modal
        title="Leave Application Reason"
        visible={isReasonModalVisible}
        onOk={() => setIsReasonModalVisible(false)}
        onCancel={() => setIsReasonModalVisible(false)}
      >
        <p>{viewingReason}</p>
      </Modal>
      <Modal
  title="Confirm Action"
  visible={isConfirmModalVisible}
  onOk={handleConfirm}
  onCancel={() => {
    setIsConfirmModalVisible(false);
    setConfirmAction(null);
  }}
>
  <p>Are you sure you want to {confirmAction?.status.toLowerCase()} this leave application?</p>
</Modal>
    </div>
  );
};

export default LeaveApplicationList;
