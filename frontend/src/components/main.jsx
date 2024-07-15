import { Outlet } from "react-router-dom"

const Main = () => {
    const currentUser = JSON.parse(sessionStorage.getItem('user'))?.user
    return (
        <main className="tab p-2.5 md:p-5 h-screen gap-5 grid grid-rows-main bg-header-bg items-center md:items-start overflow-scroll">
            <div className=" flex justify-end ">
                <div className="flex items-center gap-2">
                    <p className="font-semibold">{`Welcome, ${currentUser.role === 'doctor' ? 'Dr.' : ''} ${currentUser.name}`}</p>
                    <div className="p-5 rounded-full bg-gray-400"></div>
                </div>
            </div>

            <Outlet/>
        </main>
    )
}

export default Main
