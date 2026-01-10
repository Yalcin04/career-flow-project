import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Upload, DollarSign, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function CreateListing() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: '',
        description: '',
        location: '',
        image: '' // Using URL for simplicity
    });

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            navigate('/login');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                navigate('/login');
                return;
            }

            if (!formData.title || !formData.price || !formData.category) {
                alert('Please fill in all required fields');
                return;
            }

            const { error } = await supabase
                .from('items')
                .insert([
                    {
                        title: formData.title,
                        price: parseFloat(formData.price),
                        category: formData.category,
                        description: formData.description,
                        location: formData.location,
                        image: formData.image || null,
                        seller_id: user.id
                    }
                ]);

            if (error) throw error;

            alert('Item listed successfully!');
            navigate('/'); // Redirect to home
        } catch (error) {
            console.error('Error listing item:', error);
            alert('Error creating listing: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Sell an Item</h1>
                <p className="text-gray-500">List your item for sale on CampusMarket</p>
            </div>

            <Card className="p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Item Image URL</label>
                    <div className="flex items-center gap-4">
                        <Input
                            name="image"
                            placeholder="https://example.com/image.jpg"
                            value={formData.image}
                            onChange={handleChange}
                            className="flex-1"
                        />
                    </div>
                    {formData.image && (
                        <div className="mt-4 aspect-video rounded-lg bg-gray-100 overflow-hidden relative w-full h-48">
                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                        </div>
                    )}
                </div>

                <Input
                    label="Title"
                    placeholder="e.g. Calculus Textbook (8th Ed)"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">$</span>
                        </div>
                        <input
                            type="number"
                            name="price"
                            className="pl-7 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="0.00"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Select a category</option>
                        <option value="Books">Books</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Sports">Sports</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        rows="4"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Describe the condition, reason for selling, etc."
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location / Meetup Spot</label>
                    <Input
                        placeholder="e.g. Student Union, Library"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="pt-4 border-t">
                    <Button className="w-full text-lg" onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Posting...' : 'Post Listing'}
                    </Button>
                </div>
            </Card>
        </div>
    );
}

