import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { auto } from '@cloudinary/url-gen/qualifiers/quality';
import categoryApi from "../../api/category";
import colorApi from "../../api/color";

const PopupCreateFlower = (props) => {
    const [form] = Form.useForm();
    const [images, setImage] = useState([]);
    const [colors, setColors] = useState([]);
    const [categories, setCategories] = useState([]);
    const { isModalOpen, handleOk, handleCancel } = props

    useEffect(() => {
        const listCategories = async () => {
            try {
                const { data } = await categoryApi.getAllCategories();
                setCategories(data.categories)
            } catch (e) {
                console.error(e)
            }
        };

        listCategories();
    }, []);

    useEffect(() => {
        const listColors = async () => {
            try {
                const { data } = await colorApi.getAllColors();
                setColors(data.colors)
            } catch (e) {
                console.error(e)
            }
        };

        listColors();
    }, []);

    const handleUpload = () => {
        setImage([])
        const myWidget = window.cloudinary.createUploadWidget({
                cloudName: 'dhhryzno4',
                uploadPreset: 'faeuzoyi',
                folder: "sell_flower",
                multiple: true,
            }, (error, result) => {
                if (!error && result && result.event === "success") {
                    setImage((pre =>
                            [...pre, result.info.url]
                    ));
                }
            }
        )
        myWidget.open()
    };

    const onFinishForm = (e) => {
        const value = { ...e, images }
        console.log(value)
        handleOk(value)
        form.resetFields();
    }

    return (
        <>
            <Modal title="Tạo sản phẩm mới" open={isModalOpen}
                   onCancel={handleCancel} footer={null}>
                <Form labelCol={{ span: 6 }}
                      wrapperCol={{ span: 18 }}
                      form={form}
                      onFinish={onFinishForm}
                >
                    <Form.Item
                        label="Tên hoa"
                        name="name"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Loại hoa"
                        name="category">
                        <Select>
                            {
                                (categories.length > 0 ? (categories.map(category => {
                                    return <Select.Option
                                        value={category.id}>{category.title}
                                    </Select.Option>
                                })) : <></>)
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Màu"
                        name="color">
                        <Select>
                            {
                                (colors.length > 0 ? (colors.map(color => {
                                    return <Select.Option
                                        value={color}>{color}
                                    </Select.Option>
                                })) : <></>)
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Giá gốc"
                        name="original_price">
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description">
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Hình"
                        name="images"
                    >
                        {
                            images.length == 0 ?
                                <Button onClick={handleUpload}>Upload</Button> :
                                <div>
                                    <div className='modal_create-product'>
                                        {
                                            images.map(e => {
                                                return <img src={e} style={{
                                                    width: 100,
                                                    height: auto
                                                }}/>
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
                        <Button htmlType='submit'>Ok</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
};
export default PopupCreateFlower;