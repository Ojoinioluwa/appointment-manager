import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {

    const user = JSON.parse(sessionStorage.getItem('user'))

    return (
        user.accessToken === (null || '') || user === null || !(user.accessToken) ? <Navigate to='/login' /> : <Outlet />
    )
}

export default PrivateRoutes;