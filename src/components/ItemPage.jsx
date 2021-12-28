import {add} from '../actions/index'
import { useDispatch } from 'react-redux';
import { useParams } from "react-router";
import useFetch from "../useFetch";
import { Card, Button } from 'react-bootstrap';

export default function ItemPage(props) {
    const { id } = useParams()
    const itemPageUrl = `https://fortnite-api.theapinetwork.com/item/get?id=${id}`


    const {data, loading, error} = useFetch(itemPageUrl)
    const dispatch = useDispatch()

    if(loading) return <h2>Loading...</h2>
    if(error) console.log(error)

    return (
        <Card className='mx-auto mt-4' style={{background: '#858f7e', border: '10px solid grey', width: '30%'}}>
            <Card.Body>
                <Card.Title className='text-center' style={{fontWeight: 'bold'}}>{data?.data.item.name}</Card.Title>
                <Card.Img src={data?.data.item.images.icon}/>
                <Card.Text> Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Card.Text>
                <Card.Text className='text-center'>Price: <span className='border border-secondary p-1 rounded' style={{fontWeight: 'bold'}}>{data?.data.item.cost ? data.data.item.cost : 2350}</span></Card.Text>
                <Button className='d-block mx-auto' onClick={() => dispatch(add(data.data.item))}>Add to cart</Button>
            </Card.Body>
        </Card>
    )
}