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

    const [movieOrder, setMovieOrder] = useState('')
    const [movieOrderList, setMovieOrderList] = useState('')
    const movieOrderCollectionRef = collection(db, "movieOrders")

    const columns = [
        {
            name: "Time",
            selector: (row) => row.Time,
        }, 
        {
            name: "Movie",
            selector: (row) => row.Movie,
        }, 
        {
            name: "Quantity",
            selector: (row) => row.Quantity,
        }, 
        {
            name: "Payment",
            selector: (row) => row.Payment,
        },
        {
            name: "Schedule",
            selector: (row) => row.Schedule,
        }
    ]

    useEffect(() => {
        const getMovieOrder = async() => {
            const data = await getDocs(movieOrderCollectionRef)
            setMovieOrder(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(data.docs)
        }

        getMovieOrder()
    }, [])

    return (
        <div className='flex flex-column h-full'>
            <Sidebar />

            <div className='px-10 w-full h-full'>
            <h1 className='text-2xl font-bold py-4 mb-4 text-center'>Food and Beverages Order</h1>

            <DataTable columns={columns} data={movieOrder} />
        </div>
        </div>
    )
}

export default Employee