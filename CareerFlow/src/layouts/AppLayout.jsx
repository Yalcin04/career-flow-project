import Sidebar from '@/components/Sidebar'

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <div className="pl-64">
                <main className="py-8 px-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
