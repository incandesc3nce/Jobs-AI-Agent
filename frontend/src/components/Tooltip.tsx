import React, { ReactNode } from 'react';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => (
  <div className="relative group inline-block">
    <div className="absolute left-1/5 -translate-x-1/2 bottom-full mb-2 z-10 hidden group-hover:block bg-gray-800 text-white text-[13px] rounded-lg px-2 py-1 whitespace-nowrap pointer-events-none w-96 text-wrap">
      {content}
    </div>
    {children}
  </div>
);
