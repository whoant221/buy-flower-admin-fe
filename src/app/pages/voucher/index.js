import React from 'react'
import BasicLayout from '../../layout/basic/BasicLayout'
import { useState } from 'react';
import PopUp from '../../components/modal/popup/popUpCreateVoucher'
import * as moment from 'moment';

export default function Voucher() {
    return (
        <BasicLayout ComponentPage={VoucherDisplay} />
    )
}

const VoucherDisplay = () => {
    const data = [{
        id: '1',
        code: 'thiennnn',
        limit: 20,
        remainAmount: 10,
        content: "voucher giảm 10% đơn hàng",
        discount: "10%",
        effectiveAt: '11/20/2022',
        expirationAt: '11/30/2022',
        status: true
    },
    {
        id: '2',
        code: 'giam12',
        limit: 50,
        remainAmount: 30,
        content: "voucher giảm 12% đơn hàng trên 300k",
        discount: "12%",
        effectiveAt: '11/01/2022',
        expirationAt: '11/21/2022',
        status: true
    },
    {
        id: '3',
        code: 'tuantaovoucher',
        limit: 2,
        remainAmount: 1,
        content: "voucher giảm 5% đơn hàng",
        discount: "5%",
        effectiveAt: '08/02/2022',
        expirationAt: '09/30/2022',
        status: false
    },
    {
        id: '4',
        code: 'thie1nnnn',
        limit: 28,
        remainAmount: 19,
        content: "voucher giảm 100% đơn hàng",
        discount: "100%",
        effectiveAt: '01/20/2022',
        expirationAt: '02/30/2022',
        status: false
    }]

    const [fakeData, setFakeData] = useState(data)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUser, setEditUser] = useState(false)
    const [dataEdit, setDataEdit] = useState()

    const showModal = (e) => {
        if (e) {
            setDataEdit({ ...e, effectiveAt: moment(e.effectiveAt), expirationAt: moment(e.expirationAt) })
        }
        setIsModalOpen(true);
    };
    const handleOk = (e) => {
        const data = { ...e, id: fakeData.length + 1 }
        if (editUser) {
            //call api sua user
            setFakeData(fakeData.map(item => {
                if (item.code === data.code) {
                    return item = e
                }
                return item
            }))
            setIsModalOpen(false);
        } else {
            //call api tao
            setFakeData(pre => [...pre, { ...data }])
            setIsModalOpen(false);
        }

        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setDataEdit({ code: '', limit: '', remainAmount: '', content: '', discount: '' })
        setIsModalOpen(false);
    };
    const handleDeleteUser = () => {

    }
    return <main className="app-content">
        <PopUp isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} status={editUser} data={dataEdit ? dataEdit : {}} />
        <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
                <li className="breadcrumb-item active"><a href="#"><b>Danh sách voucher</b></a></li>
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
                                    Tạo mới voucher
                                </button>
                            </div>
                        </div>
                        <table className="table table-hover table-bordered js-copytextarea" cellPadding={0} cellSpacing={0} border={0} id="sampleTable">
                            <thead>
                                <tr>
                                    <th width={30}>ID</th>
                                    <th width={70}>Mã voucher</th>
                                    <th width={50}>Còn lại</th>
                                    <th width={200}>Nội dung</th>
                                    <th width={100}>Hiệu lực đến</th>
                                    <th width={70}>% giảm</th>
                                    <th width={70}>Tính năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fakeData.length > 0 ? fakeData.map(e => {
                                    return <tr>
                                        <td>{e.id}</td>
                                        <td>{e.code}</td>
                                        <td>{e.remainAmount}</td>
                                        <td>{e.content}</td>
                                        <td>{e.expirationAt}</td>
                                        <td>{e.discount}</td>
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
                                }) : <></>}


                            </tbody></table>
                    </div></div></div></div></main>

}
