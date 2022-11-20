import React from 'react'
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
} from 'antd';
import { useState } from 'react';
import BasicLayout from '../../layout/basic/BasicLayout'
import { useForm } from 'antd/es/form/Form';

export default function Order() {
    return (
        <BasicLayout ComponentPage={OrderDisplay} />
    )
}

const OrderDisplay = () => {
    const data = [{
        id: "1",
        userName: "thien vo",
        idProduct: "KDMW12",
        amount: "1",
        price: "130,000",
        status: 'Đang giao'
    }, {
        id: "2",
        userName: "Võ Tuân",
        idProduct: "KDMW22",
        amount: "3",
        price: "500,000",
        status: 'Đã giao'
    }, {
        id: "3",
        userName: "Hoàng Dương Phi",
        idProduct: "KDMW102",
        amount: "1",
        price: "90,000",
        status: 'Đã hủy'
    }, {
        id: "4",
        userName: "Nguyễn Thanh",
        idProduct: "KDMW09",
        amount: "1",
        price: "190,000",
        status: 'Đang chuẩn bị'
    },]
    const [form] = Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataEdit, setDataEdit] = useState()
    const [fakeData, setFakeData] = useState(data)

    const handDelivered = (e) => {
        e.status = 'Đã giao'
        setFakeData(fakeData.map(item => {
            if (item.id === e.id) {
                return item = e
            }
            return item
        }))
    }

    const handleCancel = (e) => {
        e.status = 'Đã hủy'
        setFakeData(fakeData.map(item => {
            if (item.id === e.id) {
                return item = e
            }
            return item
        }))
    }

    const onSearch = (e) => {

        if (e.idProduct) {
            const search = fakeData.filter(item => {
                if (item.idProduct.toLocaleLowerCase().indexOf(e.idProduct.toLocaleLowerCase()) !== -1) {
                    return item
                }
            })
            setFakeData(search)
        }
        if (e.userName) {
            const search = fakeData.filter(item => {
                if (item.userName.toLocaleLowerCase().indexOf(e.userName.toLocaleLowerCase()) !== -1) {
                    return item
                }
            })
            setFakeData(search)
        }
        if (!e.idProduct && !e.userName) {
            setFakeData(data)
        }
        form.resetFields()
    }

    return <main className="app-content">
        <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
                <li className="breadcrumb-item active"><a href="#"><b>Danh sách đơn hàng</b></a></li>
            </ul>
            <div id="clock" />
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="tile">
                    <div className="tile-body">
                        <div className="row element-button">
                            <div className="navbar">
                                <Form
                                    name="basic"
                                    form={form}
                                    // wrapperCol={{ span: 16 }}
                                    initialValues={{ remember: true }}
                                    onFinish={onSearch}
                                    // onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <div style={{ display: "flex" }}>
                                        <Form.Item label="ID đơn hàng" name="idProduct" >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item label="Tên khách hàng" name="userName" >
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
                                    <th>ID đơn hàng</th>
                                    <th>Khách hàng</th>
                                    <th>Đơn hàng</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền</th>
                                    <th>Tình trạng</th>
                                    <th>Tính năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (fakeData.length > 0 ? (fakeData.map(e => {
                                        return <tr>
                                            <td>{e.id}</td>
                                            <td>{e.userName}</td>
                                            <td>{e.idProduct}</td>
                                            <td>{e.amount}</td>
                                            <td>{e.price}</td>
                                            <td>{e.status}</td>
                                            <td className="table-td-center"><button className="btn btn-primary btn-sm trash" type="button" title="Hủy đơn" onClick={() => {
                                                handleCancel(e)
                                            }}><i class="fas fa-ban" />
                                            </button>
                                                <button onClick={() => {
                                                    // showModal(e);
                                                    handDelivered(e)
                                                }} className="btn btn-primary btn-sm edit" type="button" title="Đã giao" id="show-emp" data-toggle="modal" data-target="#ModalUP"><i className="fas fa-check" />
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
