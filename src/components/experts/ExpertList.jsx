import React from 'react';
import ExpertCard from './ExpertCard';
import NoDataMsg from '../NoDataMsg';
import { UserX } from 'lucide-react';

const ExpertList = ({ experts = [] }) => {
  if (!experts || experts.length === 0) {
    return (
      <NoDataMsg 
        icon={UserX}
        title="No experts found"
        description="No experts match your current filter criteria"
        additionalMessage="Try adjusting your filters or search query to see all experts"
        iconBgColor="bg-[#F7F3E9]"
      />
    );
  }

  return (
    <div className="grid mb-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {experts.map((expert, index) => (
        <div 
          key={expert.id} 
          data-aos="fade-up" 
          data-aos-delay={100 + (index * 50)} 
          data-aos-duration="800"
        >
          <ExpertCard expert={expert} />
        </div>
      ))}
    </div>
  );
};

export default ExpertList;
