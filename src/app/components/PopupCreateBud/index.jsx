import { Button, Form, Input, Modal } from 'antd';
import React from 'react';

const PopUpCreateBud = (props) => {
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
            <Modal title="Tạo mới nụ hoa" open={isModalOpen}
                onCancel={onCancel} footer={null} closable={false}>
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinishForm}
                >
                    <Form.Item
                        label="Tên"
                        name="name"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập tên !'
                        }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng"
                        name="count"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập số lượng !'
                        }]}
                    >
                        <Input />
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
export default PopUpCreateBud;