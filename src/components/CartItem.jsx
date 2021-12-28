import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { add, remove } from "../actions"
import { Card, Button, Container, Col, Row } from 'react-bootstrap';

const CartItem = (props) => {
    const {title, url, price} = props
    const [totalPrice, setTotalPrice] = useState(price)
    const cart = useSelector(state => state.cart)
    const index = cart.findIndex(e => e.name === title)
    const [itemNum, setItemNum] = useState(cart.filter(e => e.name === title).length)
    const dispatch = useDispatch()
    const [display, setDisplay] = useState(true)



    useEffect(() => {
        const totalP = itemNum * price
        setTotalPrice(totalP)
    }, [itemNum])


    const addItem = () => {
        setItemNum(prevNum => prevNum + 1)
        dispatch(add(cart[index]))
    }

    const removeItem = () => {
        setItemNum(prevNum => prevNum > 0 ? prevNum - 1 : 0)
        dispatch(remove(cart[index]))
        const arrayWithoutRemovedItem = cart.filter(e => e !== cart[index])
        localStorage.setItem('items', JSON.stringify(arrayWithoutRemovedItem))
        if((totalPrice - price) === 0) {setDisplay(false)}
    }
    
    if(display){
        return (
        <Card style={{width: '100%', background: '#858f7e'}}>
            <Card.Body>
                <Container className='d-flex flex-row justify-content-around'>
                    <Row>
                        <Col>
                            <Card.Title className='text-center'>{title}</Card.Title>
                            <Card.Img src={url}/>
                        </Col>
                    </Row>
                    <Row className='align-items-center'>
                        <Col>
                            <Button variant='secondary' onClick={addItem}>+</Button>
                        </Col>
                        <Col>
                            <Button variant='secondary' onClick={removeItem}>-</Button>
                        </Col>
                    </Row>
                    <Row className='align-items-center'>
                        <Col>
                            <Card.Text>Price: {price} x{itemNum}</Card.Text>
                            <Card.Text>Total price: <span className='border border-secondary p-1 rounded' style={{fontWeight: 'bold'}}>{totalPrice}</span></Card.Text>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
        )
    }else {
        return null
    }
    

}

export default CartItem;