import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ResumeinfoContext from '@/context/ResumeinfoContext'
import GlobalAPI from './../../../../../service/GlobalAPI'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
const formField = {
    name: '',
    rating: 0
}


const Skills = () => {
    

    const {resumeId} = useParams()
    const [skillsList, setskillsList] = useState([
        {
            name: '',
            rating: 0
        }])
    const {resumeInfo, setResumeInfo} = useContext(ResumeinfoContext)
    const [skillsCount, setskillsCount] = useState(1)
    const [loading, setloading] = useState(false)

    useEffect(() => {
        // resumeInfo && setskillsList(resumeInfo?.skills)
        if (resumeInfo?.skills && resumeInfo.skills.length > 0) {
            setskillsList(resumeInfo.skills);
        } else {
            setskillsList([formField]); // Set at least one empty form field for new users
        }
      }, [])
    const handleInput = (index, name, value) => {
        const newEntries = skillsList.slice()
        newEntries[index][name] = value
        setskillsList(newEntries)
    }
    const addMoreSkill = () => {
        setskillsCount(skillsCount + 1)
        setskillsList([...skillsList,{
            name: '',
            rating: 0
        }])
    }
    const removeSkill = () => {
        setskillsCount(skillsCount - 1)
        setskillsList(skillsList => skillsList.slice(0, -1))
    }
    const onSave = () => {
        setloading(true)
        const data = {
            data:{
                skills:skillsList.map(({id, ...rest}) => rest)
            }
        }
        GlobalAPI.updateResumeDetails(resumeId, data)
        .then(resp => {
            console.log(resp);
            toast("Details Updated !")
            setloading(false)
        }, (error) => {
            console.log("error");
            setloading(false)
        })
    }
    useEffect(() => {
      setResumeInfo({
        ...resumeInfo,
        skills:skillsList
      })
    }, [skillsList])
    
    return (
        <div>
            <div className='p-10 mt-10 border-t-8 border-t-primary rounded-lg shadow-lg'>
                <h2 className='font-bold text-lg'>Skills</h2>
                <p className='text-md'>Add your professional skills</p>
                <div>
                    {skillsList.map((item, index) => (
                        <div key={index}>
                            <div className='flex justify-between items-center border rounded-lg p-3 my-2'>
                                <div>
                                    <label className='text-sm'>Skills</label>
                                    <Input defaultValue={item?.name} required onChange={(e) => handleInput(index, 'name', e.target.value)} />
                                </div>
                                <Rating style={{ maxWidth: 120 }} value={item.rating} onChange={(v) => handleInput(index, 'rating', v)} />
                            </div>

                        </div>
                    ))}
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2'>
                        <Button size='sm' onClick={addMoreSkill} variant='outline' className='text-primary border-primary gap-2 p-3'>+ Add more Skill</Button>
                        {skillsCount > 1 && <Button size='sm'
                            onClick={removeSkill} variant='outline' className='text-primary border-primary gap-2 p-3'>- Remove </Button>}
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

export default Skills
