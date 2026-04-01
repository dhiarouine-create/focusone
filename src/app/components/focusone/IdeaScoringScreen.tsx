import { useState } from 'react';
import { PrimaryButton } from './PrimaryButton';

interface ScoreCategory {
  id: string;
  label: string;
  emoji: string;
  value: number;
}

interface IdeaScoringScreenProps {
  onCommit: () => void;
}

export function IdeaScoringScreen({ onCommit }: IdeaScoringScreenProps) {
  const [scores, setScores] = useState<ScoreCategory[]>([
    { id: 'money', label: 'Money potential', emoji: '💰', value: 8 },
    { id: 'time', label: 'Time to first result', emoji: '⏱️', value: 6 },
    { id: 'energy', label: 'Energy required', emoji: '⚡', value: 7 },
    { id: 'goal', label: 'Goal alignment', emoji: '🎯', value: 9 },
  ]);

  const totalScore = scores.reduce((sum, score) => sum + score.value, 0);
  const maxScore = scores.length * 10;

  const handleScoreChange = (id: string, newValue: number) => {
    setScores(scores.map(score => 
      score.id === id ? { ...score, value: newValue } : score
    ));
  };

  const getScoreMessage = (total: number, max: number) => {
    const percentage = (total / max) * 100;
    if (percentage >= 75) return 'Strong idea — ready to commit';
    if (percentage >= 50) return 'Good potential — worth exploring';
    if (percentage >= 25) return 'Needs refinement — keep thinking';
    return 'Weak fit — consider alternatives';
  };

  const handleCommit = () => {
    console.log('Committing to idea with scores:', scores);
    console.log('Total score:', totalScore);
    // Navigate to next screen
    onCommit();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 px-6 py-8 max-w-2xl mx-auto w-full">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
            Score Your Idea
          </h1>
          <p className="text-xl text-text-secondary">
            Build a productivity app
          </p>
        </div>

        {/* Scoring Sliders */}
        <div className="space-y-8 mb-8">
          {scores.map((score) => (
            <div key={score.id} className="space-y-3">
              {/* Label and Score */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 font-medium text-text-primary">
                  <span className="text-xl">{score.emoji}</span>
                  <span>{score.label}</span>
                </label>
                <span className="font-semibold text-primary tabular-nums">
                  {score.value}/10
                </span>
              </div>

              {/* Slider */}
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={score.value}
                  onChange={(e) => handleScoreChange(score.id, parseInt(e.target.value))}
                  className="w-full h-2 bg-surface rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-5
                    [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-primary
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:transition-all
                    [&::-webkit-slider-thumb]:hover:w-6
                    [&::-webkit-slider-thumb]:hover:h-6
                    [&::-moz-range-thumb]:w-5
                    [&::-moz-range-thumb]:h-5
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-primary
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:transition-all
                    [&::-moz-range-thumb]:hover:w-6
                    [&::-moz-range-thumb]:hover:h-6"
                  style={{
                    background: `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${score.value * 10}%, #F9FAFB ${score.value * 10}%, #F9FAFB 100%)`
                  }}
                />
                {/* Tick marks */}
                <div className="flex justify-between mt-1 px-0.5">
                  {[0, 2, 4, 6, 8, 10].map((tick) => (
                    <span key={tick} className="text-xs text-text-secondary/40">
                      {tick}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Score Card */}
        <div className="bg-[#EEF2FF] rounded-2xl p-8 text-center mb-8 border border-primary/10">
          <div className="mb-2">
            <span className="text-5xl md:text-6xl font-bold text-primary tabular-nums">
              {totalScore}/{maxScore}
            </span>
          </div>
          <p className="text-text-secondary font-medium">
            {getScoreMessage(totalScore, maxScore)}
          </p>
        </div>

        {/* Commit Button */}
        <PrimaryButton 
          size="lg" 
          className="w-full"
          onClick={handleCommit}
        >
          Commit to This Idea
        </PrimaryButton>
      </div>
    </div>
  );
}