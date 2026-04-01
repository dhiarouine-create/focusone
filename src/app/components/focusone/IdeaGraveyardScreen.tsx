import { StatusBadge } from './StatusBadge';
import { Skull, ArrowLeft } from 'lucide-react';

interface GraveyardIdea {
  id: string;
  title: string;
  dateFiltered: string;
  failedQuestion: string;
}

interface IdeaGraveyardScreenProps {
  onBack: () => void;
}

export function IdeaGraveyardScreen({ onBack }: IdeaGraveyardScreenProps) {
  const graveyardIdeas: GraveyardIdea[] = [
    {
      id: '1',
      title: 'Build a social media analytics dashboard',
      dateFiltered: 'March 15, 2026',
      failedQuestion: 'Is this a distraction from what truly matters?',
    },
    {
      id: '2',
      title: 'Start a podcast about productivity hacks',
      dateFiltered: 'March 22, 2026',
      failedQuestion: 'Am I trying to avoid my current commitment?',
    },
    {
      id: '3',
      title: 'Launch an online course teaching time management',
      dateFiltered: 'March 28, 2026',
      failedQuestion: 'Will this spread me too thin?',
    },
  ];

  const totalFiltered = 60;
  const hoursSaved = 3;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 px-6 py-8 max-w-2xl mx-auto w-full">
        
        {/* Back Button */}
        <button 
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Ideas</span>
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
              Idea Graveyard
            </h1>
            <span className="text-3xl">💀</span>
          </div>
          <p className="text-text-secondary">
            These ideas didn't survive the filter. That's a win.
          </p>
        </div>

        {/* Graveyard Ideas List */}
        <div className="space-y-4 mb-12">
          {graveyardIdeas.map((idea) => (
            <div
              key={idea.id}
              className="bg-surface/50 rounded-2xl p-6 border border-border opacity-70"
            >
              {/* Header with title and badge */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-text-secondary flex-1">
                  {idea.title}
                </h3>
                <StatusBadge status="failed" />
              </div>

              {/* Date filtered */}
              <p className="text-sm text-text-secondary/70 mb-2">
                Filtered on {idea.dateFiltered}
              </p>

              {/* Failed question */}
              <div className="bg-white/50 rounded-lg p-3 border border-border/50">
                <p className="text-xs text-text-secondary/70 mb-1">
                  Failed question:
                </p>
                <p className="text-sm text-text-secondary italic">
                  "{idea.failedQuestion}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom caption */}
        <div className="text-center">
          <p className="text-text-secondary font-medium">
            <span className="text-text-primary font-bold">{totalFiltered} ideas filtered.</span>
            {' '}{hoursSaved} hours of your life saved.
          </p>
        </div>
      </div>
    </div>
  );
}