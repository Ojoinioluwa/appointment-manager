import Main from "../components/main"
import Sidebar from "../components/sidebar"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Homepage = () => {
    const navigate = useNavigate()
    const currentUser = JSON.parse(sessionStorage.getItem('user'))?.user
    const [logout, setLogout] = useState(false)

    return (
        !currentUser  ? 
        <div className="loading-div flex flex-col gap-5">
            <p className="font-bold">Loading, Please wait</p>
            <AiOutlineLoading3Quarters className="loading-effect" />
        </div>
        :
        <div className="grid grid-cols-homepage relative">
            <Sidebar logout={logout} setLogout={setLogout}/>
            <Main />

            {
                logout && 
                <div className="absolute w-full h-full flex index items-center justify-center backdrop-blur-sm">
                    <div className="m-auto flex flex-col gap-2.5 ">
                        <p className="text-3xl">Do you want to logout?</p>

                        <div className=" flex items-center justify-between gap-5">
                            
                            <button
                                className="rounded-lg p-2 hover:opacity-80 transition cursor-pointer bg-error text-white font-bold w-btn"
                                onClick={() => setLogout(!logout)}
                            >
                                NO
                            </button>

                            <button
                                className="rounded-lg p-2 hover:opacity-80 transition cursor-pointer bg-grn text-white font-bold w-btn"
                                onClick={() => {
                                    sessionStorage.removeItem('user')
                                    sessionStorage.removeItem('currentPage')
                                    navigate('/login', {replace: true})
                                    setLogout(!logout)
                                }}
                            >
                                YES!
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Homepage