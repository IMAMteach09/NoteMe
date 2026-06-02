import { Mail, MessageSquare, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
          Get in touch
        </h1>
        <p className="text-lg text-slate-500">
          Have a question about NoteMe or need technical support? Drop us a message and our team will get back to you shortly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Contact Information Side */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Email Us</h3>
                <p className="text-sm text-slate-500">Usually replies in 24h</p>
              </div>
            </div>
            <a href="mailto:support@noteme.com" className="text-blue-600 font-medium hover:underline">support@noteme.com</a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Live Chat</h3>
                <p className="text-sm text-slate-500">Available 9am - 5pm EST</p>
              </div>
            </div>
            <button className="text-blue-600 font-medium hover:underline">Start a conversation</button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Headquarters</h3>
                <p className="text-sm text-slate-500">Keep Notes Inc.</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              123 Innovation Drive<br />
              Suite 400<br />
              San Francisco, CA 94107
            </p>
          </div>
        </div>

        {/* Contact Form Side */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                <input 
                  type="text" 
                  id="first-name" 
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                <input 
                  type="text" 
                  id="last-name" 
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
              <select 
                id="subject" 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-slate-700 bg-white"
              >
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Billing Question</option>
                <option>Feature Request</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea 
                id="message" 
                rows={5}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button 
              type="button" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}