import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { collection, doc, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../../firebase'
import { async } from '@firebase/util'
import DataTable from 'react-data-table-component'
import QRCode from 'react-qr-code'

const Employee = () => {
    const navigate = useNavigate()

    const [fnes, setFnes] = useState('')
    const [fnesList, setFnesList] = useState('')
    const fnesCollectionRef = collection(db, "fnes")

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
            name: "Quantity",
            selector: (row) => row.Quantity,
        }, 
        {
            name: "Department",
            selector: (row) => row.Department,
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
        const getFnes = async() => {
            const data = await getDocs(fnesCollectionRef)
            setFnes(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(data.docs)
        }

        getFnes()
    }, [])

    return (
        <div className='p-10'>
            <h1 className='text-2xl font-bold py-4 mb-4 text-center'>Facilities and Equipments</h1>

            <DataTable columns={columns} data={fnes} 
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
                            <td style={{width: '5%'}}>Price</td>
                            <td style={{width: '5%'}}>:</td>
                            <td>{row.data.Price}</td>
                        </tr>

                        <tr>
                            <td style={{width: '5%'}}></td> 
                            <td style={{width: '5%'}}>Quantity</td>
                            <td style={{width: '5%'}}>:</td>
                            <td>{row.data.Quantity}</td>
                        </tr>

                        <tr>
                            <td style={{width: '5%'}}></td>
                            <td style={{width: '5%'}}>Department</td>
                            <td style={{width: '5%'}}>:</td>
                            <td>{row.data.Department}</td>
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
    )
}

export default Employee