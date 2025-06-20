
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

const OnboardingModal = ({ isOpen, onComplete }: OnboardingModalProps) => {
  const [step, setStep] = useState(0);
  const [hasAccepted, setHasAccepted] = useState(false);

  const steps = [
    {
      title: "Welcome to OffSwitch",
      content: "This app is not here to help you move faster. It exists to slow you down.\n\nIn a world increasingly shaped by artificial intelligence, OffSwitch is a resistance tool. It helps you reclaim:\n\n• First-principles reasoning over borrowed logic\n• Direct truth-seeking over probabilistic outputs\n• Manual effort over automation\n• Cognitive integrity over algorithmic dependence\n• Humility over artificial mastery\n\nExpect friction. Expect silence. Expect to do things the hard way.\nThis app is not optimized for convenience—it is optimized for sovereignty.\n\nIf you're ready to think without help, continue.\nOtherwise, close the tab.",
      action: "I'm ready to begin"
    },
    {
      title: "Are you ready to think without help?",
      content: "OffSwitch is a space for unassisted thought. Here, you'll strengthen your capacity for independent reasoning, manual effort, and authentic reflection.",
      action: "I'm ready"
    },
    {
      title: "Cognitive Sovereignty Index",
      content: "Track your independence from AI assistance. Rate your daily reliance on automated thinking tools. No judgment—just honest assessment.",
      action: "Understood"
    },
    {
      title: "First Principles Workout",
      content: "Challenge yourself to break down complex problems from scratch. Build reasoning muscle by avoiding pre-made solutions.",
      action: "Continue"
    },
    {
      title: "Truth Without Oracle",
      content: "Weekly prompts that require genuine thinking. No search engines, no AI assistants—just you and the question.",
      action: "Continue"
    },
    {
      title: "Anti-Automation Tracker",
      content: "Record moments when you choose manual effort over automated solutions. Celebrate the intentional friction.",
      action: "Continue"
    },
    {
      title: "Why This Matters",
      content: "AI overuse creates cognitive dependence, weakens problem-solving skills, and erodes authentic thought. Here, you practice resistance through deliberate engagement.",
      action: "Begin Practice"
    }
  ];

  const handleNext = () => {
    if (step === 0) {
      setHasAccepted(true);
    }
    
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem('offswitch-onboarding-complete', 'true');
      onComplete();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-charcoal/80 flex items-center justify-center p-4 z-50">
      <div className="bg-parchment border-2 border-charcoal max-w-lg w-full p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onComplete}
          className="absolute top-4 right-4 text-graphite hover:text-charcoal slow-transition"
        >
          <X size={20} />
        </button>
        
        <div className="text-center space-y-6">
          <h2 className="text-xl font-medium text-charcoal mb-4">
            {steps[step].title}
          </h2>
          
          <div className="text-graphite leading-relaxed text-sm text-left whitespace-pre-line">
            {steps[step].content}
          </div>
          
          <div className="flex justify-center space-x-2 mb-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 border border-graphite ${
                  i <= step ? 'bg-charcoal' : 'bg-parchment'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={handleNext}
            className="raw-button w-full"
          >
            {steps[step].action}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
