import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../components/Navbar';
import { Footer } from '../App';

const Logs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, 'posts'),
          where('published', '==', true),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        setPosts(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const fmtDate = (ts) =>
    ts?.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Document metadata bar */}
      <div className="border-b border-[var(--line)]">
        <div className="max-w-[104rem] mx-auto px-6 lg:px-10 py-3 grid grid-cols-2 lg:grid-cols-4 gap-2">
          <p className="mono-label">Doc. No — SRH/LOGS/2026</p>
          <p className="mono-label">Status — Continuously updated</p>
          <p className="mono-label hidden lg:block">Classification — Public notes</p>
          <p className="mono-label hidden lg:block lg:text-right">{posts.length} {posts.length === 1 ? 'Entry' : 'Entries'} on record</p>
        </div>
      </div>

      <main className="max-w-[104rem] mx-auto px-6 lg:px-10 pt-20 lg:pt-28 pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="ed-chip rounded-full flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] inline-block"></span>
            Research Log
          </span>
          <span className="hidden sm:block w-12 h-px bg-[var(--line-strong)]"></span>
          <span className="mono-label hidden sm:block">ML · Research Notes · Things in progress</span>
        </div>

        <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.98] text-[var(--ink)] mb-6">
          Logs
        </h1>
        <p className="font-display italic text-2xl text-[var(--ink-dim)] max-w-2xl mb-20">
          Notes on machine learning, research, and things I'm thinking about —
          written as they happen.
        </p>

        {/* Entries */}
        {loading ? (
          <p className="mono-label py-20 text-center">Loading entries...</p>
        ) : posts.length === 0 ? (
          <div className="border-t border-b border-[var(--line)] py-20 text-center">
            <p className="font-display italic text-3xl text-[var(--ink-dim)] mb-3">Nothing on record yet.</p>
            <p className="mono-label">First entry coming soon</p>
          </div>
        ) : (
          <div className="border-t border-[var(--line)]">
            {posts.map((post, index) => (
              <Link
                key={post.id}
                to={`/logs/${post.id}`}
                className="grid md:grid-cols-[110px_1fr_auto] gap-3 md:gap-10 items-baseline py-8 border-b border-[var(--line)] group hover:bg-[var(--panel)] transition-colors md:px-4 md:-mx-4"
              >
                <span className="mono-label">
                  LOG {String(posts.length - index).padStart(3, '0')}
                </span>
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl leading-tight text-[var(--ink)] mb-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="font-mono-ed text-xs leading-relaxed text-[var(--ink-dim)] mb-3 max-w-2xl">
                      {post.excerpt}
                    </p>
                  )}
                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="ed-chip">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="md:text-right">
                  <p className="mono-label mb-1">{fmtDate(post.createdAt)}</p>
                  <p className="mono-label group-hover:text-[var(--ink)] transition-colors">Read →</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Logs;
