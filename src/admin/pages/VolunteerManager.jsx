import { useState, useEffect } from 'react';
import { db, isMock } from '../services/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { HeartHandshake, CheckCircle, Trash2, Calendar, Phone, Mail, FileText, ArrowRight } from 'lucide-react';

const mockSignups = [
  { id: 'mock-1', name: 'Rohan Sharma', email: 'rohan.sharma@gmail.com', phone: '+91 98480 22338', role: 'student', message: 'I am a final year medical student at Gandhi Medical College. Want to volunteer as an assistant.', status: 'pending', createdAt: '2026-07-06T10:00:00Z' },
  { id: 'mock-2', name: 'Dr. Srinivas Rao', email: 'srinivas.med@yahoo.com', phone: '+91 94405 12044', role: 'doctor', message: 'General physician willing to consult patients during the Sunday camps.', status: 'contacted', createdAt: '2026-07-05T08:30:00Z' },
  { id: 'mock-3', name: 'V. Latha', email: 'latha.sevadal@gmail.com', phone: '+91 80088 12345', role: 'general', message: 'Volunteered in other Sevadal medical camps. Happy to manage patient lines and registrations.', status: 'pending', createdAt: '2026-07-02T14:15:00Z' }
];

export default function VolunteerManager() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('All');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    setLoading(true);
    if (isMock) {
      const mockListObj = localStorage.getItem('mock_volunteers');
      let list = mockListObj ? JSON.parse(mockListObj) : [];
      if (list.length === 0) {
        list = mockSignups;
        localStorage.setItem('mock_volunteers', JSON.stringify(list));
      }
      // Sort newest first
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setVolunteers(list);
      setLoading(false);
    } else {
      try {
        const q = query(collection(db, 'volunteers'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const list = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          list.push({
            id: doc.id,
            ...data,
            // Fallback for timestamp format
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString()
          });
        });
        setVolunteers(list);
      } catch (err) {
        console.error('Error fetching volunteer data:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleStatus = async (item) => {
    setSuccessMsg('');
    const newStatus = item.status === 'pending' ? 'contacted' : 'pending';

    if (isMock) {
      const updated = volunteers.map(v => v.id === item.id ? { ...v, status: newStatus } : v);
      localStorage.setItem('mock_volunteers', JSON.stringify(updated));
      setVolunteers(updated);
      setSuccessMsg(`Status updated to ${newStatus.toUpperCase()}!`);
    } else {
      try {
        const docRef = doc(db, 'volunteers', item.id);
        await updateDoc(docRef, { status: newStatus });
        setVolunteers(volunteers.map(v => v.id === item.id ? { ...v, status: newStatus } : v));
        setSuccessMsg(`Status updated to ${newStatus.toUpperCase()}!`);
      } catch (err) {
        console.error('Failed to update status:', err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this signup reference?')) return;
    setSuccessMsg('');

    if (isMock) {
      const updated = volunteers.filter(v => v.id !== id);
      localStorage.setItem('mock_volunteers', JSON.stringify(updated));
      setVolunteers(updated);
      setSuccessMsg('Volunteer application removed.');
    } else {
      try {
        await deleteDoc(doc(db, 'volunteers', id));
        setVolunteers(volunteers.filter(v => v.id !== id));
        setSuccessMsg('Volunteer application removed.');
      } catch (err) {
        console.error('Failed to delete application:', err);
      }
    }
  };

  const filteredVolunteers = volunteers.filter(v => {
    return roleFilter === 'All' || v.role === roleFilter;
  });

  return (
    <div className="space-y-8 font-inter">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h1 className="font-poppins font-extrabold text-2xl text-text-primary mb-1 flex items-center gap-2">
          <HeartHandshake className="w-6 h-6 text-primary" />
          Volunteer Registrations
        </h1>
        <p className="text-xs text-text-secondary">
          Review and coordinate volunteer signups from the public website page. Support doctors, paramedics, students, and general sevadals.
        </p>
      </div>

      {successMsg && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-100 text-green-700 px-4 py-3.5 rounded-2xl">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs font-semibold leading-none">{successMsg}</span>
        </div>
      )}

      {/* Filters & Count bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 border border-border rounded-2xl shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-text-secondary/70 uppercase tracking-wider">Filter Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-bg border border-border/80 rounded-xl px-3 py-1.5 text-xs font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="All">All Roles</option>
            <option value="doctor">Medical Doctor</option>
            <option value="nurse">Nurse / Paramedic</option>
            <option value="student">Medical Student</option>
            <option value="general">General Volunteer</option>
          </select>
        </div>
        <span className="text-xs font-bold text-text-secondary/70 font-inter">
          Total Found: <strong className="text-primary">{filteredVolunteers.length}</strong>
        </span>
      </div>

      {/* Main List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white border border-border rounded-3xl">
          <div className="w-8 h-8 rounded-full border-3 border-primary border-t-transparent animate-spin mb-3" />
          <p className="text-xs text-text-secondary font-inter">Retrieving registrations...</p>
        </div>
      ) : filteredVolunteers.length === 0 ? (
        <div className="bg-white border border-border rounded-3xl p-12 text-center">
          <HeartHandshake className="w-12 h-12 text-text-secondary/35 mx-auto mb-3" />
          <p className="text-sm text-text-secondary font-medium font-inter max-w-xs mx-auto">
            No volunteer applications found matching the selected filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredVolunteers.map((vol) => (
            <div
              key={vol.id}
              className={`bg-white border rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-card transition-shadow duration-300 relative overflow-hidden ${
                vol.status === 'contacted' ? 'border-border' : 'border-primary/20'
              }`}
            >
              {/* Highlight bar for pending */}
              {vol.status === 'pending' && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary/45" />
              )}

              {/* Top Row: User & Role Badge */}
              <div className="flex justify-between items-start gap-4 mb-4">
                <div>
                  <h3 className="font-poppins font-bold text-base text-text-primary mb-1">
                    {vol.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full uppercase tracking-wider font-inter">
                    {vol.role === 'general' ? 'General Helper' : vol.role}
                  </span>
                </div>
                <button
                  onClick={() => handleToggleStatus(vol)}
                  className={`text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-inter border transition-colors ${
                    vol.status === 'contacted'
                      ? 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100'
                      : 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100'
                  }`}
                >
                  {vol.status}
                </button>
              </div>

              {/* Message block */}
              <p className="text-xs text-text-secondary font-inter leading-relaxed mb-6 bg-bg/40 p-4 border border-border/40 rounded-2xl italic">
                "{vol.message || 'No remarks provided.'}"
              </p>

              {/* Contact info row */}
              <div className="border-t border-border pt-4 mt-auto flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${vol.email}`}
                    className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-primary transition-colors font-inter"
                  >
                    <Mail className="w-3.5 h-3.5 text-text-secondary/60" />
                    Email
                  </a>
                  <a
                    href={`tel:${vol.phone}`}
                    className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-primary transition-colors font-inter"
                  >
                    <Phone className="w-3.5 h-3.5 text-text-secondary/60" />
                    Call
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[10px] text-text-secondary/60 font-semibold font-inter">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(vol.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <button
                    onClick={() => handleDelete(vol.id)}
                    className="p-1.5 text-text-secondary/30 hover:text-red-500 hover:bg-red-50 border border-border rounded-xl transition-colors"
                    title="Remove signup"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
