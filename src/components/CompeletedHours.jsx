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
        <div className="relative h-14 bg-background rounded-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full bg-barColor rounded-full" style={{ width: '30%' }}>
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-xl">February</span>
          </div>
        </div>

        {/* Bar 2 */}
        <div className="relative h-14 bg-background rounded-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full bg-barColor rounded-full" style={{ width: '60%' }}>
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-xl">February</span>
          </div>
        </div>

        {/* Bar 3 - Current */}
        <div className="relative h-14 bg-background rounded-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full bg-primary rounded-full" style={{ width: `${percentage}%` }}>
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-xl">February</span>
          </div>
        </div>
      </div>
    </CardContainer>
  );
};

export default CompletedHours;
