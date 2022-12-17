import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd';
import BasicLayout from '../../layout/basic/BasicLayout'
import orderApi from '../../api/order';
import { toastSuccess } from '../../components/Toast';

const STATES = {
    pending: {
        className: 'badge bg-info',
        text: 'Chờ xử lý'
    },
    processing: {
        className: 'badge bg-warning',
        text: 'Đang vận chuyển'
    },
    successful: {
        className: 'badge bg-success',
        text: 'Đã hoàn thành'
    },
    cancelled: {
        className: 'badge bg-danger',
        text: 'Đã hủy'
    }
}

export default function Order() {
    return (
        <BasicLayout ComponentPage={OrderDisplay} />
    )
}

const OrderDisplay = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [isReload, setIsReload] = useState(false);

    useEffect(() => {
        const listOrders = async () => {
            try {
                const { data } = await orderApi.getOrders();
                setOrders(data.orders)
            } catch (e) {
                console.error(e)
            }
        };

        listOrders();
    }, [isReload]);

    const handleProcessing = async order => {
        await orderApi.markAsProcessing(order.order_id);
        toastSuccess("Bàn giao đơn vị vận chuyển thành công");
        setIsReload(!isReload);
    }

    const handleCancelled = async order => {
        await orderApi.markAsCancelled(order.order_id);
        toastSuccess("Hủy đơn thành công");
        setIsReload(!isReload);
    }

    const handleSuccessful = async order => {
        await orderApi.markAsSuccessful(order.order_id);
        toastSuccess("Đơn thành công");
        setIsReload(!isReload);
    };

    const onSearch = (e) => {
        form.resetFields()
    }

    return <main className="app-content">
        <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
                <li className="breadcrumb-item active"><a href="#"><b>Danh sách
                    đơn hàng</b></a></li>
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
                                        <Form.Item label="ID đơn hàng"
                                            name="idProduct">
                                            <Input />
                                        </Form.Item>

                                        <Form.Item label="Tên khách hàng"
                                            name="Tên tài khoản">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button htmlType='submit'>Tìm
                                                Kiếm</Button>
                                        </Form.Item>
                                    </div>
                                </Form>


                            </div>
                        </div>
                        <table className="table table-hover table-bordered"
                            id="sampleTable">
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th>Khách hàng</th>
                                    <th>Giá gốc</th>
                                    <th>Giá sau khi giảm giá</th>
                                    <th>Số lượng sản phẩm</th>
                                    <th>Trạng thái</th>
                                    <th>Tracking đơn hàng</th>
                                    <th>Tính năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (orders.length > 0 ? (orders.map(order => {
                                        return <tr>
                                            <td>{order.order_id}</td>
                                            <td>{order.name}</td>
                                            <td>{order.original_price} đ</td>
                                            <td>{order.sale_price} đ</td>
                                            <td>{order.order_details.length}</td>
                                            <td>
                                                <span className={STATES[order.state].className}>
                                                    {STATES[order.state].text}
                                                </span>
                                            </td>
                                            <td>{order.shipping_link}</td>
                                            <td className="table-td-center">

                                                <button onClick={() => {
                                                    // showModal(e);
                                                    handleProcessing(order)
                                                }}
                                                    className="btn btn-primary btn-sm cloud"
                                                    type="button"
                                                    title="Đã xử lý xong"
                                                    id="show-emp"
                                                    data-toggle="modal"
                                                    data-target="#ModalUP"><i
                                                        className="fas fa-check" />
                                                </button>
                                                <button onClick={() => {
                                                    // showModal(e);
                                                    handleSuccessful(order)
                                                }}
                                                    className="btn btn-success btn-sm edit"
                                                    type="button"
                                                    title="Đơn hoàn thành"
                                                    id="show-emp"
                                                    data-toggle="modal"
                                                    data-target="#ModalUP"><i
                                                        className="fas fa-check" />
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
