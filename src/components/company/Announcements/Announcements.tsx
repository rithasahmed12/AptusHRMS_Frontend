import React, { useEffect, useState } from "react";
import { ConfigProvider, Modal, Form, Input, Button, Tooltip, Spin } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import {
  AnnoucementmarkAsRead,
  addAnnouncements,
  deleteAnnouncement,
  editAnnouncement,
  getAnnouncements,
} from "../../../api/company";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useSelector } from "react-redux";

interface Annoucement {
  _id: string;
  title: string;
  details: string;
  author: string;
  read: boolean;
  createdAt: Date;
}

const Announcements: React.FC = () => {
  const userRole = useSelector((state: any) => state.companyInfo.companyInfo.role);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingAnnouncement, setDeletingAnnouncement] =
    useState<Annoucement | null>(null);
  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Annoucement | null>(null);
  const [announcementDetails, setAnnouncementDetails] = useState<any | null>(
    null
  );
  const [announcements, setAnnouncements] = useState<any>([]);
  const [form] = Form.useForm();

  const fetchAnnouncements = async () => {
    setIsLoading(true);
    try {
      const response = await getAnnouncements();
      console.log(response);
      setAnnouncements(response?.data || []);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
      toast.error("Failed to fetch announcements");
      setAnnouncements([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const showAddModal = () => {
    setIsAddModalOpen(true);
  };

  const showViewModal = (announcement: any) => {
    setAnnouncementDetails(announcement);
    setIsViewModalOpen(true);
  };

  const handleAddOk = async () => {
    try {
      const values = await form.validateFields();
      const companyInfo = JSON.parse(
        localStorage.getItem("companyInfo") || "{}"
      );
      const body = {
        ...values,
        author: companyInfo.email,
      };

      const response = await addAnnouncements(body);
        setAnnouncements([response.data.announcement, ...announcements]);
        setIsAddModalOpen(false);
        form.resetFields();
        toast.success(response.data.message);
      
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
  };

  const handleViewOk = () => {
    setIsViewModalOpen(false);
  };

  const handleViewCancel = () => {
    setIsViewModalOpen(false);
    setAnnouncementDetails(null);
  };

  const showEditModal = (announcement: Annoucement) => {
    setEditingAnnouncement(announcement);
    form.setFieldsValue({
      title: announcement.title,
      details: announcement.details,
    });
    setIsEditModalOpen(true);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditingAnnouncement(null);
    form.resetFields();
  };

  const showDeleteModal = (announcement: Annoucement) => {
    setDeletingAnnouncement(announcement);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOk = async () => {
    try {
      if (deletingAnnouncement) {
        // Assuming you have a deleteAnnouncement API function
         await deleteAnnouncement(deletingAnnouncement._id);

          const updatedAnnouncements = announcements.filter(
            (a: Annoucement) => a._id !== deletingAnnouncement._id
          );
          setAnnouncements(updatedAnnouncements);
          setIsDeleteModalOpen(false);
          setDeletingAnnouncement(null);
          toast.success("Announcement deleted successfully");
        
      }
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeletingAnnouncement(null);
  };

  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();

      const companyInfo = JSON.parse(
        localStorage.getItem("companyInfo") || "{}"
      );
      const body = {
        ...values,
        author: companyInfo.email,
      };

      await editAnnouncement(editingAnnouncement?._id, body);

        const updatedAnnouncements = announcements.map((a: Annoucement) =>
          a._id === editingAnnouncement?._id ? { ...a, ...values } : a
        );
        setAnnouncements(updatedAnnouncements);
        setIsEditModalOpen(false);
        setEditingAnnouncement(null);
        form.resetFields();
        toast.success("Announcement updated successfully");
      
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await AnnoucementmarkAsRead(id);
      console.log(response);

      if (response.status === 200) {
        const updatedAnnouncements = announcements.map(
          (announcement: Annoucement) =>
            announcement._id === id
              ? { ...announcement, read: true }
              : announcement
        );
        setAnnouncements(updatedAnnouncements);
        handleViewCancel();
      }
    } catch (error) {
      toast.error("Failed to mark!");
    }
  };

  const modalTheme = {
    token: {
      colorPrimary: "#000000",
    },
  };

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split("");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join("") + "...";
    }
    return text;
  };

  return (
    <div className="p-4 flex-1">
     <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Announcements</h1>
        {(userRole === 'admin' || userRole === 'hr') && (
          <ConfigProvider theme={modalTheme}>
            <Button
              className="bg-black text-white rounded-md px-3 py-1 hover:bg-slate-700 duration-300"
              onClick={showAddModal}
            >
              Add Announcement
            </Button>
          </ConfigProvider>
        )}
      </div>

      <div className="bg-white relative p-6 rounded-md shadow-lg mb-6">
        <h2 className="text-xl font-medium mb-4">Latest Announcements</h2>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
          <Spin size="large" tip="Loading announcements..." />
        </div>
        ) : announcements.length > 0 ? (
          <div className="space-y-4">
            {announcements.map((announcement: Annoucement) => (
              <div
                key={announcement._id}
                className={`p-4 rounded-md ${
                  announcement.read ? "bg-gray-100" : "bg-blue-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{announcement.title}</h3>
                  <div className="flex space-x-2">
                    {(userRole === 'admin' || userRole === 'hr') && (
                      <>
                        <Tooltip title="Edit">
                          <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => showEditModal(announcement)}
                          >
                            Edit
                          </Button>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => showDeleteModal(announcement)}
                          >
                            Delete
                          </Button>
                        </Tooltip>
                      </>
                    )}
                    <Tooltip title="View More">
                      <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => showViewModal(announcement)}
                      >
                        View More
                      </Button>
                    </Tooltip>
                    {!announcement.read && (
                  <Button
                    type="link"
                    onClick={() => handleMarkAsRead(announcement._id)}
                  >
                    Mark as Read
                  </Button>
                )}
                  </div>
                </div>
                <p className="text-gray-700">
                  {truncateText(announcement.details, 40)}
                </p>
                <p className="text-gray-500 text-sm">
                  Posted on: {format(new Date(announcement.createdAt), "PPpp")}
                </p>
           
              </div>
            ))}
          </div>
        ) : (
          <p>No announcements available.</p>
        )}
      </div>

      <ConfigProvider theme={modalTheme}>
        {/* Modal for adding announcements */}
        <Modal
          title="Add Announcement"
          open={isAddModalOpen}
          onOk={handleAddOk}
          onCancel={handleAddCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Details"
              name="details"
              rules={[{ required: true, message: "Please input the details!" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Edit Announcement"
          open={isEditModalOpen}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Details"
              name="details"
              rules={[{ required: true, message: "Please input the details!" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal for viewing announcement details */}
        <Modal
          title={announcementDetails?.title || "Announcement Details"}
          open={isViewModalOpen}
          onOk={handleViewOk}
          onCancel={handleViewCancel}
        >
          {announcementDetails && (
            <div>
              <p className="mb-5">{announcementDetails.details}</p>
              <p className="mb-2">
                Posted on:{" "}
                {format(new Date(announcementDetails.createdAt), "PPpp")}
              </p>
              {!announcementDetails.read && (
                <Button
                  type="primary"
                  onClick={() => handleMarkAsRead(announcementDetails._id)}
                >
                  Mark as Read
                </Button>
              )}
            </div>
          )}
        </Modal>
        {/* Modal for delete confirmation */}
        <Modal
          title="Delete Announcement"
          open={isDeleteModalOpen}
          onOk={handleDeleteOk}
          onCancel={handleDeleteCancel}
          okText="Delete"
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to delete this announcement?</p>
          {deletingAnnouncement && (
            <p>
              <strong>Title:</strong> {deletingAnnouncement.title}
            </p>
          )}
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default Announcements;
