import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { Form, Input, Select, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { auto } from '@cloudinary/url-gen/qualifiers/quality';

const PopUpCreateProduct = (props) => {
    const [form] = Form.useForm();
    const [valueCreate, setValueCreate] = useState()
    const [images, setImage] = useState([])
    const { isModalOpen, handleOk, handleCancel, status, data } = props


    const handleUpload = () => {
        setImage([])
        var myWidget = window.cloudinary.createUploadWidget({
            cloudName: 'dhhryzno4',
            uploadPreset: 'faeuzoyi',
            folder: "sell_flower",
            multiple: true,
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                setImage((pre =>
                    [...pre, result.info.url]
                ))
                // return setValueCreate(result.url)
            }
        }
        )
        myWidget.open()
    }

    const onFinishForm = (e) => {
        console.log(e);
        const value = { ...data, ...e, images }
        console.log(value)
        handleOk(value)
        form.resetFields();
    }

    useEffect(() => {
        form.setFieldsValue(data);
    }, [data]);
    return (
        <>
            <Modal title="Tạo sản phẩm mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    form={form}
                    onFinish={onFinishForm}
                >
                    <Form.Item
                        label="Tên hoa"
                        name="name"
                    >
                        <Input disabled={status} />
                    </Form.Item>

                    <Form.Item
                        label="Loại hoa"
                        name="category"
                    >
                        <Select >
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Màu"
                        name="color"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Giá gốc"
                        name="originalPrice"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng"
                        name="amount"
                    >
                        <Input type='number' />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Hình"
                        name="images"
                    >
                        {
                            images.length == 0 ? <Button onClick={handleUpload}>Upload</Button> :
                                <div>
                                    <div className='modal_create-product'>
                                        {
                                            images.map(e => {
                                                return <img src={e} style={{ width: 100, height: auto }} />

                                            })
                                        }
                                    </div>
                                    <Button onClick={() => {
                                        setImage([])
                                    }}>
                                        Hủy
                                    </Button>
                                </div>

                        }
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