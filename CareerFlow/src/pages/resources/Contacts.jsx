import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Mail, Linkedin, Phone } from 'lucide-react'

export default function Contacts() {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchContacts()
    }, [])

    const fetchContacts = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data } = await supabase
            .from('contacts')
            .select('*')
            .eq('user_id', user.id)

        if (data) setContacts(data)
        setLoading(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Networking & Contacts</h2>
                <button className="btn-primary flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Contact
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contacts.map((contact) => (
                    <div key={contact.id} className="card hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                                {contact.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">{contact.name}</h3>
                                <p className="text-sm text-slate-500">{contact.role} @ {contact.company}</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm text-slate-600">
                            {contact.email && (
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 mr-2 text-slate-400" />
                                    <a href={`mailto:${contact.email}`} className="hover:text-primary-600">{contact.email}</a>
                                </div>
                            )}
                            {contact.phone && (
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 mr-2 text-slate-400" />
                                    {contact.phone}
                                </div>
                            )}
                            {contact.linkedin && (
                                <div className="flex items-center">
                                    <Linkedin className="w-4 h-4 mr-2 text-slate-400" />
                                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600">LinkedIn Profile</a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {/* Add New Placeholder Card */}
                <button className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-primary-500 hover:text-primary-500 transition-colors h-full min-h-[160px]">
                    <Plus className="w-8 h-8 mb-2" />
                    <span className="font-medium">Add New Contact</span>
                </button>
            </div>
        </div>
    )
}
