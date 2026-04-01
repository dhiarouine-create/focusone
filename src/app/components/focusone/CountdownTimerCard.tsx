import { HTMLAttributes, useEffect, useState } from 'react';
import { cn } from '../ui/utils';
import { Clock } from 'lucide-react';

export interface CountdownTimerCardProps extends HTMLAttributes<HTMLDivElement> {
  targetDate: Date;
  title?: string;
  onExpire?: () => void;
}

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function calculateTimeRemaining(targetDate: Date): TimeRemaining {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { hours, minutes, seconds, expired: false };
}

export function CountdownTimerCard({
  targetDate,
  title = '48hr Challenge',
  onExpire,
  className,
  ...props
}: CountdownTimerCardProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = calculateTimeRemaining(targetDate);
      setTimeRemaining(newTime);

      if (newTime.expired && onExpire) {
        onExpire();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onExpire]);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div
      className={cn(
        'bg-background border border-border rounded-lg p-6',
        'shadow-sm',
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-text-primary">{title}</h3>
        </div>
        
        <div className="flex items-center justify-center gap-3">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-primary">
              {formatNumber(timeRemaining.hours)}
            </div>
            <div className="text-xs text-text-secondary mt-1">Hours</div>
          </div>
          <div className="text-3xl font-bold text-text-secondary">:</div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-primary">
              {formatNumber(timeRemaining.minutes)}
            </div>
            <div className="text-xs text-text-secondary mt-1">Minutes</div>
          </div>
          <div className="text-3xl font-bold text-text-secondary">:</div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-primary">
              {formatNumber(timeRemaining.seconds)}
            </div>
            <div className="text-xs text-text-secondary mt-1">Seconds</div>
          </div>
        </div>

        {timeRemaining.expired && (
          <div className="text-center text-sm text-danger font-semibold">
            Time expired!
          </div>
        )}
      </div>
    </div>
  );
}
