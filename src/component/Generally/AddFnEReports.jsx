import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'; 
import { UserAuth } from '../../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import Sidebar from '../Sidebar/Sidebar'

const Register = () => {
    const [name, setName] = useState('')
    const [fne, setFne] = useState('')
    const [department, setDepartment] = useState('')
    const [status, setStatus] = useState('')
    const [fnes, setFnes] = useState('')
    const [error, setError] = useState('')
    
    const navigate = useNavigate()

    const fneReportCollectionRef = collection(db, "fnesReports")
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await addDoc(fneReportCollectionRef, {Name: name, FnE: fne, Department: department, Status: status})
            
            navigate('/fneReports')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }

    return (
        <div className='flex flex-column h-full'>
            <Sidebar />

            <div className='px-10 w-full h-full'>
            <div>
                <h1 className='text-center text-2xl font-bold py-2'>
                    Add Facilities and Equipments
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Name</label>
                    <input onChange={(e) => setName(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Facilities and Equipment</label>
                    <input onChange={(e) => setFne(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Department</label>
                    <input onChange={(e) => setDepartment(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Status</label>
                    <input onChange={(e) => setStatus(e.target.value)} className='border p-3' type="text" />
                </div>

                <button className='border border-green-500 bg-blue-600 hover:bg-green-500 w-full p-4 sy-2 text-white mt-3'>Add</button>
            </form>
        </div>
        </div>
    );
};

export default Register
