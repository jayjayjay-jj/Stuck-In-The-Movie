import React from 'react'
import './App.css'
import Sidebar from './component/Sidebar/Sidebar'
import Login from './component/Login'
import AddEmployee from './component/HumanResource/AddEmployee'
import Employee from './component/HumanResource/Employee'
import ViewEmployeeReport from './component/Manager/ViewEmployeeReport'
import AddMembership from './component/Generally/AddMembership'
import Membership from './component/PromotionEventDepartment/Membership'
import AddPersonalLeave from './component/Generally/AddPersonalLeave'
import PersonalLeave from './component/HumanResource/PersonalLeave'
import FullPersonalLeave from './component/HumanResource/FullPersonalLeave'
import AddFundRequest from './component/Generally/AddFundRequest'
import FundRequest from './component/Generally/FundRequest'
import FUllFundRequest from './component/StorageDepartment/FullFundRequest'
import AddFnEReports from './component/Generally/AddFnEReports'
import FnEReports from './component/StorageDepartment/FnEReports'
import ExternalDeptReports from './component/ExternalDepartment/ExternalDeptReports'
import AddContract from './component/ExternalDepartment/AddContract'
import Contract from './component/ExternalDepartment/Contract'
import AddFnB from './component/ExternalDepartment/AddFnB'
import FnB from './component/ExternalDepartment/FnB'
import AddAdversingPartner from  './component/ExternalDepartment/AddAdvertisingPartner'
import AdvertisingPartner from './component/ExternalDepartment/AdvertisingPartner'
import AddFnE from './component/StorageDepartment/AddFnE'
import FnE from './component/StorageDepartment/FnE'
import AddPnE from './component/PromotionEventDepartment/AddPnE'
import PnE from './component/PromotionEventDepartment/PnE'
import { Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './component/ProtectedRoute'

export default function App() {
  return (
    <div>
      <AuthContextProvider>
        {/* <Sidebar> */}
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/addEmployee' element={<AddEmployee />}></Route>
            <Route path='/employee' element={
              <ProtectedRoute>
                <Employee />
              </ProtectedRoute>
            }></Route>
            <Route path='/viewEmployeeReport' element={
              <ProtectedRoute>
                <ViewEmployeeReport />
              </ProtectedRoute>
            }></Route>
            <Route path='/addMembership' element={
              <ProtectedRoute>
                <AddMembership />
              </ProtectedRoute>
            }></Route>
            <Route path='/membership' element={
              <ProtectedRoute>
                <Membership />
              </ProtectedRoute>
            }></Route>
            <Route path='/addPersonalLeave' element={
              <ProtectedRoute>
                <AddPersonalLeave />
              </ProtectedRoute>
            }></Route>
            <Route path='/personalLeave' element={
              <ProtectedRoute>
                <PersonalLeave />
              </ProtectedRoute>
            }></Route>
            <Route path='/fullPersonalLeave' element={
              <ProtectedRoute>
                <FullPersonalLeave />
              </ProtectedRoute>
            }></Route>
            <Route path='/addFundRequest' element={
              <ProtectedRoute>
                <AddFundRequest />
              </ProtectedRoute>
            }></Route>
            <Route path='/fundRequest' element={
              <ProtectedRoute>
                <FundRequest />
              </ProtectedRoute>
            }></Route>
            <Route path='/fullFundRequest' element={
              <ProtectedRoute>
                <FUllFundRequest />
              </ProtectedRoute>
            }></Route>
            <Route path='/addFnEReport' element={
              <ProtectedRoute>
                <AddFnEReports />
              </ProtectedRoute>
            }></Route>
            <Route path='/fneReports' element={
              <ProtectedRoute>
                <FnEReports />
              </ProtectedRoute>
            }></Route>
            <Route path='/externaldeptreports' element={
              <ProtectedRoute>
                <ExternalDeptReports />
              </ProtectedRoute>
            }></Route>
            <Route path='/addContracts' element={
              <ProtectedRoute>
                <AddContract />
              </ProtectedRoute>
            }></Route>
            <Route path='/contracts' element={
              <ProtectedRoute>
                <Contract />
              </ProtectedRoute>
            }></Route>
            <Route path='/addFnbs' element={
              <ProtectedRoute>
                <AddFnB />
              </ProtectedRoute>
            }></Route>
            <Route path='/fnbs' element={
              <ProtectedRoute>
                <FnB />
              </ProtectedRoute>
            }></Route>
            <Route path='/addAdvertises' element={
              <ProtectedRoute>
                <AddAdversingPartner />
              </ProtectedRoute>
            }></Route>
            <Route path='/advertises' element={
              <ProtectedRoute>
                <AdvertisingPartner />
              </ProtectedRoute>
            }></Route>
            <Route path='/addFnes' element={
              <ProtectedRoute>
                <AddFnE />
              </ProtectedRoute>
            }></Route>
            <Route path='/fnes' element={
              <ProtectedRoute>
                <FnE />
              </ProtectedRoute>
            }></Route>
            <Route path='/addPnes' element={
              <ProtectedRoute>
                <AddPnE />
              </ProtectedRoute>
            }></Route>
            <Route path='/pnes' element={
              <ProtectedRoute>
                <PnE />
              </ProtectedRoute>
            }></Route>
          </Routes>
        {/* </Sidebar> */}
      </AuthContextProvider>
    </div>
  )
}

