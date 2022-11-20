import { Button, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, InputNumber } from 'antd'

const PopUpCreateProduct = (props) => {
    const [form] = Form.useForm();
    const { isModalOpen, handleOk, handleCancel, status, data } = props

    const onFinishForm = (e) => {
        const value = { ...e, ...data, status: true, remainAmount: e.limit, effectiveAt: e.effectiveAt._d.toLocaleDateString(), expirationAt: e.expirationAt._d.toLocaleDateString() }
        handleOk(value)
        form.resetFields();
    }

    useEffect(() => {
        form.setFieldsValue(data);
    }, [data]);
    return (
        <>
            <Modal title="Tạo sản voucher mới" open={isModalOpen} footer={null} onCancel={handleCancel}>
                <Form labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinishForm}
                    form={form}>
                    <Form.Item
                        label="Mã voucher"
                        name="code"
                    >
                        <Input disabled={status} />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng"
                        name="limit"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Nội dung"
                        name="content"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Thời hạn bắt đầu"
                        name="effectiveAt"
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        label="Thời hạn kết thúc"
                        name="expirationAt"
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        label="Số % giảm giá"
                        name="discount"
                    >
                        <InputNumber />
                    </Form.Item>

                    <div className='modal_btn'>
                        <Button htmlType='submit' >Ok</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
};
export default PopUpCreateProduct;