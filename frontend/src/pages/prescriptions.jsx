import { IoIosAdd } from "react-icons/io";
import { TfiClose } from 'react-icons/tfi'
import { useState } from 'react'; 
import { RiCalendarCloseFill } from 'react-icons/ri'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from 'axios'
import {success, error} from '../utils/toast'


const Prescriptions = () => {
    const currentUser = JSON.parse(sessionStorage.getItem('user'))

    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [display, setDisplay] = useState(false)
    const [patients, setPatients] = useState([])
    const [prescriptions, setPrescriptions] = useState({
        id: '',
        selfId: currentUser.user._id,


        prescript: {
            diagnosis: '',
            prescription: '',
            patientName: ''
        }
    })

    const fillingData = (e) => {
        const {name, value} = e.target;
        setPrescriptions(() => ({
            id: prescriptions.id,
            selfId: prescriptions.selfId,

            prescript: {...prescriptions.schedule, [name]: value}
        }))
    }

    const fetchPatients = async() => {
        setLoading(true)

        try {
            const response = await axios.get(`http://localhost:3000/v1/users/fetchCandidates?role=patient`, {
                headers: {
                    'Authorization': `Bearer ${currentUser.accessToken}`
                }
            })

            setLoading(false)
            setDisplay(true)
            setPatients(response.data.data)
            
        } catch (error) {
            error(error)
            setLoading(false)
        }
    }

    const submit = async(e) => {
        e.preventDefault()
        
        try {
            const response = await axios.post(`http://localhost:3000/v1/users/prescribe`, {id:prescriptions.id, selfId: prescriptions.selfId, prescript: [...currentUser.user.prescriptions, prescriptions.prescript]}, {
                headers: {
                    'Authorization': `Bearer ${currentUser.accessToken}`
                }
            })

            sessionStorage.setItem('user', JSON.stringify({accessToken: currentUser.accessToken, user: response.data.data}))
            // setData(response.data)

            setVisible(false)
            success('Successfully scheduled')

            setPrescriptions({
                id: '',
                selfId: currentUser.user._id,


                prescript: {
                    diagnosis: '',
                    prescription: '',
                    patientName: ''
                }
            })
        } 
        catch (err) {
            error(err)
            setVisible(false)
        }
        
    }

    return (
        <div className="container">
            <p className="header">Prescriptions</p>


            <div className='relative h-schedulePage'>
                <div>
                    {
                        currentUser.user.prescriptions.length === 0 ? 
                        <div className="flex w-full h-full items-center justify-center">
                            <div className="flex flex-col gap-2.5 items-center">
                                <RiCalendarCloseFill className="text-3xl"/>
                                <p>No Prescriptions yet!</p>
                            </div>
                        </div>
                        :
                        <div className='grid grid-cols-3 gap-2'>
                            {
                                currentUser.user.prescriptions.map(pre => (
                                    <div className='rounded-lg bg-table-head text-white p-1.5 w-prescription'>
                                        <div className='flex items-center justify-between font-semibold'>
                                            <p>{pre.patientName}</p>
                                            <p>{pre.diagnosis}</p>
                                        </div>

                                        <div>
                                            <p>{pre.prescription}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>

                {
                    currentUser?.user.role === 'doctor' &&
                    <div className='absolute flex flex-col gap-2.5 items-center bottom-5 right-5'>
                        <p className='font-semibold'>Prescribe a drug</p>
                        <div 
                            className='flex items-center justify-center p-5 rounded-full w-max bg-grn cursor-pointer hover:shadow-md'
                            onClick={() => setVisible(!visible)}
                        >
                            <IoIosAdd  className='text-xl'/>
                        </div>
                    </div>
                }

                {
                    visible &&
                    <div className='backdrop-blur-sm absolute h-full w-full -top-0.5 flex flex-col'>
                        <div className="flex justify-end cursor-pointer pr-2">
                            <TfiClose className="text-xl" onClick={() => setVisible(!visible)}/>
                        </div>
                        <form onSubmit={(e)=> submit(e)} className='w-full h-full flex flex-col justify-center items-center gap-5'>
                            <ul className='flex flex-col gap-2.5'>
                                <li className="relative">
                                    <label className='label' htmlFor="patientName">Patient</label>
                                    <input 
                                        name='patientName' 
                                        className='input' 
                                        type="text" 
                                        id='patientName' 
                                        value={prescriptions.prescript.patientName} 
                                        onFocus={() => fetchPatients()}
                                        placeholder='click on this field and wait'
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
                                                patients?.map((pat, idx) => (
                                                    <p className="border border-t-0 border-x-0 border-b pl-1.5 cursor-pointer w-full" key={idx} onClick={(e) => {
                                                        setPrescriptions({
                                                            id: pat._id,
                                                            selfId: prescriptions.selfId,

                                                            prescript: {...prescriptions.prescript, patientName: pat.name}
                                                        })
                                                        setDisplay(false)
                                                    }}>{pat.name}</p>
                                                ))
                                            }
                                        </div>
                                    }
                                </li>

                                <li>
                                    <label className='label' htmlFor="diagnosis">Diagnosis</label>
                                    <input 
                                        name='diagnosis' 
                                        className='input' 
                                        type="text" 
                                        id='diagnosis' 
                                        value={prescriptions.prescript.diagnosis} 
                                        onChange={(e) => fillingData(e)}
                                        placeholder='Diagnosis'
                                    />  
                                </li>

                                <li>
                                    <label className='label' htmlFor="prescription">Prescription</label>
                                    <textarea 
                                        name="prescription"
                                        className="input"
                                        id="prescription"
                                        value={prescriptions.prescript.prescription}
                                        onChange={(e) => fillingData(e)}
                                        placeholder="Write a prescription here"
                                    />

                                </li>
                            </ul>

                            <div>
                                <button 
                                    className='auth-btn w-btn'
                                    disabled = {prescriptions.prescript.prescription.length <= 10 || prescriptions.id == ''}
                                > 
                                    Prescribe
                                </button>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </div>
    )
}

export default Prescriptions