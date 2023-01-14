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

    const [personalLeaves, setPersonalLeaves] = useState('')
    const [personalLeavesList, setPersonalLeavesList] = useState('')
    const personalLeaveCollectionRef = collection(db, "personalLeaves")
    const plCollectionRef = query(collection(db, "personalLeaves"), where("Acceptance", "==", "requested"));

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
        }, 
        {
            name: "Status Update",
            cell: (row) => {
                return (
                    <div>
                        <button onClick={() => {Accept(row.id)}} 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Accept</button>
    
                        
                        <button onClick={() => {Decline(row.id)}} 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Decline</button>
                    </div>
                )
                }
        }
    ]

    const Accept = async (rowId) => {
        const status = doc(personalLeaveCollectionRef, rowId);
        await updateDoc(status, {Acceptance: "Accept"})
        window.location.reload()
    }
    
    const Decline = async (rowId) => {
        const status = doc(personalLeaveCollectionRef, rowId);
        await updateDoc(status, {Acceptance: "Decline"})
        window.location.reload()
    }

    useEffect(() => {
        const getPersonalLeaves = async() => {
            const data = await getDocs(plCollectionRef)
            setPersonalLeaves(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(data.docs)
        }

        getPersonalLeaves()
    }, [])

    return (
        <div className='p-10'>
            <h1 className='text-2xl font-bold py-4 mb-4 text-center'>Personal Leaves</h1>

            <DataTable columns={columns} data={personalLeaves} />          
        </div>
    )
}

export default Employee