
import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-stone-50 border border-stone-200 rounded-lg">
      <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-stone-800 mb-1">No hotels found</h3>
      <p className="text-stone-500 text-center max-w-md">
        We couldn't find any hotels matching your search criteria. Try adjusting your filters or search query.
      </p>
    </div>
  );
};

export default EmptyState;
