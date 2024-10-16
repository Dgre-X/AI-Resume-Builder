import ResumeinfoContext from '../../../context/ResumeinfoContext'
import React from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import { useState, useContext } from 'react'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

const ResumePreview = () => {
    const {resumeInfo, setResumeInfo} = useContext(ResumeinfoContext)
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
    style={{
      borderColor: resumeInfo?.themeColor
    }}>
      {/* Personal Details  */}
      <div className="section">
        <PersonalDetailPreview  resumeInfo={resumeInfo}/>
      </div>
      {/* Summary  */}
      <div className="section">
        <SummaryPreview resumeInfo={resumeInfo}/>
      </div>
      {/* Professional Experience  */}
      <div className="section">
        <ExperiencePreview resumeInfo={resumeInfo}/>
      </div>
      {/* Educational Details  */}
      <div className="section">
        <EducationalPreview resumeInfo={resumeInfo}/>
      </div>
      {/* Skills  */}
      <div className="section">
        <SkillsPreview resumeInfo={resumeInfo}/>
      </div>

    </div>
  )
}

export default ResumePreview
