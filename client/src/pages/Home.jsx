import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Smartphone, Server, TrendingUp, CheckCircle2, ArrowRight, Zap, BarChart3 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useContent } from '../hooks/useContent';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.75, ease: [0.16, 1, 0.3, 1] }
  }),
};

const services = [
  {
    Icon: Globe,
    title: 'Web Development',
    desc: 'Blazing-fast, conversion-optimised websites built with modern frameworks and clean architecture.',
  },
  {
    Icon: Smartphone,
    title: 'App Development',
    desc: 'iOS & Android applications crafted with React Native — native quality, cross-platform speed.',
  },
  {
    Icon: Server,
    title: 'Maintenance & Hosting',
    desc: '99.9% uptime SLA. Daily backups, security patches, and proactive monitoring round the clock.',
  },
  {
    Icon: TrendingUp,
    title: 'Digital Marketing',
    desc: 'Data-driven SEO, paid acquisition, and content strategy that compounds returns over time.',
  },
];

const logos = ['Vercel', 'Linear', 'Stripe', 'Notion', 'Figma', 'Supabase'];

const Home = () => {
  const { get } = useContent();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <PageTransition>
      <Helmet>
        <title>Pixora Labz — Premium Web & App Development Studio</title>
        <meta name="description" content="Pixora Labz crafts premium digital experiences — from world-class websites and mobile apps to strategic digital marketing. Partner with us to build your next big thing." />
        <link rel="canonical" href="https://pixoralabz.com/" />
        <meta property="og:title" content="Pixora Labz — Premium Web & App Development Studio" />
        <meta property="og:description" content="We build stunning websites, mobile apps and growth strategies for ambitious brands." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
        <div className="text-center" style={{ maxWidth: '820px', margin: '0 auto' }}>
          <motion.div className="badge" variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <Zap size={13} style={{ flexShrink: 0 }} />
            {get('home_badge')}
          </motion.div>
          <motion.h1 className="display-title" variants={fadeUp} initial="hidden" animate="show" custom={1}
            style={{ whiteSpace: 'pre-line' }}
          >
            {get('home_hero_title')}
          </motion.h1>
          <motion.p
            className="lead-text"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            style={{ margin: '1.5rem auto 2.5rem', maxWidth: '600px' }}
          >
            {get('home_hero_subtitle')}
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            className="btn-row"
          >
            <Link to="/contact">
              <button className="btn btn-primary">
                Start a project <ArrowRight size={16} />
              </button>
            </Link>
            <Link to="/projects">
              <button className="btn btn-ghost">View our work</button>
            </Link>
          </motion.div>
        </div>

        {/* Hero Image with parallax */}
        <motion.div
          ref={heroRef}
          style={{ marginTop: '4rem', opacity: heroOpacity }}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-visual">
            <motion.img
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop"
              alt="Pixora Labz — Digital production workspace"
              style={{ scale: imgScale }}
            />
          </div>
        </motion.div>
      </section>

      {/* ── Brand Trust Strip ─────────────────────────── */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '2.5rem 0' }}>
        <div className="container">
          <p className="label-text text-center" style={{ marginBottom: '2rem' }}>Trusted by forward-thinking companies</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', opacity: 0.4 }}>
            {logos.map(l => (
              <span key={l} style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────── */}
      <section className="container section">
        <motion.div
          className="stats-bar"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          {[
            { num: get('home_stat1_num'), label: get('home_stat1_label') },
            { num: get('home_stat2_num'), label: get('home_stat2_label') },
            { num: get('home_stat3_num'), label: get('home_stat3_label') },
            { num: get('home_stat4_num'), label: get('home_stat4_label') },
          ].map(s => (
            <div className="stat-item" key={s.num}>
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Feature 1 — Speed ──────────────────────────── */}
      <section className="container section" style={{ paddingTop: '2rem' }}>
        <div className="feat-section">
          <div className="feat-content">
            <span className="label-text">Engineering</span>
            <motion.h2
              className="section-heading"
              style={{ margin: '0.75rem 0 1.25rem' }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Built for speed &amp;<br />scalability.
            </motion.h2>
            <p className="lead-text">
              No bloated templates. Every line of code is meticulously crafted — with modern frameworks, edge-optimised deployments, and architecture that scales with your ambition.
            </p>
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {['React & Next.js frontends', 'Node.js & Go backends', 'Edge CDN deployments', 'Automated CI/CD pipelines'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={17} color="var(--accent)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="feat-visual">
            <motion.img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop"
              alt="Code engineering at Pixora Labz"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </section>

      {/* ── Feature 2 — Design ─────────────────────────── */}
      <section className="container section" style={{ paddingTop: '2rem' }}>
        <div className="feat-section rev">
          <div className="feat-content">
            <span className="label-text">Design</span>
            <motion.h2
              className="section-heading"
              style={{ margin: '0.75rem 0 1.25rem' }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Design that converts,<br />not just impresses.
            </motion.h2>
            <p className="lead-text">
              Beautiful is not enough. Our designers merge aesthetic excellence with user psychology to craft journeys that guide visitors straight to conversion — validated by real data.
            </p>
          </div>
          <div className="feat-visual">
            <motion.img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              alt="Design system and analytics dashboard"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </section>

      {/* ── Services Overview ──────────────────────────── */}
      <section className="container section" style={{ paddingTop: '2rem' }}>
        <div style={{ marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="label-text">What we do</span>
            <h2 className="section-heading" style={{ marginTop: '0.75rem' }}>
              End-to-end digital services.
            </h2>
          </motion.div>
        </div>
        <div className="grid grid-2">
          {services.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="card-icon">
                <Icon size={24} strokeWidth={1.8} color="var(--text-primary)" />
              </div>
              <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>{title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────── */}
      <section className="container section" style={{ paddingTop: '2rem', paddingBottom: '7rem' }}>
        <motion.div
          className="cta-banner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="display-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', marginBottom: '1rem', color: 'white' }}>
            Ready to build something<br />great?
          </h2>
          <p className="lead-text" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '520px', margin: '0 auto' }}>
            Let's talk about your project. No commitments — just a conversation.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5rem' }}>
            <Link to="/contact">
              <button className="btn" style={{ background: 'white', color: '#111' }}>
                Start a project <ArrowRight size={16} />
              </button>
            </Link>
            <Link to="/services">
              <button className="btn" style={{ background: 'transparent', color: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                Explore services
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
};

export default Home;
