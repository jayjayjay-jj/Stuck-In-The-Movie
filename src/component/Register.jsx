import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'; 
import { UserAuth } from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    
    const { createUser } = UserAuth();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await createUser(email, password)
            navigate('/employee')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }

    return (
        <div className='max-w-[700px] mx-auto my-16 p-4'>
            <div>
                <h1 className='text-2xl font-bold py-2'>
                    Register
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Name</label>
                    <input onChange={(e) => setName(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Date of Birth</label>
                    <input onChange={(e) => setDob(e.target.value)} className='border p-3' type="date" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Address</label>
                    <input onChange={(e) => setAddress(e.target.value)} className='border p-3' type="text" />
                </div>

                {/* <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Address</label>
                    <input className='border p-3' type="radio" />Male
                    <input className='border p-3' type="radio" />Female
                </div> */}

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Phone number</label>
                    <input onChange={(e) => setPhone(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type="email" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type="password" />
                </div>

                <div>
                    <p className='py-2'>
                        Already have an account? <Link to='/' className='underline'>Login here</Link>
                    </p>
                </div>

                <button className='border border-green-500 bg-blue-600 hover:bg-green-500 w-full p-4 sy-2 text-white'>Register</button>
            </form>
        </div>
    );
};

export default Register
