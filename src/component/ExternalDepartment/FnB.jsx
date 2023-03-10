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

    const [fnbs, setFnbs] = useState('')
    const [fnbsList, setFnbsList] = useState('')
    const fnbsCollectionRef = collection(db, "fnbs")

    const columns = [
        {
            name: "Name",
            selector: (row) => row.Name,
        }, 
        {
            name: "Price",
            selector: (row) => row.Price,
        }, 
        {
            name: "Stock",
            selector: (row) => row.Stock,
        }, 
        {
            name: "Type",
            selector: (row) => row.Type,
        }
    ]

    useEffect(() => {
        const getFnbs = async() => {
            const data = await getDocs(fnbsCollectionRef)
            setFnbs(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(data.docs)
        }

        getFnbs()
    }, [])

    return (
        <div className='flex flex-column h-full'>
            <Sidebar />

            <div className='px-10 w-full h-full'>
            <h1 className='text-2xl font-bold py-4 mb-4 text-center'>Food and Beverages</h1>

            <DataTable columns={columns} data={fnbs} />
        </div>
        </div>
    )
}

export default Employee