import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { Form, Input, InputNumber } from 'antd'
import { useEffect } from 'react';
const PopUp = (props) => {
    const [form] = Form.useForm();
    const { isModalOpen, handleOk, handleCancel, status, data } = props

    const onFinishForm = (e) => {
        handleOk({ ...data, ...e })
        form.resetFields();

    }
    const onCancel = () => {
        handleCancel()
    }

    useEffect(() => {
        form.setFieldsValue(data);
    }, [data]);


    return (
        <>
            <Modal title="Tạo mới khách hàng" open={isModalOpen} onCancel={onCancel} footer={null}>
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinishForm}
                >
                    <Form.Item
                        label="UserName"
                        name="username"
                        rules={[{ required: true, message: 'vui lòng nhập tên đăng nhập!' }]}

                    >
                        <Input disabled={status} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                    // rules={[{ required: true, message: 'vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'vui lòng nhập tên!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'vui lòng nhập số điện thoại!' }]}
                    >
                        <Input type='number' step={false} />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'vui lòng nhập địa chỉ!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <div className='modal_btn'>
                        <Button htmlType='submit' >Ok</Button>
                        <Button onClick={onCancel}>Cancel</Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
};
export default PopUp;