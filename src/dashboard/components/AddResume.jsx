import { Loader2, PlusSquare } from 'lucide-react'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid';
import GlobalAPI from './../../../service/GlobalAPI'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'



const AddResume = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setresumeTitle] = useState()
    const [loading, setloading] = useState(false)
    const { user } = useUser()
    const navigate = useNavigate()

    const onCreate = async () => {
        setloading(true)
        const uuid = uuidv4();
        const data = {
            data: {
                title: resumeTitle,
                resumeID: uuid,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName
            }
        }

        GlobalAPI.createNewResume(data).then(resp => {
            console.log(resp);
            if (resp) {
                setloading(false)
                navigate('/dashBoard/resume/'+resp.data.data.documentId+'/edit')
            }
        }, (error) => {
            setloading(false)
        }
        )

    }
    return (
        <div>
            <div className='p-16 py-24 items-center flex justify-center bg-secondary mt-5 border border-dashed rounded-lg cursor-pointer h-[180px] hover:scale-105 transition-all hover:shadow-md'
                onClick={() => setOpenDialog(true)}>
                <PlusSquare />
            </div>
            <Dialog open={openDialog} >

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new Resume</DialogTitle>
                        <DialogDescription className='mt-2'>
                            Add a Title for your new Resume
                            <Input placeholder="ex. Full Stack Developer" className='my-3' onChange={(e) => setresumeTitle(e.target.value)} />
                        </DialogDescription>
                        <div className='flex gap-3 justify-end'>
                            <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                            <Button disabled={!resumeTitle || loading} onClick={() => onCreate()} >{
                                loading ?
                                    <Loader2 className='animate-spin' /> :
                                    'create'
                            }</Button>
                        </div>

                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddResume
