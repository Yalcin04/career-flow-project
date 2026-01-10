import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard'; // Correct path for ItemCard, same as Home.jsx? No, Search is in pages, so ../components/ItemCard is correct.
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const initialCategory = searchParams.get('category') || 'All';
    const [category, setCategory] = useState(initialCategory);
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        fetchProducts();
    }, [searchParams]); // Re-fetch when URL params change

    useEffect(() => {
        // Sync local state if URL param changes externally (e.g. from Home link)
        const cat = searchParams.get('category');
        if (cat) setCategory(cat);
    }, [searchParams]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            let query = supabase.from('items').select('*');

            const urlCategory = searchParams.get('category');
            if (urlCategory && urlCategory !== 'All') {
                query = query.eq('category', urlCategory);
            }

            // Simple text search if needed, though Supabase text search configuration might vary.
            // For now, let's just fetch all and filter client side for text if row count is small, 
            // or use ilike for title if simple.
            // Let's rely on basic filtering first. 

            const { data, error } = await query;

            if (error) throw error;

            // Client-side filtering for search term (basic) until full text search is set up
            let filtered = data || [];
            if (searchTerm) {
                filtered = filtered.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
            }
            if (minPrice) {
                filtered = filtered.filter(p => p.price >= Number(minPrice));
            }
            if (maxPrice) {
                filtered = filtered.filter(p => p.price <= Number(maxPrice));
            }

            setProducts(filtered);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApplyFilters = () => {
        // Update URL params to reflect category? Or just refetch? 
        // For simplicity, let's just refetch.
        // Or better, update URL params so it's shareable.
        const params = {};
        if (category && category !== 'All') params.category = category;
        setSearchParams(params);
        fetchProducts();
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        // Debounce could be good here, but for now let's just fit basic requirement
    };

    return (
        <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
                <Card className="p-4 sticky top-24">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold text-gray-900">Filters</h2>
                        <button
                            className="md:hidden text-gray-500"
                            onClick={() => setShowFilters(false)}
                        >
                            Close
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
                            <div className="space-y-2">
                                {['All', 'Books', 'Electronics', 'Furniture', 'Clothing', 'Sports', 'Other'].map(cat => (
                                    <label key={cat} className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={category === cat}
                                            onChange={() => setCategory(cat)}
                                            className="rounded text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="text-sm text-gray-700">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <Input
                                    placeholder="Min"
                                    type="number"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                />
                                <Input
                                    placeholder="Max"
                                    type="number"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button className="w-full" onClick={handleApplyFilters}>Apply Filters</Button>
                    </div>
                </Card>
            </aside>

            {/* Results */}
            <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        className="md:hidden p-2 bg-white border rounded-lg"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex-1">
                        <Input
                            placeholder="Search items..."
                            className="w-full"
                            value={searchTerm}
                            onChange={handleSearch}
                            onKeyDown={(e) => e.key === 'Enter' && fetchProducts()}
                        />
                    </div>
                    <select className="px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>Newest First</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                    </select>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-gray-500">Loading results...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ItemCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl text-gray-500">
                                No items found matching your criteria.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

