import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Mail, Clock, Globe, ArrowRight, ChevronRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useContent } from '../hooks/useContent';

const contactReasons = [
  'New Website / Web App',
  'Mobile App Development',
  'Digital Marketing',
  'Hosting & Maintenance',
  'Partnership',
  'Other',
];

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Most websites are delivered within 4–8 weeks. Full-stack applications typically take 3–6 months depending on complexity. We\'ll give you an honest timeline during our discovery call.',
  },
  {
    q: 'Do you work with startups?',
    a: 'Absolutely. Some of our best work has been with early-stage startups. We have startup-friendly packaging and can start lean and scale with you.',
  },
  {
    q: 'What does an ongoing maintenance plan include?',
    a: 'Hosting, SSL, uptime monitoring, security patches, daily backups, and a monthly performance report. We take care of the boring stuff so you don\'t have to.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes. Confidentiality is important to us. We\'re happy to sign your NDA or provide our own standard agreement before any discovery conversations.',
  },
];

const Contact = () => {
  const { get } = useContent();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', reason: '', message: '' });
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); setSent(true); };

  return (
    <PageTransition>
      <Helmet>
        <title>Contact Pixora Labz — Let's Build Something</title>
        <meta name="description" content="Start a conversation with Pixora Labz. Tell us about your project and let's figure out the best way to bring your vision to life." />
        <link rel="canonical" href="https://pixoralabz.com/contact" />
      </Helmet>

      {/* Header */}
      <section className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', maxWidth: '760px', margin: '0 auto' }}>
        <motion.div className="badge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <Mail size={13} /> Get in touch
        </motion.div>
        <motion.h1 className="page-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }}
          style={{ whiteSpace: 'pre-line' }}>
          {get('contact_hero_title')}
        </motion.h1>
        <motion.p className="lead-text" style={{ marginTop: '1.25rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          {get('contact_hero_subtitle')}
        </motion.p>
      </section>

      {/* Contact Layout */}
      <section className="container contact-layout" style={{ paddingBottom: '7rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
          {sent ? (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '4rem 3rem', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ width: '60px', height: '60px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Mail size={26} color="#16a34a" strokeWidth={2} />
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.75rem' }}>Message received!</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>We'll be in touch within one business day. Looking forward to chatting with you.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label className="form-label">First Name</label>
                  <input name="firstName" placeholder="Jane" className="form-input" value={form.firstName} onChange={handleChange} required />
                </div>
                <div>
                  <label className="form-label">Last Name</label>
                  <input name="lastName" placeholder="Doe" className="form-input" value={form.lastName} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" name="email" placeholder="jane@company.com" className="form-input" value={form.email} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label className="form-label">I'm interested in…</label>
                <select name="reason" className="form-select" value={form.reason} onChange={handleChange} required>
                  <option value="">Select a service</option>
                  {contactReasons.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Tell us about your project</label>
                <textarea name="message" className="form-textarea" placeholder="Give us a brief overview of your goals, timeline, and any specifics you have in mind…" value={form.message} onChange={handleChange} required />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Send message <ArrowRight size={16} />
              </button>
            </form>
          )}
        </motion.div>

        {/* Info Panel */}
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Quick Info */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <p className="label-text" style={{ marginBottom: '1.5rem' }}>Contact information</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { Icon: Mail, label: 'Email', value: get('contact_email') },
                { Icon: Clock, label: 'Response time', value: get('contact_response_time') },
                { Icon: Globe, label: 'Location', value: get('contact_location') },
              ].map(({ Icon, label, value }) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} strokeWidth={1.8} color="var(--text-secondary)" />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '0.15rem' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <p className="label-text" style={{ marginBottom: '1.5rem' }}>Frequently asked</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--border)' : 'none', paddingBottom: '0.9rem', paddingTop: '0.9rem' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', background: 'none', border: 'none', textAlign: 'left', padding: 0 }}
                  >
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</span>
                    <ChevronRight
                      size={16}
                      color="var(--text-muted)"
                      style={{ flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(90deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                  {openFaq === i && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '0.75rem' }}
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
};

export default Contact;
