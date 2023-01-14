import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'; 
import { UserAuth } from '../../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import Sidebar from '../Sidebar/Sidebar'

const Register = () => {
    // const [name, setName] = useState('')
    const [movie, setMovie] = useState('')
    const [shift, setShift] = useState('')
    const [count, setCount] = useState('')
    const [theater, setTheater] = useState('')
    const [schedule, setSchedule] = useState('')
    const [error, setError] = useState('')
    
    const navigate = useNavigate()

    const scheduleCollectionRef = collection(db, "schedules")
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await addDoc(scheduleCollectionRef, {Movie: movie, Shift: shift, Count: count, Theater: theater})
            
            navigate('/schedules')
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
                    Add Movie Schedule
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Movie</label>
                    <input onChange={(e) => setMovie(e.target.value)} className='border p-3' type="datetime" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Shift</label>
                    <input onChange={(e) => setShift(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Count</label>
                    <input onChange={(e) => setCount(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Theater</label>
                    <input onChange={(e) => setTheater(e.target.value)} className='border p-3' type="text" />
                </div>

                <button className='border border-green-500 bg-blue-600 hover:bg-green-500 w-full p-4 sy-2 text-white mt-3'>Add</button>
            </form>
        </div>
        </div>
    );
};

export default Register
