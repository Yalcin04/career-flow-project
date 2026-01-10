import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function Statistics() {
    const [data, setData] = useState([])

    useEffect(() => {
        // Mock data based on real counts would be ideal, but for charts we often need aggregation.
        // For this demo, we'll fetch all apps and aggregate client-side or define static mock if no data.
        fetchData()
    }, [])

    const fetchData = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data } = await supabase
            .from('applications')
            .select('status, created_at')
            .eq('user_id', user.id)

        if (data) {
            // Aggregate by status
            const counts = data.reduce((acc, curr) => {
                acc[curr.status] = (acc[curr.status] || 0) + 1
                return acc
            }, {})

            const chartData = [
                { name: 'Applied', value: counts['Applied'] || 0, color: '#6366f1' },
                { name: 'Interview', value: counts['Interview'] || 0, color: '#f59e0b' },
                { name: 'Offer', value: counts['Offer'] || 0, color: '#22c55e' },
                { name: 'Rejected', value: counts['Rejected'] || 0, color: '#ef4444' },
            ]
            setData(chartData)
        }
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900">Statistics</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card min-h-[400px]">
                    <h3 className="text-lg font-semibold text-slate-900 mb-6">Application Status Distribution</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Placeholder for Timeline Chart */}
                <div className="card min-h-[400px] flex items-center justify-center border-dashed bg-slate-50">
                    <p className="text-slate-500 font-medium">Monthly Activity (Coming Soon)</p>
                </div>
            </div>
        </div>
    )
}
