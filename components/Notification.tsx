import React from 'react';

interface NotificationProps {
  message: string;
}

export const Notification: React.FC<NotificationProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div 
      className="fixed bottom-5 right-5 bg-gray-800 text-white py-3 px-6 rounded-lg shadow-2xl z-50 flex items-center border-l-4 border-green-500"
      style={{ animation: 'fadeInOut 5s ease-in-out forwards' }}
    >
       <svg className="w-6 h-6 text-green-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <p>{message}</p>
    </div>
  );
};
