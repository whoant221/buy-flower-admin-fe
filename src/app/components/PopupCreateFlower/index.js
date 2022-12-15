import { Button, Space, Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import categoryApi from "../../api/category";
import colorApi from "../../api/color";
import budApi from "../../api/bud";
import flowerApi from "../../api/flower";
import { toastSuccess } from '../Toast';


const PopupCreateFlower = (props) => {
        const [form] = Form.useForm();
        const [images, setImage] = useState([]);
        const [colors, setColors] = useState([]);
        const [categories, setCategories] = useState([]);
        const [buds, setBuds] = useState([]);
        const [detailBuds, setDetailBuds] = useState([]);

        const { isModalOpen, handleCancel, handleOk } = props

        useEffect(() => {
            const listCategories = async() => {
                const { data } = await categoryApi.getAllCategories();
                setCategories(data.categories)
            };

            listCategories();
        }, []);

        useEffect(() => {
            const listColors = async() => {
                const { data } = await colorApi.getAllColors();
                setColors(data.colors)
            };

            listColors();
        }, []);

        useEffect(() => {
            const listBuds = async() => {
                const { data } = await budApi.getAllBuds();
                setBuds(data.buds)
            };

            listBuds();
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

        const onFinishForm = async(e) => {
            const value = { ...e, images, bud_data: detailBuds };
            await flowerApi.createFlower(value);
            toastSuccess('Thêm dữ liệu thành công');
            handleOk();
            setDetailBuds([]);
            form.resetFields();
        };

        const handleChangeBud = (e) => {
            const data = e.map(id => {
                const currentBud = buds.find(bud => bud.id === id);
                return {
                    ...currentBud,
                    count: 1
                }
            });

            setDetailBuds(data);
        };

        const handleChangeCount = (event, bud) => {
            const newDetailBud = [...detailBuds];
            const index = newDetailBud.findIndex(detailBud => detailBud.id === bud.id);
            newDetailBud[index].count = Number(event.target.value);
            setDetailBuds(newDetailBud);
        };

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
                            name="category_ids">
                            <Select mode="multiple">
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
                            label="Giá giảm"
                            name="sale_price">
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Mô tả"
                            name="description">
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Hình"
                            name="images">
                            {
                                images.length === 0 ?
                                    <Button onClick={handleUpload}>Upload</Button> :
                                    <div>
                                        <div className='modal_create-product'>
                                            {
                                                images.map(e => {
                                                    return <img src={e} style={{
                                                        width: 100,
                                                        height: 100
                                                    }} alt=''/>
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
                        <Form.Item
                            label="Búp hoa"
                            name="bud">
                            <Select mode="multiple" onChange={handleChangeBud}>
                                {
                                    (buds.length > 0 ? (buds.map(bud => {
                                        return <Select.Option
                                            value={bud.id}>{bud.name}
                                        </Select.Option>
                                    })) : <></>)
                                }
                            </Select>
                        </Form.Item>
                        {
                            (detailBuds.length > 0 ? (detailBuds.map(detailBud => {
                                return <Space.Compact key={detailBud.id} block style={{ 'margin-bottom': '24px' }}>
                                    <Input defaultValue={detailBud.name} disabled/>
                                    <Input defaultValue={detailBud.count} onChange={e => handleChangeCount(e, detailBud)}/>
                                </Space.Compact>
                            })) : <></>)
                        }

                        <div className='modal_btn'>
                            <Button htmlType='submit' type="primary">Ok</Button>
                            <Button onClick={handleCancel}>Cancel</Button>
                        </div>
                    </Form>
                </Modal>
            </>
        );
    }
;
export default PopupCreateFlower;
