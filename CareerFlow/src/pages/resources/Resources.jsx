import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { FileText, Plus, Trash2 } from 'lucide-react'

export default function Resources() {
    const [resources, setResources] = useState([])
    const [loading, setLoading] = useState(true)
    const [newNote, setNewNote] = useState('')

    useEffect(() => {
        fetchResources()
    }, [])

    const fetchResources = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data } = await supabase
            .from('resources')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        if (data) setResources(data)
        setLoading(false)
    }

    const handleAddNote = async (e) => {
        e.preventDefault()
        if (!newNote.trim()) return

        const { data: { user } } = await supabase.auth.getUser()

        const { data, error } = await supabase
            .from('resources')
            .insert([{
                content: newNote,
                type: 'Note',
                title: 'Note', // simplistic
                user_id: user.id
            }])
            .select()

        if (data) {
            setResources([data[0], ...resources])
            setNewNote('')
        }
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Resources & Notes</h2>

            <div className="card bg-slate-50 border-dashed">
                <form onSubmit={handleAddNote}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Add a new study note or resource</label>
                    <textarea
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                        rows={3}
                        placeholder="e.g. React Interview Questions link: ..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                    />
                    <div className="mt-3 flex justify-end">
                        <button type="submit" className="btn-primary flex items-center">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Note
                        </button>
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((res) => (
                    <div key={res.id} className="card relative group">
                        <div className="flex items-start space-x-3">
                            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-slate-800 whitespace-pre-wrap">{res.content}</p>
                                <p className="text-xs text-slate-400 mt-2">
                                    {new Date(res.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <button className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
