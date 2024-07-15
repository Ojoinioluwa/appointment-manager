import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { currentPage } from "../redux/features/data";
import { RiCalendarCloseFill } from 'react-icons/ri'


const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = JSON.parse(sessionStorage.getItem('user'))?.user
    const thisMonth = new Date().getMonth()
    const nextMonth = thisMonth + 1

    const thisMonthAppointments = currentUser.schedules.filter(app => new Date(app.date).getMonth() === thisMonth)
    const nextMonthAppointments = currentUser.schedules.filter(app => new Date(app.date).getMonth() === nextMonth)

    // console.log(thisMonthAppointments, nextMonthAppointments)
    return (
        <div className="block md:grid">
            <div className="container">
                <p className="header">Dashboard</p>
                

                <div className="grid grid-cols-dashboard grid-rows-dashH gap-5 h-max">
                    <div className=" resp base-style flex flex-col gap-5">

                        <div className="flex items-center justify-between">
                            <p className="font-semibold">{currentUser.role === 'doctor' ? 'This month' : 'Upcoming'}</p>
                            <p 
                                className="text-grn hover:font-bold cursor-pointer"
                                onClick={() => {
                                    dispatch(currentPage('Schedules'))
                                    navigate('/schedules')
                                    sessionStorage.setItem('currentPage', 'Schedules')
                                }}
                            >See all</p>
                        </div>
                                
                        <div className="flex flex-col gap-1.5">
                            {
                                thisMonthAppointments.length === 0 ?
                                <div className="flex w-full h-full items-center justify-center">
                                    <div className="flex flex-col gap-2.5  items-center">
                                        <RiCalendarCloseFill className="text-3xl"/>
                                        <p>No Schedules for this month yet!</p>
                                    </div>
                                </div>
                                :
                                thisMonthAppointments.map((sch, idx) => (
                                    <div key={idx} className="appointment-success">
                                        <p className="app-date">{new Date(sch.date).getUTCDate()}</p>
                                        <p className="app-description">{sch.title}</p>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                    <div className="resp base-style flex flex-col gap-5 h-full">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">{currentUser.role === 'doctor' ? 'Next month' : ' Prescription '}</p>
                            <p 
                                className="text-grn hover:font-bold cursor-pointer"
                                onClick={() => {
                                    dispatch(currentPage('Schedules'))
                                    navigate('/schedules')
                                    sessionStorage.setItem('currentPage', 'Schedules')
                                }}
                            >See all</p>
                        </div>

                        {
                            currentUser.role === 'doctor' ?
                            <div className="flex flex-col gap-1.5">
                                {
                                    nextMonthAppointments.length === 0 ?
                                    <div className="flex w-full h-full items-center justify-center">
                                        <div className="flex flex-col gap-2.5 items-center">
                                            <RiCalendarCloseFill className="text-3xl"/>
                                            <p>No Schedules for this month yet!</p>
                                        </div>
                                    </div>
                                    :
                                    nextMonthAppointments.map((sch, idx) => (
                                        <div key={idx} className="appointment-success">
                                            <p className="app-date">{new Date(sch.date).getUTCDate()}</p>
                                            <p className="app-description">{sch.title}</p>
                                        </div>
                                    ))
                                }
                            </div>

                            :
                            
                            currentUser.prescriptions.length === 0 ? 

                            <div className="flex w-full h-full items-center justify-center">
                                <div className="flex flex-col gap-2.5 items-center">
                                    <RiCalendarCloseFill className="text-3xl"/>
                                    <p>No Schedules for this month yet!</p>
                                </div>
                            </div> 
                            :
                            <div>
                                <p className="text-lg font-bold">{currentUser.prescriptions[currentUser.prescriptions.length - 1].diagnosis.toUpperCase()}</p>
                                <p>{currentUser.prescriptions[currentUser.prescriptions.length - 1].prescription}</p>
                            </div>
                        }

                    </div>

                    <div className="resp base-style flex flex-col gap-5 h-full">
                        <div className="flex items-center justify-between">
                            <p className="font-bold">Inventory</p>
                            <p 
                                className="text-grn hover:font-bold cursor-pointer"
                                onClick={() => {
                                    dispatch(currentPage('Inventory'))
                                    navigate('/inventory')
                                    sessionStorage.setItem('currentPage', 'Inventory')
                                }}
                            >See all</p>
                        </div>

                        <div className="flex flex-col gap-2.5">
                            <div className="grid grid-cols-dash-table gap-1.5">
                                <p className="font-semibold">Product name</p>
                                <p className="font-semibold">Status</p>
                                <p className="font-semibold">Quantity</p>
                            </div>

                            <div className="grid grid-cols-dash-table gap-1.5">
                                <p>Dextromethorphan</p>
                                <p className="status-success">Available</p>
                                <p>3</p>
                            </div>

                            <div className="grid grid-cols-dash-table gap-1.5">
                                <p>Hexylresorcinol </p>
                                <p className="status-error">Empty</p>
                                <p>0</p>
                            </div>

                            <div className="grid grid-cols-dash-table gap-1.5">
                                <p>Chloroquine</p>
                                <p className="status-success">Available</p>
                                <p >1</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard;