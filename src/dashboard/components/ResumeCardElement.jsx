import { LoaderIcon, MoreVerticalIcon, Notebook } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalAPI from './../../../service/GlobalAPI'
import { toast } from 'sonner'


const ResumeCardElement = ({ resume, refreshData }) => {
    const navigation = useNavigate()
    const [openAlert, setopenAlert] = useState(false)
    const [loading, setloading] = useState(false)
    const onDelete = () => {
        setloading(true)
        GlobalAPI.deleteResumeById(resume.documentId).then(resp => {
            console.log(resp);
            toast("Resume Deleted !")
            setloading(false)
            setopenAlert(false)
            refreshData()
        }, (error) => {
            setloading(false)
        })
    }
    return (
        <div style={{
            background: resume?.themeColor
        }} className='rounded-lg'>
            <Link to={'/dashBoard/resume/' + resume.documentId + '/edit'} className='p-16 bg-gradient-to-b from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% py-24 bg-secondary h-[180px] mt-5 flex items-center justify-center border border-primary rounded-lg cursor-pointer hover:scale-105 transition-all hover:shadow-primary hover:shadow-sm'>
                {/* <Notebook /> */}
                <img src="/Notes.jpg" height={50} width={50} alt="" />

            </Link>
            <div className='flex justify-between p-3 border text-black  rounded-b-lg border-none' style={{
                backgroundColor: resume?.themeColor
            }}>
                <p className='text-center my-1 text-black'>{resume.title}</p>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreVerticalIcon className='h-4 w-4 cursor-pointer' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => navigation('/dashBoard/resume/' + resume.documentId + '/edit')}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigation('/my-resume/' + resume.documentId + '/view')}>View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigation('/my-resume/' + resume.documentId + '/view')}>Download</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setopenAlert(true)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialog open={openAlert}>
                    
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className='text-black' onClick={() => setopenAlert(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onDelete} disabled={loading}>{loading ? <LoaderIcon className='animate-spin'/> : 'Delete'}</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>


            </div>
        </div>
    )
}

export default ResumeCardElement
