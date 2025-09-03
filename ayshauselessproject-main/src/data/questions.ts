import { Question } from '../types/quiz';

export const quizQuestions: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: "What's your go-to breakfast?",
    options: [
      'Appam & Stew',
      'Puttu & Kadala',
      'Dosa & Chutney',
      'Cornflakes'
    ]
  },
  {
    id: 2,
    type: 'slider',
    question: 'Rate your love for coconut oil (0 = What\'s that? 100 = I bathe in it)',
    min: 0,
    max: 100,
    sliderLabels: {
      min: 'What\'s coconut oil? 🤷‍♀️',
      max: 'I AM coconut oil! 🥥'
    }
  },
  {
    id: 3,
    type: 'image-select',
    question: 'Pick your ultimate Kerala icon:',
    images: [
      { src: '🎭', label: 'Kathakali', value: 'kathakali' },
      { src: '👨‍🎬', label: 'Mammootty', value: 'mammootty' },
      { src: '🌴', label: 'Coconut Tree', value: 'coconut-tree' },
      { src: '🛺', label: 'Auto Rickshaw', value: 'auto' }
    ]
  },
  {
    id: 4,
    type: 'multiple-choice',
    question: 'What\'s your Onam vibe?',
    options: [
      'Sadhya feast mode! 🍛',
      'Pookalam artist 🌸',
      'Pulikali dancer 🐅',
      'Netflix and chill 📺'
    ]
  },
  {
    id: 5,
    type: 'slider',
    question: 'How spicy is your life? (0 = Bland 100 = Fire breathing)',
    min: 0,
    max: 100,
    sliderLabels: {
      min: 'Mild like milk 🥛',
      max: 'Spicier than mulak chamandi! 🔥'
    }
  }
];