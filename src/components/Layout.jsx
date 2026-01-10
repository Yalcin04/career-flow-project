import { Outlet, Link } from 'react-router-dom';
import { ShoppingBag, User, Home, Search, MessageCircle, Heart } from 'lucide-react';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <header className="bg-white border-b sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2 text-indigo-600 font-bold text-xl">
                        <ShoppingBag className="w-6 h-6" />
                        <span>CampusMarket</span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium">Home</Link>
                        <Link to="/search" className="text-gray-600 hover:text-indigo-600 font-medium">Browse</Link>
                        <Link to="/sell" className="text-gray-600 hover:text-indigo-600 font-medium">Sell</Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Link to="/favorites" className="text-gray-600 hover:text-indigo-600">
                            <Heart className="w-5 h-5" />
                        </Link>
                        <Link to="/messages" className="text-gray-600 hover:text-indigo-600">
                            <MessageCircle className="w-5 h-5" />
                        </Link>
                        <Link to="/profile" className="text-gray-600 hover:text-indigo-600">
                            <User className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-8">
                <Outlet />
            </main>

            <footer className="bg-gray-50 border-t py-8">
                <div className="container mx-auto px-4 text-center text-gray-500">
                    <p>&copy; 2024 CampusMarket. Built for students.</p>
                </div>
            </footer>
        </div>
    );
}
