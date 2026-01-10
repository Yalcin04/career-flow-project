import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Briefcase, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react'

// Helper component for stats cards
const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="card">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
                {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
            </div>
            <div className={`p-3 rounded-full ${color}`}>
                <Icon className="h-6 w-6 text-white" />
            </div>
        </div>
    </div>
)

export default function Dashboard() {
    const [stats, setStats] = useState({
        total: 0,
        interviews: 0,
        offers: 0,
        rejected: 0,
        recent: []
    })

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // Fetch applications counts manually or via RPC if available. 
        // Doing 3 queries for simplicity here as data set is small for a demo.

        // 1. Total & Status counts
        const { data: applications } = await supabase
            .from('applications')
            .select('status, company, position, created_at, id') // selecting minimal fields
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        if (applications) {
            const interviewCount = applications.filter(a => a.status === 'Interview').length
            const offerCount = applications.filter(a => a.status === 'Offer').length
            const rejectedCount = applications.filter(a => a.status === 'Rejected').length

            setStats({
                total: applications.length,
                interviews: interviewCount,
                offers: offerCount,
                rejected: rejectedCount,
                recent: applications.slice(0, 5) // Last 5 activities
            })
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
                <p className="text-slate-500 mt-1">Overview of your job search progress.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Applications"
                    value={stats.total}
                    icon={Briefcase}
                    color="bg-blue-500"
                    subtext="All time tracked"
                />
                <StatCard
                    title="Interviews Pending"
                    value={stats.interviews}
                    icon={Calendar}
                    color="bg-amber-500"
                    subtext="Upcoming conversations"
                />
                <StatCard
                    title="Offers Received"
                    value={stats.offers}
                    icon={CheckCircle}
                    color="bg-green-500"
                    subtext="Action required"
                />
                <StatCard
                    title="Rejected"
                    value={stats.rejected}
                    icon={XCircle}
                    color="bg-red-500"
                    subtext="Keep going!"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity Section */}
                <div className="card">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-slate-500" />
                        Recent Applications
                    </h3>
                    <div className="flow-root">
                        <ul className="divide-y divide-slate-100">
                            {stats.recent.length === 0 ? (
                                <li className="py-4 text-center text-slate-500">No applications yet. Start adding!</li>
                            ) : (
                                stats.recent.map((app) => (
                                    <li key={app.id} className="py-3">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-900 truncate">
                                                    {app.position}
                                                </p>
                                                <p className="text-sm text-slate-500 truncate">
                                                    {app.company}
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800">
                                                {app.status}
                                            </div>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>

                {/* Placeholder for future Interview List or other widgets */}
                <div className="card bg-slate-50 border-dashed flex items-center justify-center p-8">
                    <div className="text-center">
                        <Calendar className="mx-auto h-12 w-12 text-slate-300" />
                        <h3 className="mt-2 text-sm font-semibold text-slate-900">Upcoming Interviews</h3>
                        <p className="mt-1 text-sm text-slate-500">Scheduled interviews will appear here.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
