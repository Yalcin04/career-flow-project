import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import AppLayout from '@/layouts/AppLayout'
import Dashboard from '@/pages/dashboard/Dashboard'
import ApplicationsBoard from '@/pages/applications/ApplicationsBoard'
import ApplicationsList from '@/pages/applications/ApplicationsList'
import AddApplication from '@/pages/applications/AddApplication'
import ApplicationDetails from '@/pages/applications/ApplicationDetails'
import InterviewCalendar from '@/pages/interviews/InterviewCalendar'
import Contacts from '@/pages/resources/Contacts'
import Resources from '@/pages/resources/Resources'
import Statistics from '@/pages/user/Statistics'
import Profile from '@/pages/user/Profile'
import Settings from '@/pages/user/Settings'

function App() {
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (loading) {
        return <div className="flex min-h-screen items-center justify-center text-primary-600">Loading...</div>
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
                <Route path="/register" element={!session ? <Register /> : <Navigate to="/" />} />

                {/* Protected Routes */}
                <Route path="/" element={session ? <AppLayout><Dashboard /></AppLayout> : <Navigate to="/login" />} />
                <Route path="/applications" element={session ? <AppLayout><ApplicationsBoard /></AppLayout> : <Navigate to="/login" />} />
                <Route path="/applications-list" element={session ? <AppLayout><ApplicationsList /></AppLayout> : <Navigate to="/login" />} />
                <Route path="/applications/new" element={session ? <AppLayout><AddApplication /></AppLayout> : <Navigate to="/login" />} />
                <Route path="/applications/:id" element={session ? <AppLayout><ApplicationDetails /></AppLayout> : <Navigate to="/login" />} />
                <Route path="/interviews" element={session ? <AppLayout><InterviewCalendar /></AppLayout> : <Navigate to="/login" />} />
                <Route path="/contacts" element={session ? <AppLayout><Contacts /></AppLayout> : <Navigate to="/login" />} />
                <Route path="/resources" element={session ? <AppLayout><Resources /></AppLayout> : <Navigate to="/login" />} />
                <Route path="/statistics" element={session ? <AppLayout><Statistics /></AppLayout> : <Navigate to="/login" />} />
                <Route path="/profile" element={session ? <AppLayout><Profile /></AppLayout> : <Navigate to="/login" />} />
                <Route path="/settings" element={session ? <AppLayout><Settings /></AppLayout> : <Navigate to="/login" />} />

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
