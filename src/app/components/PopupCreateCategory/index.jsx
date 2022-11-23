import { Button, Form, Input, Modal } from 'antd';
import React from 'react';

const PopUpCreateCategory = (props) => {
    const [form] = Form.useForm();
    const {
        isModalOpen,
        handleOk,
        handleCancel
    } = props

    const onFinishForm = (e) => {
        handleOk(e);

    };

    const onCancel = () => {
        handleCancel()
    };

    return (
        <>
            <Modal title="Tạo mới danh mục" open={isModalOpen}
                   onCancel={onCancel} footer={null}>
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinishForm}
                >
                    <Form.Item
                        label="Tiều đề"
                        name="title"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập tiêu đề !'
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
export default PopUpCreateCategory;