import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Save, CheckCircle, PlusCircle, Trash2, Edit, Eye } from 'lucide-react';
import { blogs as initialBlogs } from '../../data/blogs';

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
                  onClick={() => setEditingBlog(null)}
                  className="bg-white border border-border text-text-secondary hover:bg-bg px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave(false)}
                  disabled={loading || !editorState.title}
                  className="bg-white border border-border text-text-primary hover:bg-bg px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5 text-text-secondary" />
                  Save Draft
                </button>
                <button
                  onClick={() => handleSave(true)}
                  disabled={loading || !editorState.title}
                  className="bg-primary hover:bg-primary/95 text-white px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Publish Now
                </button>
              </div>
            </div>

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
