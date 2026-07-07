import { useState } from 'react';
import { Users, Plus, ShieldAlert, Trash2, ShieldCheck, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function UserManager() {
  const { role } = useAuth();
  const [successMsg, setSuccessMsg] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('editor');

  const [adminsList, setAdminsList] = useState([
    { email: 'admin@sai.org', role: 'super-admin', dateAdded: 'June 1, 2026' },
    { email: 'editor@sai.org', role: 'editor', dateAdded: 'June 5, 2026' },
    { email: 'volunteer@sai.org', role: 'volunteer', dateAdded: 'July 1, 2026' }
  ]);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newEmail) return;

    if (adminsList.some(a => a.email.toLowerCase() === newEmail.toLowerCase())) {
      alert('Email is already whitelisted!');
      return;
    }

    const newUserObj = {
      email: newEmail.toLowerCase().trim(),
      role: newRole,
      dateAdded: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    setAdminsList([...adminsList, newUserObj]);
    setSuccessMsg(`Account "${newEmail}" whitelisted successfully as ${newRole.toUpperCase()}!`);
    setNewEmail('');
  };

  const handleDeleteUser = (email) => {
    if (email === 'admin@sai.org') {
      alert('Cannot delete root super-admin account!');
      return;
    }
    setAdminsList(adminsList.filter(a => a.email !== email));
    setSuccessMsg('Account access permission revoked.');
  };

  const handleRoleChange = (email, selectedRole) => {
    setAdminsList(adminsList.map(a => a.email === email ? { ...a, role: selectedRole } : a));
    setSuccessMsg(`Updated permission role for ${email} to ${selectedRole.toUpperCase()}.`);
  };

  return (
    <div className="space-y-8 font-inter">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h1 className="font-poppins font-extrabold text-2xl text-text-primary mb-1 flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          Whitelisted Admins
        </h1>
        <p className="text-xs text-text-secondary">
          Configure email accounts allowed to log in via Google Auth. Assign precise access levels (Super Admin, Editor, Volunteer).
        </p>
      </div>

      {successMsg && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-100 text-green-700 px-4 py-3.5 rounded-2xl">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs font-semibold leading-none">{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Whitelist Add Form */}
        <form onSubmit={handleAddUser} className="lg:col-span-5 bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="font-poppins font-bold text-base text-text-primary flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" />
            Whitelist Email
          </h2>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-text-secondary/70 uppercase tracking-wider">
              Google Account Email
            </label>
            <input
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="e.g. member@gmail.com"
              className="border border-border rounded-xl px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-inter"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-text-secondary/70 uppercase tracking-wider">
              Assigned Role
            </label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="border border-border bg-white rounded-xl px-3 py-2.5 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-inter"
            >
              <option value="editor">Editor (Create, AI Parse, Draft)</option>
              <option value="volunteer">Volunteer (Upload Photos, Read)</option>
              <option value="super-admin">Super Admin (All Permissions)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!newEmail}
            className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold py-3 px-4 rounded-2xl transition-all duration-300 shadow-sm active:scale-[0.98] disabled:opacity-50 text-xs font-poppins"
          >
            Add Whitelist Account
          </button>
        </form>

        {/* Right: List Whitelisted Admins */}
        <div className="lg:col-span-7 bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 overflow-hidden">
          <h2 className="font-poppins font-bold text-base text-text-primary flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-accent" />
            Whitelisted Credentials
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/80 pb-3 text-[10px] font-bold text-text-secondary/60 uppercase tracking-wider font-inter">
                  <th className="pb-3 pr-4">Google Email</th>
                  <th className="pb-3 px-4">Role Tier</th>
                  <th className="pb-3 pl-4 text-right">Revoke</th>
                </tr>
              </thead>
              <tbody>
                {adminsList.map((admin) => (
                  <tr key={admin.email} className="border-b border-border/40 text-xs text-text-primary font-inter last:border-b-0 hover:bg-bg/25 transition-colors">
                    <td className="py-3.5 pr-4 max-w-[150px] truncate font-semibold" title={admin.email}>
                      {admin.email}
                    </td>
                    <td className="py-3.5 px-4">
                      {admin.email === 'admin@sai.org' ? (
                        <span className="text-[10px] font-bold text-accent uppercase bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-md">
                          Super Admin
                        </span>
                      ) : (
                        <select
                          value={admin.role}
                          onChange={(e) => handleRoleChange(admin.email, e.target.value)}
                          className="bg-transparent text-text-primary border border-border/60 hover:border-primary/50 rounded-lg px-2 py-1 text-[11px] font-semibold focus:outline-none"
                        >
                          <option value="super-admin">Super Admin</option>
                          <option value="editor">Editor</option>
                          <option value="volunteer">Volunteer</option>
                        </select>
                      )}
                    </td>
                    <td className="py-3.5 pl-4 text-right">
                      {admin.email !== 'admin@sai.org' && (
                        <button
                          onClick={() => handleDeleteUser(admin.email)}
                          className="p-1.5 text-text-secondary/40 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                          title="Revoke access whitelist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
