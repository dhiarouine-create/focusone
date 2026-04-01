import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface Question {
  id: number;
  text: string;
  yesIsNegative?: boolean; // true if "Yes" is the negative answer (red)
}

const questions: Question[] = [
  {
    id: 1,
    text: "Is this idea something you're passionate about long-term?",
    yesIsNegative: false,
  },
  {
    id: 2,
    text: "Have you felt this exact excitement before and abandoned it?",
    yesIsNegative: true,
  },
  {
    id: 3,
    text: "Can you explain this idea clearly to someone else?",
    yesIsNegative: false,
  },
  {
    id: 4,
    text: "Are you willing to work on this even when it's difficult?",
    yesIsNegative: false,
  },
  {
    id: 5,
    text: "Is this driven by wanting to impress others?",
    yesIsNegative: true,
  },
];

interface CBTFilterScreenProps {
  onComplete: () => void;
}

export function CBTFilterScreen({ onComplete }: CBTFilterScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1); // Starting at question 1
  const [answers, setAnswers] = useState<{ [key: number]: boolean }>({});

  const question = questions[currentQuestion - 1];
  const progress = (currentQuestion / questions.length) * 100;

  const handleAnswer = (answer: 'yes' | 'no') => {
    console.log(`Question ${currentQuestion}: ${answer}`);
    
    // Store the answer
    setAnswers({
      ...answers,
      [currentQuestion]: answer === 'yes',
    });

    // Move to next question or finish
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log('All questions answered!', { ...answers, [currentQuestion]: answer === 'yes' });
      // Navigate to next screen
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 px-6 py-8 max-w-2xl mx-auto w-full">
        
        {/* Back Button */}
        <button 
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8"
          onClick={handleBack}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        {/* Progress Section */}
        <div className="mb-12">
          <div className="mb-2">
            <ProgressBar value={progress} size="md" />
          </div>
          <p className="text-sm text-text-secondary">
            Question {currentQuestion} of {questions.length}
          </p>
        </div>

        {/* Question Card */}
        <div className="bg-surface rounded-2xl p-8 md:p-12 mb-8 border border-border">
          <h2 className="text-xl md:text-2xl font-semibold text-text-primary text-center leading-relaxed">
            {question.text}
          </h2>
        </div>

        {/* Answer Buttons */}
        <div className="space-y-4 mb-6">
          <button
            onClick={() => handleAnswer('yes')}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all ${
              question.yesIsNegative
                ? 'border-2 border-danger text-danger hover:bg-danger hover:text-white'
                : 'border-2 border-success text-success hover:bg-success hover:text-white'
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer('no')}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all ${
              question.yesIsNegative
                ? 'border-2 border-success text-success hover:bg-success hover:text-white'
                : 'border-2 border-danger text-danger hover:bg-danger hover:text-white'
            }`}
          >
            No
          </button>
        </div>

        {/* Helper Caption */}
        <p className="text-center text-sm text-text-secondary">
          Answer honestly. This filter protects your time.
        </p>
      </div>
    </div>
  );
}