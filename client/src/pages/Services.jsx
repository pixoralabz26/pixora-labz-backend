import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Smartphone, Server, TrendingUp, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useContent } from '../hooks/useContent';

const services = [
  {
    Icon: Globe,
    slug: '01',
    title: 'Web Development',
    tagline: 'Your digital storefront, engineered to convert.',
    desc: "We design and build websites that are fast, accessible, and beautiful. From a polished marketing site to a full-stack SaaS application — we apply the same obsessive attention to quality in every project we touch.",
    features: [
      'React, Next.js, TypeScript',
      'RESTful & GraphQL APIs',
      'Authentication & Role Management',
      'Responsive, Mobile-First design',
      'Core Web Vitals optimised',
      'CMS integration (Sanity, Contentful)',
    ],
  },
  {
    Icon: Smartphone,
    slug: '02',
    title: 'App Development',
    tagline: 'Native performance. Cross-platform reach.',
    desc: 'Our mobile engineers specialise in React Native — giving you a single codebase that delivers truly native experiences on both iOS and Android, cutting time-to-market without compromising quality.',
    features: [
      'React Native & Expo',
      'Offline-first architecture',
      'Push notifications & analytics',
      'App Store & Google Play publishing',
      'OTA updates & CI/CD',
      'Custom UI component libraries',
    ],
  },
  {
    Icon: Server,
    slug: '03',
    title: 'Maintenance & Hosting',
    tagline: 'Launch once. Run forever.',
    desc: "We take full ownership of your infrastructure so you can focus on growth. Our managed hosting includes a 99.9% uptime SLA, daily backups, automated security patching, and a team on-call around the clock.",
    features: [
      'Managed cloud infrastructure',
      '99.9% uptime SLA',
      'Daily automated backups',
      'SSL & DDoS protection',
      'Performance monitoring & alerts',
      'Monthly detailed reports',
    ],
  },
  {
    Icon: TrendingUp,
    slug: '04',
    title: 'Digital Marketing',
    tagline: 'Growth that compounds.',
    desc: 'Data-driven strategies that generate sustainable growth. We combine technical SEO, content marketing, paid acquisition, and conversion rate optimisation into a single, coherent growth programme.',
    features: [
      'Technical SEO audits & fixes',
      'Content strategy & production',
      'Google Ads & Meta campaigns',
      'Conversion rate optimisation',
      'Monthly performance reporting',
      'Competitor analysis',
    ],
  },
];

const Services = () => {
  const { get } = useContent();
  return (
    <PageTransition>
      <Helmet>
        <title>Services — Web, App & Marketing | Pixora Labz</title>
        <meta name="description" content="Explore Pixora Labz's services: Web Development, App Development, Maintenance & Hosting, and Digital Marketing. Full-stack digital solutions for growing businesses." />
        <link rel="canonical" href="https://pixoralabz.com/services" />
      </Helmet>

      {/* Header */}
      <section className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem', maxWidth: '800px', margin: '0 auto' }}>
        <motion.div className="badge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <Globe size={13} /> What we offer
        </motion.div>
        <motion.h1 className="page-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }}
          style={{ whiteSpace: 'pre-line' }}>
          {get('services_hero_title')}
        </motion.h1>
        <motion.p className="lead-text" style={{ marginTop: '1.5rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.7 }}>
          {get('services_hero_subtitle')}
        </motion.p>
      </section>

      {/* Service Blocks */}
      <section className="container" style={{ paddingBottom: '7rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {services.map((svc, i) => {
            const { Icon } = svc;
            return (
              <motion.div
                key={svc.slug}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--surface)',
                  overflow: 'hidden',
                }}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
              >
                <div style={{ padding: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }} className="service-inner-grid">
                  {/* Left */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={22} strokeWidth={1.8} color="var(--text-primary)" />
                      </div>
                      <span className="label-text">{svc.slug}</span>
                    </div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>{svc.title}</h2>
                    <p style={{ fontSize: '1rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '1.25rem' }}>{svc.tagline}</p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>{svc.desc}</p>
                  </div>
                  {/* Right — Feature list */}
                  <div style={{ background: 'var(--surface-2)', borderRadius: 'var(--radius-md)', padding: '2rem' }}>
                    <p className="label-text" style={{ marginBottom: '1rem' }}>What's included</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {svc.features.map(f => (
                        <li key={f} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.92rem', color: 'var(--text-secondary)', alignItems: 'center' }}>
                          <ArrowRight size={14} color="var(--accent)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="cta-banner"
          style={{ marginTop: '5rem' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>Not sure what you need?</h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Let's get on a call. We'll map out the ideal solution for your goals, free of charge.</p>
          <Link to="/contact">
            <button className="btn" style={{ background: 'white', color: '#111' }}>
              Talk to us <ArrowRight size={16} />
            </button>
          </Link>
        </motion.div>
      </section>
    </PageTransition>
  );
};

export default Services;
