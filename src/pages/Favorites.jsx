import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Favorites() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/login');
                return;
            }

            // Fetch favorite item IDs first
            const { data: favs, error: favError } = await supabase
                .from('favorites')
                .select('item_id')
                .eq('user_id', user.id);

            if (favError) throw favError;

            if (favs && favs.length > 0) {
                const itemIds = favs.map(f => f.item_id);
                // Fetch items
                const { data: items, error: itemsError } = await supabase
                    .from('items')
                    .select('*')
                    .in('id', itemIds);

                if (itemsError) throw itemsError;
                setFavorites(items || []);
            } else {
                setFavorites([]);
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Items</h1>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading your favorites...</div>
            ) : favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {favorites.map((product) => (
                        <ItemCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No saved items yet</h3>
                    <p className="text-gray-500 mb-6">Start browsing to find things you like</p>
                    <Link to="/" className="text-indigo-600 font-medium hover:underline">Browse Items</Link>
                </div>
            )}
        </div>
    );
}

