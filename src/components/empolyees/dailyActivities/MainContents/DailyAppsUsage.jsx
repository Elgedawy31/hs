import React from 'react';
import CardContainer from '@components/CardContainer';
import { LayoutGrid, Monitor } from 'lucide-react';

export default function DailyAppsUsage() {
  const apps = [
    {
      name: 'Figma',
      hours: '4 h 43 m',
    },
    {
      name: 'Youtube',
      hours: '30 m',
    },
    {
      name: 'Claude',
      hours: '1 h 3 m',
    },
    {
      name: 'X-box App',
      hours: '1 h 3 m',
    },
    {
      name: 'Google meet',
      hours: '1 h 3 m',
    },
    {
      name: 'Chrome',
      hours: '1 h 3 m',
    },
    {
      name: 'Brave',
      hours: '1 h 3 m',
    },
    {
      name: 'Chat GPT',
      hours: '1 h 3 m',
    },
    {
      name: 'Others',
      hours: '1 h 3 m',
    }
  ];

  return (
    <CardContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app, index) => (
          <CardContainer
            className={'rounded-xl p-6'}
            key={index}
          >
            <div className="flex items-center gap-2">
            <LayoutGrid className="w-9 h-9 text-primary" />
            <h3 className="text-placeholderText font-medium">{app.name}</h3>
            </div>

            <div className="flex-1">
              <p className="text-text text-2xl font-semibold mt-3">{app.hours}</p>
            </div>
          </CardContainer>
        ))}
      </div>
    </CardContainer>
  );
}
