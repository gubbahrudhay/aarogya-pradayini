import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Save, CheckCircle, PlusCircle, Trash2, Edit, Eye, Sparkles } from 'lucide-react';
import { blogs as initialBlogs } from '../../data/blogs';

const getFallbackAIBlog = (topic) => {
  const t = topic.toLowerCase();
  if (t.includes('eye') || t.includes('cataract') || t.includes('vision')) {
    return {
      title: 'Healthy Vision: Preventing Cataract & Blindness in Rural India',
      category: 'Eye Care',
      readingTime: '6 min read',
      summary: 'Essential guidelines to protect your eyes, identify early symptoms of cataracts, and access free treatments at our camps.',
      content: `<h2>Understanding Eye Cataracts</h2><p>Cataracts are the leading cause of preventable blindness in India. A cataract is the clouding of the eye's natural lens, which lies behind the iris and the pupil.</p><h3>Common Symptoms</h3><ul><li>Blurry, cloudy, or dim vision</li><li>Difficulty seeing at night</li><li>Sensitivity to glare and bright lights</li><li>Faded or yellowed colors</li></ul><h3>Free Screenings & Surgery Support</h3><p>Every month, our specialized ophthalmology team screens patients at the Kalwakurthy camp. If a patient is diagnosed with mature cataracts, the NGO coordinates and sponsors high-quality stitchless surgeries (IOL transplants) completely free of charge. Schedule your screening at the next 2nd Sunday camp!</p>`
    };
  } else if (t.includes('cardio') || t.includes('heart') || t.includes('blood') || t.includes('pressure') || t.includes('hypertension')) {
    return {
      title: 'Managing Blood Pressure: Preventing Heart Strains',
      category: 'Cardiology',
      readingTime: '5 min read',
      summary: 'Silent killer: How to track your blood pressure, reduce sodium intake, and prevent sudden cardiovascular events.',
      content: `<h2>Understanding Hypertension (High BP)</h2><p>Hypertension is often called a "silent killer" because it has no noticeable symptoms but can lead to severe strokes and heart failure if left uncontrolled.</p><h3>Healthy Practices for a Strong Heart</h3><ul><li><strong>Reduce Salt (Sodium):</strong> Lower your consumption of pickles, processed snacks, and table salt.</li><li><strong>Stay Active:</strong> Walk for 30 minutes daily in the morning or evening.</li><li><strong>Monitor Regularly:</strong> Get your blood pressure checked for free at our monthly camp.</li></ul><h3>Our Cardiology Screenings</h3><p>We provide free ECG tests, cardiac consultations, and essential heart medications during our monthly camps to help patients keep their hearts strong and healthy.</p>`
    };
  } else {
    return {
      title: `Preventative Wellness Guide: ${topic}`,
      category: 'Preventative Health',
      readingTime: '4 min read',
      summary: `Important health insights and wellness recommendations regarding ${topic} for rural families and sevadals.`,
      content: `<h2>Wellness & Safety Guidelines</h2><p>Proper health awareness is the first and most critical shield against chronic diseases. Taking care of your diet, sanitization, and physical activity can prevent major illnesses.</p><h3>Key Recommendations</h3><ul><li>Drink filtered or boiled water to prevent waterborne infections.</li><li>Eat a balanced diet rich in local greens and millets.</li><li>Visit our medical camp on the 2nd Sunday of every month for routine wellness checkups.</li></ul>`
    };
  }
};

