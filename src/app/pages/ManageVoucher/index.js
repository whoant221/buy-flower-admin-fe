import React, { useEffect, useState } from 'react'
import BasicLayout from '../../layout/basic/BasicLayout'
import PopUp from '../../components/PopupCreateVoucher'
import voucherApi from "../../api/voucher";
import { toastSuccess } from "../../components/Toast";
import moment from 'moment';

export default function ManageVoucher() {
    return (
        <BasicLayout ComponentPage={VoucherDisplay} />
    )
}

const VoucherDisplay = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [vouchers, setVouchers] = useState([]);
    const [isReload, setIsReload] = useState(false);

    useEffect(() => {
        const listVouchers = async () => {
            try {
                const { data } = await voucherApi.getVouchers();
                setVouchers(data.vouchers)
            } catch (e) {
                console.error(e)
            }
        };

        listVouchers();
    }, [isReload]);

    const showModal = (e) => {
        setIsModalOpen(true);
    };

    const handleOk = async (e) => {
        try {
            await voucherApi.createVoucher(e)
            toastSuccess("Tạo thành công");
            setIsReload(true);
            setIsModalOpen(false);
        } catch (e) {
            console.error(e)
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDeleteVoucher = async voucher => {
        await voucherApi.deleteVoucher(voucher.code);
        toastSuccess("Xóa thành công");
        setIsReload(true);
    };

    return <main className="app-content">
        <PopUp isModalOpen={isModalOpen} handleOk={handleOk}
            handleCancel={handleCancel} />
        <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
                <li className="breadcrumb-item active"><a href="#"><b>Danh sách
                    voucher</b></a></li>
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
                                    }}>
                                    <i className="fas fa-plus" />
                                    Tạo mới voucher
                                </button>
                            </div>
                        </div>
                        <table
                            className="table table-hover table-bordered js-copytextarea"
                            cellPadding={0} cellSpacing={0} border={0}
                            id="sampleTable">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã voucher</th>
                                    <th>Đã sử dụng / giới hạn</th>
                                    <th>Nội dung</th>
                                    <th>Thời gian áp dụng</th>
                                    <th>Hiệu lực</th>
                                    <th>% giảm</th>
                                    <th>Ngưỡng áp dụng</th>
                                    <th>Tối đa nhận</th>
                                    <th>Tính năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vouchers.length > 0 ? vouchers.map((voucher, index) => {
                                    return <tr>
                                        <td>{index + 1}</td>
                                        <td>{voucher.code}</td>
                                        <td>{voucher.orders_count} / {voucher.limit_count}</td>
                                        <td>{voucher.content}</td>
                                        <td>{moment(voucher.effective_at).format('MM/DD/YYYY')}</td>
                                        <td>{moment(voucher.expiration_at).format('MM/DD/YYYY')}</td>
                                        <td>{voucher.discount} %</td>
                                        <td>{voucher.threshold}</td>
                                        <td>{voucher.max_amount}</td>
                                        <td className="table-td-center">

                                            <button onClick={() => {
                                                showModal(voucher);
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
                                }) : <></>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>

}
