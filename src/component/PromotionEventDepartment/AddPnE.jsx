import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'; 
import { UserAuth } from '../../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import Sidebar from '../Sidebar/Sidebar'

const Register = () => {
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [pnes, setPnes] = useState('')
    const [error, setError] = useState('')
    
    const navigate = useNavigate()

    const pnesCollectionRef = collection(db, "pnes")
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await addDoc(pnesCollectionRef, {Name: name, Type: type, StartDate: startDate, EndDate: endDate})
            
            navigate('/pnes')
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
                    Add Promotions and Events
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Name</label>
                    <input onChange={(e) => setName(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Type</label>
                    <input onChange={(e) => setType(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Start Date</label>
                    <input onChange={(e) => setStartDate(e.target.value)} className='border p-3' type="date" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>End Date</label>
                    <input onChange={(e) => setEndDate(e.target.value)} className='border p-3' type="date" />
                </div>

                <button className='border border-green-500 bg-blue-600 hover:bg-green-500 w-full p-4 sy-2 text-white mt-3'>Add</button>
            </form>
        </div>
        </div>
    );
};

export default Register
