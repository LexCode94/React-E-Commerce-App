import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../actions"
import { Nav, Navbar } from "react-bootstrap"


export default function Navigationbar(props) {

    const isLogged = useSelector(state => state.login)
    const dispatch = useDispatch()

    const signOut = () => {
        dispatch(logout())
        localStorage.clear()
    }

    return (
        <Navbar bg="dark">
            <Nav.Link as={Link} to={"/register"}>Register</Nav.Link>
            <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
            <Nav.Link as={Link} to={"/buy"}>Shop</Nav.Link>
            <Nav.Link as={Link} to={"/cart"}>Shopping Cart</Nav.Link>
            <Nav.Link as={Link} to={"/dashboard"}>Dashboard</Nav.Link>
            {isLogged && 
            <Nav.Link href="/" onClick={signOut}>Sign Out</Nav.Link>
                }   
        </Navbar>
    )
}