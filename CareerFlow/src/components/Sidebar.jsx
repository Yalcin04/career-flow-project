import { Link, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    KanbanSquare,
    TableProperties,
    PlusCircle,
    CalendarDays,
    Users,
    BookOpen,
    BarChart3,
    UserCircle,
    Settings as SettingsIcon,
    LogOut
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Board View', href: '/applications', icon: KanbanSquare },
    { name: 'List View', href: '/applications-list', icon: TableProperties },
    { name: 'Add Application', href: '/applications/new', icon: PlusCircle },
    { name: 'Interviews', href: '/interviews', icon: CalendarDays },
    { name: 'Contacts', href: '/contacts', icon: Users },
    { name: 'Resources', href: '/resources', icon: BookOpen },
    { name: 'Statistics', href: '/statistics', icon: BarChart3 },
    { name: 'Profile', href: '/profile', icon: UserCircle },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
]

export default function Sidebar() {
    const location = useLocation()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
    }

    return (
        <div className="flex w-64 flex-col bg-slate-900 border-r border-slate-800 h-screen fixed left-0 top-0">
            <div className="flex h-16 shrink-0 items-center px-6 bg-slate-950">
                <h1 className="text-xl font-bold text-white tracking-tight">CareerFlow</h1>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto">
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${isActive
                                        ? 'bg-primary-600 text-white'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
                `}
                            >
                                <item.icon
                                    className={`
                    mr-3 h-5 w-5 flex-shrink-0
                    ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}
                  `}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="flex shrink-0 border-t border-slate-800 p-4 bg-slate-950">
                <button
                    onClick={handleSignOut}
                    className="group flex w-full items-center px-3 py-2 text-sm font-medium text-slate-300 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5 text-slate-400 group-hover:text-white" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}
