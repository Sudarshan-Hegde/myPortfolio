import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Bio from './components/Bio';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Publications from './components/Publications';
import Contact from './components/Contact';
import Logs from './pages/Logs';
import LogPost from './pages/LogPost';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import AdminEditor from './pages/AdminEditor';

export function Footer() {
  return (
    <footer>
      <div className="max-w-[104rem] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <blockquote className="font-display italic text-xl lg:text-2xl leading-relaxed text-[var(--ink-dim)] max-w-3xl mb-14">
          "Surround yourself with relentless humans. People who plan in
          decades, but live in moments. Train like savages, but create like
          artists. Obsess in work, relax in life. People who know this is
          finite and choose to play infinite games. Find people going up
          mountains and climb together."
        </blockquote>

        <div className="border-t border-[var(--line)] pt-6 grid sm:grid-cols-3 gap-3">
          <p className="mono-label">End of document · SRH/PORT/2026/001</p>
          <p className="mono-label sm:text-center">© 2026 Sudarshan R. Hegde</p>
          <p className="mono-label sm:text-right">All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

function MainPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Bio />
      <Projects />
      <Certificates />
      <Publications />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/logs/:slug" element={<LogPost />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/editor" element={<AdminEditor />} />
        <Route path="/admin/editor/:id" element={<AdminEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
