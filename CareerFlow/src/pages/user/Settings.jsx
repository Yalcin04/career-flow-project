import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const { user, updateUser } = useUser();
    const navigate = useNavigate();

    // Initialize state with context values
    const [formData, setFormData] = useState({
        fullName: user.id ? user.fullName || '' : '',
        title: user.id ? user.title || '' : '',
        email: user.id ? user.email || '' : '',
        university: user.id ? user.university || '' : '',
        department: user.id ? user.department || '' : '',
        location: user.id ? user.location || '' : '',
        bio: user.id ? user.bio || '' : '',
        github: user.id ? user.github || '' : '',
        linkedin: user.id ? user.linkedin || '' : '',
        skills: user.skills ? user.skills.join(', ') : '', // Flatten array to string for editing
        stats_projects: user.stats ? user.stats.projects : 0,
        stats_semester: user.stats ? user.stats.semester : '',
        notifications: user.notifications,
        darkMode: user.darkMode
    });

    // Update local state when context changes
    useEffect(() => {
        setFormData({
            fullName: user.fullName || '',
            title: user.title || '',
            email: user.email || '',
            university: user.university || '',
            department: user.department || '',
            location: user.location || '',
            bio: user.bio || '',
            github: user.github || '',
            linkedin: user.linkedin || '',
            skills: user.skills ? user.skills.join(', ') : '',
            stats_projects: user.stats ? user.stats.projects : 0,
            stats_semester: user.stats ? user.stats.semester : '',
            notifications: user.notifications,
            darkMode: user.darkMode
        });
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Update User Profile
        updateUser({
            fullName: formData.fullName,
            title: formData.title,
            email: formData.email,
            university: formData.university,
            department: formData.department,
            location: formData.location,
            bio: formData.bio,
            github: formData.github,
            linkedin: formData.linkedin,
            skills: formData.skills.split(',').map(s => s.trim()).filter(s => s), // Parse string back to array
            stats: {
                projects: formData.stats_projects,
                semester: formData.stats_semester
            },
            notifications: formData.notifications,
            darkMode: formData.darkMode
        });

        alert("Ayarlarınız başarıyla güncellendi!");
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">

            {/* Başlık */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Ayarlar</h1>
                <p className="text-slate-500">Profil bilgilerinizi ve uygulama tercihlerinizi yönetin.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* --- Profil Bilgileri Bölümü --- */}
                <div className="card"> {/* index.css'deki .card sınıfı */}
                    <h2 className="text-xl font-semibold mb-4 text-slate-800">Profil Bilgileri</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Ad Soyad</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Unvan</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Örn: Bilgisayar Müh. Öğrencisi"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">E-posta</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Konum</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Örn: İstanbul, Türkiye"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Üniversite</label>
                            <input
                                type="text"
                                name="university"
                                value={formData.university}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Bölüm</label>
                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <label className="text-sm font-medium text-slate-700">Hakkımda</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                placeholder="Kendinizden kısaca bahsedin..."
                            />
                        </div>
                    </div>
                </div>

                {/* --- Sosyal Medya --- */}
                <div className="card">
                    <h2 className="text-xl font-semibold mb-4 text-slate-800">Sosyal Medya</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">GitHub</label>
                            <input
                                type="text"
                                name="github"
                                value={formData.github}
                                onChange={handleChange}
                                placeholder="github.com/kullanici"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">LinkedIn</label>
                            <input
                                type="text"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                placeholder="linkedin.com/in/kullanici"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* --- Yetenekler ve İstatistikler --- */}
                <div className="card">
                    <h2 className="text-xl font-semibold mb-4 text-slate-800">Yetenekler ve İstatistikler</h2>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Yetenekler (Virgülle ayırın)</label>
                            <textarea
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                rows="2"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                placeholder="React, Node.js, Python..."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Tamamlanan Proje Sayısı</label>
                                <input
                                    type="number"
                                    name="stats_projects"
                                    value={formData.stats_projects}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Mevcut Dönem</label>
                                <input
                                    type="text"
                                    name="stats_semester"
                                    value={formData.stats_semester}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Tercihler Bölümü --- */}
                <div className="card">
                    <h2 className="text-xl font-semibold mb-4 text-slate-800">Uygulama Tercihleri</h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-700">E-posta Bildirimleri</p>
                                <p className="text-sm text-slate-500">Kariyer fırsatları hakkında e-posta al.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="notifications"
                                    checked={formData.notifications}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                        </div>

                        <hr className="border-slate-100" />

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-700">Karanlık Mod (Beta)</p>
                                <p className="text-sm text-slate-500">Arayüz temasını değiştir.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="darkMode"
                                    checked={formData.darkMode}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* --- Butonlar --- */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/profile')}
                        className="btn-secondary"
                    >
                        İptal
                    </button>
                    <button type="submit" className="btn-primary">
                        Değişiklikleri Kaydet
                    </button>
                </div>

            </form>
        </div>
    );
};

export default Settings;