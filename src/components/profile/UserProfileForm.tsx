import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function UserProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    preferredLocation: '',
    resume: null as File | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('No user found');

      let resumeUrl = '';
      if (formData.resume) {
        // Create a unique file name
        const timestamp = new Date().getTime();
        const fileExt = formData.resume.name.split('.').pop();
        const fileName = `${timestamp}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        // First, ensure the bucket exists and has proper permissions
        const { data: storageData, error: storageError } = await supabase
          .storage
          .getBucket('resumes');

        if (storageError && storageError.message.includes('does not exist')) {
          // Create the bucket if it doesn't exist
          await supabase
            .storage
            .createBucket('resumes', {
              public: false,
              fileSizeLimit: 5242880 // 5MB
            });
        }

        // Upload the file
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('resumes')
          .upload(filePath, formData.resume, {
            cacheControl: '3600',
            upsert: true // Allow overwriting
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error(`Failed to upload resume: ${uploadError.message}`);
        }

        // Get the public URL
        const { data: urlData } = supabase
          .storage
          .from('resumes')
          .getPublicUrl(filePath);

        resumeUrl = urlData.publicUrl;
      }

      // Update or insert profile data
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          preferred_location: formData.preferredLocation,
          resume_url: resumeUrl || null
        }, {
          onConflict: 'user_id'
        });

      if (profileError) {
        throw new Error(`Failed to save profile: ${profileError.message}`);
      }

      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert(error instanceof Error ? error.message : 'Error saving profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        alert('File size must be less than 5MB');
        e.target.value = '';
        return;
      }

      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      if (!allowedTypes.includes(file.type)) {
        alert('Only PDF and Word documents are allowed');
        e.target.value = '';
        return;
      }

      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Complete Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            id="address"
            required
            rows={3}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="preferredLocation" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Job Location
          </label>
          <input
            type="text"
            id="preferredLocation"
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={formData.preferredLocation}
            onChange={(e) => setFormData(prev => ({ ...prev, preferredLocation: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
            Resume (PDF or Word document, max 5MB)
          </label>
          <input
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}