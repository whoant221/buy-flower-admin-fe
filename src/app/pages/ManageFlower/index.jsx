import React, { useEffect, useState } from 'react'
import BasicLayout from '../../layout/basic/BasicLayout'
import { Button, Form, Input, Select, Space, Modal } from 'antd';
import PopupCreateFlower from '../../components/PopupCreateFlower'
import flowerApi from '../../api/flower';
import categoryApi from "../../api/category";
import colorApi from "../../api/color";
import budApi from "../../api/bud";

import { toastSuccess } from '../../components/Toast';


export default function ManageFLower() {
    return (
        <BasicLayout ComponentPage={Flower} />
    )
}

const Flower = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [flowers, setFlowers] = useState([]);
    const [colors, setColors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [reload, setReload] = useState(true);
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [itemFlower, setItemFlower] = useState()

    useEffect(() => {
        const listFlowers = async () => {
            const { data } = await flowerApi.getAllFlowers();
            setFlowers(data.flowers)
        };

        listFlowers();
    }, [reload]);

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

    const showModal = (e) => {
        setIsModalOpen(true);
    };
    const handleOk = (e) => {
        setReload(prevState => !prevState);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleClear = () => {
        form.resetFields();
    };

    const onSearch = async (e) => {
        try {
            const { data } = await flowerApi.getAllFlowers(e);
            setFlowers(data.flowers)
        } catch (e) {
            console.error(e)
        }

    };

    const ModalEdit = (props) => {
        const { data, openModalEdit, closeModalEdit } = props
        const [form] = Form.useForm();
        const [images, setImage] = useState([]);
        const [buds, setBuds] = useState([]);
        const [detailBuds, setDetailBuds] = useState([]);


        useEffect(() => {
            const listBuds = async () => {
                const { data } = await budApi.getAllBuds();
                setBuds(data.buds)
            };

            listBuds();
        }, []);

        useEffect(() => {
            if (data) {
                form.setFieldsValue({ ...data, bud: data.buds.map(e => e.id) })
                setImage(data.images)
                setDetailBuds(data.buds)
            }
        }, [data]);

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

        const onFinishForm = async (e) => {
            const value = { ...e, images, bud_data: detailBuds, id: data.id };
            await flowerApi.updateFlower(value);
            setReload(prevState => !prevState);
            toastSuccess('cập nhật thành công');
            setOpenModalEdit(false)
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

        return <Modal title="Tạo sản phẩm mới" open={openModalEdit}
            onCancel={closeModalEdit} footer={null} closable={false}>
            <Form labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                form={form}
                onFinish={onFinishForm}
            >
                <Form.Item
                    label="Tên hoa"
                    name="name"
                >
                    <Input />
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
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Giá giảm"
                    name="sale_price">
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="description">
                    <Input />
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
                                            }} alt='' />
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
                            <Input defaultValue={detailBud.name} disabled />
                            <Input defaultValue={detailBud.count} onChange={e => handleChangeCount(e, detailBud)} />
                        </Space.Compact>
                    })) : <></>)
                }

                <div className='modal_btn'>
                    <Button htmlType='submit' type="primary">Ok</Button>
                    <Button onClick={closeModalEdit}>Cancel</Button>
                </div>
            </Form>
        </Modal>
    }

    return <main className="app-content">
        <PopupCreateFlower isModalOpen={isModalOpen} handleOk={handleOk}
            handleCancel={handleCancel} />

        <ModalEdit data={itemFlower} openModalEdit={openModalEdit} closeModalEdit={() => setOpenModalEdit(false)} />
        <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
                <li className="breadcrumb-item active"><a href="#"><b>Danh sách
                    sản phẩm</b></a></li>
            </ul>
            <div id="clock" />
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="tile">
                    <div className="tile-body">
                        <div className="row element-button">
                            <div className="col-sm-2">
                                <Button className="btn btn-add btn-sm"
                                    onClick={() => {
                                        showModal();

                                    }}><i className="fas fa-plus" />
                                    Tạo mới sản phẩm</Button>

                            </div>
                            <div className="navbar">

                                <Form
                                    name="basic"
                                    form={form}
                                    initialValues={{ remember: true }}
                                    onFinish={onSearch}
                                    autoComplete="off"
                                >
                                    <div style={{ display: "flex" }}>
                                        <Form.Item label="Danh mục"
                                            name="category_id">
                                            <Select style={{ width: 200 }}>
                                                {
                                                    (categories.length > 0 ? (categories.map(category => {
                                                        return <Select.Option key={category.id}
                                                            value={category.id}>{category.title}
                                                        </Select.Option>
                                                    })) : <></>)
                                                }
                                            </Select>
                                        </Form.Item>

                                        <Form.Item label="Màu" name="color">
                                            <Select style={{ width: 200 }}>
                                                {
                                                    (colors.length > 0 ? (colors.map(color => {
                                                        return <Select.Option
                                                            key={color}
                                                            value={color}>{color}
                                                        </Select.Option>
                                                    })) : <></>)
                                                }
                                            </Select>
                                        </Form.Item>

                                        <Form.Item label="Tên hoa"
                                            name="name">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button htmlType='submit'>Tìm
                                                Kiếm</Button>
                                            <Button
                                                onClick={handleClear}>Clear</Button>
                                        </Form.Item>
                                    </div>
                                </Form>


                            </div>
                        </div>
                        <table className="table table-hover table-bordered"
                            id="sampleTable">
                            <thead>
                                <tr>
                                    <th>Mã sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá tiền</th>
                                    <th>Mô tả</th>
                                    <th>Danh mục</th>
                                    <th>Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (flowers.length > 0 ? (flowers.map((e, i) => {
                                        return <tr id={e.id}>
                                            <td>{e.id}</td>
                                            <td>{e.name}</td>
                                            <td>{e.original_price}</td>
                                            <td>{e.description}</td>
                                            <td>{e.category}</td>
                                            <td className="table-td-center">
                                                <button onClick={() => {
                                                    setItemFlower(e)
                                                    setOpenModalEdit(true)
                                                }}
                                                    className="btn btn-primary btn-sm edit"
                                                    type="button" title="Sửa"
                                                    id="show-emp"
                                                    data-toggle="modal"
                                                    data-target="#ModalUP"><i
                                                        className="fas fa-edit" />
                                                </button>
                                            </td>
                                        </tr>
                                    })) : <></>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>

}
