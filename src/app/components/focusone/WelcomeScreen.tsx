import { PrimaryButton } from './PrimaryButton';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const stats = [
    { label: '∞ Ideas captured' },
    { label: '1 Active project' },
    { label: '90 Day focus' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile: 390×844 / Web: 1440×900 responsive layout */}
      <div className="flex-1 flex flex-col items-center justify-between px-6 py-12 md:py-20 max-w-2xl mx-auto w-full">
        
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-primary flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold text-primary">F1</span>
          </div>
        </div>

        {/* Main Content - Centered */}
        <div className="flex flex-col items-center text-center space-y-8 flex-1 justify-center max-w-xl">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
            Too many ideas.<br />Zero results.
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed px-4">
            FocusOne filters your ideas and locks you into the one that matters.
          </p>

          {/* Stats Pills */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap px-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-surface border border-border rounded-full text-sm font-semibold text-text-secondary whitespace-nowrap"
              >
                {stat.label}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full max-w-md space-y-3">
          <PrimaryButton 
            size="lg" 
            className="w-full"
            onClick={onGetStarted}
          >
            Get Started
          </PrimaryButton>
          <p className="text-center text-sm text-text-secondary">
            Free to start. No credit card.
          </p>
        </div>
      </div>
    </div>
  );
}