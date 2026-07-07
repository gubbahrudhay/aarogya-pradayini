import { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle, Database, GitBranch, Trash2, Calendar, FileImage } from 'lucide-react';
import { db, isMock } from '../services/firebase';
import { collection, getDocs, addDoc, doc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { compressAndConvertToWebP } from '../utils/imageCompressor';
import { photos as initialPhotos } from '../../data/gallery';

export default function GalleryManager() {
  const [photos, setPhotos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [newImageMeta, setNewImageMeta] = useState({
    alt: '',
    category: 'General Camp',
    month: 'June',
    year: '2026'
  });

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    if (isMock) {
      const savedMock = localStorage.getItem('mock_gallery_photos');
      if (savedMock) {
        setPhotos(JSON.parse(savedMock));
      } else {
        setPhotos(initialPhotos);
        localStorage.setItem('mock_gallery_photos', JSON.stringify(initialPhotos));
      }
    } else {
      try {
        const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const list = [];
        querySnapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() });
        });
        // Append static initial photos at the end as fallback
        setPhotos([...list, ...initialPhotos]);
      } catch (err) {
        console.error('Error fetching gallery database index:', err);
        setPhotos(initialPhotos);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const triggerFileSelect = () => {
    const fileInput = document.getElementById('gallery-file-input');
    if (fileInput) fileInput.click();
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0 || !newImageMeta.alt) return;

    setUploading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const uploadedList = [];

      for (let index = 0; index < selectedFiles.length; index++) {
        const file = selectedFiles[index];
        
        // 1. Compress image to highly optimized WebP format client-side
        const base64WebP = await compressAndConvertToWebP(file);
        const cleanNameLabel = newImageMeta.alt.toLowerCase().replace(/[^a-z0-9]+/g, '_');
        const filename = `${cleanNameLabel}_${Date.now()}_${index + 1}.webp`;

        let imageUrl = '';

        if (isMock) {
          // Mock mode: use the compressed base64 local preview
          imageUrl = base64WebP;
        } else {
          // 2. Commit compressed image base64 directly to GitHub repository via serverless API
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              fileContent: base64WebP,
              filename,
              month: newImageMeta.month,
              year: newImageMeta.year
            })
          });

          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.error || 'Failed to upload image to GitHub repository');
          }
          imageUrl = result.url; // Git Raw / CDN URL returned
        }

        // 3. Save reference metadata object in Cloud Firestore
        const photoRecord = {
          src: imageUrl,
          alt: `${newImageMeta.alt} - Photo ${index + 1}`,
          category: newImageMeta.category,
          month: newImageMeta.month,
          year: newImageMeta.year,
          createdAt: isMock ? new Date().toISOString() : serverTimestamp()
        };

        if (isMock) {
          uploadedList.push({ id: `mock-img-${Date.now()}-${index}`, ...photoRecord });
        } else {
          const docRef = await addDoc(collection(db, 'gallery'), photoRecord);
          uploadedList.push({ id: docRef.id, ...photoRecord });
        }
      }

      const updatedPhotos = [...uploadedList, ...photos];
      if (isMock) {
        localStorage.setItem('mock_gallery_photos', JSON.stringify(updatedPhotos));
      }
      
      setPhotos(updatedPhotos);
      setSuccessMsg(
        isMock
          ? `[Mock Sandbox] Successfully compressed and registered ${selectedFiles.length} photos!`
          : `Successfully compressed, committed ${selectedFiles.length} images to GitHub repo, and indexed in Firestore database!`
      );
      setSelectedFiles([]);
      setNewImageMeta({ alt: '', category: 'General Camp', month: 'June', year: '2026' });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during file upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm('Are you sure you want to remove this photo?')) return;
    setSuccessMsg('');
    setErrorMsg('');

    if (isMock) {
      const updated = photos.filter(p => p.id !== item.id);
      localStorage.setItem('mock_gallery_photos', JSON.stringify(updated));
      setPhotos(updated);
      setSuccessMsg('Photo reference removed from local mock database.');
    } else {
      try {
        if (typeof item.id === 'string' && !item.id.startsWith('mock')) {
          await deleteDoc(doc(db, 'gallery', item.id));
        }
        setPhotos(photos.filter(p => p.id !== item.id));
        setSuccessMsg('Photo index reference successfully deleted from Firestore.');
      } catch (err) {
        console.error('Delete error:', err);
        setErrorMsg('Failed to delete photo index from Firestore.');
      }
    }
  };

  return (
    <div className="space-y-8 font-inter">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h1 className="font-poppins font-extrabold text-2xl text-text-primary mb-1">
          GitHub Image Repository Sync
        </h1>
        <p className="text-xs text-text-secondary">
          Upload camp photos securely. Files are automatically compressed client-side, converted to WebP format, committed directly to your GitHub repo, and indexed in Firestore.
        </p>
      </div>

      {successMsg && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-100 text-green-700 px-4 py-3.5 rounded-2xl">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs font-semibold leading-none">{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 px-4 py-3.5 rounded-2xl">
          <span className="text-xs font-semibold leading-none">{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Drag Drop Simulation */}
        <form onSubmit={handleUpload} className="lg:col-span-5 bg-white border border-border rounded-3xl p-6 shadow-sm space-y-4">
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
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
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
                      type="button"
                      onClick={() => handleDelete(ph)}
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
