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

    const [pnes, setPnes] = useState('')
    const [pnesList, setPnesList] = useState('')
    const pnesCollectionRef = collection(db, "pnes")

    const columns = [
        {
            name: "Name",
            selector: (row) => row.Name,
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

    const qr = (pneID) => {
        return(
            <QRCode
                size={150}
                value={pneID}
            />
        )
    }

    useEffect(() => {
        const getPnes = async() => {
            const data = await getDocs(pnesCollectionRef)
            setPnes(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(data.docs)
        }

        getPnes()
    }, [])

    return (
        <div className='flex flex-column h-full'>
            <Sidebar />

            <div className='px-10 w-full h-full'>
            <h1 className='text-2xl font-bold py-4 mb-4 text-center'>Promotions and Events</h1>

            <DataTable columns={columns} data={pnes} 
            
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

                        <tr>
                            <td style={{width: '5%'}}></td>
                            <td style={{width: '5%'}}>Qr Code</td>
                            <td style={{width: '5%'}}>:</td>
                            {qr(row.data.id)}
                        </tr>
                    </table>  


                    </div>

                )
            }} />          
        </div>
        </div>
    )
}

export default Employee