import Header from '@/components/header/Header'
import { Button } from '@/components/ui/button'
import ResumeinfoContext from '@/context/ResumeinfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalAPI from './../../../../service/GlobalAPI'
import { RWebShare } from 'react-web-share'
// import html2pdf from 'html2pdf.js'

const ViewResume = () => {
  const [resumeInfo, setResumeInfo] = useState()
  const { resumeId } = useParams()
  const resumeRef = useRef()
  useEffect(() => {
    getResumeInfo()
  }, [])


  const getResumeInfo = () => {
    GlobalAPI.getResumeInfoById(resumeId).then(resp => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data)
    })
  }
  const handleDownload = async () => {
    // window.print()
    const html2pdf = (await import('html2pdf.js')).default;

    const element = resumeRef.current;  // Get the section from ref
    const options = {
      margin: 0,        // Set margins for the PDF
      filename: 'resume.pdf',  // Name of the PDF file
      image: { type: 'jpeg', quality: 0.98 },  // Image settings
      html2canvas: { scale: 2 },  // Canvas scaling for better quality
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }  // PDF format and orientation
    };

    // Convert the element to PDF and download it
    html2pdf().from(element).set(options).save();
  }
  return (
    <ResumeinfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id='no-print'>
        <Header />
        <div className='text-center my-5'>
          <h2 className='font-bold text-3xl '>Congratulations ! You have completed your Resume</h2>
          <p className='font-normal text-lg text-gray-400'>Now, you can Download it or Share it to your contacts</p>
        </div>
        <div className='flex justify-around px-36 my-3'>
          <Button onClick={handleDownload}>Download</Button>
          <RWebShare
            data={{
              text: "Here is my Resume",
              url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
              title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " " + "Resume",
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button>Share</Button>
          </RWebShare>

        </div>
      </div>
      <div id='print-area' className='m-0 mx-auto px-5 '>
        <div ref={resumeRef} className='m-0 p-0'>
          <ResumePreview />
        </div>
      </div>
    </ResumeinfoContext.Provider>
  )
}

export default ViewResume
