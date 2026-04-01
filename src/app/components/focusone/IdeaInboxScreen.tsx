import { useState } from 'react';
import { PrimaryButton, StatusBadge, InputField, BottomNavigation } from './index';
import { Home, Lightbulb, Target, TrendingUp, Search } from 'lucide-react';
import type { BadgeStatus } from './StatusBadge';

interface Idea {
  id: string;
  title: string;
  dateCaptured: string;
  status: BadgeStatus;
}

interface IdeaInboxScreenProps {
  onAddIdea: () => void;
  onReview: () => void;
  onViewGraveyard: () => void;
}

export function IdeaInboxScreen({ onAddIdea, onReview, onViewGraveyard }: IdeaInboxScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNavId, setActiveNavId] = useState('ideas');

  const ideas: Idea[] = [
    {
      id: '1',
      title: 'Build a productivity app for focused work',
      dateCaptured: 'March 28, 2026',
      status: 'locked',
    },
    {
      id: '2',
      title: 'Start a weekly newsletter about design systems',
      dateCaptured: 'March 25, 2026',
      status: 'pending',
    },
    {
      id: '3',
      title: 'Create an online course teaching React fundamentals',
      dateCaptured: 'March 20, 2026',
      status: 'passed',
    },
    {
      id: '4',
      title: 'Launch a coffee subscription service',
      dateCaptured: 'March 15, 2026',
      status: 'failed',
    },
  ];

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="w-full h-full" /> },
    { id: 'ideas', label: 'Ideas', icon: <Lightbulb className="w-full h-full" /> },
    { id: 'active', label: 'Active', icon: <Target className="w-full h-full" /> },
    { id: 'review', label: 'Review', icon: <TrendingUp className="w-full h-full" /> },
  ];

  const handleNavClick = (id: string) => {
    setActiveNavId(id);
    if (id === 'review') {
      onReview();
    }
  };

  const filteredIdeas = ideas.filter(idea =>
    idea.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleIdeaClick = (idea: Idea) => {
    if (idea.status === 'failed') {
      onViewGraveyard();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary">My Ideas</h1>
            <PrimaryButton 
              size="md" 
              className="flex items-center gap-2"
              onClick={onAddIdea}
            >
              <span className="text-lg leading-none">+</span>
              <span className="hidden sm:inline">Add Idea</span>
            </PrimaryButton>
          </div>

          {/* Search Bar */}
          <div className="mb-6 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search your ideas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          {/* Ideas List */}
          <div className="space-y-3">
            {filteredIdeas.length > 0 ? (
              filteredIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="bg-surface border border-border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
                  onClick={() => handleIdeaClick(idea)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-primary mb-2 truncate md:whitespace-normal">
                        {idea.title}
                      </h3>
                      <p className="text-xs text-text-secondary">
                        {idea.dateCaptured}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <StatusBadge status={idea.status} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-text-secondary">
                <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No ideas found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mobile */}
      <BottomNavigation
        items={navItems}
        activeId={activeNavId}
        onItemClick={handleNavClick}
      />
    </div>
  );
}