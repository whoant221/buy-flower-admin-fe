import React, { Component } from 'react'
import BasicLayout from '../../layout/basic/BasicLayout'

export default function Home() {
    return (
        <BasicLayout ComponentPage={home}/>
    )
}

const home = () => {
    return (
        <main className="app-content">
            <div className="row">
                <div className="col-md-12">
                    <div className="app-title">
                        <ul className="app-breadcrumb breadcrumb">
                            <li className="breadcrumb-item"><a href="#"><b>Thống kê</b></a></li>
                        </ul>
                        <div id="clock"/>
                    </div>
                </div>
            </div>
            <div className="row">
                {/*Left*/}
                <div className="col-md-12 col-lg-6">
                    <div className="row">
                        {/* col-6 */}
                        <div className="col-md-6">
                            <div className="widget-small primary coloured-icon"><i
                                className="icon bx bxs-user-account fa-3x"/>
                                <div className="info">
                                    <h4>Tổng khách hàng</h4>
                                    <p><b>56 khách hàng</b></p>
                                    <p className="info-tong">Tổng số khách hàng được quản lý.</p>
                                </div>
                            </div>
                        </div>
                        {/* col-6 */}
                        <div className="col-md-6">
                            <div className="widget-small info coloured-icon"><i className="icon bx bxs-data fa-3x"/>
                                <div className="info">
                                    <h4>Tổng sản phẩm</h4>
                                    <p><b>1850 sản phẩm</b></p>
                                    <p className="info-tong">Tổng số sản phẩm được quản lý.</p>
                                </div>
                            </div>
                        </div>
                        {/* col-6 */}
                        <div className="col-md-6">
                            <div className="widget-small warning coloured-icon"><i
                                className="icon bx bxs-shopping-bags fa-3x"/>
                                <div className="info">
                                    <h4>Tổng đơn hàng</h4>
                                    <p><b>247 đơn hàng</b></p>
                                    <p className="info-tong">Tổng số hóa đơn bán hàng trong tháng.</p>
                                </div>
                            </div>
                        </div>
                        {/* col-6 */}
                        <div className="col-md-6">
                            <div className="widget-small danger coloured-icon"><i
                                className="icon bx bxs-error-alt fa-3x"/>
                                <div className="info">
                                    <h4>Sắp hết hàng</h4>
                                    <p><b>4 sản phẩm</b></p>
                                    <p className="info-tong">Số sản phẩm cảnh báo hết cần nhập thêm.</p>
                                </div>
                            </div>
                        </div>
                        {/* col-12 */}

                        {/* / col-12 */}
                        {/* col-12 */}
                        <div className="col-md-12">
                        </div>
                    </div>
                    {/* / col-12 */}
                </div>
            </div>
            {/*END left*/}
            {/*Right*/}
            <div className="col-md-12 col-lg-6">
                <div className="row">
                    <div className="col-md-12">
                        <div className="tile">
                            <h3 className="tile-title">Dữ liệu 6 tháng đầu vào</h3>
                            <div className="embed-responsive embed-responsive-16by9">
                                <canvas className="embed-responsive-item" id="lineChartDemo"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="tile">
                            <h3 className="tile-title">Thống kê 6 tháng doanh thu</h3>
                            <div className="embed-responsive embed-responsive-16by9">
                                <canvas className="embed-responsive-item" id="barChartDemo"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*END right*/}
            <div className="text-center" style={{ fontSize: '13px' }}>
                <p><b>
                </b></p>
            </div>
        </main>
    );

}

