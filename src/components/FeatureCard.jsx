export default function FeatureCard({ feature }) {
  return (
    <div className={`bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col ${feature.className || ''}`}>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-6 ${feature.iconBg}`}>
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{feature.description}</p>
      
      {feature.className?.includes('min-h') && (
          <div className="w-full h-24 bg-slate-100 rounded-lg mt-auto"></div>
      )}
    </div>
  );
}