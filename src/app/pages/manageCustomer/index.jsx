import React from 'react'
import BasicLayout from '../../layout/basic/BasicLayout'
import PopUp from '../../components/modal/popup/popUp'
import { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
} from 'antd';
import { cloudinary } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { useEffect } from 'react';

export default function Custommer() {
    return (
        <BasicLayout ComponentPage={Customer} />
    )
}
const Customer = () => {
    const data = [
        {
            username: "phu",
            password: "12312312",
            stt: 0,
            name: "Triệu Thanh Phú",
            address: "Ngõ 102 Trường Chinh",
            phoneNumber: '092456168'
        },
        {
            username: "cam",
            password: "12312312",
            stt: 1,
            name: "Nguyễn Thị Ngọc Cẩm",
            address: "42 Đường Phạm Hùng Phường Mễ Trì, Từ Liêm, Hà Nội",
            phoneNumber: '094675968'
        },
        {
            username: "phuc",
            password: "12312312",
            stt: 2,
            name: "	Đặng Hoàng Phúc",
            address: "	1 P.Thái Hà, Trung Liệt, Đống Đa, Hà Nội",
            phoneNumber: '094573468'
        },
        {
            username: "yen",
            password: "12312312",
            stt: 3,
            name: "Nguyễn Thị Mỹ Yến",
            address: "	140 P. Vũ Thạnh, Chợ Dừa, Đống Đa, Hà Nội",
            phoneNumber: '09125616'
        },
        {
            username: "ngoc",
            password: "12312312",
            stt: 4,
            name: "Phạm Thị Ngọc",
            address: "Ngõ 2 Phố Nam Dư, Lĩnh Nam, Hoàng Mai, Hà Nội",
            phoneNumber: '092475677'
        }
    ]
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataEdit, setDataEdit] = useState()
    const [editUser, setEditUser] = useState(false)
    const [fakeData, setFakeData] = useState(data)

    const showModal = (e) => {
        if (e) {
            setDataEdit(e)
        }
        setIsModalOpen(true);
    };


    const handleOk = (e) => {
        const data = { ...e, stt: fakeData.length + 1 }
        if (editUser) {
            setFakeData(fakeData.map(item => {
                if (item.username === data.username) {
                    return item = e
                }
                return item
            }))
            setIsModalOpen(false);
        } else {
            setFakeData(pre => [...pre, { ...data }])
            setIsModalOpen(false);
        }
    };


    const handleCancel = () => {
        setDataEdit({ username: '', password: '', name: '', address: '', phoneNumber: '' })
        setIsModalOpen(false);
    };
    const handleDeleteUser = (e) => {
        let index = 0
        fakeData.map((item, key) => {
            if (item.stt === e.stt) {
                index = key
            }
            return item
        })
        fakeData.splice(index, 1);

        setFakeData(per => [...per])
    }

    const onSearch = (e) => {
        if (e.name) {
            const search = fakeData.filter(item => {
                if (item.name.toLocaleLowerCase().indexOf(e.name.toLocaleLowerCase()) !== -1) {
                    return item
                }
            })
            setFakeData(search)
        }
        if (e.address) {
            const search = fakeData.filter(item => {
                if (item.address.toLocaleLowerCase().indexOf(e.address.toLocaleLowerCase()) !== -1) {
                    return item
                }
            })
            setFakeData(search)
        }
        if (!e.name && !e.address) {
            setFakeData(data)
        }
    }



    return <main className="app-content">
        <PopUp isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} status={editUser} data={dataEdit ? dataEdit : {}} />
        <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
                <li className="breadcrumb-item active"><a href="#"><b>Danh sách khách hàng</b></a></li>
            </ul>
            <div id="clock" />
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
                                        setEditUser(false)
                                    }}>
                                    <i className="fas fa-plus" />
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
                                        <Form.Item label="Tên khách hàng" name="name">
                                            <Input />
                                        </Form.Item>

                                        <Form.Item label="Địa chỉ" name="address">
                                            <Input />
                                        </Form.Item>


                                        <Form.Item>
                                            <Button htmlType='submit'>Tìm Kiếm</Button>
                                        </Form.Item>
                                    </div>
                                </Form>

                            </div>
                        </div>
                        <table className="table table-hover table-bordered js-copytextarea" cellPadding={0} cellSpacing={0} border={0} id="sampleTable">
                            <thead>
                                <tr>
                                    <th width={70}>STT</th>
                                    <th width={200}>Họ và tên</th>
                                    <th >Địa chỉ</th>
                                    <th width={150}>SĐT</th>
                                    <th width={100}>Tính năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (fakeData.length > 0 ? (fakeData.map(e => {
                                        return <tr>
                                            <td>{e.stt}</td>
                                            <td>{e.name}</td>
                                            <td>{e.address}</td>
                                            <td>{e.phoneNumber}</td>
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
                            </tbody></table>
                    </div></div></div></div></main>

}