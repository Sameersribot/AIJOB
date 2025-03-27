import UserProfileForm from '../components/profile/UserProfileForm';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PersonalInfo() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            to="/profile"
            className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-8 border-b">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <p className="text-gray-500 mt-2">Update your profile details and preferences</p>
          </div>
          <div className="p-8">
            <UserProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}