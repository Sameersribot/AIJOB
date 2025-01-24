// import { useEffect, useState } from 'react';
// import { useUser } from '../context/UserContext';
// import { supabase } from '../lib/supabase';
// import { BarChart, Briefcase, Package, ExternalLink } from 'lucide-react';
// import UserProfileForm from '../components/profile/UserProfileForm';

// interface Subscription {
//   plan_name: string;
//   applications_limit: number;
//   start_date: string;
//   end_date: string;
//   status: string;
// }

// interface JobApplication {
//   id: string;
//   company_name: string;
//   job_title: string;
//   status: string;
//   applied_date: string;
//   job_link?: string;
// }

// export default function Profile() {
//   const { user } = useUser();
//   const [subscription, setSubscription] = useState<Subscription | null>(null);
//   const [applications, setApplications] = useState<JobApplication[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchUserData = async () => {
//     try {
//       if (!user) return;

//       // Fetch subscription with real-time updates
//       const { data: subData, error: subError } = await supabase
//         .from('user_subscriptions')
//         .select('*')
//         .eq('user_id', user.id)
//         .maybeSingle();

//       if (subError) throw subError;
//       setSubscription(subData);

//       // Fetch job applications
//       const { data: appData, error: appError } = await supabase
//         .from('job_applications')
//         .select('*')
//         .eq('user_id', user.id)
//         .order('applied_date', { ascending: false });

//       if (appError) throw appError;
//       setApplications(appData || []);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();

//     // Set up real-time subscription updates
//     const subscriptionChannel = supabase
//       .channel('subscription_changes')
//       .on(
//         'postgres_changes',
//         {
//           event: '*',
//           schema: 'public',
//           table: 'user_subscriptions',
//           filter: `user_id=eq.${user?.id}`
//         },
//         () => {
//           fetchUserData();
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(subscriptionChannel);
//     };
//   }, [user]);

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <div className="text-center">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//         {/* Current Plan */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex items-center space-x-3 mb-4">
//             <Package className="h-6 w-6 text-gray-600" />
//             <h3 className="text-lg font-semibold">Current Plan</h3>
//           </div>
//           {subscription ? (
//             <>
//               <p className="text-2xl font-bold mb-2">{subscription.plan_name}</p>
//               <p className="text-gray-600">
//                 {subscription.applications_limit} applications/month
//               </p>
//               <p className="text-sm text-gray-500 mt-2">
//                 Valid until: {new Date(subscription.end_date).toLocaleDateString()}
//               </p>
//               <p className="text-sm text-gray-500">
//                 Status: <span className="capitalize">{subscription.status}</span>
//               </p>
//             </>
//           ) : (
//             <p className="text-gray-600">No active subscription</p>
//           )}
//         </div>

//         {/* Applications Stats */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex items-center space-x-3 mb-4">
//             <BarChart className="h-6 w-6 text-gray-600" />
//             <h3 className="text-lg font-semibold">Applications</h3>
//           </div>
//           <p className="text-2xl font-bold mb-2">{applications.length}</p>
//           <p className="text-gray-600">Total applications</p>
//           {subscription && (
//             <p className="text-sm text-gray-500 mt-2">
//               {subscription.applications_limit - applications.length} applications remaining
//             </p>
//           )}
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex items-center space-x-3 mb-4">
//             <Briefcase className="h-6 w-6 text-gray-600" />
//             <h3 className="text-lg font-semibold">Recent Activity</h3>
//           </div>
//           {applications.length > 0 ? (
//             <div className="space-y-3">
//               {applications.slice(0, 3).map((app) => (
//                 <div key={app.id} className="text-sm">
//                   <p className="font-medium">{app.job_title}</p>
//                   <p className="text-gray-600">{app.company_name}</p>
//                   <p className="text-gray-500 text-xs">
//                     {new Date(app.applied_date).toLocaleDateString()}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-600">No recent applications</p>
//           )}
//         </div>
//       </div>

//       {/* Job Applications List */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-12">
//         <h3 className="text-xl font-semibold mb-6">Job Applications</h3>
//         {applications.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b">
//                   <th className="text-left py-3 px-4">Job Title</th>
//                   <th className="text-left py-3 px-4">Company</th>
//                   <th className="text-left py-3 px-4">Status</th>
//                   <th className="text-left py-3 px-4">Applied Date</th>
//                   <th className="text-left py-3 px-4">Job Link</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {applications.map((app) => (
//                   <tr key={app.id} className="border-b hover:bg-gray-50">
//                     <td className="py-3 px-4">{app.job_title}</td>
//                     <td className="py-3 px-4">{app.company_name}</td>
//                     <td className="py-3 px-4">
//                       <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
//                         {app.status}
//                       </span>
//                     </td>
//                     <td className="py-3 px-4">
//                       {new Date(app.applied_date).toLocaleDateString()}
//                     </td>
//                     <td className="py-3 px-4">
//                       {app.job_link ? (
//                         <a
//                           href={app.job_link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
//                         >
//                           View <ExternalLink className="h-4 w-4" />
//                         </a>
//                       ) : (
//                         <span className="text-gray-400">No link</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-gray-600">No job applications yet</p>
//         )}
//       </div>

