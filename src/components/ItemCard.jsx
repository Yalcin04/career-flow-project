import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Card from './ui/Card';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function ItemCard({ product }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkFavoriteStatus();
    }, [product.id]);

    const checkFavoriteStatus = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data, error } = await supabase
                .from('favorites')
                .select('*')
                .eq('user_id', user.id)
                .eq('item_id', product.id)
                .single();

            if (data && !error) {
                setIsFavorite(true);
            }
        }
    };

    const handleFavoriteClick = async (e) => {
        e.preventDefault(); // Prevent navigation
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            // Redirect to login if not logged in (optional: could show toast instead)
            window.location.href = '/login';
            return;
        }

        if (isFavorite) {
            // Remove from favorites
            const { error } = await supabase
                .from('favorites')
                .delete()
                .eq('user_id', user.id)
                .eq('item_id', product.id);

            if (!error) setIsFavorite(false);
        } else {
            // Add to favorites
            const { error } = await supabase
                .from('favorites')
                .insert([{ user_id: user.id, item_id: product.id }]);

            if (!error) setIsFavorite(true);
        }
        setLoading(false);
    };

    return (
        <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <Link to={`/items/${product.id}`} className="flex-1 flex flex-col">
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden rounded-t-xl">
                    <img
                        src={product.image || 'https://placehold.co/400x300?text=No+Image'}
                        alt={product.title}
                        className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        {product.category}
                    </span>
                    <button
                        onClick={handleFavoriteClick}
                        disabled={loading}
                        className={`absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                    >
                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                </div>
                <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.title}</h3>
                    <p className="text-lg font-bold text-indigo-600 mt-auto">${product.price}</p>
                </div>
            </Link>
        </Card>
    );
}
