import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabase';
import { BarChart, Briefcase, Package } from 'lucide-react';
import UserProfileForm from '../components/profile/UserProfileForm';

interface Subscription {
  plan_name: string;
  applications_limit: number;
  start_date: string;
  end_date: string;
  status: string;
}

interface JobApplication {
  id: string;
  company_name: string;
  job_title: string;
  status: string;
  applied_date: string;
}

export default function Profile() {
  const { user } = useUser();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      if (!user) return;

      // Fetch subscription with real-time updates
      const { data: subData, error: subError } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (subError) throw subError;
      setSubscription(subData);

      // Fetch job applications
      const { data: appData, error: appError } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('applied_date', { ascending: false });

      if (appError) throw appError;
      setApplications(appData || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();

    // Set up real-time subscription updates
    const subscriptionChannel = supabase
      .channel('subscription_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_subscriptions',
          filter: `user_id=eq.${user?.id}`
        },
        () => {
          fetchUserData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscriptionChannel);
    };
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Current Plan */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            <Package className="h-6 w-6 text-gray-600" />
            <h3 className="text-lg font-semibold">Current Plan</h3>
          </div>
          {subscription ? (
            <>
              <p className="text-2xl font-bold mb-2">{subscription.plan_name}</p>
              <p className="text-gray-600">
                {subscription.applications_limit} applications/month
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Valid until: {new Date(subscription.end_date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Status: <span className="capitalize">{subscription.status}</span>
              </p>
            </>
          ) : (
            <p className="text-gray-600">No active subscription</p>
          )}
        </div>

        {/* Applications Stats */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart className="h-6 w-6 text-gray-600" />
            <h3 className="text-lg font-semibold">Applications</h3>
          </div>
          <p className="text-2xl font-bold mb-2">{applications.length}</p>
          <p className="text-gray-600">Total applications</p>
          {subscription && (
            <p className="text-sm text-gray-500 mt-2">
              {subscription.applications_limit - applications.length} applications remaining
            </p>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            <Briefcase className="h-6 w-6 text-gray-600" />
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>
          {applications.length > 0 ? (
            <div className="space-y-3">
              {applications.slice(0, 3).map((app) => (
                <div key={app.id} className="text-sm">
                  <p className="font-medium">{app.job_title}</p>
                  <p className="text-gray-600">{app.company_name}</p>
                  <p className="text-gray-500 text-xs">
                    {new Date(app.applied_date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No recent applications</p>
          )}
        </div>
      </div>

      {/* Job Applications List */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-12">
        <h3 className="text-xl font-semibold mb-6">Job Applications</h3>
        {applications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Job Title</th>
                  <th className="text-left py-3 px-4">Company</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Applied Date</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{app.job_title}</td>
                    <td className="py-3 px-4">{app.company_name}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(app.applied_date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No job applications yet</p>
        )}
      </div>

      {/* Profile Form */}
      <UserProfileForm />
    </div>
  );
}