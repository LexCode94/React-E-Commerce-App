import { useState, useEffect } from "react"
import Item from "./Item"
import useFetch from "../useFetch"
import { Container, Row, Col, Form } from "react-bootstrap"

const CardContainer = () => {
    const[items, setItems] = useState()
    const BASE_URL = 'https://fortnite-api.theapinetwork.com/items/list'

    const {data, loading, error} = useFetch(BASE_URL)

    useEffect(() => {
        if(data){
            setItems(data.data.slice(8,28))
        }
        
    }, [data])

    const onSearchChange = (event) => {
        console.log(event.target.value)
        const lowerCase = event.target.value.toLowerCase()

        setItems(data.data.slice(8, 28).filter(element => {
            return element.item.name.toLowerCase().startsWith(lowerCase)
        }))
        console.log(items)
    }
      
    if(loading) return <h1 style={{marginLeft: '45%', marginTop: '25%'}}>Loading...</h1>
    

    return (
        <Container>
            <Row>
                <Col>
                    <Form className='mx-auto mt-4 mb-4' style={{width: '50%'}}>
                        <Form.Control placeholder='Enter item name...' onChange={event => onSearchChange(event)}></Form.Control>
                    </Form>
                </Col>
            </Row>
            <Row className='justify-content-center'>{items?.map(e => {
                return <Col lg={3} md={4} xs={6} key={e.itemId}><Item title={e.item.name} url={e.item.images.icon} price={e.item.cost ? e.item.cost : 2350} key={e.itemId} itemId={e.itemId}/></Col>
            })}</Row>
        </Container>
    )

}


export default CardContainer;