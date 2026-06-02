import { CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import { FEATURES_DATA, REVIEWS_DATA } from '../data/mockData';
import { Star } from 'lucide-react';

// Added isAuthenticated prop with a default value of false
export default function Home({ isAuthenticated = false }) {
  return (
    <>
      {/* HERO SECTION */}
      <section className="text-center pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          Organize Your Life, One Note at a Time
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The modern, clutter-free utility for capturing thoughts, tracking tasks, and planning your 
          week. Keep everything in focus with our minimal digital workspace.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          
          {/* Dynamically route and change text based on auth status */}
          <Link 
            to={isAuthenticated ? "/features" : "/signup"} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg shadow-sm transition-all w-full sm:w-auto"
          >
            {isAuthenticated ? "Explore Features" : "Get Started for Free"}
          </Link>

        </div>

        {/* Hero App Mockup */}
        <div className="mt-16 mx-auto bg-slate-900 rounded-t-2xl p-2 pb-0 shadow-2xl max-w-3xl border border-slate-200/50">
          <div className="bg-white rounded-t-xl h-64 md:h-96 w-full overflow-hidden flex flex-col">
             <div className="h-10 border-b border-gray-100 flex items-center px-4 space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
             </div>
             <div className="flex-1 bg-gray-50 p-6 flex flex-col items-center justify-center text-gray-300">
                <FileText className="w-16 h-16 mb-4 opacity-50" />
                <p className="font-medium">App Dashboard Interface</p>
             </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Everything You Need to Stay Organized</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES_DATA.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </section>

      {/* PRIVACY SECTION */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
         <div className="bg-slate-50 border border-indigo-50 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-12">
            {/* Keeping your existing privacy code placeholder */}
         </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">What Our Users Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS_DATA.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
              <div className="flex space-x-1 mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate-700 italic mb-6 flex-grow">"{review.text}"</p>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">— {review.author}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}