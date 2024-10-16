import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in/SignInPage.jsx'
import Home from './home/Home.jsx'
import DashBoard from './dashboard/DashBoard.jsx'
import { SignIn, ClerkProvider } from '@clerk/clerk-react'
import ResumeEdit from './dashboard/resume/[resumeId]/edit/ResumeEdit.jsx'
import ViewResume from './my-resume/[resumeID]/view/ViewResume.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const router = createBrowserRouter([
  {
    element:<App />,
    children:[
      {
        path:'/dashBoard',
        element:<DashBoard />
      },
      {
        path:'/dashBoard/resume/:resumeId/edit',
        element:<ResumeEdit />
      }
    ]
  },
  {
    path:'/',
    element:<Home />
  },
  {
    path:'/auth/sign-in',
    element:<SignInPage />
  },
  {
    path:'/my-resume/:resumeId/view',
    element:<ViewResume />
  }
])

createRoot(document.getElementById('root')).render(

    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  ,
)
