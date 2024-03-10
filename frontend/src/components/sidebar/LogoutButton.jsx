import { TbLogout2 } from "react-icons/tb";
import React from 'react'
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {

    const { loading, logout } = useLogout()
    return (
        <div className='mt-auto'>
            {!loading ? (
                <TbLogout2 className="w-7 h-7 cursor-pointer text-white" onClick={logout} />
            ) : (
                <span className="loading loading-spinner"></span>
            )
            }
        </div>
    )
}

export default LogoutButton