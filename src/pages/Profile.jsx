import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { User, Settings, Package, Star, Clock } from 'lucide-react';

const MOCK_LISTINGS = [
    { id: 1, title: 'Calculus Textbook', price: 45, image: 'https://placehold.co/400x300?text=Calculus', status: 'Active' },
    { id: 6, title: 'Keyboard', price: 25, image: 'https://placehold.co/400x300?text=Keyboard', status: 'Sold' },
];

export default function Profile() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header */}
            <Card className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-3xl font-bold border-4 border-white shadow-lg">
                        JD
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                        <p className="text-gray-500">Computer Science • Senior</p>
                        <div className="flex items-center justify-center md:justify-start mt-2 space-x-4 text-sm text-gray-600">
                            <span className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-500" /> 4.9 (12 reviews)</span>
                            <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-gray-400" /> Member since 2023</span>
                        </div>
                    </div>
                    <Link to="/profile/edit">
                        <Button variant="secondary" className="flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            Edit Profile
                        </Button>
                    </Link>
                </div>
            </Card>

            {/* Sales Stats / listings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-6">
                    <Card className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-gray-600">
                                <span>Items Sold</span>
                                <span className="font-medium text-gray-900">8</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600">
                                <span>Active Listings</span>
                                <span className="font-medium text-gray-900">1</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600">
                                <span>Total Earned</span>
                                <span className="font-medium text-indigo-600">$420</span>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">My Listings</h2>
                    <div className="space-y-4">
                        {MOCK_LISTINGS.map(item => (
                            <Card key={item.id} className="p-4 flex items-center gap-4">
                                <img src={item.image} alt={item.title} className="w-20 h-20 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                    <p className="font-bold text-indigo-600">${item.price}</p>
                                </div>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {item.status}
                                    </span>
                                </div>
                            </Card>
                        ))}
                        <Link to="/sell">
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer">
                                + Create New Listing
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
