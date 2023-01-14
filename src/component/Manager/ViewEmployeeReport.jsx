import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { collection, doc, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../../firebase'
import { async } from '@firebase/util'
import DataTable from 'react-data-table-component'
import { LineChart, CartesianGrid, Line, XAxis, YAxis } from 'recharts'

const Employee = () => {
    const navigate = useNavigate()

    const [employees, setEmployees] = useState('')
    const [employeeList, setEmployeeList] = useState('')
    // const [loading, setLoading] = useState(false)
    const employeesCollectionRef = collection(db, "users")

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
        <div className='p-10'>
            <h1 className='text-2xl font-bold py-4 mb-4 text-center'>View Employee Report</h1>

            <LineChart width={1000} height={1000} data={employees}>
                <XAxis dataKey="Name"/>
                <YAxis/>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                <Line type="monotone" dataKey="Salary" stroke="#8884d8" />
            </LineChart>

        </div>

        
    )
}

export default Employee