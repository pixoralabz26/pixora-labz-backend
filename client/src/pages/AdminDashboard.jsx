import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layers, Users, LogOut, FileText, Save, Globe, Smartphone, Server, TrendingUp } from 'lucide-react';
import { DEFAULTS } from '../hooks/useContent';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ─── Sidebar ─────────────────────────────────────────────
const Sidebar = ({ active, setActive, onLogout, onRotateKey }) => {
  const items = [
    { id: 'content', label: 'Site Content', Icon: FileText },
    { id: 'projects', label: 'Projects', Icon: Layers },
    { id: 'team', label: 'Team Members', Icon: Users },
  ];

  return (
    <aside style={{ width: '260px', height: '100vh', background: '#111', color: 'white', display: 'flex', flexDirection: 'column', padding: '1.5rem', position: 'fixed', top: 0, left: 0, overflowY: 'auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <img src="/logo-black.png" alt="Pixora Labz" style={{ height: '26px', filter: 'invert(1)', mixBlendMode: 'normal' }} />
        <span style={{ display: 'block', marginTop: '2px', fontWeight: 700, fontSize: '0.88rem', color: 'white', letterSpacing: '-0.01em' }}>Pixora Labz</span>
        <p style={{ fontSize: '0.7rem', color: '#555', marginTop: '0.25rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Admin Dashboard</p>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {items.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '10px', background: active === item.id ? 'rgba(255,255,255,0.1)' : 'transparent', color: active === item.id ? 'white' : '#888', fontWeight: active === item.id ? 600 : 400, fontSize: '0.92rem', textAlign: 'left', transition: 'all 0.2s', border: 'none', cursor: 'pointer', width: '100%', fontFamily: 'inherit' }}>
            <item.Icon size={17} strokeWidth={2} /> {item.label}
          </button>
        ))}
      </nav>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <button onClick={onRotateKey}
          style={{ padding: '0.65rem 1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', color: '#ccc', fontWeight: 600, fontSize: '0.82rem', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'inherit' }}>
          <Server size={14} strokeWidth={2} /> Rotate Keys
        </button>
        <button onClick={onLogout}
          style={{ padding: '0.65rem 1rem', borderRadius: '10px', background: 'rgba(255,59,48,0.15)', color: '#ff6b6b', fontWeight: 600, fontSize: '0.88rem', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'inherit' }}>
          <LogOut size={16} strokeWidth={2} /> Log Out
        </button>
      </div>
    </aside>
  );
};

// ─── Content Editor ──────────────────────────────────────
const ContentEditor = ({ apiFetch }) => {
  const [content, setContent] = useState({});
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/content`)
      .then(r => r.json())
      .then(data => setContent({ ...DEFAULTS, ...data }))
      .catch(() => setContent({ ...DEFAULTS }));
  }, []);

  const update = (key, val) => setContent(c => ({ ...c, [key]: val }));

  const save = async () => {
    setSaving(true); setSaved(false); setError('');
    try {
      const res = await apiFetch(`${BACKEND_URL}/api/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
      else setError('Save failed — check auth.');
    } catch { setError('Network error.'); }
    setSaving(false);
  };

  const S = { input: { width: '100%', padding: '0.8rem 1rem', border: '1.5px solid #e8e8ec', borderRadius: '10px', fontSize: '0.93rem', fontFamily: 'inherit', background: '#fafafa', marginBottom: 0 }, label: { fontSize: '0.8rem', fontWeight: 600, color: '#666', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }, group: { marginBottom: '1.25rem' }, section: { background: 'white', border: '1px solid #e8e8ec', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: '2rem' }, heading: { fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', color: '#111', display: 'flex', alignItems: 'center', gap: '0.5rem' } };

  return (
    <div>
      {/* Save bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          {saved && <span style={{ color: '#16a34a', fontWeight: 600, fontSize: '0.9rem' }}>✓ Changes saved successfully</span>}
          {error && <span style={{ color: '#dc2626', fontWeight: 600, fontSize: '0.9rem' }}>{error}</span>}
        </div>
        <button onClick={save} disabled={saving}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.75rem', background: '#111', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.92rem', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, fontFamily: 'inherit' }}>
          <Save size={16} /> {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      {/* ── Home Page ── */}
      <div style={S.section}>
        <h3 style={S.heading}><Globe size={18} /> Home Page</h3>

        <div style={S.group}>
          <label style={S.label}>Badge Text</label>
          <input style={S.input} value={content.home_badge || ''} onChange={e => update('home_badge', e.target.value)} />
        </div>
        <div style={S.group}>
          <label style={S.label}>Hero Title (use \n for line breaks)</label>
          <textarea rows={3} style={{ ...S.input, resize: 'vertical', padding: '0.8rem 1rem' }} value={content.home_hero_title || ''} onChange={e => update('home_hero_title', e.target.value)} />
        </div>
        <div style={S.group}>
          <label style={S.label}>Hero Subtitle</label>
          <textarea rows={3} style={{ ...S.input, resize: 'vertical', padding: '0.8rem 1rem' }} value={content.home_hero_subtitle || ''} onChange={e => update('home_hero_subtitle', e.target.value)} />
        </div>

        <p style={{ ...S.label, marginBottom: '1rem', color: '#888' }}>Stats Section</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ background: '#f5f5f7', borderRadius: '10px', padding: '1rem' }}>
              <div style={S.group}>
                <label style={S.label}>Stat {i} — Number</label>
                <input style={S.input} value={content[`home_stat${i}_num`] || ''} onChange={e => update(`home_stat${i}_num`, e.target.value)} />
              </div>
              <div style={{ ...S.group, marginBottom: 0 }}>
                <label style={S.label}>Stat {i} — Label</label>
                <input style={S.input} value={content[`home_stat${i}_label`] || ''} onChange={e => update(`home_stat${i}_label`, e.target.value)} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ ...S.group, marginTop: '1.25rem' }}>
          <label style={S.label}>CTA Banner Title</label>
          <textarea rows={2} style={{ ...S.input, resize: 'vertical', padding: '0.8rem 1rem' }} value={content.home_cta_title || ''} onChange={e => update('home_cta_title', e.target.value)} />
        </div>
        <div style={{ ...S.group, marginBottom: 0 }}>
          <label style={S.label}>CTA Banner Subtitle</label>
          <input style={S.input} value={content.home_cta_subtitle || ''} onChange={e => update('home_cta_subtitle', e.target.value)} />
        </div>
      </div>

      {/* ── Services Page ── */}
      <div style={S.section}>
        <h3 style={S.heading}><Server size={18} /> Services Page</h3>
        <div style={S.group}>
          <label style={S.label}>Page Hero Title</label>
          <textarea rows={2} style={{ ...S.input, resize: 'vertical', padding: '0.8rem 1rem' }} value={content.services_hero_title || ''} onChange={e => update('services_hero_title', e.target.value)} />
        </div>
        <div style={{ ...S.group, marginBottom: 0 }}>
          <label style={S.label}>Page Hero Subtitle</label>
          <textarea rows={2} style={{ ...S.input, resize: 'vertical', padding: '0.8rem 1rem' }} value={content.services_hero_subtitle || ''} onChange={e => update('services_hero_subtitle', e.target.value)} />
        </div>
      </div>

      {/* ── Contact Page ── */}
      <div style={{ ...S.section, marginBottom: 0 }}>
        <h3 style={S.heading}><Smartphone size={18} /> Contact Page</h3>
        <div style={S.group}>
          <label style={S.label}>Page Hero Title</label>
          <textarea rows={2} style={{ ...S.input, resize: 'vertical', padding: '0.8rem 1rem' }} value={content.contact_hero_title || ''} onChange={e => update('contact_hero_title', e.target.value)} />
        </div>
        <div style={S.group}>
          <label style={S.label}>Page Hero Subtitle</label>
          <textarea rows={2} style={{ ...S.input, resize: 'vertical', padding: '0.8rem 1rem' }} value={content.contact_hero_subtitle || ''} onChange={e => update('contact_hero_subtitle', e.target.value)} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={S.label}>Email</label>
            <input style={S.input} value={content.contact_email || ''} onChange={e => update('contact_email', e.target.value)} />
          </div>
          <div>
            <label style={S.label}>Response Time</label>
            <input style={S.input} value={content.contact_response_time || ''} onChange={e => update('contact_response_time', e.target.value)} />
          </div>
          <div>
            <label style={S.label}>Location</label>
            <input style={S.input} value={content.contact_location || ''} onChange={e => update('contact_location', e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Admin ───────────────────────────────────────────
const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [activeView, setActiveView] = useState('content');

  const [projectData, setProjectData] = useState({ title: '', description: '' });
  const [projectFile, setProjectFile] = useState(null);
  const [teamData, setTeamData] = useState({ name: '', role: '', about: '' });
  const [teamFile, setTeamFile] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('adminToken');
    if (t) { setToken(t); setIsLoggedIn(true); }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault(); setStatus('Authenticating…');
    try {
      const res = await fetch(`${BACKEND_URL}/api/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) { setToken(data.token); localStorage.setItem('adminToken', data.token); setIsLoggedIn(true); setStatus(''); }
      else setStatus(data.error || 'Invalid credentials.');
    } catch { setStatus('Cannot reach the server. Is the backend running?'); }
  };

  const logout = () => { localStorage.removeItem('adminToken'); setToken(''); setIsLoggedIn(false); };

  // Helper that wraps authorized fetches and handles auto-refresh if token expires
  const authorizedFetch = async (url, options = {}) => {
    let currentToken = localStorage.getItem('adminToken') || token;
    let res = await fetch(url, {
      ...options,
      headers: { ...options.headers, 'Authorization': `Bearer ${currentToken}` }
    });

    if (res.status === 403) {
      const clone = res.clone();
      const body = await clone.json().catch(() => ({}));
      
      // Attempt silent background refresh
      if (body.reason === 'TOKEN_EXPIRED') {
        console.log('Token expired. Refreshing session...');
        const refreshRes = await fetch(`${BACKEND_URL}/api/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: currentToken })
        });
        
        if (refreshRes.ok) {
            const data = await refreshRes.json();
            setToken(data.token);
            localStorage.setItem('adminToken', data.token);
            console.log('Session refreshed!');
            
            // Retry original request automatically
            res = await fetch(url, {
              ...options,
              headers: { ...options.headers, 'Authorization': `Bearer ${data.token}` }
            });
        } else {
            setStatus('Session expired permanently. Please log back in.');
            logout();
        }
      } else {
        // Some other failure like INVALID_SECRET due to manual key rotation
        setStatus('Session invalidated (keys were rotated). Please log back in.');
        logout();
      }
    } else if (res.status === 401) {
      logout();
    }
    return res;
  };

  const handleRotateKey = async () => {
    if (!window.confirm("WARNING: Rotating the cryptographic keys will instantly invalidate ALL logged-in admin sessions worldwide except this one. Continue?")) return;
    setStatus('Rotating keys...');
    try {
      const res = await authorizedFetch(`${BACKEND_URL}/api/rotate-key`, { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        localStorage.setItem('adminToken', data.token);
        setStatus('✓ Security keys forcefully rotated.');
      } else {
        setStatus(data.error || 'Failed to rotate keys.');
      }
    } catch { setStatus('Network error.'); }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault(); setStatus('Uploading…');
    const fd = new FormData();
    fd.append('title', projectData.title); fd.append('description', projectData.description);
    if (projectFile) fd.append('image', projectFile);
    try {
      const res = await authorizedFetch(`${BACKEND_URL}/api/projects`, { method: 'POST', body: fd });
      if (res.ok) { setStatus('✓ Project added!'); setProjectData({ title: '', description: '' }); setProjectFile(null); }
      else setStatus('Failed to upload project.');
    } catch { setStatus('Network error.'); }
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault(); setStatus('Uploading…');
    const fd = new FormData();
    fd.append('name', teamData.name); fd.append('role', teamData.role); fd.append('about', teamData.about);
    if (teamFile) fd.append('image', teamFile);
    try {
      const res = await authorizedFetch(`${BACKEND_URL}/api/team`, { method: 'POST', body: fd });
      if (res.ok) { setStatus('✓ Team member added!'); setTeamData({ name: '', role: '', about: '' }); setTeamFile(null); }
      else setStatus('Failed to add team member.');
    } catch { setStatus('Network error.'); }
  };

  // ── Login Screen ──────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
        <Helmet><title>Admin Login | Pixora Labz</title></Helmet>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <img src="/logo-black.png" alt="Pixora Labz" style={{ height: '48px', margin: '0 auto 0.75rem', mixBlendMode: 'multiply', filter: 'contrast(1.4)' }} />
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>Admin Login</h1>
            <p style={{ color: '#888', fontSize: '0.95rem' }}>Enter your credentials to continue.</p>
          </div>
          {status && <p style={{ color: '#dc2626', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{status}</p>}
          <form onSubmit={handleLogin} style={{ background: 'white', border: '1px solid #e8e8ec', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#666', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email</label>
              <input type="email" placeholder="admin@pixora.com" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.9rem 1.1rem', border: '1.5px solid #e8e8ec', borderRadius: '10px', fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none' }} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#666', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.9rem 1.1rem', border: '1.5px solid #e8e8ec', borderRadius: '10px', fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none' }} />
            </div>
            <button type="submit" style={{ width: '100%', padding: '0.95rem', background: '#111', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit' }}>
              Log In →
            </button>
          </form>
          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#bbb', marginTop: '1.25rem' }}>
            Default: admin@pixora.com / admin123
          </p>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────
  const inputStyle = { width:'100%', padding:'0.85rem 1rem', border:'1.5px solid #e8e8ec', borderRadius:'10px', fontSize:'0.93rem', fontFamily:'inherit', background:'#fafafa', outline:'none' };
  const labelStyle = { fontSize:'0.78rem', fontWeight:600, color:'#666', display:'block', marginBottom:'0.4rem', textTransform:'uppercase', letterSpacing:'0.04em' };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f7', fontFamily: 'Inter, sans-serif' }}>
      <Helmet><title>Dashboard | Pixora Labz Admin</title></Helmet>
      <Sidebar active={activeView} setActive={setActiveView} onLogout={logout} onRotateKey={handleRotateKey} />

      <main style={{ flex: 1, marginLeft: '260px', padding: '3rem', overflowY: 'auto', maxHeight: '100vh' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#aaa', marginBottom: '0.25rem' }}>
            {activeView === 'content' ? 'Content Management' : activeView === 'projects' ? 'Project Management' : 'Team Management'}
          </p>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
            {activeView === 'content' ? 'Edit Site Content' : activeView === 'projects' ? 'Add New Project' : 'Add Team Member'}
          </h1>
        </div>

        {/* Status message for project/team */}
        {status && activeView !== 'content' && (
          <div style={{ padding: '1rem 1.25rem', background: status.startsWith('✓') ? '#f0fdf4' : '#fff5f5', border: `1px solid ${status.startsWith('✓') ? '#86efac' : '#fca5a5'}`, borderRadius: '12px', marginBottom: '2rem', fontSize: '0.9rem', color: status.startsWith('✓') ? '#166534' : '#991b1b', fontWeight: 500 }}>
            {status}
          </div>
        )}

        {/* Content Editor */}
        {activeView === 'content' && <ContentEditor apiFetch={authorizedFetch} />}

        {/* Project Form */}
        {activeView === 'projects' && (
          <form onSubmit={handleProjectSubmit} style={{ background:'white', border:'1px solid #e8e8ec', borderRadius:'20px', padding:'2.5rem', boxShadow:'0 4px 12px rgba(0,0,0,0.04)', maxWidth:'640px' }}>
            <div style={{ marginBottom:'1.25rem' }}>
              <label style={labelStyle}>Project Title</label>
              <input type="text" style={inputStyle} placeholder="e.g. ShopForge — E-Commerce Platform" value={projectData.title} onChange={e => setProjectData({...projectData, title:e.target.value})} required />
            </div>
            <div style={{ marginBottom:'1.25rem' }}>
              <label style={labelStyle}>Description</label>
              <textarea style={{...inputStyle, minHeight:'120px', resize:'vertical'}} placeholder="Describe the project, tech stack, outcomes…" value={projectData.description} onChange={e => setProjectData({...projectData, description:e.target.value})} required />
            </div>
            <div style={{ marginBottom:'1.5rem' }}>
              <label style={labelStyle}>Cover Image (optional)</label>
              <input type="file" accept="image/*" onChange={e => setProjectFile(e.target.files[0])} style={{ fontSize:'0.88rem', color:'#666' }} />
            </div>
            <button type="submit" style={{ padding:'0.9rem 2rem', background:'#111', color:'white', border:'none', borderRadius:'10px', fontWeight:700, fontSize:'0.93rem', cursor:'pointer', fontFamily:'inherit' }}>
              Add Project →
            </button>
          </form>
        )}

        {/* Team Form */}
        {activeView === 'team' && (
          <form onSubmit={handleTeamSubmit} style={{ background:'white', border:'1px solid #e8e8ec', borderRadius:'20px', padding:'2.5rem', boxShadow:'0 4px 12px rgba(0,0,0,0.04)', maxWidth:'640px' }}>
            <div style={{ marginBottom:'1.25rem' }}>
              <label style={labelStyle}>Full Name</label>
              <input type="text" style={inputStyle} placeholder="e.g. Alex Johnson" value={teamData.name} onChange={e => setTeamData({...teamData, name:e.target.value})} required />
            </div>
            <div style={{ marginBottom:'1.25rem' }}>
              <label style={labelStyle}>Role / Title</label>
              <input type="text" style={inputStyle} placeholder="e.g. Co-Founder & CTO" value={teamData.role} onChange={e => setTeamData({...teamData, role:e.target.value})} required />
            </div>
            <div style={{ marginBottom:'1.25rem' }}>
              <label style={labelStyle}>Bio / About</label>
              <textarea style={{...inputStyle, minHeight:'120px', resize:'vertical'}} placeholder="A few sentences about this person…" value={teamData.about} onChange={e => setTeamData({...teamData, about:e.target.value})} required />
            </div>
            <div style={{ marginBottom:'1.5rem' }}>
              <label style={labelStyle}>Profile Photo (optional)</label>
              <input type="file" accept="image/*" onChange={e => setTeamFile(e.target.files[0])} style={{ fontSize:'0.88rem', color:'#666' }} />
            </div>
            <button type="submit" style={{ padding:'0.9rem 2rem', background:'#111', color:'white', border:'none', borderRadius:'10px', fontWeight:700, fontSize:'0.93rem', cursor:'pointer', fontFamily:'inherit' }}>
              Add Team Member →
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
