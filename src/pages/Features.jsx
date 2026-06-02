import { Link } from 'react-router-dom';

export default function Features() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
          Everything you need to organize your life.
        </h1>
        <p className="text-lg text-slate-500">
          NoteMe combines powerful note-taking with essential life management tools in one clean, unified workspace.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Rich Notes & Images (Spans 2 columns) */}
        <Link 
          to="/features/rich-notes" 
          className="col-span-1 md:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition-shadow overflow-hidden flex flex-col group"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Rich Notes & Images</h3>
          <p className="text-slate-500 mb-8 max-w-lg">
            Capture your thoughts with rich text formatting, inline images, and flexible organization. Keep your ideas structured exactly how your brain works.
          </p>
          {/* Mockup Image Placeholder */}
          <div className="mt-auto -mx-8 -mb-8 h-48 bg-slate-100 border-t border-slate-200 overflow-hidden relative">
            <div className="absolute inset-x-4 top-4 bottom-0 bg-white shadow-sm border border-slate-200 rounded-t-lg rotate-1 transform origin-bottom-right"></div>
            <div className="absolute inset-x-8 top-8 bottom-0 bg-white shadow-md border border-slate-200 rounded-t-lg flex">
                <div className="w-1/3 border-r border-slate-100 p-4">
                    <div className="h-2 w-2/3 bg-slate-200 rounded mb-3"></div>
                    <div className="h-2 w-full bg-slate-100 rounded mb-2"></div>
                    <div className="h-2 w-4/5 bg-slate-100 rounded mb-2"></div>
                </div>
                <div className="w-2/3 bg-slate-50/50"></div>
            </div>
          </div>
        </Link>

        {/* 2. Secure Vault */}
        <Link 
          to="/features/secure-vault" 
          className="col-span-1 bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition-shadow flex flex-col group"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Secure Vault</h3>
          <p className="text-slate-500 mb-8">
            Lock away your most sensitive information with end-to-end encryption. Only you hold the key to your private data.
          </p>
          <div className="mt-auto flex gap-2">
            <span className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">Biometric Auth</span>
            <span className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">Auto-Lock</span>
          </div>
        </Link>

        {/* 3. Smart Calendar */}
        <Link 
          to="/features/smart-calendar" 
          className="col-span-1 bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition-shadow group flex flex-col"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500 text-white mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Smart Calendar</h3>
          <p className="text-slate-500 mb-6">
            Seamlessly sync your dates and deadlines across all devices. Never miss an important milestone again.
          </p>
          <div className="mt-auto bg-slate-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-xs font-medium text-slate-700">Team Meeting - 10:00 AM</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-600"></div>
              <span className="text-xs font-medium text-slate-700">Project Deadline - Tomorrow</span>
            </div>
          </div>
        </Link>

        {/* 4. Weekly Scheduler */}
        <Link 
          to="/features/weekly-scheduler" 
          className="col-span-1 bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition-shadow group flex flex-col"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500 text-white mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Weekly Scheduler</h3>
          <p className="text-slate-500">
            Plan your week visually. Allocate time blocks for focused work, meetings, and personal habits.
          </p>
        </Link>

        {/* 5. Debt & Expense Tracker */}
        <Link 
          to="/features/expense-tracker" 
          className="col-span-1 bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition-shadow group flex flex-col"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 text-slate-600 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Debt & Expense Tracker</h3>
          <p className="text-slate-500">
            Keep your finances in check right alongside your notes. Log expenses and track personal debts easily.
          </p>
        </Link>

      </div>
    </div>
  );
}