import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { Mail, MessageSquare, User, Trash2, X } from 'lucide-react';

const Contacts = () => {
    const { appData, addContact, deleteContact } = useUser();
    const { contacts } = appData;
    const [isAdding, setIsAdding] = useState(false);
    const [newContact, setNewContact] = useState({ name: '', role: '', company: '', email: '' });

    const handleMessage = (name) => {
        alert(`Message sent to ${name}!`);
    };

    const handleViewProfile = (name) => {
        alert(`Viewing profile of ${name}...`);
    };

    const handleDelete = (id, name) => {
        if (confirm(`Are you sure you want to remove ${name}?`)) {
            deleteContact(id);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newContact.name || !newContact.role) return;

        addContact(newContact);
        setNewContact({ name: '', role: '', company: '', email: '' });
        setIsAdding(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Contacts & Networking</h1>
                    <p className="text-slate-500">Connect with mentors, alumni, and peers.</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="btn-primary"
                >
                    {isAdding ? 'Cancel' : '+ Add New Contact'}
                </button>
            </div>

            {isAdding && (
                <div className="card bg-slate-50 border-primary-100 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-slate-900">Add New Contact</h3>
                        <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text" placeholder="Name" className="input-field p-2 border rounded"
                            value={newContact.name} onChange={e => setNewContact({ ...newContact, name: e.target.value })} required
                        />
                        <input
                            type="text" placeholder="Role (e.g. Developer)" className="input-field p-2 border rounded"
                            value={newContact.role} onChange={e => setNewContact({ ...newContact, role: e.target.value })} required
                        />
                        <input
                            type="text" placeholder="Company" className="input-field p-2 border rounded"
                            value={newContact.company} onChange={e => setNewContact({ ...newContact, company: e.target.value })}
                        />
                        <input
                            type="email" placeholder="Email" className="input-field p-2 border rounded"
                            value={newContact.email} onChange={e => setNewContact({ ...newContact, email: e.target.value })}
                        />
                        <div className="md:col-span-2 flex justify-end">
                            <button type="submit" className="btn-primary px-6">Save Contact</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(contacts || []).map((contact) => (
                    <div key={contact.id} className="card group hover:border-primary-200 transition-all relative">
                        <button
                            onClick={() => handleDelete(contact.id, contact.name)}
                            className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove Contact"
                        >
                            <Trash2 size={16} />
                        </button>

                        <div className="flex items-start justify-between mb-4 pr-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-2xl border-2 border-white shadow-sm">
                                    {contact.image}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">{contact.name}</h3>
                                    <p className="text-xs text-slate-500">{contact.role}</p>
                                </div>
                            </div>
                            <span className={`w-2.5 h-2.5 rounded-full ${contact.status === 'Online' ? 'bg-green-500' :
                                    contact.status === 'Busy' ? 'bg-red-500' : 'bg-slate-300'
                                }`} title={contact.status || 'Offline'}></span>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-slate-600 gap-2">
                                <span className="font-medium text-slate-700">Company:</span>
                                {contact.company}
                            </div>
                            <div className="flex items-center text-sm text-slate-600 gap-2">
                                <Mail size={14} className="text-slate-400" />
                                {contact.email}
                            </div>
                        </div>

                        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                            <button
                                onClick={() => handleMessage(contact.name)}
                                className="flex-1 btn-secondary text-xs py-2 flex items-center justify-center gap-2"
                            >
                                <MessageSquare size={14} />
                                Message
                            </button>
                            <button
                                onClick={() => handleViewProfile(contact.name)}
                                className="flex-1 btn-white text-xs py-2 flex items-center justify-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                            >
                                <User size={14} />
                                Profile
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Contacts;
