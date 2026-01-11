import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Trash2, Edit2, Save, X } from 'lucide-react'

export default function ApplicationDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [app, setApp] = useState(null)

    // Edit State
    const [formData, setFormData] = useState({})

    useEffect(() => {
        fetchApplication()
    }, [id])

    const fetchApplication = async () => {
        const { data, error } = await supabase
            .from('applications')
            .select('*')
            .eq('id', id)
            .single()

        if (data) {
            setApp(data)
            setFormData(data)
        }
        setLoading(false)
    }

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this application?')) return

        const { error } = await supabase
            .from('applications')
            .delete()
            .eq('id', id)

        if (!error) navigate('/applications')
    }

    const handleUpdate = async () => {
        const { error } = await supabase
            .from('applications')
            .update(formData)
            .eq('id', id)

        if (!error) {
            setApp(formData)
            setIsEditing(false)
        }
    }

    if (loading) return <div>Loading details...</div>
    if (!app) return <div>Application not found</div>

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="mr-4 text-slate-500 hover:text-slate-800">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold text-slate-900">
                        {isEditing ? 'Edit Application' : 'Application Details'}
                    </h1>
                </div>

                <div className="flex space-x-3">
                    {!isEditing ? (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="btn-secondary flex items-center"
                            >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => { setIsEditing(false); setFormData(app); }}
                                className="btn-secondary flex items-center"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="btn-primary flex items-center"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="card space-y-6">
                {/* Read Only View */}
                {!isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm font-medium text-slate-500">Company</h3>
                            <p className="text-lg font-semibold text-slate-900 mt-1">{app.company}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-slate-500">Position</h3>
                            <p className="text-lg font-semibold text-slate-900 mt-1">{app.position}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-slate-500">Status</h3>
                            <span className="inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-800 border border-slate-200">
                                {app.status}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-slate-500">Location</h3>
                            <p className="text-base text-slate-900 mt-1">{app.location || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-slate-500">Salary</h3>
                            <p className="text-base text-slate-900 mt-1">{app.salary || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-slate-500">URL</h3>
                            {app.url ? (
                                <a href={app.url} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline mt-1 block truncate">
                                    {app.url}
                                </a>
                            ) : <p className="text-base text-slate-900 mt-1">N/A</p>}
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-sm font-medium text-slate-500">Notes / Description</h3>
                            <div className="mt-2 p-4 bg-slate-50 rounded-lg text-slate-700 whitespace-pre-wrap">
                                {app.description || 'No notes added.'}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Edit Form (Simplified version of Add Form) */
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="label">Company</label>
                                <input
                                    className="input-field w-full border p-2 rounded"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="label">Position</label>
                                <input
                                    className="input-field w-full border p-2 rounded"
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                />
                            </div>
                            {/* Add other fields as necessary, keeping it brief for this demo */}
                            <div>
                                <label className="label">Status</label>
                                <select
                                    className="w-full border p-2 rounded"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    {['Applied', 'Interviewing', 'Offer', 'Rejected'].map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
