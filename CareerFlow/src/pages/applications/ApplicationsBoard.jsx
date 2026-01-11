import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Plus, MoreHorizontal } from 'lucide-react'

const statuses = ['Applied', 'Interviewing', 'Offer', 'Rejected']

const statusColors = {
    'Applied': 'bg-blue-100 text-blue-800 border-blue-200',
    'Interviewing': 'bg-amber-100 text-amber-800 border-amber-200',
    'Offer': 'bg-green-100 text-green-800 border-green-200',
    'Rejected': 'bg-red-100 text-red-800 border-red-200',
}

export default function ApplicationsBoard() {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchApplications()
    }, [])

    const fetchApplications = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await supabase
            .from('applications')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        if (data) setApplications(data)
        setLoading(false)
    }

    const handleStatusChange = async (id, newStatus) => {
        // Optimistic update
        setApplications(apps => apps.map(app =>
            app.id === id ? { ...app, status: newStatus } : app
        ))

        const { error } = await supabase
            .from('applications')
            .update({ status: newStatus })
            .eq('id', id)

        if (error) {
            // Revert on error (could implement more robust rollback)
            fetchApplications()
        }
    }

    // Group applications by status
    const columns = statuses.map(status => ({
        status,
        items: applications.filter(app => app.status === status)
    }))

    if (loading) return <div>Loading board...</div>

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Applications Board</h2>
                <Link to="/applications/new" className="btn-primary flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    New Application
                </Link>
            </div>

            <div className="flex-1 overflow-x-auto overflow-y-hidden">
                <div className="flex h-full gap-6 min-w-[1000px]">
                    {columns.map(col => (
                        <div key={col.status} className="flex-1 flex flex-col min-w-[280px] bg-slate-100 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-slate-700">{col.status}</h3>
                                <span className="bg-white text-slate-600 px-2 py-0.5 rounded text-xs font-medium shadow-sm">
                                    {col.items.length}
                                </span>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-3">
                                {col.items.map(app => (
                                    <div key={app.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group relative">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-medium text-slate-900">{app.position}</h4>
                                                <p className="text-sm text-slate-500">{app.company}</p>
                                            </div>

                                            {/* Simple Dropdown for moving status (Quick Action) */}
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2">
                                                <select
                                                    className="text-xs border border-slate-300 rounded bg-white p-1"
                                                    value={app.status}
                                                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                                >
                                                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-xs text-slate-400">
                                                {new Date(app.created_at).toLocaleDateString()}
                                            </span>
                                            <Link
                                                to={`/applications/${app.id}`}
                                                className="text-xs text-primary-600 hover:text-primary-800 font-medium"
                                            >
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                                {col.items.length === 0 && (
                                    <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
                                        No applications
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
