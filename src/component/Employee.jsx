import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Employee = () => {
    const {user, signout} = UserAuth()
    const navigate = useNavigate()

    const handleSignout = async () => {
        try {
            await signout()
            navigate('/')
            console.log('Signed out!')
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className='max-w-[800px] mx-auto my-16 p-4'>
            <h1 className='text-2xl font-bold py-4'>Employee</h1>

            <p>Email: {user && user.email}</p>

            <button onClick={handleSignout} className='px-8 py-2 my-4 border-green-500 bg-blue-600 hover:bg-green-500 p-4 sy-2 text-white'>Sign out</button>
        </div>
    )
}

export default Employee