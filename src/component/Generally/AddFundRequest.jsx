import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'; 
import { UserAuth } from '../../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { Select, Option } from '@material-tailwind/react'

const Register = () => {
    const [name, setName] = useState('')
    const [useDate, setUseDate] = useState('')
    const [total, setTotal] = useState('')
    const [department, setDepartment] = useState('')
    const [reason, setReason] = useState('')
    const [acceptance, setAcceptance] = useState('')
    const [personalLeave, setPersonalLeave] = useState('')
    const [error, setError] = useState('')
    
    const navigate = useNavigate()

    const personalLeaveCollectionRef = collection(db, "fundRequests")
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await addDoc(personalLeaveCollectionRef, {Name: name, UseDate: useDate, Total: total, Department: department, Reason: reason, Acceptance: "requested"})
            
            navigate('/fundRequest')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }

    return (
        <div className='max-w-[700px] mx-auto my-16 p-4'>
            <div>
                <h1 className='text-center text-2xl font-bold py-2'>
                    Add Personal Leave
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
            <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Name</label>
                    <input onChange={(e) => setName(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Fund Use Date</label>
                    <input onChange={(e) => setUseDate(e.target.value)} className='border p-3' type="date" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Total</label>
                    <input onChange={(e) => setTotal(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Department</label>
                    <input onChange={(e) => setDepartment(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Reason</label>
                    <input onChange={(e) => setReason(e.target.value)} className='border p-3' type="text" />
                </div>

                <button className='border border-green-500 bg-blue-600 hover:bg-green-500 w-full p-4 sy-2 text-white mt-3'>Add Request</button>
            </form>
        </div>
    );
};

export default Register
