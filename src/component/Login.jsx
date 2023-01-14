import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const {login} = UserAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await login(email, password)
            navigate('/employee')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }

    return (
        <div className='max-w-[700px] mx-auto my-16 p-4'>
            <div>
                <h1 className='text-2xl font-bold py-2 text-center'>
                    Login
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type="email" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type="password" />
                </div>

                <button className='border border-500 bg-blue-600 hover:bg-green-500 w-full p-4 sy-2 text-white mt-2'>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login