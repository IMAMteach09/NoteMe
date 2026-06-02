import React from 'react';
import { FileText, PieChart, ListTodo, Calendar } from 'lucide-react';

export const FEATURES_DATA = [
  {
    id: "f1",
    title: "Rich Notes & Images",
    description: "Capture ideas and visual plans instantly. Add rich media alongside your text to build comprehensive project references.",
    icon: <FileText className="text-blue-600 w-5 h-5" />,
    iconBg: "bg-blue-100",
    className: "col-span-1 md:col-span-2 min-h-[250px]"
  },
  {
    id: "f2",
    title: "Debt & Expense Tracker",
    description: "Keep your finances in check with clear debt logging and expense categorization.",
    icon: <PieChart className="text-red-600 w-5 h-5" />,
    iconBg: "bg-red-100",
    className: "col-span-1 min-h-[250px]"
  },
  {
    id: "f3",
    title: "Weekly Scheduler",
    description: "Plan your week with ease and never miss a beat. Visually block out your time for maximum focus.",
    icon: <ListTodo className="text-orange-600 w-5 h-5" />,
    iconBg: "bg-orange-100",
    className: "col-span-1"
  },
  {
    id: "f4",
    title: "Smart Calendar",
    description: "Set dates and stay on top of your schedule. Syncs seamlessly with your existing calendar workflows.",
    icon: <Calendar className="text-blue-600 w-5 h-5" />,
    iconBg: "bg-blue-100",
    className: "col-span-1"
  }
];

export const REVIEWS_DATA = [
  {
    id: "r1",
    author: "SARAH J., DESIGNER",
    text: "NoteMe has completely transformed how I organize my projects. It's so clean and intuitive.",
    rating: 5
  },
  {
    id: "r2",
    author: "MICHAEL R., DEVELOPER",
    text: "The best minimal note-taking app I've ever used. The weekly scheduler is a game changer.",
    rating: 5
  },
  {
    id: "r3",
    author: "ELENA G., ENTREPRENEUR",
    text: "Simple, fast, and secure. Exactly what I needed for my daily planning and debt tracking.",
    rating: 5
  }
];