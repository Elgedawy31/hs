import React from 'react';
import LibraryHeader from '../components/library/LibraryHeader';
import LibraryGrid from '../components/library/LibraryGrid';

function Library() {
  return (
    <div className="bg-body">
      <div className="container mx-auto px-4 py-16">
        <LibraryHeader />
        <LibraryGrid />
      </div>
    </div>
  );
}

export default Library;
