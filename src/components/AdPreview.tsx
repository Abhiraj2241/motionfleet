import React, { useState, useEffect } from 'react';

const AdPreview: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 left-6 w-72 bg-white rounded-lg shadow-xl p-4 z-40">
      <h4 className="font-semibold mb-2">Live Ad Preview</h4>
      <div className="relative h-40 bg-gray-900 rounded-lg overflow-hidden mb-3">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-yellow-400 font-bold">Your Ad Here</p>
            <p className="text-white text-sm">Reaching thousands daily</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Views: 1,234</span>
        <span>Engagement: 4.5%</span>
      </div>
    </div>
  );
};

export default AdPreview;