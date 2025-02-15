import React from 'react';
import { Focus } from 'lucide-react';
import UniHeading from '../components/UniHeading';
import ScreenCard from '../components/screenshots/ScreenCard';
import { useTheme } from '../contexts/ThemeContext';

export default function Screenshots() {
  const { theme } = useTheme();

  // Sample data - replace with actual data
  const screenshots = [
    {
      id: 1,
      screenshot: '/src/assets/screenshot-img.png',
      user: {
        name: 'Nouran Khaled',
        avatar: null
      },
      type: 'Figma, Design Work',
      timestamp: '2 Mins Ago'
    },
    // Duplicate sample data to show grid
    {
      id: 2,
      screenshot: '/src/assets/screenshot-img.png',
      user: {
        name: 'Nouran Khaled',
        avatar: null
      },
      type: 'Figma, Design Work',
      timestamp: '2 Mins Ago'
    },
    {
      id: 3,
      screenshot: '/src/assets/screenshot-img.png',
      user: {
        name: 'Nouran Khaled',
        avatar: null
      },
      type: 'Figma, Design Work',
      timestamp: '2 Mins Ago'
    },
    {
      id: 4,
      screenshot: '/src/assets/screenshot-img.png',
      user: {
        name: 'Nouran Khaled',
        avatar: null
      },
      type: 'Figma, Design Work',
      timestamp: '2 Mins Ago'
    },
    {
      id: 4,
      screenshot: '/src/assets/screenshot-img.png',
      user: {
        name: 'Nouran Khaled',
        avatar: null
      },
      type: 'Figma, Design Work',
      timestamp: '2 Mins Ago'
    },
    {
      id: 4,
      screenshot: '/src/assets/screenshot-img.png',
      user: {
        name: 'Nouran Khaled',
        avatar: null
      },
      type: 'Figma, Design Work',
      timestamp: '2 Mins Ago'
    },
    {
      id: 4,
      screenshot: '/src/assets/screenshot-img.png',
      user: {
        name: 'Nouran Khaled',
        avatar: null
      },
      type: 'Figma, Design Work',
      timestamp: '2 Mins Ago'
    },
    {
      id: 4,
      screenshot: '/src/assets/screenshot-img.png',
      user: {
        name: 'Nouran Khaled',
        avatar: null
      },
      type: 'Figma, Design Work',
      timestamp: '2 Mins Ago'
    },
    {
      id: 4,
      screenshot: '/src/assets/screenshot-img.png',
      user: {
        name: 'Nouran Khaled',
        avatar: null
      },
      type: 'Figma, Design Work',
      timestamp: '2 Mins Ago'
    },
    {
      id: 4,
      screenshot: '/src/assets/screenshot-img.png',
      user: {
        name: 'Nouran Khaled',
        avatar: null
      },
      type: 'Figma, Design Work',
      timestamp: '2 Mins Ago'
    },
    {
      id: 4,
      screenshot: '/src/assets/screenshot-img.png',
      user: {
        name: 'Nouran Khaled',
        avatar: null
      },
      type: 'Figma, Design Work',
      timestamp: '2 Mins Ago'
    },
    {
      id: 4,
      screenshot: '/src/assets/screenshot-img.png',
      user: {
        name: 'Nouran Khaled',
        avatar: null
      },
      type: 'Figma, Design Work',
      timestamp: '2 Mins Ago'
    },
    {
      id: 4,
      screenshot: '/src/assets/screenshot-img.png',
      user: {
        name: 'Nouran Khaled',
        avatar: null
      },
      type: 'Figma, Design Work',
      timestamp: '2 Mins Ago'
    },
    {
      id: 4,
      screenshot: '/src/assets/screenshot-img.png',
      user: {
        name: 'Nouran Khaled',
        avatar: null
      },
      type: 'Figma, Design Work',
      timestamp: '2 Mins Ago'
    },
    {
      id: 4,
      screenshot: '/src/assets/screenshot-img.png',
      user: {
        name: 'Nouran Khaled',
        avatar: null
      },
      type: 'Figma, Design Work',
      timestamp: '2 Mins Ago'
    },
    {
      id: 4,
      screenshot: '/src/assets/screenshot-img.png',
      user: {
        name: 'Nouran Khaled',
        avatar: null
      },
      type: 'Figma, Design Work',
      timestamp: '2 Mins Ago'
    },
    {
      id: 4,
      screenshot: '/src/assets/screenshot-img.png',
      user: {
        name: 'Nouran Khaled',
        avatar: null
      },
      type: 'Figma, Design Work',
      timestamp: '2 Mins Ago'
    },
    {
      id: 4,
      screenshot: '/src/assets/screenshot-img.png',
      user: {
        name: 'Nouran Khaled',
        avatar: null
      },
      type: 'Figma, Design Work',
      timestamp: '2 Mins Ago'
    },
  ];

  return (
    <div className="p-6" >
      <UniHeading icon={Focus} text="Screenshots" />
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {screenshots.map(screenshot => (
          <ScreenCard
            key={screenshot.id}
            screenshot={screenshot.screenshot}
            user={screenshot.user}
            type={screenshot.type}
            timestamp={screenshot.timestamp}
          />
        ))}
      </div>
    </div>
  );
}
