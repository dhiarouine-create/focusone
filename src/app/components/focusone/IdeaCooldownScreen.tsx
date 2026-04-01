import { useState, useEffect } from 'react';
import { PrimaryButton } from './PrimaryButton';
import { ArrowLeft, Lock } from 'lucide-react';

interface IdeaCooldownScreenProps {
  onTimerExpire: () => void;
}

export function IdeaCooldownScreen({ onTimerExpire }: IdeaCooldownScreenProps) {
  // Set target to 5 seconds for demo purposes (originally 48 hours)
  const [targetDate] = useState(() => {
    const target = new Date();
    target.setSeconds(target.getSeconds() + 5);
    return target;
  });

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 5,
  });

  const [hasExpired, setHasExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        if (!hasExpired) {
          setHasExpired(true);
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { hours, minutes, seconds };
    };

    // Update immediately
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, hasExpired]);

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  const isExpired = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 px-6 py-8 max-w-2xl mx-auto w-full">
        
        {/* Idea Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-12">
          Build a productivity app
        </h1>

        {/* Countdown Timer Card */}
        <div className="bg-[#EEF2FF] rounded-2xl p-8 md:p-12 text-center mb-8 border border-primary/10">
          {/* Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* Timer Display */}
          <div className="mb-4">
            <div className="flex items-center justify-center gap-3 md:gap-4">
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-6xl font-bold text-primary tabular-nums">
                  {formatTime(timeLeft.hours)}
                </span>
              </div>
              <span className="text-5xl md:text-6xl font-bold text-primary/40">:</span>
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-6xl font-bold text-primary tabular-nums">
                  {formatTime(timeLeft.minutes)}
                </span>
              </div>
              <span className="text-5xl md:text-6xl font-bold text-primary/40">:</span>
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-6xl font-bold text-primary tabular-nums">
                  {formatTime(timeLeft.seconds)}
                </span>
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="text-text-secondary text-sm md:text-base">
            {isExpired ? "Time's up! Ready to evaluate." : "Cooling down... check back later"}
          </p>
        </div>

        {/* Why the Wait Section */}
        <div className="mb-12">
          <h2 className="font-semibold text-text-primary mb-3">
            Why the wait?
          </h2>
          <p className="text-text-secondary leading-relaxed">
            48 hours removes the dopamine rush. If the idea is still exciting after, it deserves to move forward.
          </p>
        </div>

        {/* Button */}
        <div className="space-y-2">
          <PrimaryButton 
            size="lg" 
            className="w-full"
            disabled={!isExpired}
            onClick={isExpired ? onTimerExpire : undefined}
          >
            Evaluate Idea
          </PrimaryButton>
          {!isExpired && (
            <p className="text-center text-xs text-text-secondary">
              Available in {timeLeft.hours > 0 ? `${timeLeft.hours} hours` : `${timeLeft.seconds} seconds`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}