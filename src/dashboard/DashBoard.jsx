
import Header from '@/components/header/Header'
import { UserButton, useUser } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import React from 'react'
import AddResume from './components/AddResume'
import GlobalAPI from './../../service/GlobalAPI'
import ResumeEdit from './resume/[resumeId]/edit/ResumeEdit'
import ResumeCardElement from './components/ResumeCardElement'


const DashBoard = () => {

  const {user} = useUser();
  const [resumeList, setResumeList] = useState([])

  useEffect(() => {
    user&&getUserResume()
  }, [user])
  
/*
 * Used to get User Email Address
 */

  const getUserResume = () => {
    GlobalAPI.getUserResume(user?.primaryEmailAddress?.emailAddress)
    .then(resp => {
      setResumeList(resp.data.data)
    } 
    )
  }
  return (
    <div>
      <Header />
      <div className='flex flex-col items-center p-10 md:px-20 lg:px-32'>
        <h2 className='font-bold text-2xl'>Resume</h2>
        <p >Create your own AI Resume </p>
        <div className='mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10'>
          <AddResume />
          {resumeList.length>0&&resumeList.map((resume, item) => (
            <ResumeCardElement resume={resume} key={item} refreshData={getUserResume}/> 
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashBoard
