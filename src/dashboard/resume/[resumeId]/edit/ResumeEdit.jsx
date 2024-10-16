import Header from '@/components/header/Header'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import FormSection from '../../components/FormSection'
import ResumePreview from '../../components/ResumePreview'
import dummy from '../../../../data/dummy'
import ResumeinfoContext from '@/context/ResumeinfoContext'
import GlobalAPI from '../../../../../service/GlobalAPI'




const ResumeEdit = () => {
  const params = useParams()
  const [resumeInfo, setResumeInfo] = useState()

  useEffect(() => {
    // setResumeInfo(dummy)
    // console.log(dummy);
    getResumeInfo()
  }, [])

  const getResumeInfo = () => {
    GlobalAPI.getResumeInfoById(params.resumeId).then(resp => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data)
    })
  }


  return (
    <div>
      <Header />
      <ResumeinfoContext.Provider value={{resumeInfo, setResumeInfo}}>
        <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
          {/* Form input Section  */}
          <FormSection />
          {/* Form preview section  */}
          <ResumePreview />
        </div>
      </ResumeinfoContext.Provider>
    </div>
  )
}

export default ResumeEdit
