import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Brain, LoaderCircle } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import ResumeinfoContext from '@/context/ResumeinfoContext'
import { useParams } from 'react-router-dom'
import GlobalAPI from '../../../../../service/GlobalAPI'
import { toast } from 'sonner'
import { AIchatSession } from '../../../../../service/AIModel'

const Summery = ({ enableNext }) => {

    const prompt = "Title: {jobTitle} , Depends on job title give me summery for my resume within 4-5 lines in JSON format with field  experience Level and Summery with Experience level for Fresher, Mid-Level, Experience"

    const { resumeInfo, setResumeInfo } = useContext(ResumeinfoContext)
    const [loading, setloading] = useState(false)
    const [summery, setsummery] = useState()
    const [AIGeneratedSummery, setAIGeneratedSummery] = useState()
    const params = useParams()

    useEffect(() => {
        summery && setResumeInfo({
            ...resumeInfo,
            summery: summery
        })
    }, [summery])

    const GenerateUsingAIModel = async () => {
        setloading(true)
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle)
        console.log(PROMPT);

        const result = await AIchatSession.sendMessage(PROMPT)
        // console.log(result.response);
        // console.log(result.response.candidates[0].content.parts[0].text);

        // console.log(result.response.candidates[0].content.parts);
        // const aiResponse = [JSON.parse(result.response.candidates[0].content.parts[0].text)]

        // if (Array.isArray(aiResponse)) {
        //     // Set response only if it's an array
        //     setAIGeneratedSummery(aiResponse)
        // } else {
        //     // Handle the case where it's not an array
        //     console.error("AI response is not an array:", aiResponse)
        //     setAIGeneratedSummery([]) // Reset to empty array if not valid
        // }


        setAIGeneratedSummery(JSON.parse(result.response.candidates[0].content.parts[0].text))
        console.log(typeof (AIGeneratedSummery));

        // const summariesArray = Object.values(aiResponse.summaries);
        // console.log("summariesArray", summariesArray);

        setloading(false)

    }



    const onSave = (e) => {
        e.preventDefault()
        setloading(true)
        const data = {
            data: {
                summery: summery
            }
        }
        GlobalAPI.updateResumeDetails(params?.resumeId, data).then((resp) => {
            console.log(resp);
            enableNext(true)
            setloading(false)
            toast("Details Updated .")
        })
    }
    return (
        <div>
            <div className='p-10 mt-10 border-t-8 border-t-primary rounded-lg shadow-lg'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p className='text-md'>Add Summary for your Job title</p>
                <form onSubmit={onSave}>
                    <div className='mt-7 flex justify-between items-end'>
                        <label>Add Summary</label>
                        <Button onClick={() => GenerateUsingAIModel()} type='button' size='sm' variant='outline' className='text-primary border-primary gap-2 p-3' ><Brain />Generate with AI</Button>
                    </div>
                    <Textarea defaultValue={resumeInfo?.summery} onChange={(e) => setsummery(e.target.value)} className='mt-5' />
                    <div className='flex justify-end my-3'>
                        <Button disabled={loading} size="sm" type='Submit'>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>
            {/* Suggestion of AI Generated Summary  */}
            {/* {AIGeneratedSummery} */}
            {AIGeneratedSummery && <div className='p-10 mt-10 border-t-8 border-t-primary rounded-lg shadow-lg'>
                <div className='font-bold text-center text-lg'>Suggestions</div>
                <p className='font-normal text-center text-md'>Get the AI generated summary now</p>
                {/* {AIGeneratedSummery.map((items, index) => (
                    <div key={index}>
                        <h2>{items?.experience_level}</h2>
                    </div>
                ))} */}
                {
                    Object.keys(AIGeneratedSummery.summaries).map((key) => (
                        <div className='mt-3' key={key}>
                            <h2 className='font-bold text-md'>{AIGeneratedSummery.summaries[key].experience_level}</h2>
                            <p className='font-normal text-md'>{AIGeneratedSummery.summaries[key].summary}</p>
                            <div className='flex justify-end mt-3'>
                                <Button size='sm'  onClick={() => { navigator.clipboard.writeText(AIGeneratedSummery.summaries[key].summary) && toast("Text Copied !") }}>Copy</Button>
                            </div>
                        </div>
                    ))
                }
            </div>}
        </div>
    )
}

export default Summery
