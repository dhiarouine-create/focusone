import { PrimaryButton, SecondaryButton } from './index';

interface FilterStep {
  icon: string;
  title: string;
  description: string;
}

interface HowItWorksScreenProps {
  onNext: () => void;
}

export function HowItWorksScreen({ onNext }: HowItWorksScreenProps) {
  const filterSteps: FilterStep[] = [
    {
      icon: '🧠',
      title: 'Capture',
      description: 'Save every idea instantly',
    },
    {
      icon: '⏸️',
      title: 'Pause',
      description: '48hr cool-down lock',
    },
    {
      icon: '💬',
      title: 'Filter',
      description: '5 CBT questions',
    },
    {
      icon: '⭐',
      title: 'Score',
      description: 'Ranked by potential',
    },
    {
      icon: '🔒',
      title: 'Commit',
      description: '90-day lock in',
    },
    {
      icon: '📊',
      title: 'Review',
      description: 'Weekly progress check',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile: 390×844 / Web: 1440×900 responsive layout */}
      <div className="flex-1 flex flex-col px-6 py-12 md:py-20 max-w-2xl mx-auto w-full">
        
        {/* Step Indicator */}
        <div className="text-center mb-8">
          <p className="text-xs text-text-secondary font-semibold">2 of 3</p>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
            Your ideas go through<br />6 filters
          </h1>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed px-4">
            Only the best idea survives. Then you commit to it for 90 days.
          </p>
        </div>

        {/* Filter Steps */}
        <div className="flex-1 space-y-6 mb-12">
          {filterSteps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-surface rounded-lg border border-border hover:shadow-sm transition-shadow"
            >
              <div className="text-4xl flex-shrink-0">
                {step.icon}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-text-primary mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-3">
          <PrimaryButton 
            size="lg" 
            className="w-full"
            onClick={onNext}
          >
            Next
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}