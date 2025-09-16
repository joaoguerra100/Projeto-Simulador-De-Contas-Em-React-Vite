import styles from './PrivateRoute.module.css'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute(){
    const {isAuthenticated, loading} = useContext(AuthContext)

    if(loading){
        return <div>Carregando...</div>
    }

    return isAuthenticated ? <Outlet/> : <Navigate to="/login" />
}

export default PrivateRoute