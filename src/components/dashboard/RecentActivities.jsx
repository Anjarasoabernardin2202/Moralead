import React from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export default function RecentActivities({ activities }) {
  const { isDark } = useTheme();

  const defaultActivities = [
    {
      id: 1,
      user: 'Jean Rakoto',
      action: 'a validé 15 dossiers clients',
      time: 'Il y a 5 min',
      type: 'success'
    },
    {
      id: 2,
      user: 'Marie Razafy',
      action: 'a approuvé une demande de matériel',
      time: 'Il y a 12 min',
      type: 'info'
    },
    {
      id: 3,
      user: 'Nivo Randria',
      action: 'a planifié 8 installations',
      time: 'Il y a 25 min',
      type: 'calendar'
    },
    {
      id: 4,
      user: 'Koto Rasolofo',
      action: 'a terminé 3 installations',
      time: 'Il y a 45 min',
      type: 'success'
    }
  ];

  const activityList = activities || defaultActivities;

  return (
    <div className={`rounded-xl shadow-sm border p-6 ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        Activités Récentes
      </h3>
      <div className="space-y-4 max-h-64 overflow-y-auto">
        {activityList.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 py-2">
            <div className={`w-2 h-2 rounded-full mt-2 ${
              activity.type === 'success' ? 'bg-green-500' :
              activity.type === 'info' ? 'bg-blue-500' :
              activity.type === 'calendar' ? 'bg-purple-500' :
              'bg-gray-500'
            }`}></div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${
                isDark ? 'text-gray-200' : 'text-gray-900'
              }`}>
                <span className="font-medium">{activity.user}</span> {activity.action}
              </p>
              <p className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}