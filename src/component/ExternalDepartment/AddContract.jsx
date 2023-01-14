import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'; 
import { UserAuth } from '../../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'

const Register = () => {
    const [company, setCompany] = useState('')
    const [movie, setMovie] = useState('')
    const [price, setPrice] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [contracts, setContracts] = useState('')
    const [error, setError] = useState('')
    
    const navigate = useNavigate()

    const contractsCollectionRef = collection(db, "contracts")
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await addDoc(contractsCollectionRef, {Company: company, Movie: movie, Price: price, StartDate: startDate, EndDate: endDate})
            
            navigate('/contracts')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }

    return (
        <div className='max-w-[700px] mx-auto my-16 p-4'>
            <div>
                <h1 className='text-center text-2xl font-bold py-2'>
                    Add Contract with Movie Producer
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Company Name</label>
                    <input onChange={(e) => setCompany(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Movie Name</label>
                    <input onChange={(e) => setMovie(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Price</label>
                    <input onChange={(e) => setPrice(e.target.value)} className='border p-3' type="text" />
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
    );
};

export default Register