//       {/* Profile Form */}
//       <UserProfileForm />
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabase';
import { BarChart, Briefcase, Package, Calendar, Clock, CheckCircle2, XCircle, Clock3, ExternalLink } from 'lucide-react';
import UserProfileForm from '../components/profile/UserProfileForm';
import { Link } from 'react-router-dom';

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
  job_link: string;
}

const statusColors = {
  Searched: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock },
  applied: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle2 },
  rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock3 },
};

export default function Profile() {
  const { user } = useUser();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      if (!user) return;

      const { data: subData, error: subError } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (subError) throw subError;
      setSubscription(subData);

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
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-black to-gray-800 rounded-2xl p-8 mb-12 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.email}</h1>
          <p className="text-gray-300">Manage your job applications and profile settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-black/5 p-3 rounded-xl">
                <Package className="h-8 w-8 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Current Plan</h3>
                <p className="text-sm text-gray-500">Subscription Status</p>
              </div>
            </div>
            {subscription ? (
              <div>
                <div className="flex items-baseline space-x-2 mb-4">
                  <span className="text-3xl font-bold">{subscription.plan_name}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Applications Limit</span>
                    <span className="font-medium">{subscription.applications_limit}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Valid Until</span>
                    <span className="font-medium">{new Date(subscription.end_date).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {subscription.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No active subscription</p>
                <Link 
                  to="/pricing"
                  className="mt-4 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors inline-block"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-black/5 p-3 rounded-xl">
                <BarChart className="h-8 w-8 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Applications</h3>
                <p className="text-sm text-gray-500">Total Submissions</p>
              </div>
            </div>
            <div className="text-3xl font-bold mb-4">{applications.length}</div>
            {subscription && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Usage</span>
                    <span className="font-medium">
                      {applications.length}/{subscription.applications_limit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-black rounded-full h-2 transition-all duration-500"
                      style={{
                        width: `${(applications.length / subscription.applications_limit) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {subscription.applications_limit - applications.length} applications remaining
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-black/5 p-3 rounded-xl">
                <Briefcase className="h-8 w-8 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <p className="text-sm text-gray-500">Latest Application</p>
              </div>
            </div>
            <div className="h-[120px]">
              {applications.length > 0 ? (
                <div className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <p className="font-medium text-black truncate">{applications[0].job_title}</p>
                  <p className="text-gray-600 text-sm truncate">{applications[0].company_name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-500 text-xs">
                      {new Date(applications[0].applied_date).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${statusColors[applications[0].status as keyof typeof statusColors]?.bg || 'bg-gray-100'}
                        ${statusColors[applications[0].status as keyof typeof statusColors]?.text || 'text-gray-800'}`}>
                        {applications[0].status.toUpperCase()}
                      </span>
                      {applications[0].job_link ? (
                        <a
                          href={applications[0].job_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">N/A</span>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No recent applications</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm mb-12 overflow-hidden">
          <div className="p-8 border-b">
            <h3 className="text-xl font-semibold">Job Applications</h3>
            <p className="text-gray-500">Track all your job applications</p>
          </div>
          {applications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Job Title</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Company</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Applied Date</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Job Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {applications.map((app) => {
                    const StatusIcon = statusColors[app.status as keyof typeof statusColors]?.icon || Clock;
                    return (
                      <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-medium">{app.job_title}</div>
                        </td>
                        <td className="py-4 px-6 text-gray-600">{app.company_name}</td>
                        <td className="py-4 px-6">
                          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium
                            ${statusColors[app.status as keyof typeof statusColors]?.bg || 'bg-gray-100'}
                            ${statusColors[app.status as keyof typeof statusColors]?.text || 'text-gray-800'}`}>
                            <StatusIcon className="h-3 w-3" />
                            <span>{app.status.toUpperCase()}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-600">
                          {new Date(app.applied_date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          {app.job_link ? (
                            <a
                              href={app.job_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                            >
                              View <ExternalLink className="h-4 w-4" />
                            </a>
                          ) : (
                            <span className="text-gray-400">No link</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No job applications yet</p>
              <p className="text-sm text-gray-400">Start applying to jobs to see them here</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-8 border-b">
            <h3 className="text-xl font-semibold">Profile Settings</h3>
            <p className="text-gray-500">Update your personal information</p>
          </div>
          <div className="p-8">
            <UserProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}