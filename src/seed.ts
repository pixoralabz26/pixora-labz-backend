import bcrypt from 'bcryptjs';
import { connectDB } from './config/database.js';
import config from './config/index.js';
import User from './models/User.js';
import Settings from './models/Settings.js';
import Service from './models/Service.js';
import Portfolio from './models/Portfolio.js';
import Testimonial from './models/Testimonial.js';
import Blog from './models/Blog.js';
import Seo from './models/Seo.js';

async function seed() {
  await connectDB();

  // Create admin user if not exists
  const existingUser = await User.findOne({ email: config.adminEmail });
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(config.adminPassword, 12);
    await User.create({
      name: 'Admin',
      email: config.adminEmail,
      password: hashedPassword,
      role: 'admin',
    });
    console.log('✓ Admin user created');
  } else {
    console.log('· Admin user already exists');
  }

  // Create default settings if not exists
  const existingSettings = await Settings.findOne();
  if (!existingSettings) {
    await Settings.create({
      companyName: 'Pixora Labz',
      tagline: 'We Build Startups That Feel Like Unicorns',
      email: 'hello@pixoralabz.com',
      navItems: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'Blog', href: '/blog' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    });
    console.log('✓ Default settings created');
  } else {
    console.log('· Settings already exist');
  }

  // Seed Services
  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany([
      {
        title: 'Startup Website Development',
        description: 'Modern, high-performance websites designed for startups, founders and growing businesses. Features include Responsive Design, SEO Optimized, Fast Loading and CMS Integration.',
        icon: 'Globe',
        order: 0,
        published: true,
      },
      {
        title: 'Mobile App Development',
        description: 'Cross-platform mobile applications with smooth UI, secure backend and scalable architecture. Features include Android & iOS, Modern UI/UX, API Integration and Push Notifications.',
        icon: 'Smartphone',
        order: 1,
        published: true,
      },
      {
        title: 'ERP & CRM Systems',
        description: 'Custom business management software for startups, schools, shops and companies. Features include Inventory Management, Employee Tracking, Customer Database and Analytics Dashboard.',
        icon: 'Building2',
        order: 2,
        published: true,
      },
      {
        title: 'E-Commerce Solutions',
        description: 'Beautiful online stores with payment integration, product management and analytics. Features include Cart & Checkout, Payment Gateway, Admin Panel and Product Filters.',
        icon: 'ShoppingCart',
        order: 3,
        published: true,
      },
      {
        title: 'AI & Automation',
        description: 'AI chatbots, automation systems and workflow tools to save time and improve customer experience. Features include AI Chatbot, Lead Generation, Email Automation and Custom Integrations.',
        icon: 'Bot',
        order: 4,
        published: true,
      },
      {
        title: 'Marketing & Branding',
        description: 'Digital branding, social media creatives and performance-focused marketing strategies. Features include Logo Design, Social Media, Brand Strategy and Ad Campaigns.',
        icon: 'Users',
        order: 5,
        published: true,
      },
    ]);
    console.log('✓ Services seeded');
  } else {
    console.log('· Services already exist');
  }

  // Seed Portfolio
  const portfolioCount = await Portfolio.countDocuments();
  if (portfolioCount === 0) {
    await Portfolio.insertMany([
      {
        title: 'NovaCRM',
        slug: 'novacrm',
        description: 'A premium CRM dashboard for startups to manage leads, tasks and customer communication.',
        content: 'Client: Nova Ventures | Year: 2026\n\nResults:\n• 40% faster lead management\n• Improved customer follow-up\n• Mobile-friendly dashboard',
        category: 'ERP / CRM',
        technologies: ['UI/UX Design', 'React Development', 'API Integration'],
        featured: true,
        published: true,
        order: 0,
      },
      {
        title: 'Lunexa Fashion',
        slug: 'lunexa-fashion',
        description: 'A modern fashion e-commerce website with elegant product pages and fast checkout.',
        content: 'Client: Lunexa | Year: 2026\n\nResults:\n• 2x increase in online orders\n• Faster website speed\n• Improved brand identity',
        category: 'E-Commerce',
        technologies: ['E-Commerce', 'Branding', 'SEO'],
        featured: true,
        published: true,
        order: 1,
      },
      {
        title: 'EduCore ERP',
        slug: 'educore-erp',
        description: 'A complete ERP system for schools with attendance, fees, exams and student management.',
        content: 'Client: Future Academy | Year: 2026\n\nResults:\n• Reduced manual work by 60%\n• Centralized school management\n• Real-time reports',
        category: 'Education',
        technologies: ['ERP System', 'Dashboard', 'Backend Development'],
        featured: false,
        published: true,
        order: 2,
      },
      {
        title: 'Pixora Studio',
        slug: 'pixora-studio',
        description: 'A cinematic startup website inspired by Apple and Vercel with scroll-based storytelling.',
        content: 'Client: Internal Project | Year: 2026\n\nResults:\n• Premium brand identity\n• Highly interactive design\n• Responsive on all devices',
        category: 'Startup Website',
        technologies: ['Web Design', 'Framer Motion', 'GSAP'],
        featured: true,
        published: true,
        order: 3,
      },
    ]);
    console.log('✓ Portfolio seeded');
  } else {
    console.log('· Portfolio already exists');
  }

  // Seed Testimonials
  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    await Testimonial.insertMany([
      {
        name: 'Aarav Patel',
        company: 'Nova Ventures',
        role: 'Founder',
        content: 'Pixora Labz transformed our idea into a premium platform. The website feels like something built by a top tech company.',
        rating: 5,
        published: true,
        order: 0,
      },
      {
        name: 'Riya Shah',
        company: 'Lunexa',
        role: 'Owner',
        content: 'The team understood our vision perfectly. Our sales increased and customers love the new experience.',
        rating: 5,
        published: true,
        order: 1,
      },
      {
        name: 'Harsh Mehta',
        company: 'Future Academy',
        role: 'Director',
        content: 'Their ERP system saved us time and made our school operations much easier to manage.',
        rating: 5,
        published: true,
        order: 2,
      },
    ]);
    console.log('✓ Testimonials seeded');
  } else {
    console.log('· Testimonials already exist');
  }

  // Seed Blog Posts
  const blogCount = await Blog.countDocuments();
  if (blogCount === 0) {
    await Blog.insertMany([
      {
        title: 'Why Every Startup Needs a Premium Website in 2026',
        slug: 'why-startups-need-premium-website',
        excerpt: 'Your website is the first impression of your startup. Learn why design and speed matter more than ever.',
        content: 'Your website is the first impression of your startup. In 2026, users expect fast, beautiful and responsive websites. A premium website builds trust, converts visitors and sets you apart from competitors. Investing in quality web design from day one saves time and money in the long run.',
        category: 'Web Design',
        author: 'Pixora Labz',
        featured: true,
        published: true,
        readTime: 5,
      },
      {
        title: 'ERP vs CRM: Which One Does Your Business Need?',
        slug: 'erp-vs-crm',
        excerpt: 'Understand the difference between ERP and CRM systems and choose the right solution for your business.',
        content: 'ERP (Enterprise Resource Planning) manages internal operations like inventory, finance and HR. CRM (Customer Relationship Management) focuses on sales, leads and customer interactions. Many businesses need both. The right choice depends on your size, industry and goals.',
        category: 'Business Software',
        author: 'Pixora Labz',
        featured: false,
        published: true,
        readTime: 7,
      },
      {
        title: 'How We Build Apple-Inspired Websites for Startups',
        slug: 'apple-inspired-websites',
        excerpt: 'A behind-the-scenes look at our design process, animations and premium user experience.',
        content: 'At Pixora Labz, we study the best — Apple, Vercel, Linear and Stripe. We combine scroll-based storytelling with GSAP and Framer Motion animations. Every interaction is intentional. The result is a website that feels premium and builds instant credibility for your startup.',
        category: 'UI/UX',
        author: 'Pixora Labz',
        featured: false,
        published: true,
        readTime: 6,
      },
    ]);
    console.log('✓ Blog posts seeded');
  } else {
    console.log('· Blog posts already exist');
  }

  // Seed SEO meta data
  const seoCount = await Seo.countDocuments();
  if (seoCount === 0) {
    await Seo.insertMany([
      {
        page: 'home',
        title: 'Pixora Labz — We Build Startups That Feel Like Unicorns',
        description: 'Premium website development, mobile apps, ERP systems and branding for ambitious startups and businesses.',
        keywords: ['startup website', 'web development', 'mobile app development', 'ERP', 'CRM', 'branding'],
      },
      {
        page: 'services',
        title: 'Our Services — Pixora Labz',
        description: 'Web development, mobile apps, ERP/CRM systems, e-commerce, AI automation and marketing services.',
        keywords: ['web development services', 'app development', 'ERP system', 'e-commerce development'],
      },
      {
        page: 'portfolio',
        title: 'Our Work — Pixora Labz',
        description: 'Explore our portfolio of premium websites, mobile apps and business software built for startups.',
        keywords: ['portfolio', 'web design projects', 'startup websites', 'case studies'],
      },
      {
        page: 'blog',
        title: 'Blog — Pixora Labz',
        description: 'Insights on web development, design, business software and startup growth.',
        keywords: ['web development blog', 'startup tips', 'design insights', 'tech blog'],
      },
      {
        page: 'about',
        title: 'About Us — Pixora Labz',
        description: 'Learn about Pixora Labz, our team and our mission to build premium digital products for startups.',
        keywords: ['about pixora labz', 'startup agency', 'web development team'],
      },
      {
        page: 'contact',
        title: 'Contact Us — Pixora Labz',
        description: 'Get in touch with Pixora Labz for your next project. We build premium websites, apps and business software.',
        keywords: ['contact', 'hire developers', 'startup development agency'],
      },
    ]);
    console.log('✓ SEO meta seeded');
  } else {
    console.log('· SEO meta already exists');
  }

  console.log('✓ Seed complete');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
