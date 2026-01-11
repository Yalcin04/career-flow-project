import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Loader2, ArrowLeft, Save } from 'lucide-react'

export default function AddApplication() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        status: 'Applied',
        url: '',
        salary: '',
        location: '',
        description: ''
    })

    // We should fetch user_id, but usually RLS handles it or we manually attach it.
    // Best practice: Attach user_id from session.

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('Not authenticated')

            const { error } = await supabase
                .from('applications')
                .insert([{
                    ...formData,
                    user_id: user.id,
                    applied_at: new Date()
                }])

            if (error) throw error
            navigate('/applications')
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6 flex items-center">
                <button onClick={() => navigate(-1)} className="mr-4 text-slate-500 hover:text-slate-800">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold text-slate-900">Add New Application</h1>
            </div>

            <div className="card">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Company Name</label>
                            <input
                                name="company"
                                required
                                value={formData.company}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border px-3 py-2"
                                placeholder="Google, Amazon, etc."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Position Title</label>
                            <input
                                name="position"
                                required
                                value={formData.position}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border px-3 py-2"
                                placeholder="Software Engineer"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Job URL</label>
                            <input
                                name="url"
                                type="url"
                                value={formData.url}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border px-3 py-2"
                                placeholder="https://..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border px-3 py-2"
                            >
                                <option value="Applied">Applied</option>
                                <option value="Interviewing">Interviewing</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Salary Range</label>
                            <input
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border px-3 py-2"
                                placeholder="$100k - $120k"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Location</label>
                            <input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border px-3 py-2"
                                placeholder="Remote, NYC, etc."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Notes / Description</label>
                        <textarea
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border px-3 py-2"
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary flex items-center"
                        >
                            {loading && <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />}
                            <Save className="w-4 h-4 mr-2" />
                            Save Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
