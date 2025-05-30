import React from 'react';
import { Plus, Calendar, FileText, Mail } from 'lucide-react';

function CenteredCards() {
  const cards = [
    {
      id: 1,
      title: 'Add New Patient',
      icon: Plus,
      onClick: () => console.log('Add New Patient clicked')
    },
    {
      id: 2,
      title: 'Schedule Appointment',
      icon: Calendar,
      onClick: () => console.log('Schedule Appointment clicked')
    },
    {
      id: 3,
      title: 'Generate Report',
      icon: FileText,
      onClick: () => console.log('Generate Report clicked')
    },
    {
      id: 4,
      title: 'Send Message',
      icon: Mail,
      onClick: () => console.log('Send Message clicked')
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            onClick={card.onClick}
            className="bg-background border border-primary rounded-2xl p-8 min-w-[280px] max-w-[320px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 card-shadow"
          >
            <div className="mb-4 p-3 rounded-full bg-primary/10 border border-primary/20">
              <IconComponent 
                size={32} 
                className="text-primary" 
              />
            </div>
            <h3 className="text-text font-medium text-lg text-center">
              {card.title}
            </h3>
          </div>
        );
      })}
    </div>
  );
}

export default CenteredCards;
