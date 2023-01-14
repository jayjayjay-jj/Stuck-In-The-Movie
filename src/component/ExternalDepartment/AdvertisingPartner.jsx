import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { collection, doc, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../../firebase'
import { async } from '@firebase/util'
import DataTable from 'react-data-table-component'

const Employee = () => {
    const navigate = useNavigate()

    const [advertises, setAdvertises] = useState('')
    const [advertisessList, setAdvertisesList] = useState('')
    const advertisesCollectionRef = collection(db, "advertises")

    const columns = [
        {
            name: "Company Name",
            selector: (row) => row.Company,
        }, 
        {
            name: "Price",
            selector: (row) => row.Price,
        },
        {
            name: "Type",
            selector: (row) => row.Type,
        }, 
        {
            name: "Start Date",
            selector: (row) => row.StartDate,
        }, 
        {
            name: "End Date",
            selector: (row) => row.EndDate,
        }
    ]

    const generate = () => {
        window.print()
    }

    useEffect(() => {
        const getAdvertises = async() => {
            const data = await getDocs(advertisesCollectionRef)
            setAdvertises(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(data.docs)
        }

        getAdvertises()
    }, [])

    return (
        <div className='p-10'>
            <h1 className='text-2xl font-bold py-4 mb-4 text-center'>Advertising Partner</h1>

            <DataTable columns={columns} data={advertises} />

            <div className='justify-items: center'>
                <button onClick={() => generate()} className='px-8 py-2 my-4 border-green-500 bg-blue-600 hover:bg-green-500 p-4 sy-2 text-white'> 
                    Generate Report
                </button>
            </div>
            
        </div>
    )
}

export default Employee