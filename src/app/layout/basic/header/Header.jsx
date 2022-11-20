import React from 'react'
import '../style.scss'
import '../../main.css'


export default function Header() {
    const logout = () => {

    }
    return <>
        <header class="app-header">
            <a class="app-sidebar__toggle" href="#" data-toggle="sidebar"
                aria-label="Hide Sidebar"></a>

            <ul class="app-nav">
                <li>
                    <a class="app-nav__item" href="/Admin/Admin_login.html">
                        <i class='bx bx-log-out bx-rotate-180'></i>
                    </a>
                </li>
            </ul>
        </header>
    </>


}
