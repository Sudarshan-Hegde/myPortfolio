import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import TiptapLink from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { TextStyleKit } from '@tiptap/extension-text-style';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { TableKit } from '@tiptap/extension-table';
import { Node } from '@tiptap/core';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';

/* ============================================================ */
/* Constants                                                     */
/* ============================================================ */

const generateSlug = (title) =>
  title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const FONT_FAMILIES = [
  ['Default (Georgia)', ''],
  ['Instrument Serif', "'Instrument Serif', Georgia, serif"],
  ['Georgia', 'Georgia, serif'],
  ['Times New Roman', "'Times New Roman', Times, serif"],
  ['Bookman Old Style', "'Bookman Old Style', 'URW Bookman', Georgia, serif"],
  ['Garamond', "Garamond, 'EB Garamond', serif"],
  ['Arial', 'Arial, Helvetica, sans-serif'],
  ['Verdana', 'Verdana, Geneva, sans-serif'],
  ['JetBrains Mono', "'JetBrains Mono', monospace"],
  ['Courier New', "'Courier New', Courier, monospace"],
];

const FONT_SIZES = [10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 60, 72];

const LINE_HEIGHTS = [['1', '1'], ['1.15', '1.15'], ['1.5', '1.5'], ['1.85 (default)', '1.85'], ['2', '2'], ['2.5', '2.5']];

const SYMBOLS = [
  '—', '–', '·', '…', '§', '¶', '†', '‡', '•', '№',
  '©', '®', '™', '°', '±', '×', '÷', '≈', '≠', '≤',
  '≥', '∞', '√', '∫', '∂', '∑', '∏', 'Δ', 'π', 'α',
  'β', 'γ', 'λ', 'μ', 'σ', 'θ', 'Ω', '∈', '∀', '∃',
  '→', '←', '↑', '↓', '⇒', '⇐', '↔', '€', '£', '₹',
];

const PAGE_DIMS = {
  a4: { portrait: [794, 1123], landscape: [1123, 794] },
  letter: { portrait: [816, 1056], landscape: [1056, 816] },
};

const MARGIN_PX = { narrow: 48, normal: 96, wide: 144 };

const PRINT_CSS = `
  body { font-family: Georgia, 'Times New Roman', serif; color: #111; line-height: 1.7; max-width: 7.5in; margin: 0 auto; padding: 0.5in 0; }
  h1,h2,h3 { line-height: 1.2; }
  img { max-width: 100%; height: auto; }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; }
  th, td { border: 1px solid #999; padding: 6px 10px; text-align: left; vertical-align: top; }
  th { background: #eee; }
  pre { background: #f4f4f4; padding: 1em; overflow-x: auto; }
  code { font-family: 'Courier New', monospace; font-size: 0.9em; }
  blockquote { border-left: 3px solid #999; padding-left: 1em; color: #444; font-style: italic; }
  .page-break { page-break-after: always; border: none; height: 0; margin: 0; }
`;

/* ============================================================ */
/* Page break node                                               */
/* ============================================================ */

const PageBreak = Node.create({
  name: 'pageBreak',
  group: 'block',
  atom: true,
  selectable: true,
  parseHTML: () => [{ tag: 'div[data-page-break]' }, { tag: 'hr.page-break' }],
  renderHTML: () => ['hr', { 'data-page-break': 'true', class: 'page-break' }],
  addCommands() {
    return {
      setPageBreak: () => ({ commands }) =>
        commands.insertContent([{ type: 'pageBreak' }, { type: 'paragraph' }]),
    };
  },
});

/* ============================================================ */
/* Small helpers                                                 */
/* ============================================================ */

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Resize + compress an image file, return data URL.
const compressImage = (file) =>
  new Promise((resolve, reject) => {
    // Small PNGs (logos, diagrams) keep transparency untouched
    if (file.type === 'image/png' && file.size < 150 * 1024) {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = reject;
      r.readAsDataURL(file);
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      const MAX = 1400;
      let { width, height } = img;
      if (width > MAX) { height = (height * MAX) / width; width = MAX; }
      if (height > MAX) { width = (width * MAX) / height; height = MAX; }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = reject;
    img.src = url;
  });

/* ============================================================ */
/* UI atoms                                                      */
/* ============================================================ */

const Btn = ({ onClick, active, title, disabled, children }) => (
  <button
    type="button"
    disabled={disabled}
    onMouseDown={e => { e.preventDefault(); if (!disabled) onClick(); }}
    title={title}
    className={`font-mono-ed text-[11px] uppercase tracking-wider px-2 py-1.5 border transition-colors select-none disabled:opacity-30 ${
      active
        ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
        : 'text-[var(--ink-dim)] border-transparent hover:text-[var(--ink)] hover:border-[var(--line-strong)]'
    }`}
  >
    {children}
  </button>
);

const Select = ({ value, onChange, title, children, width = 'auto' }) => (
  <select
    value={value}
    onChange={onChange}
    title={title}
    style={{ width }}
    className="font-mono-ed text-[11px] uppercase tracking-wide bg-[var(--paper)] border border-[var(--line-strong)] text-[var(--ink)] px-1.5 py-1.5 outline-none cursor-pointer hover:border-[var(--ink-dim)] transition-colors"
  >
    {children}
  </select>
);

const Group = ({ label, children }) => (
  <div className="flex flex-col justify-between gap-1.5 px-2.5 py-2 border-r border-[var(--line)]">
    <div className="flex items-center gap-0.5 flex-wrap">{children}</div>
    <span className="font-mono-ed text-[9px] uppercase tracking-[0.18em] text-[var(--ink-faint)] text-center">
      {label}
    </span>
  </div>
);

const Popover = ({ children, onClose, wide }) => {
  const ref = useRef();
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    // Attach on the next task — the mousedown that OPENED the popover is
    // still bubbling when this effect runs, and would close it instantly.
    const t = setTimeout(() => document.addEventListener('mousedown', handler), 0);
    return () => { clearTimeout(t); document.removeEventListener('mousedown', handler); };
  }, [onClose]);
  return (
    <div
      ref={ref}
      className={`absolute top-full left-0 mt-1 z-50 bg-[var(--paper)] border border-[var(--line-strong)] shadow-2xl shadow-black/50 p-4 ${wide ? 'w-96' : 'w-80'}`}
    >
      {children}
    </div>
  );
};

