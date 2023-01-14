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
            name: "Status",
            selector: (row) => row.Acceptance,
        }
    ]

    useEffect(() => {
        const getFundRequests = async() => {
            const data = await getDocs(fundRequestCollectionRef)
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
                            <td style={{width: '10%'}}>Employee Name</td>
                            <td style={{width: '5%'}}>:</td>
                            <td>{row.data.Name}</td>
                        </tr >

                        <tr>
                            <td style={{width: '5%'}}></td>
                            <td style={{width: '10%'}}>Use Date</td>
                            <td style={{width: '5%'}}>:</td>
                            <td>{row.data.UseDate}</td>
                        </tr>

                        <tr>
                            <td style={{width: '5%'}}></td> 
                            <td style={{width: '10%'}}>Total</td>
                            <td style={{width: '5%'}}>:</td>
                            <td>{row.data.Total}</td>
                        </tr>

                        <tr>
                            <td style={{width: '5%'}}></td>
                            <td style={{width: '10%'}}>Department</td>
                            <td style={{width: '5%'}}>:</td>
                            <td>{row.data.Department}</td>
                        </tr>

                        <tr>
                            <td style={{width: '5%'}}></td>
                            <td style={{width: '10%'}}>Reason</td>
                            <td style={{width: '5%'}}>:</td>
                            <td>{row.data.Reason}</td>
                        </tr>

                        <tr>
                            <td style={{width: '5%'}}></td>
                            <td style={{width: '10%'}}>Status</td>
                            <td style={{width: '5%'}}>:</td>
                            <td>{row.data.Acceptance}</td>
                        </tr>

                    </table>  

                    </div>
                )
            }} />   
            
        </div>
    )
}

export default Employee