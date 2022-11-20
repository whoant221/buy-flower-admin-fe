import React from 'react'
import SideBar from './aside/SideBar.jsx'
import Header from './header/Header.jsx'
import './style.scss'


export default function BasicLayout(props) {
    const { ComponentPage } = props;
    return (
        <>
            <Header />
            <div >
                <SideBar />
                <ComponentPage />
            </div>
        </>
    )
}
