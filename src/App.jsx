import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './auth/Login'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Overallreports from './components/Overallreports'
import Assessments from './components/Assesments'
import Contestcal from './components/Contestcal'
import Mentoringsupport from './components/Mentoringsupport'
import Globalplatform from './components/Globalplatform'
import Courses from './components/Courses'
import Dsasheets from './components/Dsasheets'
import Certificates from './components/Certificates'
import AssessmentDetails from './molecules/AssessmentDetails'
import TestInterface from './molecules/TestInterface'
import Admin from './admin/Admin'
import AdminDashboard from './admin/AdminDashboard'
import Create from './admin/Create'
import Analytics from './admin/Analytics'
import Activeports from './admin/Activeports'
import Departments from './admin/Departments'
import Createstudents from './admin/Createstudents'
import StudentCodingFlow from './molecules/StudentCodingFlow'
import Adminsingletest from './admin/Adminsingletest'
import TestPage from './components/TestPage'
import EditProfile from './components/EditProfile'
import CodeEditor from './molecules/CodeEditor'
import Codingdetails from './admin/Codingdetails'

function App() {
  return (
    <MantineProvider>
      <BrowserRouter> 
        <Routes>
          {/* Login route */}
          <Route path="/login" element={<Login />} />

          {/* Home layout with nested routes */}
          <Route path="/home" element={<Home />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="overall-report" element={<Overallreports />} />
            <Route path="assessments" element={<Assessments />} />
            <Route path="contest-calendar" element={<Contestcal />} />
            <Route path="mentoring-support" element={<Mentoringsupport />} />
            <Route path="global-platform" element={<Globalplatform />} />
            <Route path="courses" element={<Courses />} />
            <Route path="dsa-sheets" element={<Dsasheets />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path='assessmentdetails/:testid' element={<AssessmentDetails />} />
            <Route path='studentcoding' element={<StudentCodingFlow />} />
            <Route path='editprofile' element={<EditProfile />} />
            <Route path='codeeditor/:challengeid' element={<CodeEditor />} />
          </Route>
          <Route path='testpage/:testid' element={<TestPage />} />

          <Route path='/admin' element={<Admin/>} >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path='dashboard' element={<AdminDashboard/>}/>
          <Route path='create' element={<Create/>} />
          <Route path='analytics' element={<Analytics/>} />
          <Route path='activeports' element={<Activeports />} />
          <Route path='department/:collegeId' element={<Departments />} />
          <Route path='students/:collegeId/:departmentId' element={<Createstudents/>} />
          <Route path='students' element={<Createstudents/>} />
          <Route path='admintest/:testid' element={<Adminsingletest/>} />
          <Route path='codingdetails/:challengeid' element={<Codingdetails/>} />
          </Route>
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
