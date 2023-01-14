import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'; 
import { UserAuth } from '../../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import Sidebar from '../Sidebar/Sidebar'

const Register = () => {
    // const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [menu, setMenu] = useState('')
    const [quantity, setQuantity] = useState('')
    const [payment, setPayment] = useState('')
    const [fnbOrder, setFnbOrder] = useState('')
    const [error, setError] = useState('')
    
    const navigate = useNavigate()

    const orderCollectionRef = collection(db, "fnbOrders")
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await addDoc(orderCollectionRef, {Time: time, Menu: menu, Quantity: quantity, Payment: payment})
            
            navigate('/fnbOrders')
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
                    Add Food and Beverages Order
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Time</label>
                    <input onChange={(e) => setTime(e.target.value)} className='border p-3' type="datetime" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Menu</label>
                    <input onChange={(e) => setMenu(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Quantity</label>
                    <input onChange={(e) => setQuantity(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Payment</label>
                    <input onChange={(e) => setPayment(e.target.value)} className='border p-3' type="text" />
                </div>

                <button className='border border-green-500 bg-blue-600 hover:bg-green-500 w-full p-4 sy-2 text-white mt-3'>Add</button>
            </form>
        </div>
        </div>
    );
};

export default Register
