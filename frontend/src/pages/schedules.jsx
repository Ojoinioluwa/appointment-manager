import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { IoIosAdd } from "react-icons/io";
import { TfiClose } from 'react-icons/tfi'
import { useState } from 'react'; 
import { RiCalendarCloseFill } from 'react-icons/ri'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from 'axios'
import {success, error} from '../utils/toast'

const Schedules = () => {
    const currentUser = JSON.parse(sessionStorage.getItem('user'))
    const workdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    // array for schedules and duration
    // const allSchedules = currentUser.user.schedules.map(sch => ({title: sch.title, date: new Date(sch.date).getUTC}))
    // const allDuration = currentUser.user.schedules.map(sch => sch.duration)


    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [display, setDisplay] = useState(false)
    const [doctors, setDoctors] = useState([])
    const [appointment, setAppointment] = useState({
        id: '',
        selfId: currentUser.user._id,


        schedule: {
            title: '',
            doctor: '',
            duration: '30:00',
            date: new Date(),
            patientName: currentUser.user.name
        }
    })

    const fillingData = (e) => {
        const {name, value} = e.target;
        setAppointment(() => ({
            id: appointment.id,
            selfId: appointment.selfId,

            schedule: {...appointment.schedule, [name]: value}
        }))
    }

    const fetchDoctors = async() => {
        setLoading(true)

        try {
            const response = await axios.get(`http://localhost:3000/v1/users/fetchCandidates?role=doctor`, {
                headers: {
                    'Authorization': `Bearer ${currentUser.accessToken}`
                }
            })

            setLoading(false)
            setDisplay(true)
            setDoctors(response.data.data)
            
        } catch (error) {
            error(error)
            setLoading(false)
        }
    }

    const submit = async(e) => {
        e.preventDefault()
        
        try {
            const response = await axios.post(`http://localhost:3000/v1/users/schedule`, {id:appointment.id, selfId: appointment.selfId, schedule: [...currentUser.user.schedules, appointment.schedule]}, {
                headers: {
                    'Authorization': `Bearer ${currentUser.accessToken}`
                }
            })

            sessionStorage.setItem('user', JSON.stringify({accessToken: currentUser.accessToken, user: response.data.data}))
            // setData(response.data)

            setVisible(false)
            success('Successfully scheduled')

            setAppointment({
                id: '',
                selfId: currentUser.user._id,


                schedule: {
                    title: '',
                    doctor: '',
                    duration: '30:00',
                    date: new Date(),
                    patientName: currentUser.user.name
                }
            })
        } 
        catch (err) {
            error(err)
            setVisible(false)
        }
        
    }

    return (
        <div className='container'>
            <p className='header'>My Schedules</p>

            {
                currentUser.user.role === 'doctor' ?
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView="dayGridMonth"
                    weekends={true}
                    events={currentUser.user.schedules.map(sch => ({
                        title: sch.title,
                        start: sch.date,
                    }))}
                />
                :

                <div className='relative h-schedulePage'>
                    <div>
                        {
                            currentUser.user.schedules.length === 0 ? 
                            <div className="flex w-full h-full items-center justify-center">
                                <div className="flex flex-col gap-2.5 items-center">
                                    <RiCalendarCloseFill className="text-3xl"/>
                                    <p>No Schedules yet!</p>
                                </div>
                            </div>
                            :
                            <div className='grid grid-cols-3 gap-2'>
                                {
                                    currentUser.user.role === 'patient' && currentUser.user.schedules.map(sch => (
                                        <div className='rounded-lg bg-table-head text-white p-1.5 max-w-prescription'>
                                            <div className='flex items-center gap-1.5'>
                                                <p className='font-semibold'>Title</p>
                                                <span>{sch.title}</span>
                                            </div>
                                            <div className='flex flex-col gap-1.5'>
                                                <div className='flex items-center gap-1.5'>
                                                    <p className='font-semibold'>Day:</p>
                                                    <span>{`${workdays[new Date(sch.date).getDay()]} ${new Date(sch.date).getUTCDate()}, ${months[new Date(sch.date).getMonth()]}`}</span>
                                                </div>
        
                                                <div className='flex items-center gap-1.5'>
                                                    <p className='font-semibold'>Duration:</p>
                                                    <span>{sch.duration === '30:00' ? '30 minutes' : sch.duration === '01:00' ? '1 hour' :  ''}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>

                    <div className='absolute flex flex-col gap-2.5 items-center bottom-5 right-5'>
                        <p className='font-semibold'>Book an appointment</p>
                        <div 
                            className='flex items-center justify-center p-5 rounded-full w-max bg-grn cursor-pointer hover:shadow-md'
                            onClick={() => setVisible(!visible)}
                        >
                            <IoIosAdd  className='text-xl'/>
                        </div>
                    </div>

                    {
                        visible &&
                        <div className='backdrop-blur-sm absolute h-full w-full -top-0.5 flex flex-col'>
                            <div className="flex justify-end cursor-pointer pr-2">
                                <TfiClose className="text-xl" onClick={() => setVisible(!visible)}/>
                            </div>
                            <form onSubmit={(e)=> submit(e)} className='w-full h-full flex flex-col justify-center items-center gap-5'>
                                <ul className='flex flex-col gap-2.5'>
                                    <li>
                                        <label className='label' htmlFor="title">Title</label>
                                        <input 
                                            name='title' 
                                            className='input' 
                                            type="text" 
                                            id='title' 
                                            value={appointment.schedule.title} 
                                            onChange={(e) => fillingData(e)}
                                            placeholder='Reason for booking an appointment'
                                            maxLength={25}
                                        />
                                    </li>

                                    <li className='relative'>
                                        <label className='label' htmlFor="doctor">Doctor</label>
                                        <input 
                                            name='doctor' 
                                            className='input' 
                                            type="text" 
                                            id='doctor' 
                                            value={appointment.schedule.doctor} 
                                            onFocus={() => fetchDoctors()}
                                            placeholder='Click on this field and wait'
                                            autoComplete='false'
                                        />

                                        {
                                            loading && 
                                            <AiOutlineLoading3Quarters className="absolute right-2.5 bottom-2 loading-effect" />
                                        }

                                        {
                                            display &&
                                            <div className="absolute w-full receive p-2 flex flex-col gap-2 bg-gray-400">
                                                {
                                                    doctors?.map((pat, idx) => (
                                                        <p className="border border-t-0 border-x-0 border-b pl-1.5 cursor-pointer w-full" key={idx} onClick={(e) => {
                                                            setAppointment({
                                                                id: pat._id,
                                                                selfId: appointment.selfId,

                                                                schedule: {...appointment.schedule, doctor: pat.name}
                                                            })
                                                            setDisplay(false)
                                                        }}>{pat.name}</p>
                                                    ))
                                                }
                                            </div>
                                        }
                                    </li>
    
                                    <li>
                                        <label htmlFor="duration">Duration</label>
                                        <select value={appointment.schedule.duration} className='input' name="duration" id="duration" onChange={(e) => fillingData(e)}>
                                            <option value='30:00'>30 minutes</option>
                                            <option value='60:00'>1 hour</option>
                                        </select>
                                    </li>
    
                                    <li>
                                        <label className='label' htmlFor="date">Date</label>
                                        <input 
                                            name='date' 
                                            className='input' 
                                            type="date" 
                                            id='date' 
                                            value={appointment.schedule.date} 
                                            onChange={(e) => fillingData(e)}
                                            min={new Date()}
                                        />
                                    </li>
                                </ul>
    
                                <div>
                                    <button 
                                        className='auth-btn w-btn'
                                        disabled = {appointment.schedule.title.length === 0 || appointment.id == ''}
                                    > 
                                        Book appointment
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            }

        </div>
    )
}

export default Schedules
