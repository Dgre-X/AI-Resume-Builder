import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

const Header = () => {
    const { user, isSignedIn } = useUser()
    return (
        <div className='flex justify-between p-3 px-5 shadow-md'>
            <Link to={'/'}>
                <img src="/logo.svg" alt="logo" width={150} height={150} />
            </Link>
            {
                isSignedIn ?
                    <div className='flex gap-4 items-center'>
                        <Link to={'/dashBoard'}>
                            <Button variant="outline" className='text-black' >DashBoard</Button>
                        </Link>
                        <div>
                            <UserButton />
                        </div>
                    </div> :
                    <Link to={'/auth/sign-in'}>
                        <Button>Get Started </Button>
                    </Link>
            }

        </div>
    )
}

export default Header
