import React, { useEffect, useState } from 'react';
import BasicLayout from '../../layout/basic/BasicLayout';
import PopUpCreateBud from '../../components/PopupCreateBud';
import { Button, Form, Input, } from 'antd';
import budApi from "../../api/bud";
import { toastSuccess } from "../../components/Toast";

export default function ManageBud() {
    return (
        <BasicLayout ComponentPage={Bud}/>
    )
}
const Bud = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buds, setBuds] = useState([]);
    const [isCreated, setIsCreated] = useState(false);

    useEffect(() => {
        const listBuds = async () => {
            try {
                const { data } = await budApi.getAllBuds();
                setBuds(data.buds)
            } catch (e) {
                console.error(e)
            }
        };

        listBuds();
    }, [isCreated]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (e) => {
        try {
            await budApi.createBud(e)
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
            const { data } = await budApi.getAllBuds(e.name);
            setBuds(data.buds)
        } catch (e) {
            console.error(e)
        }
    };


    return <main className="app-content">
        <PopUpCreateBud isModalOpen={isModalOpen} handleOk={handleOk}
                        handleCancel={handleCancel}/>
        <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
                <li className="breadcrumb-item active"><a href="#"><b>Danh sách
                    nụ hoa</b></a></li>
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
                                    Tạo mới nụ hoa
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
                                        <Form.Item label="Tên"
                                                   name="name">
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
                                <th>Tên</th>
                                <th width={20}>Trạng thái</th>
                                <th width={100}>Tính năng</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                (buds.length > 0 ? (buds.map((bud, i) => {
                                    return <tr>
                                        <td>{i + 1}</td>
                                        <td>{bud.name}</td>
                                        <td>{bud.state || 'active'}</td>
                                        <td className="table-td-center">
                                            <button
                                                className="btn btn-primary btn-sm trash"
                                                type="button" title="Xóa"
                                                onClick={() => {
                                                    handleDeleteUser(bud)
                                                }}><i
                                                className="fas fa-trash-alt"/>
                                            </button>
                                            <button onClick={() => {
                                                showModal(bud);
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