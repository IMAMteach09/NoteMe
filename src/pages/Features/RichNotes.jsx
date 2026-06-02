import { Link } from 'react-router-dom';
import { Image, Bold, Tag, RefreshCcw, CheckCircle2 } from 'lucide-react';

export default function RichNotes({ isAuthenticated = false }) {
  
  // 1. MOCK DATA VARIABLES
  // Replace these with state/API calls when connecting your backend
  
  const mockNoteData = {
    title: "Q3 Product Launch Ideas",
    tags: [
      { id: 't1', label: "Internal", style: "bg-blue-100 text-blue-600" },
      { id: 't2', label: "Planning", style: "bg-slate-100 text-slate-500" }
    ],
    bodyText: "We need to focus on user onboarding and highlighting the new collaboration features. Below is the initial wireframe concept for the new dashboard.",
    tasks: [
      { id: 'task1', text: "Reviewing mid-year email sequence", isDone: true },
      { id: 'task2', text: "Add widget to the mobile view", isDone: true }
    ]
  };

  const featuresData = [
    {
      id: 'f1',
      title: "Seamless Media Support",
      description: "Drag and drop images, PDFs, and links directly into your notes. They render beautifully inline, keeping your context intact without breaking your flow.",
      icon: <Image className="w-6 h-6" />,
      colSpan: "md:col-span-2",
      iconBg: "bg-blue-50 text-blue-600",
      customContent: (
        <div className="mt-auto flex gap-4 overflow-hidden">
          <div className="w-1/3 h-24 bg-slate-100 rounded-lg"></div>
          <div className="w-1/3 h-24 bg-blue-100 rounded-lg"></div>
          <div className="w-1/3 h-24 bg-slate-100 rounded-lg"></div>
        </div>
      )
    },
    {
      id: 'f2',
      title: "Rich Formatting",
      description: "Bold, italics, headers, blockquotes, and code blocks. Structure your thoughts exactly how you envision them.",
      icon: <Bold className="w-6 h-6" />,
      colSpan: "md:col-span-1",
      iconBg: "bg-slate-100 text-slate-600",
      customContent: null
    },
    {
      id: 'f3',
      title: "Smart Tagging",
      description: "Apply color-coded tags and labels to organize visually. Instantly filter your knowledge base with a single click.",
      icon: <Tag className="w-6 h-6" />,
      colSpan: "md:col-span-1",
      iconBg: "bg-slate-100 text-slate-600",
      customContent: (
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-slate-100 text-[10px] uppercase font-bold text-slate-400 rounded">Idea</span>
          <span className="px-2 py-1 bg-blue-100 text-[10px] uppercase font-bold text-blue-500 rounded">Design</span>
        </div>
      )
    },
    {
      id: 'f4',
      title: "Auto-Sync Everything",
      description: "Every image uploaded and every word typed is instantly synced across all your devices securely.",
      icon: <RefreshCcw className="w-6 h-6" />,
      colSpan: "md:col-span-2",
      iconBg: "bg-blue-50 text-blue-600",
      customContent: null
    }
  ];

  return (
    <div className="bg-[#f8fafe] min-h-screen">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
              Capture Every Detail with Rich Notes
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Go beyond simple text. Embed images, format your thoughts, and organize your ideas visually. 
              Our rich text editor brings your notes to life, ensuring no detail is ever lost in translation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to={isAuthenticated ? "/dashboard" : "/signup"} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-sm transition-all text-center"
              >
                {isAuthenticated ? "Open Note Editor" : "Get Started for Free"}
              </Link>
              <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-8 py-3 rounded-lg shadow-sm transition-all">
                View Examples
              </button>
            </div>
          </div>

          {/* DYNAMIC FLOATING UI MOCKUP */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-4 space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="p-8">
                {/* Dynamically Rendered Title */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-slate-800">{mockNoteData.title}</span>
                </div>
                
                {/* Dynamically Rendered Tags */}
                <div className="flex gap-2 mb-6">
                    {mockNoteData.tags.map(tag => (
                      <span key={tag.id} className={`px-3 py-1 text-xs font-bold rounded-full ${tag.style}`}>
                        {tag.label}
                      </span>
                    ))}
                </div>

                <div className="space-y-4">
                    {/* Dynamically Rendered Body Text */}
                    <p className="text-slate-600">{mockNoteData.bodyText}</p>
                    
                    <div className="w-full h-32 bg-slate-100 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center">
                        <Image className="text-slate-300 w-10 h-10" />
                    </div>
                    
                    {/* Dynamically Rendered Tasks */}
                    <ul className="space-y-2">
                        {mockNoteData.tasks.map(task => (
                           <li key={task.id} className="flex items-center gap-2 text-slate-600">
                             {task.isDone && <CheckCircle2 className="w-4 h-4 text-blue-500" />} 
                             {task.text}
                           </li>
                        ))}
                    </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC FEATURE DETAILS GRID */}
      <section className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything You Need</h2>
          <p className="text-slate-500">Powerful formatting tools designed to stay out of your way until you need them.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuresData.map(feature => (
            <div key={feature.id} className={`${feature.colSpan} bg-white rounded-2xl border border-slate-200 p-8 flex flex-col`}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg mb-6 ${feature.iconBg}`}>
                  {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className={`text-slate-500 ${feature.customContent ? 'mb-8' : ''}`}>
                  {feature.description}
              </p>
              {feature.customContent}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="bg-blue-600 rounded-[2.5rem] p-12 text-center text-white shadow-xl shadow-blue-200">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to organize your thoughts?</h2>
            <p className="text-blue-100 mb-10 max-w-lg mx-auto">Join thousands of professionals who trust NoteMe for their daily organization and creative process.</p>
            <Link 
                to={isAuthenticated ? "/dashboard" : "/signup"} 
                className="inline-block bg-white text-blue-600 font-bold px-10 py-4 rounded-xl hover:bg-slate-50 transition-colors"
            >
                {isAuthenticated ? "Go to Dashboard" : "Get Started Now"}
            </Link>
        </div>
      </section>
    </div>
  );
}