import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import { GrSchedules } from 'react-icons/gr'
import {LuLayoutDashboard} from 'react-icons/lu'
import {MdOutlineInventory} from 'react-icons/md'
import { FaPrescriptionBottleAlt } from 'react-icons/fa'
import { RiLogoutCircleLine } from 'react-icons/ri'
import './sidebar.css'

const Sidebar = ({logout, setLogout}) => {
    const page = sessionStorage.getItem('currentPage')
    const navigate = useNavigate()

    return (
        <div className='hidden bg-sidebar-grey py-5 h-screen md:flex flex-col justify-between p-5'>
            <div>
                <p className="font-extrabold text-2xl"> Logo </p>
            </div>

            <div className="flex flex-col gap-5">
                <div
                    className={`nav ${page === "Dashboard" && 'active' }`}
                    onClick={() => {
                        navigate('/')
                        sessionStorage.setItem('currentPage', 'Dashboard')
                    }}
                >
                    <LuLayoutDashboard className="icon"/>
                    <p className="nav-item">Dashboard</p>
                </div>

                <div
                    className={`nav ${page === 'Inventory' && 'active'}`}
                    onClick={() => {
                            navigate('/inventory')
                            sessionStorage.setItem('currentPage', 'Inventory')
                        }
                    }
                    
                >
                    <MdOutlineInventory className="icon" />
                    <p className="nav-item">Inventory</p>
                </div>

                <div
                    className={`nav ${page === 'Schedules' && 'active' }`}
                    onClick={() => {
                        navigate('/schedules')
                        sessionStorage.setItem('currentPage', 'Schedules')
                    }}
                    
                >
                    <GrSchedules />
                    <p className="nav-item">My Schedules</p>
                </div>

                <div
                    className={`nav ${page === 'Prescriptions' && 'active' }`}
                    onClick={() => {
                        navigate('/prescriptions')
                        sessionStorage.setItem('currentPage', 'Prescriptions')
                    }}
                    
                >
                    <FaPrescriptionBottleAlt />
                    <p className="nav-item">Prescriptions</p>
                </div>
            </div>

            <div 
                className="nav"
                onClick={() => setLogout(!logout)}
            >
                <RiLogoutCircleLine />
                <p className="nav-item">Logout</p>
            </div>
        </div>
    )
}

export default Sidebar