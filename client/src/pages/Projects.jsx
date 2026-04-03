import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, Code2, Cpu, Flower2, ShoppingCart, Dumbbell, LayoutDashboard, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const placeholderProjects = [
  {
    id: 'ph1',
    title: 'ShopForge — E-Commerce Platform',
    description: 'A bespoke multi-vendor storefront with real-time inventory, one-click checkout and a custom CMS for the merchandising team.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL'],
    Icon: ShoppingCart,
  },
  {
    id: 'ph2',
    title: 'PulseApp — Fitness Tracker',
    description: 'Cross-platform mobile app with AI-powered workout plans, wearable sync, and a social leaderboard driving 40k daily active users.',
    tags: ['React Native', 'Expo', 'Firebase'],
    Icon: Dumbbell,
  },
  {
    id: 'ph3',
    title: 'GridOps — SaaS Dashboard',
    description: 'Operations management dashboard processing 2M+ events per day, with real-time analytics, team collaboration tools and role-based access.',
    tags: ['React', 'GraphQL', 'TypeScript'],
    Icon: LayoutDashboard,
  },
  {
    id: 'ph4',
    title: 'Bloom — Flower Delivery App',
    description: 'On-demand delivery app with live order tracking, subscription gifting, and a florist partner management portal.',
    tags: ['React Native', 'Stripe', 'Maps API'],
    Icon: Flower2,
  },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/projects`)
      .then(r => r.json())
      .then(data => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>Projects & Case Studies | Pixora Labz</title>
        <meta name="description" content="Browse Pixora Labz's portfolio of web apps, mobile applications, and digital marketing campaigns. Real results for real clients." />
        <link rel="canonical" href="https://pixoralabz.com/projects" />
      </Helmet>

      {/* Header */}
      <section className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
        <motion.div className="badge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <Layers size={13} /> Our work
        </motion.div>
        <motion.h1 className="page-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }}>
          Selected works.
        </motion.h1>
        <motion.p className="lead-text" style={{ marginTop: '1.25rem', maxWidth: '560px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          A curated look at projects we're proud of — from MVPs that became market leaders to enterprise overhauls.
        </motion.p>
      </section>

      {/* Projects Grid */}
      <section className="container" style={{ paddingBottom: '7rem' }}>
        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading projects…</p>
        ) : projects.length > 0 ? (
          <div className="grid grid-2">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
              >
                {project.image_url ? (
                  <img src={`${BACKEND_URL}${project.image_url}`} alt={project.title} className="project-card-img" />
                ) : (
                  <div className="project-card-placeholder">
                    <Code2 size={40} strokeWidth={1.5} color="var(--border-hover)" />
                  </div>
                )}
                <div className="project-card-body">
                  <h2 className="card-title" style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{project.title}</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65 }}>{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-2">
            {placeholderProjects.map((p, i) => {
              const { Icon } = p;
              return (
                <motion.div
                  key={p.id}
                  className="project-card"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.7 }}
                >
                  <div className="project-card-placeholder">
                    <Icon size={48} strokeWidth={1.3} color="var(--border-hover)" />
                  </div>
                  <div className="project-card-body">
                    <h2 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{p.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.93rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>{p.description}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* CTA inline */}
        <motion.div
          style={{ marginTop: '5rem', textAlign: 'center' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="section-heading" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Want to be our next success story?</h3>
          <p className="lead-text" style={{ marginBottom: '2rem' }}>Let's build something exceptional together.</p>
          <Link to="/contact">
            <button className="btn btn-primary">
              Get in touch <ArrowRight size={16} />
            </button>
          </Link>
        </motion.div>
      </section>
    </PageTransition>
  );
};

export default Projects;
