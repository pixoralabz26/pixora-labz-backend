import { Router, Request, Response } from 'express';
import Blog from '../models/Blog.js';
import Portfolio from '../models/Portfolio.js';

const router = Router();

router.get('/sitemap.xml', async (_req: Request, res: Response) => {
  try {
    const [blogs, portfolios] = await Promise.all([
      Blog.find({ published: true }).select('slug updatedAt').lean(),
      Portfolio.find({ published: true }).select('slug updatedAt').lean(),
    ]);

    const baseUrl = process.env.SITE_URL || 'https://main.pixoralabz.tech';

    const staticPages = [
      { loc: '/', changefreq: 'weekly', priority: '1.0' },
      { loc: '/services', changefreq: 'monthly', priority: '0.9' },
      { loc: '/portfolio', changefreq: 'weekly', priority: '0.9' },
      { loc: '/blog', changefreq: 'weekly', priority: '0.9' },
      { loc: '/about', changefreq: 'monthly', priority: '0.8' },
      { loc: '/contact', changefreq: 'monthly', priority: '0.8' },
      { loc: '/privacy', changefreq: 'yearly', priority: '0.3' },
      { loc: '/terms', changefreq: 'yearly', priority: '0.3' },
    ];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const page of staticPages) {
      xml += `  <url>\n    <loc>${baseUrl}${page.loc}</loc>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`;
    }

    for (const post of blogs) {
      const lastmod = post.updatedAt ? new Date(post.updatedAt).toISOString().split('T')[0] : '';
      xml += `  <url>\n    <loc>${baseUrl}/blog/${post.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n`;
      if (lastmod) xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `  </url>\n`;
    }

    for (const project of portfolios) {
      const lastmod = project.updatedAt ? new Date(project.updatedAt).toISOString().split('T')[0] : '';
      xml += `  <url>\n    <loc>${baseUrl}/portfolio/${project.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n`;
      if (lastmod) xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `  </url>\n`;
    }

    xml += '</urlset>';

    res.set('Content-Type', 'application/xml');
    res.send(xml);
  } catch {
    res.status(500).send('Error generating sitemap');
  }
});

export default router;
