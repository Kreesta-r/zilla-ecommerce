import React, { useState, useEffect } from 'react';
import { Clock, Tag } from 'lucide-react';

// Define the interface for TimeUnit props
interface TimeUnitProps {
  value: number;
  label: string;
}

const SaleCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      
      const difference = midnight.getTime() - now.getTime();
      
      const hours = Math.floor((difference / (1000 * 60 * 60)));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ hours, minutes, seconds });
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => (
    <div className="flex flex-col items-center mx-1 sm:mx-2">
      <div className="bg-white text-black w-10 h-10 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-base sm:text-2xl font-bold shadow-lg">
        {value.toString().padStart(2, '0')}
      </div>
      <span className="text-gray-800 text-xs sm:text-sm mt-1">{label}</span>
    </div>
  );

  return (
    <section className='w-full bg-gray-100 py-4 sm:py-8'>
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-2xl border-4 border-dashed border-gray-400 relative">
        {/* Corner decorative elements */}
        {['-top-3 -left-3', '-top-3 -right-3', '-bottom-3 -left-3', '-bottom-3 -right-3'].map((position, index) => (
          <div 
            key={index} 
            className={`absolute ${position} w-4 h-4 sm:w-6 sm:h-6 bg-gray-100 rounded-full border border-gray-400`}
          ></div>
        ))}

        <div className="flex flex-col items-center">
          {/* Header */}
          <div className="flex items-center mb-4 flex-wrap justify-center">
            <Tag className="w-4 h-4 sm:w-6 sm:h-6 text-orange-500 mr-1 sm:mr-2" />
            <h2 className="text-gray-800 text-xl sm:text-2xl font-bold text-center">
              FLASH SALE ENDING IN
            </h2>
            <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-orange-500 ml-1 sm:ml-2" />
          </div>

          {/* Countdown */}
          <div className="flex justify-center items-center">
            <TimeUnit value={timeLeft.hours} label="HOURS" />
            <div className="text-gray-800 text-base sm:text-2xl font-bold mx-1 sm:mx-2">:</div>
            <TimeUnit value={timeLeft.minutes} label="MINUTES" />
            <div className="text-gray-800 text-base sm:text-2xl font-bold mx-1 sm:mx-2">:</div>
            <TimeUnit value={timeLeft.seconds} label="SECONDS" />
          </div>

          {/* Promotional Text */}
          <div className="mt-4 sm:mt-6 text-gray-800 text-center">
            <p className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">🔥 Don't Miss Out! 🔥</p>
            <p className="text-xs sm:text-sm opacity-90">Up to 70% off on selected items</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleCountdown;