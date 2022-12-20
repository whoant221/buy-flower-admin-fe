import React, { Component, useEffect, useState } from 'react'
import BasicLayout from '../../layout/basic/BasicLayout'
import reportApi from '../../api/report';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';


export default function HomePage() {
    return (
        <BasicLayout ComponentPage={Home}/>
    )
}

const Home = () => {
    const [analyzeProduct, setAnalyzeProduct] = useState({total_users: 0, total_flowers: 0, total_orders: 0, total_flower_sold_out_flowers: 0});
    const [chartAccessPage, setChartAccessPage] = useState({datasets: []});
    const [chartProfit, setChartProfit] = useState({datasets: []});

    useEffect(() => {
            const getAnalyzeAccessPage = async () => {
                const { data: {data} } = await reportApi.getAnalyzeAccessPage("1/12/2022", "21/12/2022");
                const labels = data.map(d => d[0])
                const dataRender = data.map(d => d[1])

                setChartAccessPage({
                    labels,
                    datasets: [{
                        label: 'Số lượng người truy cập trong tháng',
                        data: dataRender,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                })
            }
        getAnalyzeAccessPage();
    }, []);

    useEffect(() => {
        const getChartProfit = async () => {
            const { data: {data} } = await reportApi.getAnalyzeProfit();
            const labels = data.map(d => d[0])
            const dataRender = data.map(d => d[1])

            setChartProfit({
                labels,
                datasets: [{
                    label: 'Doanh thu',
                    data: dataRender,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            })
        }
        getChartProfit();
    }, []);


    useEffect(() => {
        const getAnalyzeProduct = async () => {
            const { data } = await reportApi.getAnalyzeProduct();
            setAnalyzeProduct(data);
        }

        getAnalyzeProduct();
    }, []);

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
                                    <p><b>{analyzeProduct.total_users} khách hàng</b></p>
                                    <p className="info-tong">Tổng số khách hàng được quản lý.</p>
                                </div>
                            </div>
                        </div>
                        {/* col-6 */}
                        <div className="col-md-6">
                            <div className="widget-small info coloured-icon"><i className="icon bx bxs-data fa-3x"/>
                                <div className="info">
                                    <h4>Tổng sản phẩm</h4>
                                    <p><b>{analyzeProduct.total_flowers} sản phẩm</b></p>
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
                                    <p><b>{analyzeProduct.total_orders} đơn hàng</b></p>
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
                                    <p><b>{analyzeProduct.total_flower_sold_out_flowers} sản phẩm</b></p>
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
                            <h3 className="tile-title">Số lượng người truy cập trong tháng</h3>
                                <Chart type='line' data={chartAccessPage} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="tile">
                            <h3 className="tile-title">Doanh thu</h3>
                            <Chart type='line' data={chartProfit} />
                        </div>
                    </div>
                </div>
            </div>


        </main>
    );

}

