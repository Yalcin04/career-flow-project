import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { FileText, Download, ExternalLink, Video, Image as ImageIcon, Trash2, X, Plus } from 'lucide-react';

const Resources = () => {
    const { appData, addResource, deleteResource } = useUser();
    const { resources } = appData;
    const [isAdding, setIsAdding] = useState(false);
    const [newRes, setNewRes] = useState({ title: '', type: 'Link', url: '', size: '' }); // size/url reused

    const handleOpen = (resource) => {
        if (resource.type === 'Link') {
            alert(`Opening URL: ${resource.url}`);
        } else {
            alert(`Opening/Downloading ${resource.title}...`);
        }
    };

    const handleDelete = (id, title) => {
        if (confirm(`Remove resource "${title}"?`)) {
            deleteResource(id);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newRes.title) return;

        addResource(newRes);
        setNewRes({ title: '', type: 'Link', url: '', size: '' });
        setIsAdding(false);
    };

    const getIcon = (type) => {
        switch (type) {
            case 'Video': return <Video className="w-5 h-5 text-purple-600" />;
            case 'Link': return <ExternalLink className="w-5 h-5 text-blue-600" />;
            case 'Image': return <ImageIcon className="w-5 h-5 text-green-600" />;
            default: return <FileText className="w-5 h-5 text-orange-600" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Learning Resources</h1>
                    <p className="text-slate-500">Access study materials, guides, and tutorials.</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn-secondary">Filtered View</button>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus size={16} /> Upload
                    </button>
                </div>
            </div>

            {isAdding && (
                <div className="card bg-slate-50 border-primary-100 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-slate-900">Add New Resource</h3>
                        <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text" placeholder="Title" className="input-field p-2 border rounded md:col-span-1"
                            value={newRes.title} onChange={e => setNewRes({ ...newRes, title: e.target.value })} required
                        />
                        <select
                            className="input-field p-2 border rounded"
                            value={newRes.type} onChange={e => setNewRes({ ...newRes, type: e.target.value })}
                        >
                            <option value="Link">Link</option>
                            <option value="PDF">PDF</option>
                            <option value="Video">Video</option>
                            <option value="Image">Image</option>
                        </select>
                        <input
                            type="text" placeholder="URL or Size info" className="input-field p-2 border rounded"
                            value={newRes.url || newRes.size}
                            onChange={e => setNewRes({ ...newRes, url: e.target.value, size: e.target.value })}
                        />
                        <div className="md:col-span-3 flex justify-end">
                            <button type="submit" className="btn-primary px-6">Add Resource</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4">Resource Name</th>
                            <th className="px-6 py-4 hidden md:table-cell">Type</th>
                            <th className="px-6 py-4 hidden sm:table-cell">Date Added</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {(resources || []).map((res) => (
                            <tr key={res.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-slate-200">
                                            {getIcon(res.type)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{res.title}</p>
                                            <p className="text-slate-500 text-xs">{res.size || res.duration || res.url}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 hidden md:table-cell">
                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium border border-slate-200">
                                        {res.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 hidden sm:table-cell text-slate-500">
                                    {res.date}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button
                                            onClick={() => handleOpen(res)}
                                            className="text-primary-600 hover:text-primary-700 font-medium text-xs hover:underline flex items-center gap-1"
                                        >
                                            {res.type === 'Link' ? 'Visit' : 'Download'}
                                            {res.type === 'Link' ? <ExternalLink size={12} /> : <Download size={12} />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(res.id, res.title)}
                                            className="text-slate-300 hover:text-red-500 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Resources;
