import React from 'react'
import ScreenCard from '../../../screenshots/ScreenCard';

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
];
function DailyScreenShots() {
  return (
    <div className=" overflow-auto  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
  )
}

export default DailyScreenShots
