import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { Search as SearchIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('items')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(8);

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Hero / Search Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Find What You Need on Campus</h1>
                <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
                    Buy and sell textbooks, electronics, furniture, and more with other students at your university.
                </p>
                <div className="max-w-xl mx-auto bg-white rounded-xl flex items-center p-2 shadow-lg">
                    <SearchIcon className="w-5 h-5 text-gray-400 ml-3" />
                    <input
                        type="text"
                        placeholder="Search for textbooks, furniture..."
                        className="flex-1 px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none"
                    />
                    <Link
                        to="/search"
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                        Search
                    </Link>
                </div>
            </section>

            {/* Categories */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {['Books', 'Electronics', 'Furniture', 'Clothing', 'Sports', 'Other'].map((cat) => (
                        <Link
                            key={cat}
                            to={`/search?category=${cat}`}
                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center hover:border-indigo-200 hover:shadow-md transition-all"
                        >
                            <span className="font-medium text-gray-700">{cat}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Items */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Fresh Findings</h2>
                    <Link to="/search" className="text-indigo-600 font-medium hover:text-indigo-700">View All</Link>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-gray-500">Loading fresh items...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ItemCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl text-gray-500">
                                No items found. Be the first to sell something!
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}

