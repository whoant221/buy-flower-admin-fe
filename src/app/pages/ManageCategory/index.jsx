import React, { useEffect, useState } from 'react';
import BasicLayout from '../../layout/basic/BasicLayout';
import PopUpCreateCategory from '../../components/PopupCreateCategory';
import { Button, Form, Input, } from 'antd';
import categoryApi from "../../api/category";
import { toastSuccess } from "../../components/Toast";

export default function ManageCategory() {
    return (
        <BasicLayout ComponentPage={Category}/>
    )
}
const Category = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isCreated, setIsCreated] = useState(false);

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
    }, [isCreated]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (e) => {
        try {
            await categoryApi.createCategory(e)
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
            const { data } = await categoryApi.getAllCategories(e.title);
            setCategories(data.categories)
        } catch (e) {
            console.error(e)
        }
    };


    return <main className="app-content">
        <PopUpCreateCategory isModalOpen={isModalOpen} handleOk={handleOk}
                             handleCancel={handleCancel}/>
        <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
                <li className="breadcrumb-item active"><a href="#"><b>Danh sách
                    danh mục</b></a></li>
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
                                    Tạo mới danh mục
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
                                        <Form.Item label="Tiêu đề"
                                                   name="title">
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
                                <th>Tiêu đề</th>
                                <th>Số lượng hoa</th>
                                <th width={20}>Trạng thái</th>
                                <th width={100}>Tính năng</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                (categories.length > 0 ? (categories.map((category, i) => {
                                    return <tr>
                                        <td>{i + 1}</td>
                                        <td>{category.title}</td>
                                        <td>{category.numbers_of_flower}</td>
                                        <td>{category.state || 'active'}</td>
                                        <td className="table-td-center">
                                            <button
                                                className="btn btn-primary btn-sm trash"
                                                type="button" title="Xóa"
                                                onClick={() => {
                                                    handleDeleteUser(category)
                                                }}><i
                                                className="fas fa-trash-alt"/>
                                            </button>
                                            <button onClick={() => {
                                                showModal(category);
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