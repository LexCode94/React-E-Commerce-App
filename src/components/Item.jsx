import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";


const Item = (props) => {

    return(
        <Card style={{height: '350px', marginBottom: '15px', width: '100%'}}>
            <Link to={`/buy/${props.itemId}`}>
                <Card.Body>
                    <Card.Title className="text-center">{props.title}</Card.Title>
                    <Card.Img src={props.url}/>
                    <Card.Text className='text-center mt-4'>Price: {props.price}</Card.Text>
                </Card.Body>
            </Link>
        </Card>
    )
}

export default Item;