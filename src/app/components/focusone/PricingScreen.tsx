import { PrimaryButton, SecondaryButton } from './index';

interface PricingPlan {
  name: string;
  price: string;
  priceUnit: string;
  features: string[];
  isRecommended?: boolean;
  isHighlighted?: boolean;
}

interface PricingScreenProps {
  onSelectPlan: () => void;
}

export function PricingScreen({ onSelectPlan }: PricingScreenProps) {
  const plans: PricingPlan[] = [
    {
      name: 'Free',
      price: '$0',
      priceUnit: 'forever',
      features: [
        'Capture 5 ideas',
        '48hr timer',
        'Basic CBT questions',
      ],
      isRecommended: false,
      isHighlighted: false,
    },
    {
      name: 'Pro',
      price: '$9',
      priceUnit: 'month',
      features: [
        'Unlimited ideas',
        'Full CBT filter',
        'Scoring',
        '90-day tracker',
        'Weekly reviews',
        'Accountability partner',
      ],
      isRecommended: true,
      isHighlighted: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile: 390×844 / Web: 1440×900 responsive layout */}
      <div className="flex-1 flex flex-col px-6 py-12 md:py-20 max-w-4xl mx-auto w-full">
        
        {/* Step Indicator */}
        <div className="text-center mb-8">
          <p className="text-xs text-text-secondary font-semibold">3 of 3</p>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
            Start free.<br />Upgrade when ready.
          </h1>
        </div>

        {/* Pricing Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col p-6 rounded-lg border transition-shadow ${
                plan.isHighlighted
                  ? 'bg-[#EEF2FF] border-primary shadow-md'
                  : 'bg-surface border-border hover:shadow-sm'
              }`}
            >
              {/* Plan Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-text-primary">
                    {plan.name}
                  </h3>
                  {plan.isRecommended && (
                    <span className="text-xs font-semibold text-warning">
                      ⭐ RECOMMENDED
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-text-primary">
                    {plan.price}
                  </span>
                  <span className="text-sm text-text-secondary">
                    /{plan.priceUnit}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span className="text-success mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SecondaryButton 
            size="lg" 
            className="w-full bg-transparent border-0 md:border md:border-border hover:bg-surface"
            onClick={onSelectPlan}
          >
            Start with Free
          </SecondaryButton>
          <PrimaryButton 
            size="lg" 
            className="w-full"
            onClick={onSelectPlan}
          >
            Go Pro
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}