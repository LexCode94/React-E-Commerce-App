import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({children}) => {

    const isLogged = useSelector(state => state.login)

    return(
        isLogged ? children : <Navigate to='/login'/>
    )

}

export default ProtectedRoute;