import React, { useEffect, useState } from 'react';
import BasicLayout from '../../layout/basic/BasicLayout';
import PopUpCreateUser from '../../components/PopupCreateUser';
import { Button, Form, Input, } from 'antd';
import userApi from "../../api/user";
import { toastSuccess } from "../../components/Toast";

export default function ManageCustomer() {
    return (
        <BasicLayout ComponentPage={Customer}/>
    )
}
const Customer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [isCreated, setIsCreated] = useState(false);

    useEffect(() => {
        const listUsers = async () => {
            try {
                const { data } = await userApi.getAllUsers();
                setUsers(data.users)
            } catch (e) {
                console.error(e)
            }
        };

        listUsers();
    }, [isCreated]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (e) => {
        try {
            await userApi.createUser(e)
            toastSuccess("Tạo thành công");
            setIsCreated(true);
            setIsModalOpen(false);
        } catch (e) {
            console.error(e)
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDeleteUser = (e) => {

    };

    const onSearch = async (e) => {
        try {
            const { data } = await userApi.getAllUsers(e.email);
            setUsers(data.users)
        } catch (e) {
            console.error(e)
        }
    };


    return <main className="app-content">
        <PopUpCreateUser isModalOpen={isModalOpen} handleOk={handleOk}
                         handleCancel={handleCancel}/>
        <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
                <li className="breadcrumb-item active"><a href="#"><b>Danh sách
                    khách hàng</b></a></li>
            </ul>
            <div id="clock"/>
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="tile">
                    <div className="tile-body">
                        <div className="row element-button">
                            <div className="col-sm-2">
                                <button className="btn btn-add btn-sm"
                                        onClick={() => {
                                            showModal();
                                        }}>
                                    <i className="fas fa-plus"/>
                                    Tạo mới khách hàng
                                </button>
                            </div>
                            <div className="navbar">
                                <Form
                                    name="basic"
                                    initialValues={{ remember: true }}
                                    autoComplete="off"
                                    onFinish={onSearch}
                                >
                                    <div style={{ display: "flex" }}>
                                        <Form.Item label="Email"
                                                   name="email">
                                            <Input/>
                                        </Form.Item>

                                        <Form.Item>
                                            <Button htmlType='submit'>Tìm
                                                Kiếm</Button>
                                        </Form.Item>
                                    </div>
                                </Form>

                            </div>
                        </div>
                        <table
                            className="table table-hover table-bordered js-copytextarea"
                            cellPadding={0} cellSpacing={0} border={0}
                            id="sampleTable">
                            <thead>
                            <tr>
                                <th width={10}>STT</th>
                                <th>Email</th>
                                <th>Họ và tên</th>
                                <th>Địa chỉ</th>
                                <th>SĐT</th>
                                <th width={20}>Trạng thái</th>
                                <th width={100}>Tính năng</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                (users.length > 0 ? (users.map((user, i) => {
                                    return <tr>
                                        <td>{i + 1}</td>
                                        <td>{user.email}</td>
                                        <td>{user.name}</td>
                                        <td>{user.address}</td>
                                        <td>{user.phone_number}</td>
                                        <td>{user.state || 'active'}</td>
                                        <td className="table-td-center">
                                            <button
                                                className="btn btn-primary btn-sm trash"
                                                type="button" title="Xóa"
                                                onClick={() => {
                                                    handleDeleteUser(user)
                                                }}><i
                                                className="fas fa-trash-alt"/>
                                            </button>
                                            <button onClick={() => {
                                                showModal(user);
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