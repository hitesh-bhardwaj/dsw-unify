import React from 'react'

const EmptyCard=({ children })=> {
  return (
    <div className="w-full h-64 rounded-xl border border-black/20 flex justify-center items-center text-gray-500">
      <p>{children}</p>
    </div>
  );
}

export default EmptyCard