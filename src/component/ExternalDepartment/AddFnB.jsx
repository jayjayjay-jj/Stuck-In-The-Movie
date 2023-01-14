import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'; 
import { UserAuth } from '../../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'

const Register = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [type, setType] = useState('')
    const [fnbs, setFnbs] = useState('')
    const [error, setError] = useState('')
    
    const navigate = useNavigate()

    const fnbsCollectionRef = collection(db, "fnbs")
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await addDoc(fnbsCollectionRef, {Name: name, Price: price, Stock: stock, Type: type})
            
            navigate('/fnbs')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }

    return (
        <div className='max-w-[700px] mx-auto my-16 p-4'>
            <div>
                <h1 className='text-center text-2xl font-bold py-2'>
                    Add Food and Beverage
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Name</label>
                    <input onChange={(e) => setName(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Price</label>
                    <input onChange={(e) => setPrice(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Stock</label>
                    <input onChange={(e) => setStock(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Type</label>
                    <input onChange={(e) => setType(e.target.value)} className='border p-3' type="text" />
                </div>

                <button className='border border-green-500 bg-blue-600 hover:bg-green-500 w-full p-4 sy-2 text-white mt-3'>Add</button>
            </form>
        </div>
    );
};

export default Register
