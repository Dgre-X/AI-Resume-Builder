import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useContext, useEffect, useState } from 'react'
import ResumeinfoContext from '@/context/ResumeinfoContext'
import GlobalAPI from '../../../../../service/GlobalAPI'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

const PersonalDetails = ({enableNext}) => {

    const params = useParams()
    const {resumeInfo, setResumeInfo} = useContext(ResumeinfoContext)
    const [formData, setformData] = useState({})
    const [loading, setloading] = useState(false)

    useEffect(() => {
      console.log(params);
      
    }, [])
    

    const handleInputChange = (e) => {
        enableNext(false)
        const {name, value} = e.target

        setformData({
            ...formData, 
            [name]:value
        })

        setResumeInfo({
            ...resumeInfo,
            [name]:value
        })
    }

    const onSave = (e) => {
        e.preventDefault()
        setloading(true)
        const data = {
            data: formData
        }
        GlobalAPI.updateResumeDetails(params?.resumeId, data).then((resp) => {
            console.log(resp);
            enableNext(true)
            setloading(false)
            toast("Details Updated .")
        })
        
    }
    return (
        <div className='p-10 mt-10 border-t-8 border-t-primary rounded-lg shadow-lg'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p className='text-md'>Get Started by entering Basic details</p>
            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 my-5 gap-5'> 
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input required name='firstName' defaultValue={resumeInfo?.firstName} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input required name='lastName' defaultValue={resumeInfo?.lastName} onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input required name='jobTitle' defaultValue={resumeInfo?.jobTitle} onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input required name='address' defaultValue={resumeInfo?.address} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Phone</label>
                        <Input required name='phone' defaultValue={resumeInfo?.phone} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Email</label>
                        <Input required name='email' defaultValue={resumeInfo?.email} onChange={handleInputChange} />
                    </div>
                </div>
                <div className='flex justify-end'>
                    <Button disabled={loading} size="sm" type='Submit'>
                        {loading?<LoaderCircle className='animate-spin'/>:'Save'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetails
