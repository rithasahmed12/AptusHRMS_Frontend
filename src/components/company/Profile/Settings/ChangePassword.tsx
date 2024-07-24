import { Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { profileChangePassword } from '../../../../api/company';
import { useSelector } from 'react-redux';

interface ChangePassword {
    currentPassword:string;
    newPassword:string;
    confirmPassword:string
}

const ChangePassword = () => {
  const userId = useSelector((state:any)=> state.companyInfo.companyInfo.id)
  const [form] = Form.useForm();

  const onFinish = async (values:ChangePassword) => {
    try {
      console.log('Change password values:', values);
      
      await profileChangePassword(userId,values);
      
      message.success('Password changed successfully!');
      form.resetFields();
    } catch (error:any) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <Form
        form={form}
        name="change_password"
        onFinish={onFinish}
        layout="vertical"
        className="max-w-md"
      >
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[
            {
              required: true,
              message: 'Please input your current password!',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: 'Please input your new password!',
            },
            {
              min: 8,
              message: 'Password must be at least 8 characters long',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm New Password"
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: 'Please confirm your new password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;