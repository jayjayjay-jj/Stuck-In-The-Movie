import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { collection, doc, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../../firebase'
import { async } from '@firebase/util'
import DataTable from 'react-data-table-component'
import QRCode from "react-qr-code";
import { button } from '@material-tailwind/react'
import Sidebar from '../Sidebar/Sidebar'

const Employee = () => {
    const navigate = useNavigate()

    const [memberships, setMemberships] = useState('')
    const [membershipsList, setMembershipsList] = useState('')
    const membershipssCollectionRef = collection(db, "memberships")

    const columns = [
        {
            name: "Name",
            selector: (row) => row.Name,
        }, 
        {
            name: "Date of Birth",
            selector: (row) => row.DOB,
        }, 
        {
            name: "Address",
            selector: (row) => row.Address,
        }, 
        {
            name: "Phone Number",
            selector: (row) => row.Phone,
        }, 
        {
            name: "Type",
            selector: (row) => row.Type,
        }, 
        {
            name: "Joined Date",
            selector: (row) => row.JoinedDate,
        }, 
        {
            name: "Status",
            selector: (row) => row.Status,
        }, 
        {
            name: "Point",
            selector: (row) => row.Point,
        }
    ]

    useEffect(() => {
        const getMemberships = async() => {
            const data = await getDocs(membershipssCollectionRef)
            setMemberships(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(data.docs)
        }

        getMemberships()
    }, [])

    return (
        <div className='flex flex-column h-full'>
            <Sidebar />

            <div className='px-10 w-full h-full'>
            <h1 className='text-2xl font-bold py-4 mb-4 text-center'>Memberships</h1>

            <DataTable columns={columns} data={memberships} />          
        </div>
        </div>
    )
}

export default Employee