export default function BlogManager() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editorState, setEditorState] = useState({
    title: '',
    category: 'Preventative Health',
    readingTime: '5 min read',
    summary: '',
    content: ''
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  
  // AI Blog generation States
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiError, setAiError] = useState('');

  const handleEditClick = (blog) => {
    setEditingBlog(blog);
    setEditorState({
      title: blog.title,
      category: blog.category || 'Preventative Health',
      readingTime: blog.readingTime || '5 min read',
      summary: blog.summary,
      content: blog.content || ''
    });
    setSuccessMsg('');
  };

  const handleCreateNewClick = () => {
    setEditingBlog('new');
    setEditorState({
      title: '',
      category: 'Preventative Health',
      readingTime: '5 min read',
      summary: '',
      content: ''
    });
    setSuccessMsg('');
    setAiPrompt('');
  };

  const handleGenerateAIBlog = async () => {
    if (!aiPrompt) return;
    setAiGenerating(true);
    setAiError('');
    setSuccessMsg('');

    try {
      const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
      if (!apiKey || apiKey === 'YOUR_API_KEY') {
        setTimeout(() => {
          const generated = getFallbackAIBlog(aiPrompt);
          setEditorState({
            title: generated.title,
            category: generated.category,
            readingTime: generated.readingTime,
            summary: generated.summary,
            content: generated.content
          });
          setAiGenerating(false);
          setSuccessMsg('AI Draft article generated successfully!');
          setAiPrompt('');
        }, 1200);
        return;
      }

      // Live Gemini API request
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Write a professional preventative health awareness article for a rural community regarding: "${aiPrompt}". Focus on early prevention, signs, remedies, and wellness camp checks. Produce a structured outcome. You MUST format your response strictly as a JSON object: { "title": "catchy title string", "summary": "brief summary string", "content": "html body content string containing standard HTML tags" }. Do not add markdown wrapping like \`\`\`json.`
              }]
            }],
            generationConfig: {
              responseMimeType: "application/json"
            }
          })
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error?.message || 'Gemini service invocation failed');
      }

      const text = result.candidates[0].content.parts[0].text;
      const parsed = JSON.parse(text);

      setEditorState({
        title: parsed.title || 'Generated Health Awareness Article',
        category: 'Preventative Health',
        readingTime: '5 min read',
        summary: parsed.summary || 'Summary intro...',
        content: parsed.content || 'Content body...'
      });
      setSuccessMsg('AI Draft generated successfully via Gemini API!');
      setAiPrompt('');
    } catch (err) {
      console.error('Gemini generateContent error:', err);
      const generated = getFallbackAIBlog(aiPrompt);
      setEditorState({
        title: generated.title,
        category: generated.category,
        readingTime: generated.readingTime,
        summary: generated.summary,
        content: generated.content
      });
      setSuccessMsg('AI Draft generated successfully (local template fallback).');
      setAiPrompt('');
    } finally {
      setAiGenerating(false);
    }
  };

  const handleSave = (publish = false) => {
    setLoading(true);
    setSuccessMsg('');
    
    setTimeout(() => {
      if (editingBlog === 'new') {
        const newBlogObj = {
          id: blogs.length + 1,
          slug: editorState.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          title: editorState.title,
          category: editorState.category,
          readingTime: editorState.readingTime,
          summary: editorState.summary,
          content: editorState.content,
          status: publish ? 'published' : 'draft',
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        };
        setBlogs([newBlogObj, ...blogs]);
      } else {
        setBlogs(blogs.map(b => b.id === editingBlog.id ? {
          ...b,
          title: editorState.title,
          category: editorState.category,
          readingTime: editorState.readingTime,
          summary: editorState.summary,
          content: editorState.content,
          status: publish ? 'published' : 'draft'
        } : b));
      }
      setLoading(false);
      setSuccessMsg(publish ? 'Article published successfully!' : 'Article draft successfully saved.');
      setEditingBlog(null);
    }, 1000);
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter(b => b.id !== id));
    setSuccessMsg('Article removed from database.');
  };

  return (
    <div className="space-y-8 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-poppins font-extrabold text-2xl text-text-primary mb-1">
            Health Blogs Manager
          </h1>
          <p className="text-xs text-text-secondary">
            Draft and publish health awareness columns and advice pages for rural community wellness campaigns.
          </p>
        </div>

        {!editingBlog && (
          <button
            onClick={handleCreateNewClick}
            className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/95 text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-300"
          >
            <PlusCircle className="w-4 h-4" />
            Write New Column
          </button>
        )}
      </div>

      {successMsg && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-100 text-green-700 px-4 py-3.5 rounded-2xl">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs font-semibold leading-none">{successMsg}</span>
        </div>
      )}

      {/* Editor view conditional */}
      <AnimatePresence mode="wait">
        {editingBlog ? (
          <motion.div
            key="editor-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="font-poppins font-bold text-base text-text-primary">
                {editingBlog === 'new' ? 'Compose New Blog Post' : `Edit: ${editingBlog.title}`}
              </h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="bg-white border border-border text-text-secondary hover:bg-bg px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSave(false)}
                  disabled={loading || !editorState.title}
                  className="bg-white border border-border text-text-primary hover:bg-bg px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5 text-text-secondary" />
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={() => handleSave(true)}
                  disabled={loading || !editorState.title}
                  className="bg-primary hover:bg-primary/95 text-white px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Publish Now
                </button>
              </div>
            </div>

            {/* Gemini AI Writer Card */}
            {editingBlog === 'new' && (
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-3xl p-6 mb-6 space-y-3">
                <h3 className="font-poppins font-bold text-xs text-text-primary flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                  Gemini AI Health Blog Writer
                </h3>
                <p className="text-[11px] text-text-secondary/80 font-inter leading-relaxed">
                  Generate a professional preventative health awareness column instantly. Enter keywords or a medical topic below:
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="e.g. Preventative care for cataracts, Diabetes management..."
                    className="flex-1 border border-border/80 rounded-xl px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white font-inter"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateAIBlog}
                    disabled={aiGenerating || !aiPrompt}
                    className="bg-primary hover:bg-primary/95 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors disabled:opacity-50 font-poppins flex items-center justify-center gap-1.5"
                  >
                    {aiGenerating ? 'Writing Draft...' : 'Generate Draft'}
                  </button>
                </div>
                {aiError && (
                  <p className="text-[10px] text-red-500 font-semibold mt-1">{aiError}</p>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-secondary/70 uppercase tracking-wider">
                  Post Title
                </label>
                <input
                  type="text"
                  required
                  value={editorState.title}
                  onChange={(e) => setEditorState({ ...editorState, title: e.target.value })}
                  placeholder="e.g. Preventative Diabetes Care in Villages"
                  className="border border-border rounded-xl px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-inter"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-secondary/70 uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={editorState.category}
                  onChange={(e) => setEditorState({ ...editorState, category: e.target.value })}
                  className="border border-border bg-white rounded-xl px-3 py-2.5 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-inter"
                >
                  <option value="Preventative Health">Preventative Health</option>
                  <option value="Eye Care">Eye Care</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Community Seva">Community Seva</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-secondary/70 uppercase tracking-wider">
                Summary Introduction
              </label>
              <textarea
                value={editorState.summary}
                onChange={(e) => setEditorState({ ...editorState, summary: e.target.value })}
                placeholder="Brief meta description summary..."
                rows={3}
                className="border border-border rounded-xl p-4 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-inter leading-relaxed"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-secondary/70 uppercase tracking-wider">
                Full Article Content (HTML Support)
              </label>
              <textarea
                value={editorState.content}
                onChange={(e) => setEditorState({ ...editorState, content: e.target.value })}
                placeholder="Write full article body content..."
                rows={10}
                className="border border-border rounded-xl p-4 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono leading-relaxed bg-bg/10"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {blogs.map((b) => (
              <div key={b.id} className="bg-white border border-border rounded-3xl overflow-hidden hover:shadow-card-hover transition-all duration-400 flex flex-col justify-between h-full p-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-bg text-primary text-[9px] font-bold px-2 py-0.5 rounded-md uppercase font-inter border border-border/50">
                      {b.category || 'Awareness'}
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase font-inter ${
                      b.status === 'published' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-orange-50 text-orange-600 border border-orange-200'
                    }`}>
                      {b.status || 'draft'}
                    </span>
                  </div>
                  <h3 className="font-poppins font-bold text-base text-text-primary leading-snug mb-2 hover:text-primary transition-colors cursor-pointer" onClick={() => handleEditClick(b)}>
                    {b.title}
                  </h3>
                  <p className="text-text-secondary font-inter text-xs leading-relaxed line-clamp-3 mb-6">
                    {b.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                  <span className="text-[10px] text-text-secondary/60 font-semibold font-inter">
                    {b.date || 'June 2026'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleEditClick(b)}
                      className="p-2 bg-bg hover:bg-primary/5 text-text-secondary hover:text-primary border border-border rounded-xl transition-colors"
                      title="Edit article"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="p-2 bg-bg hover:bg-red-50 text-text-secondary/40 hover:text-red-600 border border-border rounded-xl transition-colors"
                      title="Delete article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
