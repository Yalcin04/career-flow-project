import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { User, Save, Loader2 } from 'lucide-react'

export default function Profile() {
    const [profile, setProfile] = useState({
        first_name: '',
        last_name: '',
        target_position: '',
        bio: ''
    })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        if (data) setProfile(data)
    }

    const updateProfile = async (e) => {
        e.preventDefault()
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()

        const { error } = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                ...profile,
                updated_at: new Date()
            })

        setLoading(false)
        if (!error) {
            setMessage('Profile updated successfully!')
            setTimeout(() => setMessage(''), 3000)
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Your Profile</h2>

            <div className="card">
                <form onSubmit={updateProfile} className="space-y-6">
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                            <User className="h-12 w-12" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="label">First Name</label>
                            <input
                                className="input-field w-full border p-2 rounded"
                                value={profile.first_name || ''}
                                onChange={e => setProfile({ ...profile, first_name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Last Name</label>
                            <input
                                className="input-field w-full border p-2 rounded"
                                value={profile.last_name || ''}
                                onChange={e => setProfile({ ...profile, last_name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="label">Target Position</label>
                        <input
                            className="input-field w-full border p-2 rounded"
                            placeholder="e.g. Senior Frontend Engineer"
                            value={profile.target_position || ''}
                            onChange={e => setProfile({ ...profile, target_position: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="label">Bio</label>
                        <textarea
                            className="input-field w-full border p-2 rounded"
                            rows={4}
                            value={profile.bio || ''}
                            onChange={e => setProfile({ ...profile, bio: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <span className="text-green-600 text-sm font-medium">{message}</span>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary flex items-center"
                        >
                            {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
