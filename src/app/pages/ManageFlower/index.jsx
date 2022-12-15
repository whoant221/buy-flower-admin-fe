import React, { useEffect, useState } from 'react'
import BasicLayout from '../../layout/basic/BasicLayout'
import { Button, Form, Input, Select, } from 'antd';
import PopupCreateFlower from '../../components/PopupCreateFlower'
import flowerApi from '../../api/flower';
import categoryApi from "../../api/category";
import colorApi from "../../api/color";

export default function ManageFLower() {
    return (
        <BasicLayout ComponentPage={Flower}/>
    )
}

const Flower = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [flowers, setFlowers] = useState([]);
    const [colors, setColors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [reload, setReload] = useState(true);

    useEffect(() => {

        const listFlowers = async() => {
            const { data } = await flowerApi.getAllFlowers();
            setFlowers(data.flowers)

        };

        listFlowers();
    }, [reload]);

    useEffect(() => {
        const listCategories = async() => {
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
        const listColors = async() => {
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

    const onSearch = async(e) => {
        try {
            const { data } = await flowerApi.getAllFlowers(e);
            setFlowers(data.flowers)
        } catch (e) {
            console.error(e)
        }

    };

    return <main className="app-content">
        <PopupCreateFlower isModalOpen={isModalOpen} handleOk={handleOk}
                           handleCancel={handleCancel}/>
        <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
                <li className="breadcrumb-item active"><a href="#"><b>Danh sách
                    sản phẩm</b></a></li>
            </ul>
            <div id="clock"/>
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

                                        }}><i className="fas fa-plus"/>
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
                                            <Input/>
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
                                <th>Trạng thái</th>
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
                                        <td>{e.state || 'active'}</td>
                                        <td className="table-td-center">
                                            <button
                                                className="btn btn-primary btn-sm trash"
                                                type="button" title="Xóa"
                                                onClick={() => {

                                                }}><i
                                                className="fas fa-trash-alt"/>
                                            </button>
                                            <button onClick={() => {
                                                showModal(e);
                                            }}
                                                    className="btn btn-primary btn-sm edit"
                                                    type="button" title="Sửa"
                                                    id="show-emp"
                                                    data-toggle="modal"
                                                    data-target="#ModalUP"><i
                                                className="fas fa-edit"/>
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
