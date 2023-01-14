import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { collection, collectionGroup, doc, getDocs, updateDoc, query, where } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../../firebase'
import { async } from '@firebase/util'
import DataTable from 'react-data-table-component'

const Employee = () => {
    const navigate = useNavigate()

    const [fneReports, setFneReports] = useState('')
    const [fneReportsList, setFneReportsList] = useState('')
    const fneReportCollectionRef = collection(db, "fnesReports")

    const columns = [
        {
            name: "Employee Name",
            selector: (row) => row.Name,
        }, 
        {
            name: "Facilities and Equipments",
            selector: (row) => row.FnE,
        }, 
        {
            name: "Department",
            selector: (row) => row.Department,
        }, 
        {
            name: "Status",
            selector: (row) => row.Status,
        }
    ]

    useEffect(() => {
        const getFneReports = async() => {
            const data = await getDocs(fneReportCollectionRef)
            setFneReports(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(data.docs)
        }

        getFneReports()
    }, [])

    return (
        <div className='p-10'>
            <h1 className='text-2xl font-bold py-4 mb-4 text-center'>Facilities and Equipments Report</h1>

            <DataTable columns={columns} data={fneReports} />          
        </div>
    )
}

export default Employee