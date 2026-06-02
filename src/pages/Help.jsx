import { Search, BookOpen, Shield, CreditCard, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Help() {
  const categories = [
    { title: 'Getting Started', icon: <BookOpen className="w-6 h-6" />, desc: 'Learn the basics and set up your workspace.' },
    { title: 'Account & Security', icon: <Shield className="w-6 h-6" />, desc: 'Manage your profile, passwords, and 2FA.' },
    { title: 'Billing & Plans', icon: <CreditCard className="w-6 h-6" />, desc: 'Understand your subscription and invoices.' },
    { title: 'Troubleshooting', icon: <Wrench className="w-6 h-6" />, desc: 'Fix common issues and bug reports.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Header & Search */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
          How can we help you?
        </h1>
        <div className="relative mt-6 max-w-lg mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-shadow"
            placeholder="Search for articles, tutorials, or FAQs..."
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {categories.map((cat, index) => (
          <Link 
            key={index}
            to={`/help/${cat.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
            className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all flex items-start space-x-4 group"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              {cat.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{cat.title}</h3>
              <p className="text-slate-500 text-sm">{cat.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Popular Articles */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Popular Articles</h2>
        <ul className="space-y-4">
          {['How to import notes from Evernote', 'Setting up biometric authentication on mobile', 'Sharing a folder with team members', 'How to reset your master vault password'].map((article, i) => (
            <li key={i} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
              <Link to="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors flex items-center justify-between">
                {article}
                <span className="text-slate-400 text-sm">&rarr;</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}