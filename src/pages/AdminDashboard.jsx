import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (!user) navigate('/admin');
      else setEmail(user.email);
    });
    return unsub;
  }, [navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this post permanently?')) return;
    await deleteDoc(doc(db, 'posts', id));
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin');
  };

  const published = posts.filter(p => p.published).length;
  const drafts = posts.length - published;

  const fmtDate = (ts) =>
    ts?.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[var(--line)]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="font-mono-ed text-[var(--ink-dim)] text-lg">{'{'}</span>
            <span className="font-display text-2xl text-[var(--ink)] tracking-wide">Logs Admin</span>
            <span className="font-mono-ed text-[var(--ink-dim)] text-lg">{'}'}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="mono-label hidden sm:block">{email}</span>
            <button onClick={handleLogout} className="mono-label hover:text-[var(--ink)] transition-colors">
              Sign out →
            </button>
          </div>
        </div>
      </header>

      {/* Metadata bar */}
      <div className="border-b border-[var(--line)]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-3 grid grid-cols-2 lg:grid-cols-4 gap-2">
          <p className="mono-label">Doc. No — SRH/ADMIN/LOGS</p>
          <p className="mono-label">{posts.length} Total {posts.length === 1 ? 'Entry' : 'Entries'}</p>
          <p className="mono-label hidden lg:block">{published} Published</p>
          <p className="mono-label hidden lg:block lg:text-right">{drafts} {drafts === 1 ? 'Draft' : 'Drafts'}</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="flex items-end justify-between gap-6 mb-14 flex-wrap">
          <h1 className="font-display text-4xl lg:text-5xl leading-[1.05] text-[var(--ink)]">
            Everything <em>on record.</em>
          </h1>
          <Link to="/admin/editor" className="ed-btn ed-btn--solid">
            New entry <span>+</span>
          </Link>
        </div>

        {loading ? (
          <p className="mono-label py-20 text-center">Loading entries...</p>
        ) : posts.length === 0 ? (
          <div className="border-t border-b border-[var(--line)] py-24 text-center">
            <p className="font-display italic text-3xl text-[var(--ink-dim)] mb-3">Nothing written yet.</p>
            <p className="mono-label">Create your first entry</p>
          </div>
        ) : (
          <div className="border-t border-[var(--line)]">
            {posts.map((post, i) => (
              <article
                key={post.id}
                className="grid md:grid-cols-[70px_1fr_130px_150px] gap-3 md:gap-6 items-baseline py-6 border-b border-[var(--line)] group hover:bg-[var(--panel)] transition-colors md:px-4 md:-mx-4"
              >
                <span className="mono-label">
                  LOG {String(posts.length - i).padStart(3, '0')}
                </span>

                <div className="min-w-0">
                  <h2 className="font-display text-xl lg:text-2xl text-[var(--ink)] leading-tight truncate">
                    {post.title}
                  </h2>
                  <p className="mono-label mt-1">{fmtDate(post.createdAt) || '—'}</p>
                </div>

                <p className="mono-label flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full inline-block ${
                      post.published ? 'bg-[var(--ink)]' : 'bg-[var(--ink-faint)]'
                    }`}
                  ></span>
                  {post.published ? 'Published' : 'Draft'}
                </p>

                <div className="flex gap-4 md:justify-end">
                  <Link
                    to={`/admin/editor/${post.id}`}
                    className="mono-label hover:text-[var(--ink)] transition-colors underline underline-offset-4 decoration-[var(--line-strong)]"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="mono-label hover:text-[var(--ink)] transition-colors underline underline-offset-4 decoration-[var(--line-strong)]"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
