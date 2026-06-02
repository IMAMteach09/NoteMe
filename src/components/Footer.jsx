export default function Footer() {
  return (
    <footer className="py-8 px-8 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 mt-auto">
      <div className="mb-4 md:mb-0 text-center md:text-left">
        <div className="font-bold text-blue-600 text-lg mb-1">NoteMe</div>
        <div>© 2026 NoteMe Inc. All rights reserved.</div>
      </div>
      <div className="flex space-x-6">
        <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-slate-800 transition-colors">Security</a>
        <a href="#" className="hover:text-slate-800 transition-colors">Contact Us</a>
      </div>
    </footer>
  );
}