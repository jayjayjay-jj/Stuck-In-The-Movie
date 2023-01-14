import '../../App.css'
import React from 'react'
import { SidebarData } from './SidebarData'

function Sidebar() {
    return (
        <div className='Sidebar'>
            <ul className='SidebarList'>
                {SidebarData.map((value, key) => {
                    return (
                        <li key={key} className='row' id={window.location.pathname == value.link ? "active" : ""} onClick={() => {window.location.pathname = value.link}}>
                            <div>{value.title}</div>
                        </li>    
                    )
                })}
            </ul>
        </div>
    )
}

export default Sidebar
