import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'; 
import { UserAuth } from '../../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { Select, Option } from '@material-tailwind/react'

const Register = () => {
    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [type, setType] = useState('')
    const [joinedDate, setJoinedDate] = useState('')
    const [status, setStatus] = useState('')
    const [point, setPoint] = useState('')
    const [members, setMembers] = useState('')
    const [error, setError] = useState('')
    
    const navigate = useNavigate()

    const membersCollectionRef = collection(db, "memberships")
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await addDoc(membersCollectionRef, {Name: name, DOB: dob, Address: address, Phone: phone, Type: type, JoinedDate: joinedDate, Status: status, Point: point})
            
            navigate('/membership')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }

    return (
        <div className='max-w-[700px] mx-auto my-16 p-4'>
            <div>
                <h1 className='text-center text-2xl font-bold py-2'>
                    Add Membership
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

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Phone number</label>
                    <input onChange={(e) => setPhone(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Type</label>
                    <input onChange={(e) => setType(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Joined Date</label>
                    <input onChange={(e) => setJoinedDate(e.target.value)} className='border p-3' type="date" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Status</label>
                    <input onChange={(e) => setStatus(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Point</label>
                    <input onChange={(e) => setPoint(e.target.value)} className='border p-3' type="text" />
                </div>

                <button className='border border-green-500 bg-blue-600 hover:bg-green-500 w-full p-4 sy-2 text-white mt-3'>Create Membership</button>
            </form>
        </div>
    );
};

export default Register
