import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react'

export default function InterviewCalendar() {
    const [interviews, setInterviews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchInterviews()
    }, [])

    const fetchInterviews = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // Assuming we have an 'interviews' table or we filter applications by status='Interview'
        // To make it robust as per requirements, let's assume we pull from applications where status='Interview' 
        // AND potentially a separate 'interviews' table if the schema was strictly followed. 
        // The prompt said "Tables: ... interviews". So I should use that.

        const { data } = await supabase
            .from('interviews')
            .select(`
        *,
        applications (company, position)
      `)
            .eq('user_id', user.id)
            .order('date', { ascending: true })

        if (data) setInterviews(data)
        setLoading(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Interview Calendar</h2>
                {/* Add Interview Button could go here */}
            </div>

            <div className="card">
                {loading ? (
                    <div className="text-center py-8">Loading interviews...</div>
                ) : interviews.length === 0 ? (
                    <div className="text-center py-12">
                        <CalendarIcon className="mx-auto h-12 w-12 text-slate-300" />
                        <h3 className="mt-2 text-sm font-medium text-slate-900">No interviews scheduled</h3>
                        <p className="mt-1 text-sm text-slate-500">Add an interview to your applications to see them here.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {interviews.map((interview) => (
                            <div key={interview.id} className="flex items-start p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="bg-primary-100 text-primary-600 p-3 rounded-lg mr-4 text-center min-w-[60px]">
                                    <div className="text-xs font-bold uppercase">{new Date(interview.date).toLocaleString('default', { month: 'short' })}</div>
                                    <div className="text-xl font-bold">{new Date(interview.date).getDate()}</div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {interview.applications?.company} - {interview.type || 'Interview'}
                                    </h3>
                                    <p className="text-slate-600 font-medium">{interview.applications?.position}</p>
                                    <div className="mt-2 flex items-center text-sm text-slate-500 space-x-4">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {new Date(interview.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        {interview.location && (
                                            <div className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                {interview.location}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
