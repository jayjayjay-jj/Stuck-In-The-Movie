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

    const [fundRequests, setFundRequests] = useState('')
    const [fundRequestList, setFundRequestsList] = useState('')
    const fundRequestCollectionRef = collection(db, "fundRequests")
    const frCollectionRef = query(collection(db, "fundRequests"), where("Acceptance", "==", "requested"));

    const columns = [
        {
            name: "Employee Name",
            selector: (row) => row.Name,
        }, 
        {
            name: "Use Date",
            selector: (row) => row.UseDate,
        }, 
        {
            name: "Total",
            selector: (row) => row.Total,
        }, 
        {
            name: "Department",
            selector: (row) => row.Department,
        }, 
        {
            name: "Reason",
            selector: (row) => row.Reason,
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
        const status = doc(fundRequestCollectionRef, rowId);
        await updateDoc(status, {Acceptance: "Accept"})
        window.location.reload()
    }
    
    const Decline = async (rowId) => {
        const status = doc(fundRequestCollectionRef, rowId);
        await updateDoc(status, {Acceptance: "Decline"})
        window.location.reload()
    }

    useEffect(() => {
        const getFundRequests = async() => {
            const data = await getDocs(frCollectionRef)
            setFundRequests(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(data.docs)
        }

        getFundRequests()
    }, [])

    return (
        <div className='p-10'>
            <h1 className='text-2xl font-bold py-4 mb-4 text-center'>Fund Requests</h1>

            <DataTable columns={columns} data={fundRequests} 
            expandOnRowClicked
            expandableRows
            expandableRowsComponent={(row) => {
                return (
                    <div>
                    <table style={{width: "100%"}}>
                        <tr >
                            <td style={{width: '5%'}}></td>
                            <td style={{width: '5%'}}>Name</td>
                            <td style={{width: '5%'}}>:</td>
                            <td>{row.data.Name}</td>
                        </tr >

                        <tr>
                            <td style={{width: '5%'}}></td>
                            <td style={{width: '5%'}}>Type</td>
                            <td style={{width: '5%'}}>:</td>
                            <td>{row.data.Type}</td>
                        </tr>

                        <tr>
                            <td style={{width: '5%'}}></td> 
                            <td style={{width: '5%'}}>Start Date</td>
                            <td style={{width: '5%'}}>:</td>
                            <td>{row.data.StartDate}</td>
                        </tr>

                        <tr>
                            <td style={{width: '5%'}}></td>
                            <td style={{width: '5%'}}>End Date</td>
                            <td style={{width: '5%'}}>:</td>
                            <td>{row.data.EndDate}</td>
                        </tr>

                    </table>  


                    </div>

                )
            }} />   
        </div>
    )
}

export default Employee