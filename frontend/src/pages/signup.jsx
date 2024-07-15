import {FaEyeSlash, FaEye} from 'react-icons/fa'
import { BiInfoCircle } from 'react-icons/bi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useState } from 'react';
import signup from '../assets/signup.jpg'
import axios from "axios"
import {error, success} from '../utils/toast'
import { useNavigate } from 'react-router-dom';


function Signup() {
    const navigate = useNavigate()

    // ----------------  STATES ------------------
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    })
    
    const [eyesOpen, setEyesOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    // --------------- FUNCTIONS -----------------

    // --- The SignUp function ---
    
    const signUp = async (e) => {
        // e.preventDefault()

        setLoading(true)

        try {
            const checkMail = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${import.meta.env.VITE_EMAIL_VERIFICATION}&email=${newUser?.email}`)
            
            setNewUser(prevState => (checkMail.data.autocorrect !== '' ? { ...prevState, email: checkMail.data.autocorrect } : {...prevState}))
            if (checkMail.data.deliverability === "UNDELIVERABLE") {
                setLoading(false)
                return error('Invalid email')
            }

            const response = await axios.post(`http://127.0.0.1:3000/v1/users/signup`, newUser)
            
            success(response.data.message)
            setLoading(false)
            navigate('/login')
            setNewUser({
                username: '',
                email: '',
                password: '',
                role: ''
            })

        } catch (err) {
            error(err)
            setLoading(false)
        }
    }

    // --- onchange function for filling the new user info ---
    const fillingData = (e) => {
        const {name, value} = e.target
        setNewUser(prevState => ({...prevState, [name]: value}))
    }

    // --- function for toggling password visibility ---
    const toggleEye = () => {
        setEyesOpen(!eyesOpen)
    }

    // ----- condition for enabling sign-up button ------
    // const condition = () => {

    //     if () return true

    //     return false
    // }

    // useEffect( () => {
    //     condition()
    // }, [newUser?.email, newUser?.password, newUser?.username])

    return (
        <div className="auth-page">
            {   loading && 
                <div className="loading-div"> 
                    <AiOutlineLoading3Quarters className='loading-effect' /> 
                </div>
            }

            <form className='auth-form' onSubmit={(e) => signUp(e)}>

                <p className='hero-text'>Sign Up</p>

                <ul className='auth-ul'>
                    <li>
                        <label className='label' htmlFor="username">Username</label>
                        <input 
                            name='username' 
                            className='input' 
                            type="text" 
                            id='username' 
                            value={newUser.username} 
                            onChange={(e) => fillingData(e)}
                            placeholder='At least 4 or more characters'
                            maxLength={25}
                        />
                    </li>

                    <li>
                        <label className='label' htmlFor="email">Email</label>
                        <input 
                            name='email' 
                            className='input' 
                            type="email" 
                            id='email' 
                            value={newUser.email} 
                            onChange={(e) => fillingData(e)}
                            placeholder='example1234@gmail.com'
                        />
                    </li>

                    <li className='flex flex-col gap-1'>
                        <label htmlFor="role">Role</label>
                        <select value={newUser.role} className='input' name="role" id="role" onChange={(e) => fillingData(e)}>
                            <option value='patient'>Patient</option>
                            <option value='doctor'>Doctor</option>
                        </select>
                    </li>

                    <li>
                        <label className='label' htmlFor="password">Password</label>

                        <div className='auth-input-cont'>
                            { eyesOpen ? 
                                <input 
                                    name='password' 
                                    className='input' 
                                    type="text" 
                                    id='password' 
                                    value= {newUser.password} 
                                    onChange={(e) => fillingData(e)}
                                    placeholder='a strong password'
                                    minLength={6}
                                /> : 
                                <input 
                                    name='password' 
                                    className='input' 
                                    type="password" 
                                    id='password' 
                                    value= {newUser.password} 
                                    onChange={(e) => fillingData(e)}
                                    minLength={6}
                                    placeholder='a strong password'
                                /> 
                            }

                            {   newUser.password.length !== 0 &&
                                <span 
                                    className='switchEye'
                                    onClick={toggleEye}
                                >
                                    { eyesOpen ? <FaEyeSlash /> : <FaEye /> }
                                </span>
                            }

                            <span className='pass-info'> <BiInfoCircle /> password must be 6 or more characters</span>
                        </div>

                    </li>
                </ul>

                <div>
                    <button 
                        className='auth-btn w-btn'
                        onClick={() => signUp()} 
                        disabled = {newUser.email.length === 0 || newUser.password.length < 6 || newUser.username.length < 4 }
                    > 
                        Sign up
                    </button>
                </div>

                <p className='auth-word-cont'>
                    Already have an account? &nbsp;
                    <span onClick={() => navigate('/login')} className='auth-word'>
                        Login
                    </span>
                </p>
            </form>

            <div className="auth-img-part">
                <img className='rounded-signup' src={signup} alt="signup" />
            </div>
        </div>
    );
}

export default Signup;