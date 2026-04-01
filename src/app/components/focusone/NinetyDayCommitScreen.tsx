import { useState } from 'react';
import { Calendar, UserPlus } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';

interface NinetyDayCommitScreenProps {
  onLockIn: () => void;
}

export function NinetyDayCommitScreen({ onLockIn }: NinetyDayCommitScreenProps) {
  const [commitment, setCommitment] = useState('');
  
  // Calculate deadline (90 days from today: April 1, 2026 + 90 days = June 30, 2026)
  const calculateDeadline = () => {
    const today = new Date('2026-04-01'); // Using the current date from context
    const deadline = new Date(today);
    deadline.setDate(deadline.getDate() + 90);
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return deadline.toLocaleDateString('en-US', options);
  };

  const handleLockIn = () => {
    if (!commitment.trim()) {
      alert('Please write your commitment statement first');
      return;
    }
    console.log('Locking in commitment:', commitment);
    console.log('Deadline:', calculateDeadline());
    // Navigate to next screen or save commitment
    onLockIn();
  };

  const handleInvitePartner = () => {
    console.log('Opening invite partner modal');
    // Open modal or navigate to invite screen
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 px-6 py-8 max-w-2xl mx-auto w-full">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
            Your 90-Day Commitment
          </h1>
          <p className="text-xl text-text-secondary">
            Build a productivity app
          </p>
        </div>

        {/* Commitment Statement Input */}
        <div className="mb-8">
          <label 
            htmlFor="commitment" 
            className="block font-medium text-text-primary mb-3"
          >
            Write your commitment statement
          </label>
          <textarea
            id="commitment"
            value={commitment}
            onChange={(e) => setCommitment(e.target.value)}
            placeholder="I commit to building FocusOne and launching it within 90 days because..."
            rows={6}
            className="w-full px-4 py-3 bg-white border-2 border-border rounded-xl
              text-text-primary placeholder:text-text-secondary/50
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
              transition-all resize-none"
          />
          <p className="text-xs text-text-secondary mt-2">
            {commitment.length} characters
          </p>
        </div>

        {/* Deadline Row */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
          <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-text-secondary" />
          </div>
          <div>
            <p className="text-text-secondary">
              <span className="font-medium text-text-primary">Deadline:</span> {calculateDeadline()}
            </p>
          </div>
        </div>

        {/* Accountability Partner Row */}
        <div className="flex items-center gap-3 mb-12 pb-6 border-b border-border">
          <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center flex-shrink-0">
            <UserPlus className="w-5 h-5 text-text-secondary" />
          </div>
          <div>
            <button
              onClick={handleInvitePartner}
              className="text-primary font-medium hover:text-primary/80 transition-colors"
            >
              Invite a partner (optional)
            </button>
          </div>
        </div>

        {/* Lock It In Button */}
        <div className="space-y-3">
          <PrimaryButton 
            size="lg" 
            className="w-full"
            onClick={handleLockIn}
          >
            Lock It In 🔒
          </PrimaryButton>
          <p className="text-center text-sm text-text-secondary">
            You can only have 1 active project at a time
          </p>
        </div>
      </div>
    </div>
  );
}