import { useState } from 'react';
import { PrimaryButton } from './PrimaryButton';
import { ProgressBar } from './ProgressBar';

interface ReviewAnswers {
  accomplishments: string;
  blockers: string;
  nextWeekPriority: string;
}

interface WeeklyReviewScreenProps {
  onBack: () => void;
}

export function WeeklyReviewScreen({ onBack }: WeeklyReviewScreenProps) {
  const [answers, setAnswers] = useState<ReviewAnswers>({
    accomplishments: '',
    blockers: '',
    nextWeekPriority: '',
  });

  const currentWeek = 4;
  const totalWeeks = 13;
  const progress = (currentWeek / totalWeeks) * 100;

  // Calculate date for Sunday, March 30 (using context date of April 1, 2026 as Wednesday)
  // March 30, 2026 would be 2 days before April 1
  const reviewDate = 'Sunday, March 30';

  const handleAnswerChange = (field: keyof ReviewAnswers, value: string) => {
    setAnswers({
      ...answers,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    // Check if at least one field is filled
    if (!answers.accomplishments && !answers.blockers && !answers.nextWeekPriority) {
      alert('Please answer at least one question before submitting');
      return;
    }
    
    console.log('Saving weekly review:', answers);
    console.log('Week:', currentWeek, 'of', totalWeeks);
    // Save review and navigate back
    onBack();
  };

  const questions = [
    {
      id: 'accomplishments',
      label: 'What did I do this week toward my one goal?',
      placeholder: 'List your accomplishments and progress...',
      field: 'accomplishments' as keyof ReviewAnswers,
    },
    {
      id: 'blockers',
      label: 'What blocked me and why?',
      placeholder: 'Describe any obstacles or challenges...',
      field: 'blockers' as keyof ReviewAnswers,
    },
    {
      id: 'nextWeekPriority',
      label: 'What is my one priority for next week?',
      placeholder: 'Define your top priority...',
      field: 'nextWeekPriority' as keyof ReviewAnswers,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 px-6 py-8 max-w-2xl mx-auto w-full">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
            Weekly Review
          </h1>
          <p className="text-text-secondary">
            {reviewDate}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="mb-2">
            <ProgressBar value={progress} size="md" />
          </div>
          <p className="text-sm text-text-secondary">
            Week {currentWeek} of {totalWeeks}
          </p>
        </div>

        {/* Question Cards */}
        <div className="space-y-6 mb-8">
          {questions.map((question, index) => (
            <div 
              key={question.id} 
              className="bg-surface rounded-2xl p-6 border border-border"
            >
              <label 
                htmlFor={question.id}
                className="block font-semibold text-text-primary mb-4"
              >
                {index + 1}. {question.label}
              </label>
              <textarea
                id={question.id}
                value={answers[question.field]}
                onChange={(e) => handleAnswerChange(question.field, e.target.value)}
                placeholder={question.placeholder}
                rows={4}
                className="w-full px-4 py-3 bg-white border-2 border-border rounded-xl
                  text-text-primary placeholder:text-text-secondary/50
                  focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                  transition-all resize-none"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <PrimaryButton 
          size="lg" 
          className="w-full"
          onClick={handleSubmit}
        >
          Save This Week's Review
        </PrimaryButton>
      </div>
    </div>
  );
}