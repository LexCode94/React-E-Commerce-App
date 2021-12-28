import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'; 

const Register = () => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const URL = 'http://localhost:3001/users' 

    const navigate = useNavigate()
    

    const register = () => {
        const body = {
            username: username,
            password: password
        }

        axios.post(URL, JSON.stringify(body), {headers:{'Content-Type': 'application/json'}})
        .then(res => {
            console.log(res)
            navigate('/login')
        })
        .catch(err => {
            console.log(err)
            alert("Please try again.")
        })
        
    }

    return(
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
                        <Button size='lg' onClick={register}>Register</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}


export default Register;