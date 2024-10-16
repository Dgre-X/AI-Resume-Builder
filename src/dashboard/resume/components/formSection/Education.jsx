import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ResumeinfoContext from '@/context/ResumeinfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalAPI from './../../../../../service/GlobalAPI'
import { toast } from 'sonner'
const formField = {
    universityName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: ''
}

const Education = () => {
    

    const [educationList, setEducationList] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }
    ])
    const [educationCount, seteducationCount] = useState(1)
    const [loading, setloading] = useState(false)
    const { resumeInfo, setResumeInfo } = useContext(ResumeinfoContext)
    useEffect(() => {
        if (resumeInfo?.education && resumeInfo.education.length > 0) {
            setEducationList(resumeInfo.education);
        } else {
            setEducationList([formField]); // Set at least one empty form field for new users
        }
      }, [])
    const params = useParams()

    const handleInput = (index, e) => {
        const newEntries = educationList.slice()
        const { name, value } = e.target
        newEntries[index][name] = value
        setEducationList(newEntries)
    }
    const addMoreEducation = () => {
        seteducationCount(educationCount + 1)
        setEducationList([
            ...educationList,
            {
                universityName: '',
                degree: '',
                major: '',
                startDate: '',
                endDate: '',
                description: ''
            }
        ])
    }
    const removeEducation = () => {
        seteducationCount(educationCount - 1)
        setEducationList(educationList => educationList.slice(0, -1))
    }
    const onSave = () => {
        setloading(true)
        const data = {
            data: {
                education: educationList.map(({ id, ...rest }) => rest)
            }
        }
        GlobalAPI.updateResumeDetails(params.resumeId, data).then(resp => {
            console.log(resp);
            toast("Details Updated")
            setloading(false)

        })

    }
    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            education: educationList
        })
    }, [educationList])

    return (
        <div>
            <div className='p-10 mt-10 border-t-8 border-t-primary rounded-lg shadow-lg'>
                <h2 className='font-bold text-lg'>Education</h2>
                <p className='text-md'>Add your Educational details</p>
                <div>
                    {educationList.map((item, index) => (

                        <div key={index}>
                            {console.log(item)}
                            <div className='grid grid-cols-2 my-5 gap-5 border p-3 rounded-lg '>
                                <div className='col-span-2'>
                                    <label className='text-sm'>University Name</label>
                                    <Input defaultValue={item?.universityName} required onChange={(e) => handleInput(index, e)} name='universityName' />
                                </div>
                                <div>
                                    <label className='text-sm'>Degree</label>
                                    <Input defaultValue={item?.degree} required onChange={(e) => handleInput(index, e)} name='degree' />
                                </div>
                                <div>
                                    <label className='text-sm'>Major</label>
                                    <Input defaultValue={item?.major} required onChange={(e) => handleInput(index, e)} name='major' />
                                </div>
                                <div>
                                    <label className='text-sm'>Start Date</label>
                                    <Input defaultValue={item?.startDate} type='date' required onChange={(e) => handleInput(index, e)} name='startDate' />
                                </div>
                                <div>
                                    <label className='text-sm'>End Date</label>
                                    <Input defaultValue={item?.endDate} type='date' required onChange={(e) => handleInput(index, e)} name='endDate' />
                                </div>
                                <div className='col-span-2'>
                                    <label className='text-sm'>Description</label>
                                    <Textarea defaultValue={item?.description} required onChange={(e) => handleInput(index, e)} name='description' />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2'>
                            <Button size='sm' onClick={addMoreEducation} variant='outline' className='text-primary border-primary gap-2 p-3'>+ Add more Education</Button>
                            {educationCount > 1 && <Button size='sm'
                                onClick={removeEducation} variant='outline' className='text-primary border-primary gap-2 p-3'>- Remove </Button>}
                        </div>
                        <div className='flex justify-end my-3'>
                            <Button onClick={onSave} disabled={loading} size="sm" type='Submit'>
                                {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Education
