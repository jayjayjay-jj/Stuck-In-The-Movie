import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { collection, doc, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../../firebase'
import { async } from '@firebase/util'
import DataTable from 'react-data-table-component'

const Employee = () => {
    const navigate = useNavigate()

    const [contracts, setContracts] = useState('')
    const [contractsList, setContractsLists] = useState('')
    const contractssCollectionRef = collection(db, "contracts")
    
    const [fnbs, setFnbs] = useState('')
    const [fnbsList, setFnbsList] = useState('')
    const fnbsCollectionRef = collection(db, "fnbs")
    
    const [advertises, setAdvertises] = useState('')
    const [advertisessList, setAdvertisesList] = useState('')
    const advertisesCollectionRef = collection(db, "advertises")

    const contractColumns = [
        {
            name: "Company Name",
            selector: (row) => row.Company,
        }, 
        {
            name: "Movie Name",
            selector: (row) => row.Movie,
        },
        {
            name: "Price",
            selector: (row) => row.Price,
        },
        {
            name: "Start Date",
            selector: (row) => row.StartDate,
        }, 
        {
            name: "End Date",
            selector: (row) => row.EndDate,
        }
    ]

    const fnbColumns = [
        {
            name: "Name",
            selector: (row) => row.Name,
        }, 
        {
            name: "Price",
            selector: (row) => row.Price,
        }, 
        {
            name: "Stock",
            selector: (row) => row.Stock,
        }, 
        {
            name: "Type",
            selector: (row) => row.Type,
        }
    ]

    const advertisesColumns = [
        {
            name: "Company Name",
            selector: (row) => row.Company,
        }, 
        {
            name: "Price",
            selector: (row) => row.Price,
        },
        {
            name: "Type",
            selector: (row) => row.Type,
        }, 
        {
            name: "Start Date",
            selector: (row) => row.StartDate,
        }, 
        {
            name: "End Date",
            selector: (row) => row.EndDate,
        }
    ]

    useEffect(() => {
        const getContracts = async() => {
            const data = await getDocs(contractssCollectionRef)
            setContracts(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(data.docs)
        }

        getContracts()

        const getFnbs = async() => {
            const data = await getDocs(fnbsCollectionRef)
            setFnbs(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(data.docs)
        }

        getFnbs()

        const getAdvertises = async() => {
            const data = await getDocs(advertisesCollectionRef)
            setAdvertises(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(data.docs)
        }

        getAdvertises()
    }, [])

    return (
        <div className='p-10'>
            <h1 className='text-2xl font-bold py-4 mb-4 text-center'>External Department's Reports</h1>

            <div className='Contract px-10 mt-5'>
                <h3 className='text-5l font-bold py-4 mb-4 text-center'>Contracts with Movie Producers</h3>
                <DataTable columns={contractColumns} data={contracts} />
            </div>

            <div className='FnB px-10 mt-5'>
                <h3 className='text-5l font-bold py-4 mb-4 text-center'>Food and Beverage Suppliers</h3>
                <DataTable columns={fnbColumns} data={fnbs} />
            </div>

            <div className='Advertises px-10 mt-5'>
                <h3 className='text-5l font-bold py-4 mb-4 text-center'>Advertising Partners</h3>
                <DataTable columns={advertisesColumns} data={advertises} />
            </div>
        </div>
    )
}

export default Employee