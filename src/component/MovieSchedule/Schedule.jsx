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

    const [schedule, setSchedule] = useState('')
    const [scheduleList, seScheduleList] = useState('')
    const scheduleCollectionRef = collection(db, "schedules")

    const columns = [
        {
            name: "Movie",
            selector: (row) => row.Movie,
        }, 
        {
            name: "Shift",
            selector: (row) => row.Shift,
        }, 
        {
            name: "Count",
            selector: (row) => row.Count,
        },
        {
            name: "Theater",
            selector: (row) => row.Theater,
        }
    ]

    useEffect(() => {
        const getSchedule = async() => {
            const data = await getDocs(scheduleCollectionRef)
            setSchedule(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(data.docs)
        }

        getSchedule()
    }, [])

    return (
        <div className='flex flex-column h-full'>
            <Sidebar />

            <div className='px-10 w-full h-full'>
            <h1 className='text-2xl font-bold py-4 mb-4 text-center'>Movie Schedule</h1>

            <DataTable columns={columns} data={schedule} />
        </div>
        </div>
    )
}

export default Employee