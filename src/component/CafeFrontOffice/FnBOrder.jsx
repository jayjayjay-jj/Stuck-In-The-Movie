import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { collection, doc, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../../firebase'
import { async } from '@firebase/util'
import DataTable from 'react-data-table-component'
import { LineChart, CartesianGrid, Line } from 'recharts'
import { XAxis, YAxis } from 'recharts'
import Sidebar from '../Sidebar/Sidebar'

const Employee = () => {
    const navigate = useNavigate()

    const [fnbOrder, setfnbOrder] = useState('')
    const [fnbOrderList, setFnbOrderList] = useState('')
    const orderCollectionRef = collection(db, "fnbOrders")

    const columns = [
        {
            name: "Time",
            selector: (row) => row.Time,
        }, 
        {
            name: "Menu",
            selector: (row) => row.Menu,
        }, 
        {
            name: "Quantity",
            selector: (row) => row.Quantity,
        }, 
        {
            name: "Payment",
            selector: (row) => row.Payment,
        }
    ]

    useEffect(() => {
        const getFnBOrder = async() => {
            const data = await getDocs(orderCollectionRef)
            setfnbOrder(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(data.docs)
        }

        getFnBOrder()
    }, [])

    return (
        <div className='flex flex-column h-full'>
            <Sidebar />

            <div className='px-10 w-full h-full'>
            <h1 className='text-2xl font-bold py-4 mb-4 text-center'>Food and Beverages Order</h1>

            <DataTable columns={columns} data={fnbOrder} />
        </div>
        </div>
    )
}

export default Employee