import { useState } from 'react';
import { UploadCloud, CheckCircle, Database, GitBranch, Trash2, Calendar, FileImage } from 'lucide-react';
import { photos as initialPhotos } from '../../data/gallery';

export default function GalleryManager() {
  const [photos, setPhotos] = useState(initialPhotos);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [newImageMeta, setNewImageMeta] = useState({
    alt: '',
    category: 'General Camp',
    month: 'June',
    year: '2026'
  });

  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const triggerFileSelect = () => {
    const fileInput = document.getElementById('gallery-file-input');
    if (fileInput) fileInput.click();
  };

  const handleUploadSimulate = (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0 || !newImageMeta.alt) return;

    setUploading(true);
    setSuccessMsg('');

    // Simulate backend upload: compress -> webp conversion -> commit to GitHub -> firestore sync
    setTimeout(() => {
      const newUploadedPhotos = selectedFiles.map((file, index) => {
        return {
          id: Date.now() + index,
          src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600',
          alt: `${newImageMeta.alt} - Photo ${index + 1}`,
          category: newImageMeta.category,
          month: newImageMeta.month,
          year: newImageMeta.year
        };
      });

      setPhotos([...newUploadedPhotos, ...photos]);
      setUploading(false);
      setSuccessMsg(`Successfully compressed, committed ${selectedFiles.length} images to GitHub under "${newImageMeta.alt}", and indexed reference metadata in Firestore!`);
      setSelectedFiles([]);
      setNewImageMeta({ alt: '', category: 'General Camp', month: 'June', year: '2026' });
    }, 2000);
  };

  const handleDelete = (id) => {
    setPhotos(photos.filter(p => p.id !== id));
    setSuccessMsg('Image indexed reference removed from Firestore.');
  };

  return (
    <div className="space-y-8 font-inter">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h1 className="font-poppins font-extrabold text-2xl text-text-primary mb-1">
          GitHub Image Repository Sync
        </h1>
        <p className="text-xs text-text-secondary">
          Upload camp photos securely. Files are automatically converted to WebP format, resized, committed directly to your GitHub repo, and indexed in Firestore.
        </p>
      </div>

      {successMsg && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-100 text-green-700 px-4 py-3.5 rounded-2xl">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs font-semibold leading-none">{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Drag Drop Simulation */}
        <form onSubmit={handleUploadSimulate} className="lg:col-span-5 bg-white border border-border rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="font-poppins font-bold text-base text-text-primary flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-primary" />
            Upload Camp Photos
          </h2>

          {/* Hidden File Input */}
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            id="gallery-file-input"
            onChange={handleFileChange}
          />

          {/* Clickable Drag-Box */}
          <div
            onClick={triggerFileSelect}
            className="border-2 border-dashed border-border/70 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center bg-bg/20 cursor-pointer"
          >
            <UploadCloud className="w-10 h-10 text-text-secondary/50 mx-auto mb-2" />
            <span className="block text-xs font-semibold text-text-primary mb-1">
              Select image files to upload
            </span>
            <span className="block text-[10px] text-text-secondary/70">
              PNG, JPG, WEBP • Upload multiple at once
            </span>
          </div>

          {/* Display Selected Files Preview List */}
          {selectedFiles.length > 0 && (
            <div className="bg-bg/40 p-4 border border-border rounded-2xl space-y-2">
              <span className="text-[10px] font-bold text-text-secondary/70 uppercase tracking-wider block mb-1">
                Selected Files ({selectedFiles.length})
              </span>
              <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1 text-xs">
                {selectedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-text-primary font-semibold truncate bg-white p-2 border border-border/60 rounded-lg">
                    <FileImage className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="truncate flex-1 font-inter">{file.name}</span>
                    <span className="text-[9px] text-text-secondary/60">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-secondary/70 uppercase tracking-wider">
                Common Camp / Collection Label (e.g., Camp 54)
              </label>
              <input
                type="text"
                required
                value={newImageMeta.alt}
                onChange={(e) => setNewImageMeta({ ...newImageMeta, alt: e.target.value })}
                placeholder="e.g. Camp 54 Kalwakurthy"
                className="border border-border rounded-xl px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-inter"
              />
              <span className="text-[9px] text-text-secondary/50 font-inter">
                Uploaded images will be numbered automatically under this name (e.g. "Camp 54 - Photo 1")
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-secondary/70 uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={newImageMeta.category}
                  onChange={(e) => setNewImageMeta({ ...newImageMeta, category: e.target.value })}
                  className="border border-border rounded-xl px-3 py-2 text-xs bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-inter"
                >
                  <option value="General Camp">General Camp</option>
                  <option value="Eye Camp">Eye Camp</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Volunteers">Volunteers</option>
                  <option value="Community">Community</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-secondary/70 uppercase tracking-wider">
                  Camp Month
                </label>
                <select
                  value={newImageMeta.month}
                  onChange={(e) => setNewImageMeta({ ...newImageMeta, month: e.target.value })}
                  className="border border-border rounded-xl px-3 py-2 text-xs bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-inter"
                >
                  <option value="June">June</option>
                  <option value="May">May</option>
                  <option value="April">April</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading || selectedFiles.length === 0 || !newImageMeta.alt}
            className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold py-3 px-4 rounded-2xl transition-all duration-300 shadow-sm active:scale-[0.98] disabled:opacity-50 text-xs font-poppins"
          >
            {uploading ? 'Processing & Committing...' : `Commit ${selectedFiles.length} Uploads to GitHub`}
          </button>
        </form>

        {/* Right: Gallery Files List */}
        <div className="lg:col-span-7 bg-white border border-border rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="font-poppins font-bold text-base text-text-primary flex items-center gap-2">
            <Database className="w-5 h-5 text-accent" />
            GitHub Tree & Firestore Index
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-2">
            {photos.map((ph) => (
              <div key={ph.id} className="border border-border rounded-2xl p-3 flex gap-3 group relative hover:border-primary/30 transition-colors">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={ph.src} alt={ph.alt} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <span className="bg-bg text-primary text-[9px] font-bold px-2 py-0.5 rounded-md uppercase font-inter inline-block mb-1.5 border border-border/50">
                      {ph.category}
                    </span>
                    <p className="text-xs font-bold text-text-primary leading-snug line-clamp-2 mb-1" title={ph.alt}>
                      {ph.alt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="flex items-center gap-1 text-[10px] text-text-secondary/60 font-semibold font-inter">
                      <Calendar className="w-3.5 h-3.5" />
                      {ph.month} {ph.year}
                    </span>
                    <button
                      onClick={() => handleDelete(ph.id)}
                      className="p-1.5 text-text-secondary/40 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                      aria-label="Remove image link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Github indicator */}
                <div className="absolute top-2 right-2 bg-green-500/10 border border-green-500/20 text-green-600 p-1 rounded-md" title="Synced in GitHub">
                  <GitBranch className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