/* Horizontal ruler with inch ticks and shaded margins */
const Ruler = ({ width, margin }) => {
  const ticks = [];
  for (let x = 0; x <= width; x += 12) {
    const isInch = x % 96 === 0;
    const isHalf = x % 48 === 0;
    ticks.push(
      <div
        key={x}
        className="absolute bottom-0 w-px bg-[var(--ink-faint)]"
        style={{ left: x, height: isInch ? 12 : isHalf ? 8 : 5 }}
      />
    );
    if (isInch && x > 0 && x < width) {
      ticks.push(
        <span
          key={`n${x}`}
          className="absolute top-0 font-mono-ed text-[9px] text-[var(--ink-dim)] -translate-x-1/2"
          style={{ left: x }}
        >
          {x / 96}
        </span>
      );
    }
  }
  return (
    <div
      className="relative mx-auto mb-3 h-7 bg-[var(--panel)] border border-[var(--line)] select-none overflow-hidden"
      style={{ width }}
    >
      <div className="absolute inset-y-0 left-0 bg-black/40" style={{ width: margin }} />
      <div className="absolute inset-y-0 right-0 bg-black/40" style={{ width: margin }} />
      {ticks}
    </div>
  );
};

/* ============================================================ */
/* Editor                                                        */
/* ============================================================ */

const AdminEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Front matter + persistence
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [savedStatus, setSavedStatus] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const currentIdRef = useRef(id);

  // Ribbon state
  const [activeTab, setActiveTab] = useState('home');
  const [showLinkPopover, setShowLinkPopover] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showImagePopover, setShowImagePopover] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [showTablePopover, setShowTablePopover] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [tableHeader, setTableHeader] = useState(true);
  const [showSymbolPopover, setShowSymbolPopover] = useState(false);
  const [showFind, setShowFind] = useState(false);
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [findMsg, setFindMsg] = useState('');

  // Page layout state
  const [pageSize, setPageSize] = useState('a4');
  const [orientation, setOrientation] = useState('portrait');
  const [marginKey, setMarginKey] = useState('normal');
  const [zoom, setZoom] = useState(100);
  const [showRuler, setShowRuler] = useState(true);

  // Counters
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [docBytes, setDocBytes] = useState(0);

  const fileInputRef = useRef();
  const imageInputRef = useRef();

  const [pageW, pageH] = PAGE_DIMS[pageSize][orientation];
  const marginPx = MARGIN_PX[marginKey];

  useEffect(() => { if (id) currentIdRef.current = id; }, [id]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (!user) navigate('/admin');
    });
    return unsub;
  }, [navigate]);

  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit,
      Underline,
      TextStyleKit,
      Subscript,
      Superscript,
      TableKit.configure({ table: { resizable: false } }),
      PageBreak,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TiptapLink.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Start writing your log...' }),
      Image.configure({ inline: false, allowBase64: true }),
    ],
    editorProps: {
      attributes: { class: 'outline-none log-content' },
      handleDrop: (view, event, _slice, moved) => {
        const files = Array.from(event.dataTransfer?.files || []).filter(f => f.type.startsWith('image/'));
        if (!moved && files.length) {
          event.preventDefault();
          files.forEach(async (f) => {
            const src = await compressImage(f);
            editorRef.current?.chain().focus().setImage({ src }).run();
          });
          return true;
        }
        return false;
      },
      handlePaste: (view, event) => {
        const files = Array.from(event.clipboardData?.files || []).filter(f => f.type.startsWith('image/'));
        if (files.length) {
          event.preventDefault();
          files.forEach(async (f) => {
            const src = await compressImage(f);
            editorRef.current?.chain().focus().setImage({ src }).run();
          });
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      const text = editor.getText().trim();
      setWordCount(text ? text.split(/\s+/).length : 0);
      setCharCount(text.length);
      setDocBytes(new Blob([editor.getHTML()]).size);
    },
  });

  const editorRef = useRef(null);
  useEffect(() => { editorRef.current = editor; }, [editor]);

  useEffect(() => {
    if (!id || !editor) return;
    getDoc(doc(db, 'posts', id)).then(snap => {
      if (!snap.exists()) return;
      const data = snap.data();
      setTitle(data.title || '');
      setExcerpt(data.excerpt || '');
      setTags(data.tags?.join(', ') || '');
      setSavedStatus(data.published ? 'published' : 'draft');
      editor.commands.setContent(data.content || '');
      setDocBytes(new Blob([data.content || '']).size);
    });
  }, [id, editor]);

  /* ---------- persistence ---------- */

  const handleSave = async (shouldPublish) => {
    if (!title.trim()) { alert('Title is required.'); return; }
    if (docBytes > 950 * 1024) {
      alert('This entry is close to the 1MB Firestore limit. Remove or shrink some images before saving.');
      return;
    }
    setSaving(true);
    setSaveMsg('Saving...');
    const slug = currentIdRef.current || generateSlug(title);
    const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);
    try {
      await setDoc(doc(db, 'posts', slug), {
        title: title.trim(),
        excerpt: excerpt.trim(),
        tags: tagList,
        content: editor.getHTML(),
        published: shouldPublish,
        updatedAt: serverTimestamp(),
        ...(!currentIdRef.current && { createdAt: serverTimestamp() }),
      }, { merge: true });
      setSavedStatus(shouldPublish ? 'published' : 'draft');
      setSaveMsg(shouldPublish ? '✓ Published' : '✓ Saved as draft');
      if (!currentIdRef.current) {
        currentIdRef.current = slug;
        navigate(`/admin/editor/${slug}`, { replace: true });
      }
    } catch (err) {
      setSaveMsg('✕ Error saving.');
      console.error(err);
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(''), 3000);
    }
  };

  /* ---------- clipboard ---------- */

  const clipboardCopy = () => {
    const { from, to } = editor.state.selection;
    navigator.clipboard.writeText(editor.state.doc.textBetween(from, to, '\n'));
    editor.chain().focus().run();
  };
  const clipboardCut = () => {
    clipboardCopy();
    editor.chain().focus().deleteSelection().run();
  };
  const clipboardPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) editor.chain().focus().insertContent(escapeHtml(text).replace(/\n/g, '<br>')).run();
    } catch {
      alert('Browser blocked clipboard read — use Ctrl+V inside the page instead.');
    }
  };

  /* ---------- font size ---------- */

  const currentFontSize = parseInt(editor?.getAttributes('textStyle')?.fontSize) || 18;
  const stepFontSize = (dir) => {
    const idx = FONT_SIZES.findIndex(s => s >= currentFontSize);
    const next = dir > 0
      ? FONT_SIZES[Math.min(FONT_SIZES.length - 1, (idx === -1 ? FONT_SIZES.length - 1 : idx) + 1)]
      : FONT_SIZES[Math.max(0, (idx === -1 ? FONT_SIZES.length - 1 : idx) - 1)];
    editor.chain().focus().setFontSize(`${next}px`).run();
  };

  /* ---------- paragraph style dropdown ---------- */

  const currentStyle = editor
    ? editor.isActive('heading', { level: 1 }) ? 'h1'
    : editor.isActive('heading', { level: 2 }) ? 'h2'
    : editor.isActive('heading', { level: 3 }) ? 'h3'
    : editor.isActive('heading', { level: 4 }) ? 'h4'
    : editor.isActive('codeBlock') ? 'code'
    : editor.isActive('blockquote') ? 'quote'
    : 'p'
    : 'p';

  const applyStyle = (v) => {
    const c = editor.chain().focus();
    if (v === 'p') c.setParagraph().run();
    else if (v === 'quote') c.setParagraph().toggleBlockquote().run();
    else if (v === 'code') c.toggleCodeBlock().run();
    else c.setHeading({ level: parseInt(v[1]) }).run();
  };

  /* ---------- find & replace ---------- */

  const findMatches = (text) => {
    if (!text) return [];
    const out = [];
    editor.state.doc.descendants((node, pos) => {
      if (!node.isText) return;
      let idx = 0;
      while ((idx = node.text.indexOf(text, idx)) !== -1) {
        out.push({ from: pos + idx, to: pos + idx + text.length });
        idx += text.length;
      }
    });
    return out;
  };

  const handleFindCount = () => {
    const n = findMatches(findText).length;
    setFindMsg(`${n} ${n === 1 ? 'match' : 'matches'}`);
  };

  const handleReplaceAll = () => {
    const matches = findMatches(findText);
    if (!matches.length) { setFindMsg('0 matches'); return; }
    const { tr } = editor.state;
    [...matches].reverse().forEach(({ from, to }) => tr.insertText(replaceText, from, to));
    editor.view.dispatch(tr);
    setFindMsg(`Replaced ${matches.length}`);
  };

  /* ---------- insert helpers ---------- */

  const insertLink = () => {
    if (!linkUrl) return;
    editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    setLinkUrl('');
    setShowLinkPopover(false);
  };

  const insertImageByUrl = () => {
    if (!imageUrl) return;
    editor.chain().focus().setImage({ src: imageUrl }).run();
    setImageUrl('');
    setShowImagePopover(false);
  };

  const insertImageFromDevice = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setSaveMsg('Compressing image...');
    try {
      const src = await compressImage(file);
      editor.chain().focus().setImage({ src }).run();
      setSaveMsg('');
    } catch {
      setSaveMsg('✕ Could not read image.');
      setTimeout(() => setSaveMsg(''), 3000);
    }
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({
      rows: Math.max(1, Math.min(20, tableRows)),
      cols: Math.max(1, Math.min(10, tableCols)),
      withHeaderRow: tableHeader,
    }).run();
    setShowTablePopover(false);
  };

  /* ---------- file import ---------- */

  const importFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    setSaveMsg(`Importing ${file.name}...`);
    try {
      let html = '';
      if (ext === 'docx') {
        const mammoth = (await import('mammoth')).default;
        const result = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() });
        html = result.value;
      } else if (ext === 'pdf') {
        const pdfjs = await import('pdfjs-dist');
        const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
        const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
        const pages = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          let text = '';
          let lastY = null;
          content.items.forEach(item => {
            if (lastY !== null && Math.abs(item.transform[5] - lastY) > 4) text += '\n';
            text += item.str + (item.hasEOL ? '\n' : ' ');
            lastY = item.transform[5];
          });
          pages.push(text.trim());
        }
        html = pages
          .map(p => p.split(/\n{1,}/).map(par => `<p>${escapeHtml(par.trim())}</p>`).join(''))
          .join('<hr data-page-break="true" class="page-break">');
      } else if (ext === 'odt') {
        const JSZip = (await import('jszip')).default;
        const zip = await JSZip.loadAsync(await file.arrayBuffer());
        const xml = await zip.file('content.xml').async('string');
        const docXml = new DOMParser().parseFromString(xml, 'application/xml');
        const parts = [];
        const walk = (el) => {
          for (const child of el.children) {
            const tag = child.localName;
            if (tag === 'h') {
              const lvl = Math.min(4, parseInt(child.getAttribute('text:outline-level') || '2'));
              parts.push(`<h${lvl}>${escapeHtml(child.textContent)}</h${lvl}>`);
            } else if (tag === 'p') {
              if (child.textContent.trim()) parts.push(`<p>${escapeHtml(child.textContent)}</p>`);
            } else if (tag === 'list') {
              const items = Array.from(child.querySelectorAll('*'))
                .filter(n => n.localName === 'p')
                .map(n => `<li>${escapeHtml(n.textContent)}</li>`)
                .join('');
              if (items) parts.push(`<ul>${items}</ul>`);
            } else {
              walk(child);
            }
          }
        };
        walk(docXml.documentElement);
        html = parts.join('');
      } else if (ext === 'html' || ext === 'htm') {
        const raw = await file.text();
        const parsed = new DOMParser().parseFromString(raw, 'text/html');
        parsed.querySelectorAll('script, style, iframe, object, embed, link, meta').forEach(n => n.remove());
        html = parsed.body.innerHTML;
      } else if (ext === 'txt' || ext === 'md') {
        const raw = await file.text();
        html = raw.split(/\n\s*\n/).map(p => `<p>${escapeHtml(p.trim()).replace(/\n/g, '<br>')}</p>`).join('');
      } else {
        setSaveMsg(`✕ Unsupported file type: .${ext}`);
        setTimeout(() => setSaveMsg(''), 4000);
        return;
      }

      if (editor.isEmpty) editor.commands.setContent(html);
      else editor.chain().focus().insertContent(html).run();
      setDocBytes(new Blob([editor.getHTML()]).size);
      setSaveMsg(`✓ Imported ${file.name}`);
    } catch (err) {
      console.error(err);
      setSaveMsg(`✕ Import failed for ${file.name}`);
    } finally {
      setTimeout(() => setSaveMsg(''), 4000);
    }
  };

  /* ---------- export ---------- */

  const exportPdf = () => {
    const w = window.open('', '_blank');
    if (!w) { alert('Popup blocked — allow popups to export.'); return; }
    w.document.write(
      `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title || 'Log entry')}</title><style>${PRINT_CSS}</style></head><body><h1>${escapeHtml(title || '')}</h1>${editor.getHTML()}</body></html>`
    );
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 400);
  };

  const exportHtml = () => {
    const blob = new Blob(
      [`<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title || 'Log entry')}</title></head><body><h1>${escapeHtml(title || '')}</h1>${editor.getHTML()}</body></html>`],
      { type: 'text/html' }
    );
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${generateSlug(title || 'log-entry') || 'log-entry'}.html`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const newEntry = () => {
    if (!editor.isEmpty && !confirm('Clear the editor and start a new entry?')) return;
    editor.commands.clearContent();
    setTitle('');
    setExcerpt('');
    setTags('');
    setSavedStatus(null);
    currentIdRef.current = null;
    navigate('/admin/editor', { replace: true });
  };

  if (!editor) return null;

  const inTable = editor.isActive('table');
  const sizeKB = (docBytes / 1024).toFixed(0);
  const sizeWarn = docBytes > 700 * 1024;

  /* ============================================================ */

  return (
    <div className="min-h-screen">
      {/* Hidden file inputs */}
      <input ref={fileInputRef} type="file" accept=".docx,.pdf,.odt,.txt,.md,.html,.htm" onChange={importFile} className="hidden" />
      <input ref={imageInputRef} type="file" accept="image/*" onChange={insertImageFromDevice} className="hidden" />

      {/* Sticky top bar */}
      <header className="sticky top-0 z-50 bg-[var(--paper)]/95 backdrop-blur-sm border-b border-[var(--line)]">
        <div className="max-w-[110rem] mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="mono-label hover:text-[var(--ink)] transition-colors flex-shrink-0"
          >
            ← Dashboard
          </button>
          <div className="flex items-center gap-4 flex-shrink-0">
            {savedStatus && (
              <span className="mono-label flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full inline-block ${savedStatus === 'published' ? 'bg-[var(--ink)]' : 'bg-[var(--ink-faint)]'}`}></span>
                {savedStatus === 'published' ? 'Published' : 'Draft'}
              </span>
            )}
            {saveMsg && <span className="mono-label">{saveMsg}</span>}
            <button onClick={() => handleSave(false)} disabled={saving} className="ed-btn disabled:opacity-50">
              Save draft
            </button>
            <button onClick={() => handleSave(true)} disabled={saving} className="ed-btn ed-btn--solid disabled:opacity-50">
              {savedStatus === 'published' ? 'Update' : 'Publish'} <span>→</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[110rem] mx-auto px-6 py-10">
        {/* Front matter */}
        <input
          type="text"
          placeholder="Entry title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full bg-transparent font-display text-4xl lg:text-5xl text-[var(--ink)] placeholder-[var(--ink-faint)] outline-none mb-3 leading-tight"
        />
        <textarea
          placeholder="Short excerpt — shown on the Logs index..."
          value={excerpt}
          onChange={e => setExcerpt(e.target.value)}
          rows={1}
          className="w-full bg-transparent font-display italic text-xl text-[var(--ink-dim)] placeholder-[var(--ink-faint)] outline-none mb-3 resize-none leading-snug"
        />
        <input
          type="text"
          placeholder="Tags — comma separated: ML, Research, Python..."
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="w-full bg-transparent font-mono-ed text-xs uppercase tracking-widest text-[var(--ink)] placeholder-[var(--ink-faint)] outline-none mb-8"
        />

        {/* ===================== RIBBON ===================== */}
        <div className="border border-[var(--line)] bg-[var(--panel)] mb-8 sticky top-[64px] z-40">
          {/* Tabs */}
          <div className="flex items-center border-b border-[var(--line)]">
            {[['file', 'File'], ['home', 'Home'], ['insert', 'Insert'], ['layout', 'Layout']].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`mono-label px-5 py-2.5 border-b-2 -mb-px transition-colors ${
                  activeTab === key
                    ? 'border-[var(--ink)] text-[var(--ink)]'
                    : 'border-transparent hover:text-[var(--ink)]'
                }`}
              >
                {label}
              </button>
            ))}
            <span className="mono-label ml-auto px-5 hidden md:block">
              {'//'} EDITOR · Rich Text · {wordCount} words
            </span>
          </div>

          {/* Ribbon body */}
          <div className="flex flex-wrap items-stretch">
            {/* ---------- FILE ---------- */}
            {activeTab === 'file' && (
              <>
                <Group label="Entry">
                  <Btn onClick={newEntry} title="Clear and start new">🗎 New</Btn>
                </Group>
                <Group label="Import">
                  <Btn onClick={() => fileInputRef.current.click()} title="Import .docx, .pdf, .odt, .txt, .md, .html">
                    ⬆ Import file
                  </Btn>
                  <span className="font-mono-ed text-[9px] text-[var(--ink-faint)] px-2 self-center">
                    DOCX · PDF · ODT · TXT · MD · HTML
                  </span>
                </Group>
                <Group label="Export">
                  <Btn onClick={exportPdf} title="Print / save as PDF">⎙ Export PDF</Btn>
                  <Btn onClick={exportHtml} title="Download as HTML file">⬇ Export HTML</Btn>
                </Group>
                <Group label="Cloud">
                  <Btn onClick={() => handleSave(false)} title="Save draft to Firestore">Save draft</Btn>
                  <Btn onClick={() => handleSave(true)} title="Publish to /logs">Publish</Btn>
                </Group>
              </>
            )}

            {/* ---------- HOME ---------- */}
            {activeTab === 'home' && (
              <>
                <Group label="History">
                  <Btn onClick={() => editor.chain().focus().undo().run()} title="Undo (Ctrl+Z)">↩</Btn>
                  <Btn onClick={() => editor.chain().focus().redo().run()} title="Redo (Ctrl+Y)">↪</Btn>
                </Group>

                <Group label="Clipboard">
                  <Btn onClick={clipboardCut} title="Cut (Ctrl+X)">✂</Btn>
                  <Btn onClick={clipboardCopy} title="Copy (Ctrl+C)">⧉</Btn>
                  <Btn onClick={clipboardPaste} title="Paste plain text (Ctrl+V for rich)">📋</Btn>
                  <Btn onClick={() => editor.chain().focus().unsetAllMarks().setParagraph().run()} title="Clear formatting">A⌫</Btn>
                </Group>

                <Group label="Style">
                  <Select value={currentStyle} onChange={e => applyStyle(e.target.value)} title="Paragraph style">
                    <option value="p">Normal</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="h4">Heading 4</option>
                    <option value="quote">Quote</option>
                    <option value="code">Code block</option>
                  </Select>
                </Group>

                <Group label="Font">
                  <Select
                    width="150px"
                    value={editor.getAttributes('textStyle').fontFamily || ''}
                    onChange={e => e.target.value
                      ? editor.chain().focus().setFontFamily(e.target.value).run()
                      : editor.chain().focus().unsetFontFamily().run()}
                    title="Font family"
                  >
                    {FONT_FAMILIES.map(([label, val]) => (
                      <option key={label} value={val}>{label}</option>
                    ))}
                  </Select>
                  <Select
                    value={`${currentFontSize}`}
                    onChange={e => editor.chain().focus().setFontSize(`${e.target.value}px`).run()}
                    title="Font size (px)"
                  >
                    {FONT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                  <Btn onClick={() => stepFontSize(1)} title="Grow font">A▲</Btn>
                  <Btn onClick={() => stepFontSize(-1)} title="Shrink font">A▼</Btn>
                </Group>

                <Group label="Format">
                  <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold (Ctrl+B)"><b>B</b></Btn>
                  <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic (Ctrl+I)"><i>I</i></Btn>
                  <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline (Ctrl+U)"><u>U</u></Btn>
                  <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough"><s>S</s></Btn>
                  <Btn onClick={() => editor.chain().focus().toggleSubscript().run()} active={editor.isActive('subscript')} title="Subscript">X₂</Btn>
                  <Btn onClick={() => editor.chain().focus().toggleSuperscript().run()} active={editor.isActive('superscript')} title="Superscript">X²</Btn>
                  <Btn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Inline code">{'</>'}</Btn>
                </Group>

                <Group label="Color">
                  <label className="flex items-center gap-1 cursor-pointer px-1" title="Text color">
                    <span className="font-mono-ed text-[11px] text-[var(--ink-dim)]">A</span>
                    <input
                      type="color"
                      value={editor.getAttributes('textStyle').color || '#e9e4d8'}
                      onChange={e => editor.chain().focus().setColor(e.target.value).run()}
                      className="w-6 h-6 bg-transparent border border-[var(--line-strong)] cursor-pointer p-0.5"
                    />
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer px-1" title="Highlight color">
                    <span className="font-mono-ed text-[11px] text-[var(--ink-dim)]">▉</span>
                    <input
                      type="color"
                      value={editor.getAttributes('textStyle').backgroundColor || '#4a4020'}
                      onChange={e => editor.chain().focus().setBackgroundColor(e.target.value).run()}
                      className="w-6 h-6 bg-transparent border border-[var(--line-strong)] cursor-pointer p-0.5"
                    />
                  </label>
                  <Btn onClick={() => editor.chain().focus().unsetColor().unsetBackgroundColor().run()} title="Remove colors">✕</Btn>
                </Group>

                <Group label="Paragraph">
                  <Btn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align left">⇤</Btn>
                  <Btn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align center">↔</Btn>
                  <Btn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align right">⇥</Btn>
                  <Btn onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })} title="Justify">☰</Btn>
                  <Select
                    value={editor.getAttributes('textStyle').lineHeight || '1.85'}
                    onChange={e => editor.chain().focus().setLineHeight(e.target.value).run()}
                    title="Line spacing"
                  >
                    {LINE_HEIGHTS.map(([label, val]) => <option key={val} value={val}>↕ {label}</option>)}
                  </Select>
                </Group>

                <Group label="Lists">
                  <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">•≡</Btn>
                  <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered list">1≡</Btn>
                  <Btn onClick={() => editor.chain().focus().sinkListItem('listItem').run()} disabled={!editor.can().sinkListItem('listItem')} title="Indent list item (Tab)">→|</Btn>
                  <Btn onClick={() => editor.chain().focus().liftListItem('listItem').run()} disabled={!editor.can().liftListItem('listItem')} title="Outdent list item (Shift+Tab)">|←</Btn>
                </Group>

                <Group label="Editing">
                  <Btn onClick={() => setShowFind(v => !v)} active={showFind} title="Find & replace">🔍 Find</Btn>
                </Group>
              </>
            )}

            {/* ---------- INSERT ---------- */}
            {activeTab === 'insert' && (
              <>
                <Group label="Media">
                  <Btn onClick={() => imageInputRef.current.click()} title="Upload image from device (auto-compressed)">▣ From device</Btn>
                  <div className="relative">
                    <Btn onClick={() => { setShowImagePopover(v => !v); setShowLinkPopover(false); setShowSymbolPopover(false); setShowTablePopover(false); }} title="Insert image by URL">🔗 By URL</Btn>
                    {showImagePopover && (
                      <Popover onClose={() => setShowImagePopover(false)}>
                        <p className="mono-label mb-3">Insert image by URL</p>
                        <input autoFocus type="url" placeholder="https://example.com/image.png" value={imageUrl}
                          onChange={e => setImageUrl(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && insertImageByUrl()}
                          className="ed-input mb-3" />
                        <div className="flex gap-3">
                          <button onClick={insertImageByUrl} className="ed-btn ed-btn--solid">Insert</button>
                          <button onClick={() => setShowImagePopover(false)} className="mono-label hover:text-[var(--ink)]">Cancel</button>
                        </div>
                      </Popover>
                    )}
                  </div>
                </Group>

                <Group label="Table">
                  <div className="relative">
                    <Btn onClick={() => { setShowTablePopover(v => !v); setShowImagePopover(false); setShowLinkPopover(false); setShowSymbolPopover(false); }} active={inTable} title="Insert table">⊞ Table</Btn>
                    {showTablePopover && (
                      <Popover onClose={() => setShowTablePopover(false)}>
                        <p className="mono-label mb-3">Insert table</p>
                        <div className="flex items-center gap-3 mb-3">
                          <label className="mono-label flex items-center gap-2">
                            Rows
                            <input type="number" min="1" max="20" value={tableRows} onChange={e => setTableRows(+e.target.value)} className="ed-input !w-16 !py-1" />
                          </label>
                          <label className="mono-label flex items-center gap-2">
                            Cols
                            <input type="number" min="1" max="10" value={tableCols} onChange={e => setTableCols(+e.target.value)} className="ed-input !w-16 !py-1" />
                          </label>
                        </div>
                        <label className="mono-label flex items-center gap-2 mb-4 cursor-pointer">
                          <input type="checkbox" checked={tableHeader} onChange={e => setTableHeader(e.target.checked)} />
                          Header row
                        </label>
                        <div className="flex gap-3">
                          <button onClick={insertTable} className="ed-btn ed-btn--solid">Insert</button>
                          <button onClick={() => setShowTablePopover(false)} className="mono-label hover:text-[var(--ink)]">Cancel</button>
                        </div>
                      </Popover>
                    )}
                  </div>
                  {inTable && (
                    <>
                      <Btn onClick={() => editor.chain().focus().addRowBefore().run()} title="Add row above">⤒ Row</Btn>
                      <Btn onClick={() => editor.chain().focus().addRowAfter().run()} title="Add row below">⤓ Row</Btn>
                      <Btn onClick={() => editor.chain().focus().addColumnBefore().run()} title="Add column left">⇤ Col</Btn>
                      <Btn onClick={() => editor.chain().focus().addColumnAfter().run()} title="Add column right">⇥ Col</Btn>
                      <Btn onClick={() => editor.chain().focus().deleteRow().run()} title="Delete row">✕ Row</Btn>
                      <Btn onClick={() => editor.chain().focus().deleteColumn().run()} title="Delete column">✕ Col</Btn>
                      <Btn onClick={() => editor.chain().focus().toggleHeaderRow().run()} title="Toggle header row">H Row</Btn>
                      <Btn onClick={() => editor.chain().focus().mergeOrSplit().run()} title="Merge / split cells">⊟ Merge</Btn>
                      <Btn onClick={() => editor.chain().focus().deleteTable().run()} title="Delete table">✕ Table</Btn>
                    </>
                  )}
                </Group>

                <Group label="Links">
                  <div className="relative">
                    <Btn onClick={() => { setShowLinkPopover(v => !v); setShowImagePopover(false); setShowSymbolPopover(false); setShowTablePopover(false); }} active={editor.isActive('link')} title="Insert hyperlink">⛓ Link</Btn>
                    {showLinkPopover && (
                      <Popover onClose={() => setShowLinkPopover(false)}>
                        <p className="mono-label mb-3">Select text first, then paste URL</p>
                        <input autoFocus type="url" placeholder="https://..." value={linkUrl}
                          onChange={e => setLinkUrl(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && insertLink()}
                          className="ed-input mb-3" />
                        <div className="flex gap-3 items-center">
                          <button onClick={insertLink} className="ed-btn ed-btn--solid">Insert</button>
                          {editor.isActive('link') && (
                            <button onClick={() => { editor.chain().focus().unsetLink().run(); setShowLinkPopover(false); }} className="mono-label hover:text-[var(--ink)]">Remove</button>
                          )}
                          <button onClick={() => setShowLinkPopover(false)} className="mono-label hover:text-[var(--ink)]">Cancel</button>
                        </div>
                      </Popover>
                    )}
                  </div>
                </Group>

                <Group label="Symbols">
                  <div className="relative">
                    <Btn onClick={() => { setShowSymbolPopover(v => !v); setShowImagePopover(false); setShowLinkPopover(false); setShowTablePopover(false); }} title="Insert special character">Ω Symbol</Btn>
                    {showSymbolPopover && (
                      <Popover onClose={() => setShowSymbolPopover(false)} wide>
                        <p className="mono-label mb-3">Special characters</p>
                        <div className="grid grid-cols-10 gap-1">
                          {SYMBOLS.map(s => (
                            <button
                              key={s}
                              onMouseDown={e => { e.preventDefault(); editor.chain().focus().insertContent(s).run(); }}
                              className="h-8 border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors text-sm"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </Popover>
                    )}
                  </div>
                </Group>

                <Group label="Blocks">
                  <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">" Quote</Btn>
                  <Btn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code block">{'{ }'} Code</Btn>
                  <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal divider">— Divider</Btn>
                  <Btn onClick={() => editor.chain().focus().setPageBreak().run()} title="Page break (affects PDF export)">⤈ Page break</Btn>
                </Group>
              </>
            )}

            {/* ---------- LAYOUT ---------- */}
            {activeTab === 'layout' && (
              <>
                <Group label="Page size">
                  <Select value={pageSize} onChange={e => setPageSize(e.target.value)} title="Page size">
                    <option value="a4">A4</option>
                    <option value="letter">Letter</option>
                  </Select>
                </Group>
                <Group label="Orientation">
                  <Btn onClick={() => setOrientation('portrait')} active={orientation === 'portrait'} title="Portrait">▯ Portrait</Btn>
                  <Btn onClick={() => setOrientation('landscape')} active={orientation === 'landscape'} title="Landscape">▭ Landscape</Btn>
                </Group>
                <Group label="Margins">
                  <Btn onClick={() => setMarginKey('narrow')} active={marginKey === 'narrow'} title="0.5 inch">Narrow</Btn>
                  <Btn onClick={() => setMarginKey('normal')} active={marginKey === 'normal'} title="1 inch">Normal</Btn>
                  <Btn onClick={() => setMarginKey('wide')} active={marginKey === 'wide'} title="1.5 inch">Wide</Btn>
                </Group>
                <Group label="Zoom">
                  <Select value={`${zoom}`} onChange={e => setZoom(+e.target.value)} title="Zoom level">
                    {[50, 75, 90, 100, 125, 150, 200].map(z => <option key={z} value={z}>{z}%</option>)}
                  </Select>
                </Group>
                <Group label="View">
                  <Btn onClick={() => setShowRuler(v => !v)} active={showRuler} title="Toggle ruler">📏 Ruler</Btn>
                </Group>
              </>
            )}
          </div>

          {/* Find & replace panel */}
          {showFind && (
            <div className="border-t border-[var(--line)] px-4 py-3 flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Find..."
                value={findText}
                onChange={e => { setFindText(e.target.value); setFindMsg(''); }}
                className="ed-input !w-56 !py-1.5"
              />
              <input
                type="text"
                placeholder="Replace with..."
                value={replaceText}
                onChange={e => setReplaceText(e.target.value)}
                className="ed-input !w-56 !py-1.5"
              />
              <button onClick={handleFindCount} className="ed-btn !py-1.5">Count</button>
              <button onClick={handleReplaceAll} className="ed-btn ed-btn--solid !py-1.5">Replace all</button>
              {findMsg && <span className="mono-label">{findMsg}</span>}
              <button onClick={() => setShowFind(false)} className="mono-label hover:text-[var(--ink)] ml-auto">✕ Close</button>
            </div>
          )}
        </div>

        {/* ===================== PAGE AREA ===================== */}
        <div className="editor-page-scroll pb-4" style={{ zoom: zoom / 100 }}>
          {showRuler && <Ruler width={pageW} margin={marginPx} />}

          <div
            onClick={() => editor.chain().focus().run()}
            className="mx-auto bg-[var(--panel)] border border-[var(--line)] shadow-2xl shadow-black/40 cursor-text"
            style={{ width: pageW, minHeight: pageH, padding: marginPx }}
          >
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Status bar */}
        <div className="border border-[var(--line)] bg-[var(--panel)] px-5 py-2.5 mt-2 flex flex-wrap items-center gap-x-6 gap-y-1">
          <span className="mono-label">{wordCount} words · {charCount} chars</span>
          <span className={`mono-label ${sizeWarn ? '!text-red-400' : ''}`}>
            {sizeKB} KB {sizeWarn ? '⚠ approaching 1MB Firestore limit' : ''} / 1024 KB
          </span>
          <span className="mono-label hidden sm:block">
            {pageSize.toUpperCase()} · {orientation} · {marginKey} margins
          </span>
          <span className="mono-label ml-auto">
            {savedStatus
              ? savedStatus === 'published' ? '● Live on /logs' : '○ Draft — not visible on /logs'
              : '○ Unsaved'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminEditor;
