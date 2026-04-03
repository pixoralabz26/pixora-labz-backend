import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Rocket, Zap, Target, Lightbulb, Timer, ArrowRight, UserCircle2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const placeholderTeam = [
  {
    id: 'f1',
    name: 'Founder One',
    role: 'Co-Founder & CEO',
    about: 'Visionary leader with a deep background in product strategy and business development. Passionate about turning bold ideas into category-defining companies that matter.',
    InitialIcon: Rocket,
  },
  {
    id: 'f2',
    name: 'Founder Two',
    role: 'Co-Founder & CTO',
    about: 'Engineering leader who has shipped production systems at scale. Obsessed with clean architecture, developer experience, and using technology to create genuine competitive advantage.',
    InitialIcon: Zap,
  },
];

const values = [
  { Icon: Target, title: 'Obsessive quality', desc: 'We hold every line of code and every pixel to the highest standard — because mediocrity has no place at Pixora Labz.' },
  { Icon: Timer, title: 'Long-term thinking', desc: 'We build honest partnerships. Our clients\' growth is our growth, and we plan for years, not quarters.' },
  { Icon: Zap, title: 'Relentless speed', desc: 'We move fast without breaking things. Agile sprints, clear communication, and predictable delivery.' },
  { Icon: Lightbulb, title: 'Data-driven decisions', desc: 'Every design choice, every architecture decision — backed by data, research, and proven patterns.' },
];

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/team`)
      .then(r => r.json())
      .then(data => { setTeam(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const displayTeam = team.length > 0 ? team : placeholderTeam;
  const isPlaceholder = team.length === 0;

  return (
    <PageTransition>
      <Helmet>
        <title>Our Founders & Team | Pixora Labz</title>
        <meta name="description" content="Meet the founders and team behind Pixora Labz — passionate engineers, creative designers, and strategic thinkers building the future of digital products." />
        <link rel="canonical" href="https://pixoralabz.com/team" />
      </Helmet>

      {/* Header */}
      <section className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
        <motion.div className="badge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <Users size={13} /> The people
        </motion.div>
        <motion.h1 className="page-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }}>
          Built by people who<br />care deeply.
        </motion.h1>
        <motion.p className="lead-text" style={{ marginTop: '1.25rem', maxWidth: '580px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          Pixora Labz was founded on a simple belief: that exceptional digital products require exceptional people who sweat both the big stuff and the details.
        </motion.p>
      </section>

      {/* Founders */}
      <section className="container" style={{ paddingBottom: '5rem' }}>
        <p className="label-text" style={{ marginBottom: '2rem' }}>Founders</p>
        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading team…</p>
        ) : (
          <div className="grid grid-2">
            {displayTeam.slice(0, 2).map((member, i) => {
              const PlaceholderIcon = member.InitialIcon || UserCircle2;
              return (
                <motion.div
                  key={member.id}
                  className="team-card"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.12, duration: 0.7 }}
                >
                  {member.image_url ? (
                    <img src={`${BACKEND_URL}${member.image_url}`} alt={member.name} className="team-card-img" />
                  ) : (
                    <div className="team-card-avatar">
                      <PlaceholderIcon size={64} strokeWidth={1.2} color="var(--border-hover)" />
                    </div>
                  )}
                  <div className="team-card-body">
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.25rem' }}>{member.name}</h2>
                    <p style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem' }}>{member.role}</p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>{member.about}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Other team members */}
        {!loading && displayTeam.length > 2 && (
          <>
            <p className="label-text" style={{ marginTop: '4rem', marginBottom: '2rem' }}>Team</p>
            <div className="grid grid-3">
              {displayTeam.slice(2).map((member, i) => (
                <motion.div
                  key={member.id}
                  className="team-card"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.7 }}
                >
                  {member.image_url ? (
                    <img src={`${BACKEND_URL}${member.image_url}`} alt={member.name} className="team-card-img" />
                  ) : (
                    <div className="team-card-avatar">
                      <UserCircle2 size={48} strokeWidth={1.2} color="var(--border-hover)" />
                    </div>
                  )}
                  <div className="team-card-body">
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.25rem' }}>{member.name}</h3>
                    <p style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>{member.role}</p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.9rem' }}>{member.about}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Values */}
      <section className="container" style={{ paddingBottom: '5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3rem' }}
        >
          <p className="label-text" style={{ marginBottom: '0.75rem' }}>How we work</p>
          <h2 className="section-heading">Our values.</h2>
        </motion.div>
        <div className="grid grid-2">
          {values.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="card-icon">
                <Icon size={22} strokeWidth={1.8} color="var(--text-primary)" />
              </div>
              <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>{title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Join CTA */}
      <section className="container" style={{ paddingBottom: '7rem' }}>
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '4rem', textAlign: 'center' }}>
          <h2 className="section-heading" style={{ marginBottom: '1rem' }}>We're growing.</h2>
          <p className="lead-text" style={{ maxWidth: '480px', margin: '0 auto 2rem' }}>
            Interested in joining the team? We're always looking for exceptional engineers and designers.
          </p>
          <Link to="/contact">
            <button className="btn btn-primary">
              Get in touch <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
};

export default Team;
