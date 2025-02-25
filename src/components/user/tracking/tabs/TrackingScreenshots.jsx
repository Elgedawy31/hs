import React from 'react'
import ScreenCard from '@components/screenshots/ScreenCard';

function TrackingScreenshots() {

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
    <div className="mt-6 h-[calc(100vh-140px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
  )
}

export default TrackingScreenshots
