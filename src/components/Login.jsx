import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../actions/index";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Login = () => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const signIn = () => {
        const body = {
            username: username,
            password: password
        }

        axios.post('http://localhost:4000/login', JSON.stringify(body), {headers:{'Content-Type': 'application/json'}})
        .then(res => {
            console.log(res)
            localStorage.setItem('access', res.data.accessToken)
            localStorage.setItem('refresh', res.data.refreshToken)
            dispatch(login())
            localStorage.setItem('logged', 'true')
            navigate('/')
        })
        .catch(err => {
            console.log(err)
            alert("Incorrect password or username.")
        })
    }

    return (
        <Container className='d-flex justify-content-center align-items-center' style={{marginTop: '300px'}}>
            <Row>
                <Col xs={12}>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="text-center" style={{width: "100%"}}>Username</Form.Label>
                            <Form.Control type="email" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label className="text-center mt-4" style={{width: "100%"}}>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        
                    </Form>
                    <div className='mt-4 d-flex justify-content-center align-items-center'>
                        <Button size="lg" onClick={signIn}>Login</Button>
                    </div>
                </Col>
            </Row>
        </Container>
        
    )
}

export default Login;