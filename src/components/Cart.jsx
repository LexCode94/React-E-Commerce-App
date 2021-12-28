import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import CartItem from './CartItem';
import { clear } from "../actions";
import axios from "axios";
import { useNavigate } from "react-router";
import { Container, Col, Row, Button } from 'react-bootstrap';


export default function Cart() {
    const cart = useSelector(state => state.cart)
    
    const [purchasedItems, setPurchasedItems] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(cart))
        const noDuplicates = [...cart].filter((e, i, a) => i === a.findIndex(t => t.name === e.name))
        setPurchasedItems(noDuplicates)
    }, [cart])


    const getAccessToken = () => {
        const refreshToken = localStorage.getItem('refresh')
        axios.post('http://localhost:4000/token ', JSON.stringify({token: refreshToken}), {headers:{'Content-Type': 'application/json'}})
        .then(response => {
            console.log(response.data)
            localStorage.setItem('access', response.data.accessToken)
            tryToBuy()
        })
        .catch(err => {
            console.log(err)
            navigate("/login")
        })
    }

    const tryToBuy = () => {
        const body = {
            products: cart
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access')
        }
        axios.post('http://localhost:3001/purchases', JSON.stringify(body), {headers: headers})
        .then(res => {
            console.log("Purchasing items")
            console.log(res)
        })
        .catch(e => {
            console.log(e)
            getAccessToken()
        })

    }
    
    const buy = () => {
        if(cart.length){
            tryToBuy()
            dispatch(clear())
            setPurchasedItems([])
        }
        
    }

    const clearCart = () => {
        dispatch(clear())
        setPurchasedItems([])
    }

    return(
        <Container className=' align-items-center'>
            <Row>
                <h4 className='d-flex justify-content-center mt-4 mb-0'>SHOPPING CART</h4>
            </Row>
             {purchasedItems.length > 0 ? purchasedItems.map(e => {
                return <Col><CartItem title={e.name} url={e.images.icon} price={e.cost ? e.cost : 2350} key={e.name}/></Col>
            }) : <h2 className='d-flex justify-content-center' style={{marginTop: '200px', marginBottom: '200px'}}>The cart is empty</h2>}
            <Row className='d-flex justify-content-around'>
                <Col className='d-flex justify-content-around mt-4'>
                    <Button onClick={buy}>Buy</Button>
                    <Button onClick={clearCart}>Clear Cart</Button>
                </Col>
            </Row>
            
        </Container>
        
    )
}