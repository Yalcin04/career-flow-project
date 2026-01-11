import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">

            {/* --- Üst Başlık Kartı (Header) --- */}
            <div className="card relative overflow-hidden group">
                {/* Arka Plan Banner */}
                <div className="h-32 bg-gradient-to-r from-primary-600 to-indigo-600"></div>

                <div className="px-6 pb-6">
                    <div className="relative flex justify-between items-end -mt-12 mb-4">
                        {/* Profil Fotoğrafı */}
                        <div className="w-24 h-24 bg-white rounded-full p-1 ring-4 ring-white shadow-sm">
                            <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-3xl select-none">
                                👨‍💻
                            </div>
                        </div>

                        {/* 3. EKLENEN KISIM: Butona tıklama özelliği geldi */}
                        <button
                            onClick={() => navigate('/settings')}
                            className="btn-secondary text-sm flex items-center gap-2"
                        >
                            <span>✏️</span> Profili Düzenle
                        </button>
                    </div>

                    {/* İsim ve Unvan */}
                    <div>
                        {/* İsim ve Unvan */}
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">{user.fullName}</h1>
                            <p className="text-slate-600 font-medium">{user.title}</p>

                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">
                                <span className="flex items-center gap-1">📍 {user.location}</span>
                                <span className="flex items-center gap-1 hover:text-primary-600 cursor-pointer">🔗 {user.github}</span>
                                <span className="flex items-center gap-1 hover:text-primary-600 cursor-pointer">🌐 {user.linkedin}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Alt Izgara Yapısı --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* SOL KOLON */}
                <div className="space-y-6">
                    <div className="card">
                        <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                            ⚡ Yetenekler
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {(user.skills || []).map((skill) => (
                                <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                            🎓 Eğitim
                        </h3>
                        <div className="space-y-4">
                            <div className="relative pl-4 border-l-2 border-slate-200">
                                <p className="text-sm font-bold text-slate-900">{user.university}</p>
                                <p className="text-xs text-slate-600">{user.department} (Lisans)</p>
                                <p className="text-xs text-slate-400 mt-1">2025 - Devam Ediyor</p>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="font-semibold text-slate-800 mb-3">İstatistikler</h3>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-2 bg-slate-50 rounded-lg">
                                <div className="text-xl font-bold text-primary-600">{user.stats?.projects || 0}</div>
                                <div className="text-xs text-slate-500">Proje</div>
                            </div>
                            <div className="p-2 bg-slate-50 rounded-lg">
                                <div className="text-xl font-bold text-primary-600">{user.stats?.semester || '-'}</div>
                                <div className="text-xs text-slate-500">Dönem</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SAĞ KOLON */}
                <div className="md:col-span-2 space-y-6">
                    <div className="card">
                        <h3 className="font-semibold text-slate-800 mb-3">Hakkımda</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            {user.bio}
                        </p>
                    </div>

                    <div className="card">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-slate-800">Son Projeler & Çalışmalar</h3>
                            <a href="#" className="text-xs text-primary-600 hover:underline">Tümünü Gör →</a>
                        </div>

                        <div className="space-y-4">
                            {(user.projects || []).map((project) => (
                                <div key={project.id} className="group p-4 border border-slate-100 rounded-lg hover:bg-slate-50 hover:border-primary-100 transition-all cursor-pointer">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-medium text-slate-900 group-hover:text-primary-600 transition-colors">{project.title}</h4>
                                            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                                                {project.description}
                                            </p>
                                            <div className="flex gap-2 mt-3">
                                                {project.tags.map(tag => (
                                                    <span key={tag} className={`text-[10px] px-2 py-0.5 rounded border ${project.tagColors?.[tag] || 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${project.statusColor}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;