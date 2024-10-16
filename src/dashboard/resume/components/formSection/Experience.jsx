import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useRef, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import ResumeinfoContext from '@/context/ResumeinfoContext'
import { useParams } from 'react-router-dom'
import GlobalAPI from './../../../../../service/GlobalAPI'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'
const formField = {
    companyName: '',
    title: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
}

const Experience = () => {
    

    const params = useParams()
    const [experienceList, setExperienceList] = useState([{
        companyName: '',
        title: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
    }])
    const [loading, setloading] = useState(false)
    const [experienceCount, setexperienceCount] = useState(1)
    const { resumeInfo, setResumeInfo } = useContext(ResumeinfoContext)

    useEffect(() => {
        // resumeInfo && setExperienceList(resumeInfo?.experience)
        if (resumeInfo?.experience && resumeInfo.experience.length > 0) {
            setExperienceList(resumeInfo.experience);
        } else {
            setExperienceList([formField]); // Set at least one empty form field for new users
        }
    }, [])

    const addMoreExperience = () => {
        setexperienceCount(experienceCount + 1)
        const newFormField = { ...formField };
        setExperienceList([...experienceList, {
            companyName: '',
            title: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
        }]);
    }
    const removeExperience = () => {
        setexperienceCount(experienceCount - 1)
        setExperienceList(experienceList => experienceList.slice(0, -1))
    }
    const handleInput = (index, e) => {
        const newEntries = experienceList.slice()
        const { name, value } = e.target
        newEntries[index][name] = value
        setExperienceList(newEntries)
    }
    const onRichTextEditorChange = (e, name, index) => {
        const newEntries = experienceList.slice()
        newEntries[index][name] = e.target.value
        setExperienceList(newEntries)
    }
    const stripHtmlTags = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || "";
    };
    const onSave = () => {
        setloading(true)
        // Strip HTML tags from the experience summaries
        const updatedExperienceList = experienceList.map((experience) => {
            if (experience.workSummery) {
                return {
                    ...experience,
                    workSummery: stripHtmlTags(experience.workSummery),  // Strip HTML tags
                };
            }
            return experience;
        });
        const data = {
            data: {
                experience: updatedExperienceList.map(({ id, ...rest }) => rest)
            }
        }
        GlobalAPI.updateResumeDetails(params.resumeId, data).then(resp => {
            console.log(resp);
            toast("Details Updated !")
            setloading(false)
        }, (error) => {
            console.log(error);
            setloading(false)
        })
    }
    useEffect(() => {
        // console.log(experienceList);
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList
        })
    }, [experienceList])

    return (
        <div>
            <div className='p-10 mt-10 border-t-8 border-t-primary rounded-lg shadow-lg'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p className='text-md'>Add your previous Job experience</p>
                {experienceList.map((item, index) => (
                    <div key={index} className='grid grid-cols-2 my-5 gap-5 border p-3 rounded-lg '>
                        <div>
                            <label className='text-sm'>Company Name</label>
                            <Input defaultValue={item?.companyName} required onChange={(e) => handleInput(index, e)} name='companyName' />
                        </div>
                        <div>
                            <label className='text-sm'>Position</label>
                            <Input defaultValue={item?.title} required onChange={(e) => handleInput(index, e)} name='title' />
                        </div>
                        <div>
                            <label className='text-sm'>City</label>
                            <Input defaultValue={item?.city} required onChange={(e) => handleInput(index, e)} name='city' />
                        </div>
                        <div>
                            <label className='text-sm'>State</label>
                            <Input defaultValue={item?.state} required onChange={(e) => handleInput(index, e)} name='state' />
                        </div>
                        <div>
                            <label className='text-sm'>Start Date</label>
                            <Input defaultValue={item?.startDate} required onChange={(e) => handleInput(index, e)} type='date' name='startDate' />
                        </div>
                        <div>
                            <label className='text-sm'>End Date</label>
                            <Input defaultValue={item?.endDate} required onChange={(e) => handleInput(index, e)} type='date' name='endDate' />
                        </div>
                        {/* Work Summary  */}
                        <div className='col-span-2'>
                            <RichTextEditor index={index} defaultValue={item?.workSummery} onRichTextChange={(e) => onRichTextEditorChange(e, 'workSummery', index)} />
                        </div>
                    </div>
                ))}
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2'>
                        <Button size='sm' onClick={addMoreExperience} variant='outline' className='text-primary border-primary gap-2 p-3'>+ Add more Experience</Button>
                        {experienceCount > 1 && <Button size='sm' onClick={removeExperience} variant='outline' className='text-primary border-primary gap-2 p-3'>- Remove Experience</Button>}
                    </div>
                    <div className='flex justify-end my-3'>
                        <Button onClick={onSave} disabled={loading} size="sm" type='Submit'>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Experience
