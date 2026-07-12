import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../components/Navbar';
import { Footer } from '../App';

const LogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const snap = await getDoc(doc(db, 'posts', slug));
        if (snap.exists()) setPost({ id: snap.id, ...snap.data() });
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const fmtDate = (ts) =>
    ts?.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <p className="mono-label text-center py-40">Loading entry...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="text-center py-40">
          <p className="font-display italic text-3xl text-[var(--ink-dim)] mb-6">Entry not found.</p>
          <Link to="/logs" className="ed-btn">← Back to Logs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Document metadata bar */}
      <div className="border-b border-[var(--line)]">
        <div className="max-w-[104rem] mx-auto px-6 lg:px-10 py-3 grid grid-cols-2 lg:grid-cols-4 gap-2">
          <p className="mono-label">Doc. No — SRH/LOG/{post.id.slice(0, 12).toUpperCase()}</p>
          <p className="mono-label">Filed — {fmtDate(post.createdAt)?.toUpperCase()}</p>
          <p className="mono-label hidden lg:block">Classification — Public notes</p>
          <p className="mono-label hidden lg:block lg:text-right">By S. R. Hegde</p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 pt-16 lg:pt-24 pb-24">
        <Link
          to="/logs"
          className="mono-label hover:text-[var(--ink)] transition-colors inline-block mb-12"
        >
          ← Back to the log index
        </Link>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <span key={tag} className="ed-chip">{tag}</span>
            ))}
          </div>
        )}

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-[var(--ink)] mb-6">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="font-display italic text-xl lg:text-2xl leading-snug text-[var(--ink-dim)] mb-10">
            {post.excerpt}
          </p>
        )}

        <div className="w-full h-px bg-[var(--line)] mb-12"></div>

        <div className="log-content" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="w-full h-px bg-[var(--line)] mt-16 mb-6"></div>
        <div className="flex items-center justify-between">
          <p className="mono-label">End of entry</p>
          <Link to="/logs" className="mono-label hover:text-[var(--ink)] transition-colors">
            All logs →
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default LogPost;
