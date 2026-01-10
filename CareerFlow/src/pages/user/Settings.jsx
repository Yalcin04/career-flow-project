import { Moon, Sun } from 'lucide-react'

export default function Settings() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Settings</h2>

            <div className="card space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-slate-900">Appearance</h3>
                    <p className="text-sm text-slate-500">Customize how the app looks.</p>
                </div>

                <div className="flex items-center justify-between py-4 border-t border-slate-100">
                    <div className="flex items-center space-x-3">
                        <Moon className="h-5 w-5 text-slate-600" />
                        <span className="text-sm font-medium text-slate-900">Dark Mode (Coming Soon)</span>
                    </div>
                    <button className="bg-slate-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-not-allowed rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none">
                        <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                    </button>
                </div>

                <div>
                    <h3 className="text-lg font-medium text-slate-900">Notifications</h3>
                    <p className="text-sm text-slate-500">Manage your email alerts.</p>
                </div>
                {/* Settings Toggles could go here */}
            </div>
        </div>
    )
}
