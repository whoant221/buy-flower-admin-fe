import { Button, Form, Input, Modal } from 'antd';
import React from 'react';

const PopUpCreateUser = (props) => {
    const [form] = Form.useForm();
    const {
        isModalOpen,
        handleOk,
        handleCancel,
        status
    } = props

    const onFinishForm = (e) => {
        handleOk(e);

    };

    const onCancel = () => {
        handleCancel()
    };

    return (
        <>
            <Modal title="Tạo mới khách hàng" open={isModalOpen}
                   onCancel={onCancel} footer={null}>
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinishForm}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập email !'
                        }]}>
                        <Input disabled={status}/>
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password">
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu xác nhận"
                        name="password_confirmation">
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        label="Tên"
                        name="name"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập tên !'
                        }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone_number"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập số điện thoại !'
                        }]}>
                        <Input type='text' step={false}/>
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập địa chỉ!'
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <div className='modal_btn'>
                        <Button htmlType='submit'>Ok</Button>
                        <Button onClick={onCancel}>Cancel</Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
};
export default PopUpCreateUser;