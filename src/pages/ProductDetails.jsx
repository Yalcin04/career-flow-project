import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { MessageCircle, Heart, Share2, MapPin, Calendar, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);

    useEffect(() => {
        if (id) {
            fetchProduct();
            checkFavoriteStatus();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data, error } = await supabase
                .from('items')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const checkFavoriteStatus = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data, error } = await supabase
                .from('favorites')
                .select('*')
                .eq('user_id', user.id)
                .eq('item_id', id)
                .single();

            if (data && !error) {
                setIsFavorite(true);
            }
        }
    };

    const handleFavoriteClick = async () => {
        setFavoriteLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            window.location.href = '/login';
            return;
        }

        if (isFavorite) {
            const { error } = await supabase
                .from('favorites')
                .delete()
                .eq('user_id', user.id)
                .eq('item_id', id);

            if (!error) setIsFavorite(false);
        } else {
            const { error } = await supabase
                .from('favorites')
                .insert([{ user_id: user.id, item_id: id }]);

            if (!error) setIsFavorite(true);
        }
        setFavoriteLoading(false);
    };

    if (loading) return <div className="text-center py-12">Loading...</div>;
    if (!product) return <div className="text-center py-12">Product not found</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Column - Images */}
                <div className="md:col-span-2 space-y-4">
                    <div className="bg-gray-100 rounded-xl overflow-hidden aspect-[4/3]">
                        <img
                            src={product.image || 'https://placehold.co/600x400?text=No+Image'}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {product.description || 'No description provided.'}
                        </p>
                    </div>
                </div>

                {/* Right Column - Details */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
                                <p className="text-3xl font-bold text-indigo-600">${product.price}</p>
                            </div>
                            <button
                                onClick={handleFavoriteClick}
                                disabled={favoriteLoading}
                                className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                            >
                                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                            </button>
                        </div>

                        <div className="space-y-3 mb-6 text-sm text-gray-600">
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                {product.location || 'On Campus'}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                Posted {new Date(product.created_at).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button className="w-full flex items-center justify-center gap-2">
                                <MessageCircle className="w-5 h-5" />
                                Contact Seller
                            </Button>
                            <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                                <Share2 className="w-5 h-5" />
                                Share Listing
                            </Button>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Seller Information</h3>
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-gray-500" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Student Seller</p>
                                <p className="text-sm text-gray-500">Member</p>
                            </div>
                        </div>
                        <div className="text-sm text-gray-600">
                            {/* Rating placeholder since we don't have it in items table */}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

