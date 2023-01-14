import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { collection, doc, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../../firebase'
import { async } from '@firebase/util'
import DataTable from 'react-data-table-component'
import Sidebar from '../Sidebar/Sidebar'

const Employee = () => {
    const {user, signout} = UserAuth()
    const navigate = useNavigate()

    const [employees, setEmployees] = useState('')
    const [employeeList, setEmployeeList] = useState('')
    // const [loading, setLoading] = useState(false)
    const employeesCollectionRef = collection(db, "users")

    const handleSignout = async () => {
        try {
            await signout()
            navigate('/')
            console.log('Signed out!')
        } catch (e) {
            console.log(e.message)
        }
    }

    const columns = [
        {
            name: "Name",
            selector: (row) => row.employee.Name,
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
            name: "Phone",
            selector: (row) => row.Phone,
        },
        {
            name: "Email",
            selector: (row) => row.Email,
        },
        {
            name: "Role",
            selector: (row) => row.Role,
        },
        {
            name: "Working Start Date",
            selector: (row) => row.StartDate,
        },
        {
            name: "Salary",
            selector: (row) => row.Salary,
        }
    ]

    useEffect(() => {
        const getEmployees = async() => {
            const data = await getDocs(employeesCollectionRef)
            setEmployees(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(data.docs)
        }

        getEmployees()
        // console.log(employees.map())
    }, [])

    return (
        <div className='flex flex-column h-full'>
            <Sidebar />

            <div className='px-10 w-full h-full'>
                <h1 className='text-2xl font-bold py-4 mb-4 text-center'>Employee</h1>

                <DataTable columns={columns} data={employees} 
                expandOnRowClicked
                    expandableRows
                    expandableRowsComponent={(row) => {
                        return (
                            <div>
                            <table style={{width: "100%"}}>
                                <tr>
                                    <td style={{width: '5%'}}></td> 
                                    <td style={{width: '15%'}}>Name</td>
                                    <td style={{width: '5%'}}>:</td>
                                <td>{row.data.employee.Name}</td>
                                </tr>

                                <tr>
                                    <td style={{width: '5%'}}></td> 
                                    <td style={{width: '15%'}}>Date of Birth</td>
                                    <td style={{width: '5%'}}>:</td>
                                <td>{row.data.DOB}</td>
                                </tr>

                                <tr>
                                    <td style={{width: '5%'}}></td> 
                                    <td style={{width: '15%'}}>Address</td>
                                    <td style={{width: '5%'}}>:</td>
                                <td>{row.data.Address}</td>
                                </tr>

                                <tr>
                                    <td style={{width: '5%'}}></td> 
                                    <td style={{width: '15%'}}>Phone</td>
                                    <td style={{width: '5%'}}>:</td>
                                <td>{row.data.Phone}</td>
                                </tr>

                                <tr>
                                    <td style={{width: '5%'}}></td> 
                                    <td style={{width: '15%'}}>Email</td>
                                    <td style={{width: '5%'}}>:</td>
                                <td>{row.data.Email}</td>
                                </tr>

                                <tr>
                                    <td style={{width: '5%'}}></td> 
                                    <td style={{width: '15%'}}>Role</td>
                                    <td style={{width: '5%'}}>:</td>
                                <td>{row.data.Role}</td>
                                </tr>

                                <tr>
                                    <td style={{width: '5%'}}></td> 
                                    <td style={{width: '15%'}}>Working Start Date</td>
                                    <td style={{width: '5%'}}>:</td>
                                <td>{row.data.StartDate}</td>
                                </tr>

                                <tr>
                                    <td style={{width: '5%'}}></td> 
                                    <td style={{width: '15%'}}>Working End Date</td>
                                    <td style={{width: '5%'}}>:</td>
                                <td>-</td>
                                </tr>

                                <tr>
                                    <td style={{width: '5%'}}></td> 
                                    <td style={{width: '15%'}}>Salary</td>
                                    <td style={{width: '5%'}}>:</td>
                                <td>Rp {row.data.Salary}</td>
                                </tr>
                            </table>  
                            </div>
                        
                        )
                    }} />

                    <p>Email: {user && user.email}</p>

                    <button onClick={handleSignout} className='px-8 py-2 my-4 border-green-500 bg-blue-600 hover:bg-green-500 p-4 sy-2 text-white'>Sign out</button>
            </div>
        </div>
    )
}

export default Employee