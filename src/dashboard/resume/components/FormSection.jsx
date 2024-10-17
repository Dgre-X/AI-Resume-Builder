import React from 'react'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Summery from './formSection/Summery'
import Experience from './formSection/Experience'
import Education from './formSection/Education'
import Skills from './formSection/Skills'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import ThemeColor from './ThemeColor'
import PersonalDetails from './formSection/PersonalDetails'


const FormSection = () => {
  // const {resumeInfo, setResumeInfo} = useContext(ResumeinfoContext)
  const navigation = useNavigate()
  const {resumeId} = useParams()
  const [formSectionIndex, setformSectionIndex] = useState(1)
  const [enableNext, setenableNext] = useState(false)
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <Link to={'/dashBoard'}>
            <Button><Home /></Button>
          </Link>
          <ThemeColor />
        </div>
        <div className='flex items-center gap-2'>
          {formSectionIndex > 1 && <Button onClick={() => setformSectionIndex(formSectionIndex - 1)} size='sm'><ArrowLeft /></Button>}
          <Button disabled={!enableNext} onClick={() => setformSectionIndex(formSectionIndex + 1)} size="sm">Next <ArrowRight /></Button>
        </div>
      </div>
      {/* Personal Details  */}
      {formSectionIndex == 1 ? <PersonalDetails enableNext={(v) => setenableNext(v)} /> : formSectionIndex == 2 ? <Summery enableNext={(v) => setenableNext(v)} /> : formSectionIndex == 3 ? <Experience enableNext={(v) => setenableNext(v)} /> : formSectionIndex == 4 ? <Education enableNext={(v) => setenableNext(v)} /> : formSectionIndex == 5 ? <Skills enableNext={(v) => setenableNext(v)} /> : formSectionIndex == 6 ? <Navigate to={'/my-resume/'+ resumeId + '/view'} /> : null}

    </div>
  )
}

export default FormSection
