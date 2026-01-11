import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    // Initial default state with consolidated user object
    const defaultState = {
        user: {
            fullName: 'Öğrenci Adı',
            title: 'Bilgisayar Mühendisliği Öğrencisi @ İstanbul Üniversitesi',
            email: 'ogrenci@universite.edu.tr',
            university: 'İstanbul Üniversitesi',
            department: 'Bilgisayar Mühendisliği',
            location: 'İstanbul, Türkiye',
            github: 'github.com/kullanici',
            linkedin: 'linkedin.com/in/kullanici',
            bio: 'Merhaba! Ben teknolojiye ve yazılıma tutkulu bir Bilgisayar Mühendisliği öğrencisiyim. Özellikle Siber Güvenlik ve Web Teknolojileri alanlarına ilgi duyuyorum. Kariyerimde güvenli, ölçeklenebilir ve kullanıcı dostu sistemler geliştirmeyi hedefliyorum.',
            // Consolidated nested data
            stats: {
                projects: 3,
                semester: '1. Sınıf',
            },
            skills: ['C Programming', 'React', 'Cybersecurity', 'Tailwind CSS', 'Git', 'Linux'],
            projects: [
                {
                    id: 1,
                    title: 'CareerFlow Projesi',
                    description: 'Üniversite öğrencileri için kariyer planlama ve staj takip platformu.',
                    tags: ['Frontend', 'React'],
                    status: 'Aktif',
                    statusColor: 'bg-green-100 text-green-700',
                    tagColors: {
                        'Frontend': 'bg-blue-50 text-blue-600 border-blue-100',
                        'React': 'bg-cyan-50 text-cyan-600 border-cyan-100'
                    }
                },
                {
                    id: 2,
                    title: 'Otobüs Bilet Otomasyonu',
                    description: 'C programlama dili kullanılarak geliştirilmiş, terminal tabanlı sistem.',
                    tags: ['C Language'],
                    status: 'Tamamlandı',
                    statusColor: 'bg-slate-100 text-slate-600',
                    tagColors: {
                        'C Language': 'bg-orange-50 text-orange-600 border-orange-100'
                    }
                }
            ],
            notifications: true,
            darkMode: false
        },
        appData: {
            contacts: [
                { id: 1, name: 'Ahmet Yılmaz', role: 'Senior Developer', company: 'Tech Corp', email: 'ahmet@tech.com', image: '👨‍💼', status: 'Online' },
                { id: 2, name: 'Ayşe Demir', role: 'Product Manager', company: 'StartUp Inc.', email: 'ayse@startup.com', image: '👩‍💼', status: 'Offline' },
                { id: 3, name: 'Mehmet Öz', role: 'CTO', company: 'Future Systems', email: 'mehmet@future.com', image: '👨‍💻', status: 'Busy' },
                { id: 4, name: 'Zeynep Kaya', role: 'UX Designer', company: 'Creative Studio', email: 'zeynep@creative.com', image: '👩‍🎨', status: 'Online' },
                { id: 5, name: 'Can Yıldız', role: 'Software Engineer', company: 'Global Tech', email: 'can@global.com', image: '🧑‍💻', status: 'Offline' }
            ],
            resources: [
                { id: 1, title: 'React Interview Questions 2024', type: 'PDF', size: '2.4 MB', date: '10 Jan 2025', icon: '📄' },
                { id: 2, title: 'Advanced CSS Grid Guide', type: 'Video', duration: '15:30', date: '08 Jan 2025', icon: '🎬' },
                { id: 3, title: 'System Design Primer', type: 'Link', url: 'github.com/donnemartin', date: '05 Jan 2025', icon: '🔗' },
                { id: 4, title: 'JavaScript Algorithms', type: 'PDF', size: '5.1 MB', date: '01 Jan 2025', icon: '📄' },
                { id: 5, title: 'CareerFlow Architecture', type: 'Image', size: '1.2 MB', date: '28 Dec 2024', icon: '🖼️' }
            ]
        }
    };

    // Load from localStorage or use default
    // Load from localStorage or use default
    const [state, setState] = useState(() => {
        try {
            const saved = localStorage.getItem('userState');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Deep merge or specific merge to ensure structure
                return {
                    ...defaultState,
                    ...parsed,
                    user: {
                        ...defaultState.user,
                        ...(parsed.user || {})
                    },
                    appData: parsed.appData || defaultState.appData
                };
            }
        } catch (e) {
            console.error('Failed to parse user state', e);
        }
        return defaultState;
    });

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('userState', JSON.stringify(state));
    }, [state]);

    const updateUser = (updates) => {
        setState(prev => ({
            ...prev,
            user: { ...prev.user, ...updates }
        }));
    };

    const addContact = (contact) => {
        const newContact = {
            id: Date.now(),
            image: ['👨‍💼', '👩‍💼', '👨‍💻', '👩‍🎨', '🧑‍💻'][Math.floor(Math.random() * 5)], // Random avatar
            status: 'Online',
            ...contact
        };
        setState(prev => ({
            ...prev,
            appData: {
                ...prev.appData,
                contacts: [...prev.appData.contacts, newContact]
            }
        }));
    };

    const deleteContact = (id) => {
        setState(prev => ({
            ...prev,
            appData: {
                ...prev.appData,
                contacts: prev.appData.contacts.filter(c => c.id !== id)
            }
        }));
    };

    const addResource = (resource) => {
        const newResource = {
            id: Date.now(),
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            size: '', // optional or default
            icon: resource.type === 'Video' ? '🎬' : resource.type === 'Link' ? '🔗' : resource.type === 'Image' ? '🖼️' : '📄',
            ...resource
        };
        setState(prev => ({
            ...prev,
            appData: {
                ...prev.appData,
                resources: [newResource, ...prev.appData.resources] // Add to top
            }
        }));
    };

    const deleteResource = (id) => {
        setState(prev => ({
            ...prev,
            appData: {
                ...prev.appData,
                resources: prev.appData.resources.filter(r => r.id !== id)
            }
        }));
    };

    const value = {
        ...state,
        updateUser,
        addContact,
        deleteContact,
        addResource,
        deleteResource
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
