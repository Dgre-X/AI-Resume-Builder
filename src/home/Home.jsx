import Header from '@/components/header/Header'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/clerk-react'
import { ArrowRight, ArrowRightIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const { user, isSignedIn } = useUser()
  return (
    <div>
      <Header />
      <div className='flex justify-center flex-col items-center my-10'>
        <h2 className='text-3xl font-bold'>Design Resume with AI</h2>
        <p className='text-md my-1 font-normal text-gray-400'>Create and Customize your resume now</p>
      </div>
      <div className='flex justify-center'>
        <div className='flex justify-between gap-10'>
          <Button variant='outline' className='text-black'>About</Button>
          {
            isSignedIn ?
              <Link to={'/dashBoard'}>
                <Button>Create <ArrowRight/> </Button>
              </Link>
              :
              <Link to={'/auth/sign-in'}>
                <Button>Get Started <ArrowRightIcon /> </Button>
              </Link>
          }
        </div>
      </div>
      <hr  className='my-5 w-[80%] mx-auto'/>
      <div className='grid lg:grid-cols-2 my-5 grid-cols-1'>
        <div className='flex justify-end px-11'>
          <img src="/about.webp" width={500} height={500} alt="" />
        </div>
        <div>
          <h2 className='text-lg font-bold my-1 text-primary'>About AI Resume Builder</h2>
          <ul>
            <li className='my-3 hover:text-primary hover:font-normal'>AI-powered platform that helps users effortlessly create professional resumes tailored to their needs.</li>

            <li className='my-3 hover:text-primary hover:font-normal'>Offers intelligent suggestions and content generation based on job titles, streamlining the resume creation process.</li>

            <li className='my-3 hover:text-primary hover:font-normal'>Customizable themes and layouts to ensure users can design resumes that stand out and match their personal style.</li>

            <li className='my-3 hover:text-primary hover:font-normal'>Seamlessly integrates with PDF download functionality, allowing users to generate high-quality, A4-sized resumes with one click.</li>

            <li className='my-3 hover:text-primary hover:font-normal'>Automatically formats and organizes user-provided information, ensuring clean, well-structured resumes without manual adjustments.</li>

            <li className='my-3 hover:text-primary hover:font-normal'>Empowers job seekers by using AI technology to optimize resumes, improving chances of landing interviews with tailored experiences and skills.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
