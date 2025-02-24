import React from 'react';
import { Timer } from 'lucide-react';
import CardContainer from './CardContainer';

const CompletedHours = ({ progress = 0 }) => {
  const max = 160;
  const percentage = (progress / max) * 100;

  return (
    <CardContainer className='p-2 h-full'>
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary p-3 rounded-2xl">
          <Timer className="text-white w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold text-text">Completed Hours</h2>
      </div>

      {/* Progress bars */}
      <div className="space-y-6">
        {/* Bar 1 */}
        <div className="relative border border-borderColor h-14 bg-background rounded-3xl overflow-hidden">
          <div className=" h-full bg-borderColor rounded-3xl" style={{ width: '70%' }}>
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-xl">February</span>
          </div>
        </div>
        <div className="relative border border-borderColor h-14 bg-background rounded-3xl overflow-hidden">
          <div className=" h-full bg-borderColor rounded-3xl" style={{ width: '90%' }}>
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-xl">February</span>
          </div>
        </div>
        <div className="relative border border-borderColor h-14 bg-background rounded-3xl overflow-hidden">
          <div className=" h-full bg-primary rounded-3xl" style={{ width: '60%' }}>
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-xl">February</span>
          </div>
        </div>

      </div>
    </CardContainer>
  );
};

export default CompletedHours;
