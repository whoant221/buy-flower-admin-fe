import React from 'react'
import BasicLayout from '../../layout/basic/BasicLayout'

export default function turnOver() {
    return (
        <BasicLayout ComponentPage={TurnOver} />
    )
}

const TurnOver = () => {
    return <main className="app-content">
        <div className="row">
            <div className="col-md-12">
                <div className="app-title">
                    <ul className="app-breadcrumb breadcrumb">
                        <li className="breadcrumb-item"><a href="#"><b>Báo cáo doanh thu </b></a></li>
                    </ul>
                    <div id="clock" />
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 col-lg-3">
                <div className="widget-small primary coloured-icon"><i className="icon  bx bxs-user fa-3x" />
                    <div className="info">
                        <h4>Tổng Nhân viên</h4>
                        <p><b>3 nhân viên</b></p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-3">
                <div className="widget-small info coloured-icon"><i className="icon bx bxs-purchase-tag-alt fa-3x" />
                    <div className="info">
                        <h4>Tổng sản phẩm</h4>
                        <p><b>8580 sản phẩm</b></p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-3">
                <div className="widget-small warning coloured-icon"><i className="icon fa-3x bx bxs-shopping-bag-alt" />
                    <div className="info">
                        <h4>Tổng đơn hàng</h4>
                        <p><b>457 đơn hàng</b></p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-3">
                <div className="widget-small danger coloured-icon"><i className="icon fa-3x bx bxs-info-circle" />
                    <div className="info">
                        <h4>Bị cấm</h4>
                        <p><b>0 nhân viên</b></p>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 col-lg-3">
                <div className="widget-small primary coloured-icon"><i className="icon fa-3x bx bxs-chart" />
                    <div className="info">
                        <h4>Tổng thu nhập</h4>
                        <p><b>104.890.000 đ</b></p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-3">
                <div className="widget-small info coloured-icon"><i className="icon fa-3x bx bxs-user-badge" />
                    <div className="info">
                        <h4>Nhân viên mới</h4>
                        <p><b>0 nhân viên</b></p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-3">
                <div className="widget-small warning coloured-icon"><i className="icon fa-3x bx bxs-tag-x" />
                    <div className="info">
                        <h4>Hết hàng</h4>
                        <p><b>1 sản phẩm</b></p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-3">
                <div className="widget-small danger coloured-icon"><i className="icon fa-3x bx bxs-receipt" />
                    <div className="info">
                        <h4>Đơn hàng hủy</h4>
                        <p><b>2 đơn hàng</b></p>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="tile">
                    <div>
                        <h3 className="tile-title">SẢN PHẨM BÁN CHẠY</h3>
                    </div>
                    <div className="tile-body">
                        <table className="table table-hover table-bordered" id="sampleTable">
                            <thead>
                                <tr>
                                    <th>Mã sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>HB613</td>
                                    <td>Bó hoa hồng HB613</td>
                                    <td>480.000 đ</td>
                                </tr>
                                <tr>
                                    <td>CB209</td>
                                    <td>Hoa chia buồn CB209</td>
                                    <td>1.150.000 đ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="tile">
                    <div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="tile">
                            <h3 className="tile-title">DỮ LIỆU HÀNG THÁNG</h3>
                            <div className="embed-responsive embed-responsive-16by9">
                                <canvas className="embed-responsive-item" id="lineChartDemo" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="tile">
                            <h3 className="tile-title">THỐNG KÊ DOANH SỐ</h3>
                            <div className="embed-responsive embed-responsive-16by9">
                                <canvas className="embed-responsive-item" id="barChartDemo" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-right" style={{ fontSize: '12px' }}>
                    <p><b>Hệ thống quản lý</b></p>
                </div>
            </div></div></main>

}
