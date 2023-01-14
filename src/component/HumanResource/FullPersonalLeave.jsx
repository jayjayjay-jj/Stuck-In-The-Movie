import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { collection, collectionGroup, doc, getDocs, updateDoc, query, where } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../../firebase'
import { async } from '@firebase/util'
import DataTable from 'react-data-table-component'
import Sidebar from '../Sidebar/Sidebar'

const Employee = () => {
    const navigate = useNavigate()

    const [personalLeaves, setPersonalLeaves] = useState('')
    const [personalLeavesList, setPersonalLeavesList] = useState('')
    const personalLeaveCollectionRef = collection(db, "personalLeaves")

    const columns = [
        {
            name: "Employee Name",
            selector: (row) => row.Name,
        }, 
        {
            name: "Start Date",
            selector: (row) => row.StartDate,
        }, 
        {
            name: "End Date",
            selector: (row) => row.EndDate,
        }, 
        {
            name: "Reason",
            selector: (row) => row.Reason,
        }, 
        {
            name: "Acceptance",
            selector: (row) => row.Acceptance,
        }
    ]

    useEffect(() => {
        const getPersonalLeaves = async() => {
            const data = await getDocs(personalLeaveCollectionRef)
            setPersonalLeaves(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(data.docs)
        }

        getPersonalLeaves()
    }, [])

    return (
        <div className='flex flex-column h-full'>
            <Sidebar />

            <div className='px-10 w-full h-full'>
            <h1 className='text-2xl font-bold py-4 mb-4 text-center'>Personal Leaves</h1>

            <DataTable columns={columns} data={personalLeaves} />   
        </div>       
        </div>
    )
}

export default Employee