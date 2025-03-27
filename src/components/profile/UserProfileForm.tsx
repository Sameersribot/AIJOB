import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Edit2, Save } from 'lucide-react';

interface UserProfile {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  preferred_location: string;
  linkedinUrl: string;
  skills: string;
  years_of_experience: number;
  resume_url: string | null;
}

export default function UserProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    preferredLocation: '',
    linkedinUrl: '',
    skills: '',
    yearsOfExperience: '',
    resume: null as File | null
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfile(data);
        setFormData({
          fullName: data.full_name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          preferredLocation: data.preferred_location,
          linkedinUrl: data.linkedinUrl,
          skills: data.skills || '',
          yearsOfExperience: data.years_of_experience?.toString() || '',
          resume: null
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('No user found');

      let resumeUrl = profile?.resume_url || '';
      if (formData.resume) {
        const timestamp = new Date().getTime();
        const fileExt = formData.resume.name.split('.').pop();
        const fileName = `${timestamp}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { data: storageData, error: storageError } = await supabase
          .storage
          .getBucket('resumes');

        if (storageError && storageError.message.includes('does not exist')) {
          await supabase
            .storage
            .createBucket('resumes', {
              public: false,
              fileSizeLimit: 5242880
            });
        }

        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('resumes')
          .upload(filePath, formData.resume, {
            cacheControl: '3600',
            upsert: true
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error(`Failed to upload resume: ${uploadError.message}`);
        }

        const { data: urlData } = supabase
          .storage
          .from('resumes')
          .getPublicUrl(filePath);

        resumeUrl = urlData.publicUrl;
      }

      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          preferred_location: formData.preferredLocation,
          linkedinUrl: formData.linkedinUrl,
          skills: formData.skills,
          years_of_experience: parseInt(formData.yearsOfExperience),
          resume_url: resumeUrl || null
        }, {
          onConflict: 'user_id'
        });

      if (profileError) {
        throw new Error(`Failed to save profile: ${profileError.message}`);
      }

      await fetchProfile();
      setIsEditing(false);
      alert('Profile saved successfully!');


      // Send to webhook after successful save
      await fetch('https://hook.eu2.make.com/eviahzne8sti2td3vxwqqoywxri9gaju', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resume_url: resumeUrl }),
      });
  
      alert('Profile saved successfully!');
    } 
  
  
    catch (error) {
      console.error('Error saving profile:', error);
      alert(error instanceof Error ? error.message : 'Error saving profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File size must be less than 5MB');
        e.target.value = '';
        return;
      }

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

  if (!profile && !isEditing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Complete Your Profile</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Create Profile
        </button>
      </div>
    );
  }

  if (!isEditing && profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Profile Details</h2>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Edit2 className="h-4 w-4" /> Edit Profile
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
            <p className="mt-1">{profile.full_name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="mt-1">{profile.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Phone</h3>
            <p className="mt-1">{profile.phone}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Address</h3>
            <p className="mt-1">{profile.address}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Preferred Location</h3>
            <p className="mt-1">{profile.preferred_location}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Linkedin Profile Url</h3>
            <p className="mt-1">{profile.linkedinUrl}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Skills</h3>
            <div className="mt-1 flex flex-wrap gap-2">
              {profile.skills?.split(',').map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Years of Experience</h3>
            <p className="mt-1">{profile.years_of_experience} years</p>
          </div>
          {profile.resume_url && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Resume</h3>
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
              >
                View Resume
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {profile ? 'Edit Profile' : 'Complete Your Profile'}
        </h2>
        {profile && (
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        )}
      </div>
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
          <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Linkedin Profile Url
          </label>
          <input
            type="text"
            id="linkedinUrl"
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={formData.linkedinUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
            Skills (comma-separated)
          </label>
          <input
            type="text"
            id="skills"
            required
            placeholder="e.g., JavaScript, React, Node.js"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={formData.skills}
            onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
            Years of Experience
          </label>
          <input
            type="number"
            id="yearsOfExperience"
            required
            min="0"
            max="50"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={formData.yearsOfExperience}
            onChange={(e) => setFormData(prev => ({ ...prev, yearsOfExperience: e.target.value }))}
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
          {profile?.resume_url && !formData.resume && (
            <p className="mt-2 text-sm text-gray-600">
              Current resume: <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">View</a>
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            'Saving...'
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Profile
            </>
          )}
        </button>
      </form>
    </div>
  );
}