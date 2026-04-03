import { useState, useEffect } from 'react';

// Connects to local server in dev, but honors VITE_API_URL in production (or defaults to local domain/proxy)
const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Default content fallbacks — used when DB has no data yet
const DEFAULTS = {
  home_hero_title: 'We build software\nthat stands out.',
  home_hero_subtitle: 'Pixora Labz is a boutique development studio crafting high-performance websites, mobile applications, and growth strategies for ambitious brands.',
  home_badge: 'Digital Excellence Studio',
  home_stat1_num: '50+',
  home_stat1_label: 'Projects delivered',
  home_stat2_num: '3yr',
  home_stat2_label: 'In the industry',
  home_stat3_num: '98%',
  home_stat3_label: 'Client satisfaction',
  home_stat4_num: '24/7',
  home_stat4_label: 'Support coverage',
  home_cta_title: 'Ready to build something\ngreat?',
  home_cta_subtitle: "Let's talk about your project. No commitments — just a conversation.",

  services_hero_title: 'Every service you need\nto grow online.',
  services_hero_subtitle: 'From concept to production to growth — Pixora Labz is the partner you call once and keep forever.',

  contact_email: 'hello@pixoralabz.com',
  contact_response_time: 'Within 1 business day',
  contact_location: 'Remote-first, worldwide',
  contact_hero_title: "Let's build something\nremarkable.",
  contact_hero_subtitle: "Drop us a message and we'll get back to you within one business day. First conversations are always free.",
};

export const useContent = () => {
  const [content, setContent] = useState(DEFAULTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/content`)
      .then(r => r.json())
      .then(data => {
        setContent(prev => ({ ...prev, ...data }));
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const get = (key) => content[key] ?? DEFAULTS[key] ?? '';
  return { get, loaded };
};

export { DEFAULTS, BACKEND_URL };
