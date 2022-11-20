import React from 'react'
import BasicLayout from '../../layout/basic/BasicLayout'
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
} from 'antd';
import { useState } from 'react';
import PopUpCreateProduct from '../../components/modal/popup/popUpCreateProduct'

export default function Product() {
    return (
        <BasicLayout ComponentPage={ProductDisplay} />
    )
}

const ProductDisplay = () => {
    const data = [{
        id: "1",
        name: "hoa hồng",
        amount: 40,
        originalPrice: "100.023",
        color: "xanh",
        category: "hoa sinh nhật",
        description: "thẻ thanh toán cho partner"
    }, {
        id: "2",
        name: "hoa đỏ",
        amount: 4,
        color: "đỏ",
        originalPrice: "1.100.023",
        category: "hoa lạ lẫm",
        description: "thẻ thanh toán cho partner"
    }, {
        id: "3",
        name: "hoa cúc",
        amount: 40,
        color: "tím",
        originalPrice: 100.023,
        category: "demo",
        description: "thẻ thanh toán cho partner"
    }, {
        id: "4",
        name: "hoa tulip",
        amount: 40,
        color: "demo",
        originalPrice: 100.023,
        category: "hoa đẹp",
        description: "thẻ thanh toán cho partner"
    }]

    const [fakeData, setFakeData] = useState(data)
    const [dataEdit, setDataEdit] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editUser, setEditUser] = useState(false)
    const showModal = (e) => {
        if (e) {
            setDataEdit(e)
        }
        setIsModalOpen(true);
    };
    const handleOk = (e) => {
        const data = { ...e, id: fakeData.length + 1 }
        if (editUser) {
            setFakeData(fakeData.map(item => {
                if (item.id === e.id) {
                    return item = e
                }
                return item
            }))
            setIsModalOpen(false);
        } else {
            setFakeData(pre => [...pre, { ...data }])
            setIsModalOpen(false);
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setDataEdit({ username: '', password: '', name: '', address: '', phoneNumber: '' })
        setIsModalOpen(false);
    };
    const handleDeleteUser = (e) => {
        let index = 0
        fakeData.map((item, key) => {
            if (item.id === e.id) {
                index = key
            }
            return item
        })
        fakeData.splice(index, 1);

        setFakeData(per => [...per])
    }

    const onSearch = (e) => {
        console.log(e)
        if (e.category) {
            const search = fakeData.filter(item => {
                if (item.category.toLocaleLowerCase().indexOf(e.category.toLocaleLowerCase()) !== -1) {
                    return item
                }
            })
            setFakeData(search)
        }
        if (e.color) {
            const search = fakeData.filter(item => {
                if (item.color.toLocaleLowerCase().indexOf(e.color.toLocaleLowerCase()) !== -1) {
                    return item
                }
            })
            setFakeData(search)
        }
        if (e.nameFlower) {
            const search = fakeData.filter(item => {
                if (item.name.toLocaleLowerCase().indexOf(e.nameFlower.toLocaleLowerCase()) !== -1) {
                    return item
                }
            })
            setFakeData(search)
        }
        if (!e.category && !e.color && e.nameFlower) {
            setFakeData(data)
        }
    }
    return <main className="app-content">
        <PopUpCreateProduct isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} status={edit} data={dataEdit ? dataEdit : {}} />
        <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
                <li className="breadcrumb-item active"><a href="#"><b>Danh sách sản phẩm</b></a></li>
            </ul>
            <div id="clock" />
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="tile">
                    <div className="tile-body">
                        <div className="row element-button">
                            <div className="col-sm-2" >
                                <Button className="btn btn-add btn-sm" onClick={() => {
                                    setEdit(false)
                                    showModal();

                                }}><i className="fas fa-plus" />
                                    Tạo mới sản phẩm</Button>

                            </div>
                            <div className="navbar">

                                <Form
                                    name="basic"
                                    // labelCol={{ span: 5 }}
                                    // wrapperCol={{ span: 16 }}
                                    initialValues={{ remember: true }}
                                    onFinish={onSearch}
                                    // onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <div style={{ display: "flex" }}>
                                        <Form.Item label="Loại Hoa" name="category">
                                            <Select style={{ width: 200 }}>
                                                <Select.Option value=""></Select.Option>
                                                <Select.Option value="hoa sinh nhật">hoa sinh nhật</Select.Option>
                                                <Select.Option value="demo">Demo</Select.Option>
                                                <Select.Option value="demo">Demo</Select.Option>
                                                <Select.Option value="demo">Demo</Select.Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item label="Màu" name="color">
                                            <Select style={{ width: 200 }}>
                                                <Select.Option value=""></Select.Option>
                                                <Select.Option value="demo">Demo</Select.Option>
                                                <Select.Option value="demo">Demo</Select.Option>
                                                <Select.Option value="demo">Demo</Select.Option>
                                                <Select.Option value="demo">Demo</Select.Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item label="Tên hoa" name="nameFlower">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item >
                                            <Button htmlType='submit'>Tìm Kiếm</Button>
                                        </Form.Item>
                                    </div>
                                </Form>



                            </div>
                        </div>
                        <table className="table table-hover table-bordered" id="sampleTable">
                            <thead>
                                <tr>
                                    <th>Mã sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Giá tiền</th>
                                    <th>Danh mục</th>
                                    <th>Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (fakeData.length > 0 ? (fakeData.map(e => {
                                        return <tr>
                                            <td>{e.id}</td>
                                            <td>{e.name}</td>
                                            <td>{e.amount}</td>
                                            <td>{e.originalPrice}</td>
                                            <td>{e.category}</td>
                                            <td className="table-td-center"><button className="btn btn-primary btn-sm trash" type="button" title="Xóa" onClick={() => {
                                                handleDeleteUser(e)
                                            }}><i className="fas fa-trash-alt" />
                                            </button>
                                                <button onClick={() => {
                                                    showModal(e);
                                                    setEditUser(true)
                                                }} className="btn btn-primary btn-sm edit" type="button" title="Sửa" id="show-emp" data-toggle="modal" data-target="#ModalUP"><i className="fas fa-edit" />
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