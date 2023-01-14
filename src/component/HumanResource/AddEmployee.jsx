import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'; 
import { UserAuth } from '../../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { Select, Option } from '@material-tailwind/react'
import Sidebar from '../Sidebar/Sidebar';

const Register = () => {
    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [startDate, setStartDate] = useState('')
    const [salary, setSalary] = useState('')
    const [role, setRole] = useState('')
    const [users, setUsers] = useState('')
    const [error, setError] = useState('')
    
    const { createUser } = UserAuth();
    const navigate = useNavigate()

    const usersCollectionRef = collection(db, "users")
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            console.log(dob)
            console.log(dob.slice(8,10) + dob.slice(5,7) + dob.slice(0,4)) //dd-mm-yyyy

            await createUser(email, password)
            await addDoc(usersCollectionRef, {DOB: dob, Address: address, Phone: phone, Email: email, StartDate: startDate, Salary: salary, Role: role, employee: {Name: name, id: auth.currentUser.uid}})
            
            navigate('/employee')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }

    return (
        <div className='flex flex-column'>
            <Sidebar />

            <div className='px-10 w-full'>
            <div>
                <h1 className='text-center text-2xl font-bold py-2 mt-5'>
                    Add Employee Account
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
                    <label className='py-2 font-medium'>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type="email" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type="password" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Working Start Date </label>
                    <input onChange={(e) => setStartDate(e.target.value)} className='border p-3' type="date" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Salary</label>
                    <input onChange={(e) => setSalary(e.target.value)} className='border p-3' type="text" />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Role</label>
                    <input onChange={(e) => setRole(e.target.value)} className='border p-3' type="text" />
                </div>

                {/* <div className='flex flex-row py-2 mt-3'>
                    <label className='py-2 font-medium mr-5'>Role</label>
                    <div className='flex w-full flex-col gap-4'>
                        <Select className='border-full w-100 h-10 p-2' onChange={(e) => setRole(e.target.value)}>
                            <Option value='Manager'>Manager</Option>
                            <Option value='Human Resource Department'>Human Resource Department</Option>
                            <Option value='Accounting and Finance Department'>Accounting and Finance Department</Option>
                            <Option value='Storage Department'>Storage Department</Option>
                            <Option value='External Department'>External Department</Option>
                            <Option value='Promotion and Event Department'>Promotion and Event Department</Option>
                            <Option value='Schedule Division - Movie Department'>Schedule Division - Movie Department</Option>
                            <Option value='Front Office Division - Movie Department'>Front Office Division - Movie Department</Option>
                            <Option value='Operation Division - Movie Department'>Operation Division - Movie Department</Option>
                            <Option value='Front Office Division - Cafe Department'>Front Office Division - Cafe Department</Option>
                            <Option value='Kitchen Division - Cafe Department'>Kitchen Division - Cafe Department</Option>
                            <Option value='Administrator Department'>Administrator Department</Option>
                        </Select>
                    </div>
                </div> */}

                <button className='border border-green-500 bg-blue-600 mb-5 hover:bg-green-500 w-full p-4 sy-2 text-white mt-3' onClick={createUser}>Register</button>
            </form>
        </div>
        </div>
    );
};

export default Register
