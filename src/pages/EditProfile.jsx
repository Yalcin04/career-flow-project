import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function EditProfile() {
    const navigate = useNavigate();

    const handleSave = (e) => {
        e.preventDefault();
        // Logic to update user profile
        navigate('/profile');
    };

    return (
        <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>
            <Card className="p-8">
                <form onSubmit={handleSave} className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold">
                            JD
                        </div>
                        <Button type="button" variant="secondary" size="sm">Change Photo</Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input label="First Name" defaultValue="John" />
                        <Input label="Last Name" defaultValue="Doe" />
                    </div>

                    <Input label="Major / Department" defaultValue="Computer Science" />
                    <Input label="Expected Graduation" type="date" />

                    <div className="pt-4 flex items-center justify-end gap-3">
                        <Button type="button" variant="ghost" onClick={() => navigate('/profile')}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
