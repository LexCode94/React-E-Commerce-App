import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Table } from 'react-bootstrap';

const Dashboard = () => {

    const navigate = useNavigate()
    const [dashboardItems, setDashboardItems] = useState([])


    useEffect(() => {
        const accessToken = localStorage.getItem('access')
        axios.get('http://localhost:3001/purchases', {headers: {'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'}})
        .then(response => {
            console.log(response.data)
            setDashboardItems(response.data.reverse())
        })
        .catch(err => {
            console.log(err)
            console.log("GRESKA!")

            const refreshToken = localStorage.getItem('refresh')
            axios.post('http://localhost:4000/token ', JSON.stringify({token: refreshToken}), {headers:{'Content-Type': 'application/json'}})
            .then(response => {
                console.log(response.data)
                localStorage.setItem('access', response.data.accessToken)

                const accessToken = response.data.accessToken
                axios.get('http://localhost:3001/purchases', {headers: {'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'}})
                .then(res => console.log(res))
                .catch(err => {
                    console.log(err)
                    console.log("GRESKA 2")
                })
            })
            .catch(err => {
                console.log(err)
                navigate("/login")
            })
        })
    }, [])


    return (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Purchase Date</th>
                </tr>
            </thead>
            <tbody>
                {dashboardItems.map(e => {
                   return e.products.map(element => {
                        return <tr>
                            <td>{element.name}</td>
                            <td>{element.cost}</td>
                            <td>{e.createdAt}</td>
                            </tr>
                    })
                })}
            </tbody>
        </Table>
    )
}



export default Dashboard;