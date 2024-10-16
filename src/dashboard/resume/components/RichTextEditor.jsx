import { Button } from '@/components/ui/button'
import ResumeinfoContext from '@/context/ResumeinfoContext'
import { Brain, LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIchatSession } from '../../../../service/AIModel'
import { toast } from 'sonner'

const RichTextEditor = ({ onRichTextChange, index, defaultValue }) => {
    const [value, setvalue] = useState(defaultValue)
    const [loading, setloading] = useState(false)
    const { resumeInfo, setResumeInfo } = useContext(ResumeinfoContext)
    const prompt = "For {positionTitle}, Provide 5-7 bullet points summarizing my experience for a resume. Please ensure the response is in pure HTML format with <ul> and <li> tags only, without any JSON or additional text."

    useEffect(() => {
        setvalue(defaultValue)
    }, [defaultValue])

    const generateSummaryWithAi = async () => {
        setloading(true)
        if (!resumeInfo.experience[index].title) {
            toast("Add Position Title")
            return;
        }
        const PROMPT = prompt.replace('{positionTitle}', resumeInfo.experience[index].title)
        console.log(PROMPT);
        const result = await AIchatSession.sendMessage(PROMPT)
        console.log(result.response.candidates[0].content.parts[0].text);
        setvalue(result.response.candidates[0].content.parts[0].text)
        const updatedExperience = [...resumeInfo.experience];
        updatedExperience[index].workSummery = result.response.candidates[0].content.parts[0].text;
        setResumeInfo({
            ...resumeInfo,
            experience: updatedExperience,
        });
        setloading(false)
    }
    return (
        <div>
            <div className='flex justify-between items-end px-2 my-2'>
                <label className='text-sm'>Summary</label>
                <Button size='sm' onClick={generateSummaryWithAi} variant='outline' className='text-primary border-primary gap-2 p-3' >
                    {loading ? <LoaderCircle className='animate-spin' /> :
                        <>
                            <Brain />Generate with AI
                        </>}
                </Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setvalue(e.target.value)
                    onRichTextChange(e)
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />

                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor
