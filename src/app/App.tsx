import { useState } from 'react';
import { 
  PrimaryButton, 
  SecondaryButton, 
  InputField, 
  IdeaCard, 
  StatusBadge, 
  ProgressBar,
  CountdownTimerCard,
  BottomNavigation,
  TopNavigation,
  WelcomeScreen,
  HowItWorksScreen,
  PricingScreen,
  IdeaInboxScreen,
  IdeaCooldownScreen,
  CBTFilterScreen,
  IdeaScoringScreen,
  NinetyDayCommitScreen,
  WeeklyReviewScreen,
  IdeaGraveyardScreen
} from './components/focusone';
import { Home, Target, TrendingUp, User, Lightbulb, Sparkles } from 'lucide-react';

type ScreenType = 'welcome' | 'howItWorks' | 'pricing' | 'ideaInbox' | 'ideaCooldown' | 'cbtFilter' | 'ideaScoring' | 'ninetyDayCommit' | 'weeklyReview' | 'ideaGraveyard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [activeNavId, setActiveNavId] = useState('home');
  const [progress, setProgress] = useState(65);

  // Navigation handler
  const navigateTo = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  // Set countdown to 48 hours from now
  const countdownTarget = new Date(Date.now() + 48 * 60 * 60 * 1000);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="w-full h-full" /> },
    { id: 'goals', label: 'Goals', icon: <Target className="w-full h-full" /> },
    { id: 'progress', label: 'Progress', icon: <TrendingUp className="w-full h-full" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-full h-full" /> },
  ];

  // Show Welcome Screen
  if (currentScreen === 'welcome') {
    return <WelcomeScreen onGetStarted={() => navigateTo('howItWorks')} />;
  }

  // Show How It Works Screen
  if (currentScreen === 'howItWorks') {
    return <HowItWorksScreen onNext={() => navigateTo('pricing')} />;
  }

  // Show Pricing Screen
  if (currentScreen === 'pricing') {
    return <PricingScreen onSelectPlan={() => navigateTo('ideaInbox')} />;
  }

  // Show Idea Inbox Screen
  if (currentScreen === 'ideaInbox') {
    return (
      <IdeaInboxScreen 
        onAddIdea={() => navigateTo('ideaCooldown')}
        onReview={() => navigateTo('weeklyReview')}
        onViewGraveyard={() => navigateTo('ideaGraveyard')}
      />
    );
  }

  // Show Idea Cooldown Screen
  if (currentScreen === 'ideaCooldown') {
    return (
      <IdeaCooldownScreen 
        onTimerExpire={() => navigateTo('cbtFilter')}
      />
    );
  }

  // Show CBT Filter Screen
  if (currentScreen === 'cbtFilter') {
    return (
      <CBTFilterScreen 
        onComplete={() => navigateTo('ideaScoring')}
      />
    );
  }

  // Show Idea Scoring Screen
  if (currentScreen === 'ideaScoring') {
    return (
      <IdeaScoringScreen 
        onCommit={() => navigateTo('ninetyDayCommit')}
      />
    );
  }

  // Show Ninety Day Commit Screen
  if (currentScreen === 'ninetyDayCommit') {
    return (
      <NinetyDayCommitScreen 
        onLockIn={() => navigateTo('ideaInbox')}
      />
    );
  }

  // Show Weekly Review Screen
  if (currentScreen === 'weeklyReview') {
    return (
      <WeeklyReviewScreen 
        onBack={() => navigateTo('ideaInbox')}
      />
    );
  }

  // Show Idea Graveyard Screen
  if (currentScreen === 'ideaGraveyard') {
    return (
      <IdeaGraveyardScreen 
        onBack={() => navigateTo('ideaInbox')}
      />
    );
  }

  // Default: Design System (should not reach here in prototype mode)
  return null;
}