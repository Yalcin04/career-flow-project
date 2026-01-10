import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { Search } from 'lucide-react';

const MOCK_CHATS = [
    { id: 1, user: 'Alex Johnson', lastMessage: 'Is the calculus book still available?', time: '2m ago', unread: true, avatar: 'AJ' },
    { id: 2, user: 'Sarah Smith', lastMessage: 'Thanks, meeting at the library works.', time: '1h ago', unread: false, avatar: 'SS' },
    { id: 3, user: 'Mike Brown', lastMessage: 'Can you do $40?', time: '1d ago', unread: false, avatar: 'MB' },
];

export default function Messages() {
    return (
        <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex gap-6">
            {/* Chat List */}
            <Card className="w-1/3 flex flex-col">
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search messages"
                            className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {MOCK_CHATS.map(chat => (
                        <div key={chat.id} className={`p-4 flex items-start gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 ${chat.unread ? 'bg-indigo-50/50' : ''}`}>
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">
                                {chat.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className={`text-sm truncate ${chat.unread ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{chat.user}</h3>
                                    <span className="text-xs text-gray-500">{chat.time}</span>
                                </div>
                                <p className={`text-sm truncate ${chat.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{chat.lastMessage}</p>
                            </div>
                            {chat.unread && <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Chat Area (Placeholder for MVP) */}
            <Card className="flex-1 flex items-center justify-center bg-gray-50 text-gray-400">
                <div className="text-center">
                    <p>Select a conversation to start chatting</p>
                </div>
            </Card>
        </div>
    );
}
