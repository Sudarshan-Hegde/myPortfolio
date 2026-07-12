import React, { useState } from 'react';
import { SectionHeading } from './Bio';

function Contact() {
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mjkojekr', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });
      setStatus(response.ok ? 'success' : 'error');
      if (response.ok) form.reset();
    } catch {
      setStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="border-b border-[var(--line)]">
      <div className="max-w-[104rem] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <SectionHeading index="07" label="Contact">
          Writing the next chapter —
          <br />
          <em>possibly with you.</em>
        </SectionHeading>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
          {/* Left — correspondence details */}
          <div>
            <p className="font-display italic text-2xl leading-snug text-[var(--ink)] mb-8">
              Have a project, an idea, or a role in mind? Send a message — I
              read everything.
            </p>

            <dl className="space-y-4 mb-10">
              {[
                ['Email', 'sudohegde@gmail.com', 'mailto:sudohegde@gmail.com'],
                ['GitHub', 'Sudarshan-Hegde', 'https://github.com/Sudarshan-Hegde'],
                ['LinkedIn', 'sudarshan-hegde', 'https://www.linkedin.com/in/sudohegde/'],
                ['Reddit', 'Sudarshan_Hegde_2004', 'http://reddit.com/user/_-SUPERN0VA-_/'],
                ['Instagram', 'sudarshan.hegde.2004', 'https://www.instagram.com/sudohegde/'],
              ].map(([k, v, href]) => (
                <div key={k} className="grid grid-cols-[110px_1fr] gap-4 items-baseline">
                  <dt className="mono-label">— {k}</dt>
                  <dd>
                    <a
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="font-mono-ed text-xs text-[var(--ink)] tracking-wider hover:text-[var(--ink-dim)] transition-colors underline underline-offset-4 decoration-[var(--line-strong)]"
                    >
                      {v} ↗
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mono-label flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] inline-block"></span>
              Response time — usually within 24 hrs
            </p>
          </div>

          {/* Right — the form */}
          <form onSubmit={handleSubmit} className="border border-[var(--line)] bg-[var(--panel)]">
            <div className="flex items-center justify-between px-4 lg:px-6 py-2.5 border-b border-[var(--line)]">
              <span className="mono-label">{'//'} FORM_01 · Correspondence</span>
              <span className="mono-label hidden sm:block">Encrypted in transit</span>
            </div>

            <div className="p-6 lg:p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="mono-label block mb-2">01 — Full name</label>
                  <input type="text" name="name" required className="ed-input" placeholder="Your name" />
                </div>
                <div>
                  <label className="mono-label block mb-2">02 — Email address</label>
                  <input type="email" name="email" required className="ed-input" placeholder="you@example.com" />
                </div>
              </div>

              <div>
                <label className="mono-label block mb-2">03 — Subject</label>
                <input type="text" name="subject" required className="ed-input" placeholder="Regarding..." />
              </div>

              <div>
                <label className="mono-label block mb-2">04 — Message</label>
                <textarea
                  name="message"
                  rows="6"
                  required
                  className="ed-input resize-none"
                  placeholder="Tell me about your idea, project, or opportunity."
                ></textarea>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <button type="submit" disabled={isSubmitting} className="ed-btn ed-btn--solid disabled:opacity-50">
                  {isSubmitting ? 'Transmitting...' : 'Transmit message'} <span>→</span>
                </button>

                {status === 'success' && (
                  <p className="mono-label text-[var(--ink)]">✓ Message sent. I'll get back to you soon.</p>
                )}
                {status === 'error' && (
                  <p className="mono-label">✕ Something went wrong. Please try again.</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
