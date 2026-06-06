require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const User = require('../models/User');
const Project = require('../models/Project');
const Service = require('../models/Service');
const Blog = require('../models/Blog');
const Testimonial = require('../models/Testimonial');
const Lead = require('../models/Lead');
const Contact = require('../models/Contact');
const Booking = require('../models/Booking');
const Team = require('../models/Team');
const Setting = require('../models/Setting');
const SEO = require('../models/SEO');

const seed = async () => {
  try {
    await connectDB();
    console.log('Seeding database...');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Project.deleteMany({}),
      Service.deleteMany({}),
      Blog.deleteMany({}),
      Testimonial.deleteMany({}),
      Lead.deleteMany({}),
      Contact.deleteMany({}),
      Booking.deleteMany({}),
      Team.deleteMany({}),
      Setting.deleteMany({}),
      SEO.deleteMany({}),
    ]);

    // Admin User
    await User.create({
      name: 'Super Admin',
      email: 'admin@agentrax.com',
      password: 'Admin@123',
      role: 'super_admin',
    });

    // Services
    await Service.insertMany([
      { name: 'Custom Software Development', icon: 'Code2', description: 'Enterprise-grade custom software tailored to your business needs with modern architectures.', features: ['Scalable Architecture', 'Microservices', 'API Development', 'Legacy Modernization'], order: 1 },
      { name: 'Web Development', icon: 'Globe2', description: 'High-performance web applications using cutting-edge frameworks and technologies.', features: ['React/Next.js', 'Progressive Web Apps', 'SPA Development', 'E-commerce Solutions'], order: 2 },
      { name: 'Mobile App Development', icon: 'Smartphone', description: 'Native and cross-platform mobile applications for iOS and Android platforms.', features: ['iOS Development', 'Android Development', 'React Native', 'Flutter'], order: 3 },
      { name: 'SaaS Platforms', icon: 'Cloud', description: 'End-to-end SaaS platform development from ideation to deployment and scaling.', features: ['Multi-tenant Architecture', 'Subscription Management', 'API-first Design', 'Scalable Infrastructure'], order: 4 },
      { name: 'AI Integration', icon: 'Brain', description: 'Integrate cutting-edge AI capabilities to automate and enhance your business processes.', features: ['LLM Integration', 'AI Chatbots', 'Computer Vision', 'Predictive Analytics'], order: 5 },
      { name: 'Automation Systems', icon: 'Zap', description: 'Streamline operations with intelligent automation solutions and workflow optimization.', features: ['Workflow Automation', 'RPA', 'CRM Automation', 'Lead Generation Systems'], order: 6 },
      { name: 'DevOps', icon: 'Container', description: 'Comprehensive DevOps services for streamlined development, deployment, and operations.', features: ['CI/CD Pipelines', 'Infrastructure as Code', 'Container Orchestration', 'Monitoring'], order: 7 },
      { name: 'Cloud & Hosting', icon: 'Server', description: 'Scalable cloud infrastructure solutions across AWS, Azure, and Google Cloud Platform.', features: ['Cloud Migration', 'AWS/Azure/GCP', 'Managed Hosting', 'Cloud Security'], order: 8 },
    ]);

    // Projects
    await Project.insertMany([
      {
        title: 'HealthConnect - Telemedicine & Healthcare Mobile App',
        slug: 'healthconnect-telemedicine-app',
        clientName: 'Healthcare Providers',
        category: 'Mobile Apps',
        technologies: ['React Native', 'Node.js', 'WebRTC', 'MongoDB', 'Firebase', 'Twilio', 'AWS'],
        description: 'A comprehensive telemedicine mobile application connecting patients with doctors through video consultations, AI symptom checking, prescription management, and complete health record tracking.',
        overview: 'HealthConnect is a full-featured telemedicine and healthcare mobile application that bridges the gap between patients and healthcare providers. The platform enables virtual doctor consultations, AI-powered symptom analysis, digital prescriptions, medicine delivery tracking, and secure health record management from anywhere.',
        problem: 'Patients face long wait times for doctor appointments, limited access to healthcare in remote areas, and fragmented health records across multiple providers.',
        solution: 'An all-in-one mobile healthcare platform that connects patients with doctors instantly via video, provides AI-powered symptom assessment, maintains unified digital health records, and streamlines prescription and medicine delivery.',
        features: ['Video Consultations with Doctors', 'AI Symptom Checker', 'Digital Prescriptions', 'Health Record Management', 'Medicine Delivery Tracking', 'Lab Report Integration', 'Appointment Scheduling', 'Multi-Profile Management', 'Secure Messaging', 'Push Notifications', 'Payment Integration', 'Multi-Language Support', 'EMR/EHR Integration', 'Doctor Rating & Reviews'],
        businessImpact: 'Reduced patient wait times by 80% • Expanded healthcare access to remote areas • Lower healthcare costs • Improved patient outcomes',
        results: 'Reduced patient wait times by 80%, expanded healthcare access to remote areas',
        featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
        galleryImages: ['https://images.unsplash.com/photo-1571771894821-ce9b6ba11a94?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop'],
        isFeatured: true, status: 'published', completionDate: new Date('2025-03-20'),
      },
      {
        title: 'GateGuard - AI-Powered Gate Monitoring & Access Control',
        slug: 'gateguard-ai-gate-monitoring',
        clientName: 'Security Enterprises',
        category: 'Mobile Apps',
        technologies: ['React Native', 'Python', 'TensorFlow', 'Node.js', 'PostgreSQL', 'Raspberry Pi', 'AWS Rekognition'],
        description: 'An intelligent gate monitoring and access control system featuring AI-powered license plate recognition, vehicle detection, real-time alerts, and automated entry management for residential and commercial properties.',
        overview: 'GateGuard is an advanced AI-powered gate monitoring system that provides real-time surveillance, automatic license plate recognition (ALPR), vehicle type detection, visitor management, and intelligent access control for residential societies, commercial complexes, industrial facilities, and gated communities.',
        problem: 'Traditional gate security relies on manual checking, which is slow, error-prone, and requires constant human supervision. Unauthorized access and security breaches are common concerns.',
        solution: 'An AI-powered gate monitoring system with automatic license plate recognition, vehicle detection, real-time alerts to security personnel, and automated boom barrier control with comprehensive audit logs.',
        features: ['AI License Plate Recognition', 'Vehicle Type Detection', 'Real-Time Security Alerts', 'Automatic Boom Barrier Control', 'Visitor Pre-Registration', 'Blacklist Vehicle Alerts', 'Entry/Exit Logs', 'Multi-Gate Management', 'Security Personnel Dashboard', 'Resident App Integration', 'Emergency Override', '24/7 Video Recording', 'Motion Detection', 'Number Plate Database', 'Monthly Access Reports', 'OCR for All Number Plate Formats'],
        businessImpact: 'Eliminated manual gate checking • Zero unauthorized entry incidents • Faster vehicle processing • Reduced security staffing costs',
        results: 'Zero unauthorized entry incidents, 90% faster vehicle processing, reduced security costs',
        featuredImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop',
        galleryImages: ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1582137380869-d0c76a9c7a7e?w=800&h=600&fit=crop'],
        isFeatured: true, status: 'published', completionDate: new Date('2025-04-10'),
      },
      {
        title: 'ConsultPro - Online Video Consultation & Service Platform',
        slug: 'consultpro-online-video-consultation',
        clientName: 'Consulting Networks',
        category: 'Mobile Apps',
        technologies: ['React Native', 'Node.js', 'Socket.io', 'WebRTC', 'Stripe', 'MongoDB', 'AWS'],
        description: 'A premium mobile platform connecting clients with expert consultants across domains through seamless video consultations, appointment scheduling, and secure payments.',
        overview: 'ConsultPro is a premium online video consultation mobile app that connects clients with expert consultants across legal, financial, career, wellness, education, and business domains. The platform handles everything from discovery and booking to video sessions and payments.',
        problem: 'Clients struggle to find trusted experts for consultations while professionals lack a streamlined platform to offer their services digitally.',
        solution: 'A feature-rich consultation marketplace with AI-powered expert matching, seamless video sessions, secure in-app payments, scheduling, and review systems.',
        features: ['HD Video Consultations', 'AI Expert Matching', 'Instant Booking', 'Secure Payments', 'Session Recording', 'Digital Documents', 'In-App Chat', 'Availability Calendar', 'Expert Profiles & Reviews', 'Multi-Domain Support', 'Subscription Plans', 'E-Consent Forms', 'Reminder Notifications', 'Session History'],
        businessImpact: 'Connected 5000+ clients with experts • 95% session satisfaction rate • Expanded consultant reach globally',
        results: '5000+ consultations completed, 95% satisfaction rate, global consultant network',
        featuredImage: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop',
        galleryImages: ['https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop'],
        isFeatured: true, status: 'published', completionDate: new Date('2025-04-15'),
      },
      {
        title: 'ShopWave - Multi-Store E-Commerce Platform',
        slug: 'shopwave-multi-store-ecommerce',
        clientName: 'Retail Chains',
        category: 'E-commerce',
        technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe', 'Elasticsearch', 'Redis', 'Docker'],
        description: 'A powerful multi-store e-commerce platform enabling retail chains to manage multiple online stores from a single dashboard with centralized inventory, unified orders, and cross-store analytics.',
        overview: 'ShopWave is a comprehensive multi-store e-commerce platform designed for retail chains and franchise networks. It enables businesses to manage multiple online stores, centralized product catalogs, unified inventory across locations, cross-store order management, and advanced analytics from a single powerful dashboard.',
        problem: 'Retail chains with multiple locations struggle to maintain separate online stores, sync inventory across branches, and manage orders from different outlets efficiently.',
        solution: 'A unified multi-store e-commerce platform with centralized management, real-time inventory sync across locations, cross-store order routing, and AI-powered demand forecasting.',
        features: ['Multi-Store Management', 'Centralized Product Catalog', 'Real-Time Inventory Sync', 'Cross-Store Order Routing', 'Location-Based Pricing', 'Multi-Payment Gateway', 'Store-Specific Promotions', 'AI Demand Forecasting', 'Bulk Inventory Updates', 'Order Management Dashboard', 'Customer Segmentation', 'Analytics & Reports', 'Mobile App Integration', 'POS Integration', 'Multi-Currency Support'],
        businessImpact: 'Centralized multi-store operations • 99.9% inventory accuracy • 2x faster order fulfillment • Reduced operational costs',
        results: 'Centralized multi-store operations, 99.9% inventory accuracy, 2x faster fulfillment',
        featuredImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        galleryImages: ['https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'],
        isFeatured: true, status: 'published', completionDate: new Date('2025-04-20'),
      },
      {
        title: 'AIQP – AI Question Paper Generation & Assessment Platform',
        slug: 'aiqp-ai-question-paper-platform',
        clientName: 'Educational Institutions',
        category: 'Education',
        technologies: ['AI', 'ML', 'NLP', 'Python', 'TensorFlow', 'React', 'Node.js', 'MongoDB'],
        description: 'An advanced AI-powered assessment platform for educational institutions that automatically extracts, categorizes, and analyzes uploaded question banks, enabling intelligent question paper generation based on historical patterns, difficulty levels, syllabus mapping, and learning objectives.',
        overview: 'AIQP is an advanced AI-powered assessment platform designed for educational institutions, coaching centers, universities, and training organizations. The system automatically extracts, categorizes, and analyzes uploaded question banks, enabling intelligent question paper generation based on historical patterns, difficulty levels, syllabus mapping, and learning objectives.',
        problem: 'Educational institutions spend significant time manually creating examination papers, maintaining question banks, and ensuring balanced assessments.',
        solution: 'AIQP leverages Artificial Intelligence and Machine Learning to analyze uploaded question sets and generate high-quality examination papers automatically while maintaining syllabus coverage and difficulty balance.',
        features: ['AI Question Paper Generation', 'Question Bank Management', 'Automatic Question Extraction', 'Math Equation & Formula Support', 'Excel & CSV Import', 'Diagram & Image-Based Questions', 'Duplicate Question Detection', 'Smart Bookmarking System', 'Difficulty Level Classification', 'Subject-Wise Categorization', 'Question Usage Tracking', 'AI-Based Question Analysis', 'Exam Pattern Learning', 'Multi-Language Support', 'Export to PDF & Word', 'Online Examination Module', 'Analytics Dashboard'],
        businessImpact: '80% reduction in paper preparation time • Improved assessment quality • Automated question management • Scalable examination process',
        results: '80% reduction in paper preparation time, improved assessment quality',
        featuredImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop',
        galleryImages: ['https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop'],
        isFeatured: true, status: 'published', completionDate: new Date('2025-01-15'),
      },
      {
        title: 'Dealer Distributor Management System',
        slug: 'dealer-distributor-management-system',
        clientName: 'Distribution Enterprises',
        category: 'Web Apps',
        technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'Docker', 'AWS'],
        description: 'A complete B2B distribution management platform that streamlines dealer networks, inventory management, order processing, sales tracking, and distributor operations from a single centralized dashboard.',
        overview: 'A complete B2B distribution management platform that streamlines dealer networks, inventory management, order processing, sales tracking, and distributor operations from a single centralized dashboard.',
        problem: 'Businesses struggle with managing multiple dealers, distributors, inventory levels, and sales operations across regions.',
        solution: 'A centralized cloud platform enabling real-time dealer management, inventory tracking, order automation, and business intelligence reporting.',
        features: ['Dealer Management', 'Distributor Management', 'Inventory Tracking', 'Order Management', 'Sales Analytics', 'Territory Management', 'Payment Tracking', 'Invoice Generation', 'Product Catalog Management', 'Role-Based Access Control', 'Mobile App Access', 'Real-Time Reporting', 'Warehouse Management', 'Multi-Branch Support'],
        businessImpact: 'Increased operational efficiency • Reduced inventory errors • Better sales visibility • Faster order processing',
        results: 'Increased operational efficiency, reduced inventory errors, better sales visibility',
        featuredImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
        galleryImages: ['https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1553729459-afe8f2e0e85a?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'],
        isFeatured: true, status: 'published', completionDate: new Date('2025-02-01'),
      },
      {
        title: 'AI-Powered Job Portal & Recruitment Platform',
        slug: 'ai-job-portal-recruitment-platform',
        clientName: 'Hiring Platforms',
        category: 'AI Solutions',
        technologies: ['AI', 'Python', 'NLP', 'React', 'Node.js', 'PostgreSQL', 'Elasticsearch'],
        description: 'A modern recruitment ecosystem connecting employers and job seekers through AI-powered matching, resume analysis, candidate scoring, and intelligent hiring recommendations.',
        overview: 'A modern recruitment ecosystem connecting employers and job seekers through AI-powered matching, resume analysis, candidate scoring, and intelligent hiring recommendations.',
        problem: 'Recruiters spend excessive time screening resumes and identifying suitable candidates.',
        solution: 'The platform uses AI algorithms to analyze resumes, evaluate candidate skills, score applicants, and recommend top talent automatically.',
        features: ['AI Resume Parsing', 'Candidate Scoring Engine', 'Smart Job Matching', 'Applicant Tracking System (ATS)', 'Company Portal', 'Candidate Portal', 'Resume Builder', 'Interview Scheduling', 'Skill Assessment Tests', 'AI Recommendation Engine', 'Recruiter Dashboard', 'Hiring Analytics', 'Job Alerts', 'Multi-Company Support'],
        businessImpact: 'Faster hiring process • Improved candidate quality • Reduced recruitment costs • Better hiring decisions',
        results: 'Faster hiring process, improved candidate quality, reduced recruitment costs',
        featuredImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop',
        galleryImages: ['https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop'],
        isFeatured: true, status: 'published', completionDate: new Date('2025-02-15'),
      },
      {
        title: 'Service Marketplace & Freelancer Matching Platform',
        slug: 'service-marketplace-freelancer-matching',
        clientName: 'Marketplace Ventures',
        category: 'Marketplace',
        technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Stripe', 'AWS'],
        description: 'An AI-powered marketplace where businesses can find service providers, agencies, consultants, and freelancers based on project requirements, ratings, expertise, and budget.',
        overview: 'An AI-powered marketplace where businesses can find service providers, agencies, consultants, and freelancers based on project requirements, ratings, expertise, and budget.',
        problem: 'Companies often struggle to identify the right service provider or freelancer for their specific project needs.',
        solution: 'The platform uses AI recommendations to match businesses with the most suitable professionals and agencies.',
        features: ['AI Service Recommendations', 'Freelancer Marketplace', 'Service Provider Directory', 'Smart Matching Algorithm', 'Project Posting', 'Proposal Management', 'Secure Messaging', 'Rating & Reviews', 'Escrow Payments', 'Contract Management', 'Service Categories', 'Analytics Dashboard', 'Portfolio Showcase', 'AI Talent Suggestions'],
        businessImpact: 'Better service-provider matching • Faster project execution • Increased client satisfaction • Reduced hiring risks',
        results: 'Better service-provider matching, faster project execution, increased satisfaction',
        featuredImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop',
        galleryImages: ['https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop'],
        isFeatured: true, status: 'published', completionDate: new Date('2025-03-01'),
      },
      {
        title: 'AI-Powered Online Examination Platform',
        slug: 'ai-online-examination-platform',
        clientName: 'Testing Organizations',
        category: 'Education',
        technologies: ['AI', 'Computer Vision', 'Python', 'React', 'Node.js', 'WebRTC', 'MongoDB'],
        description: 'A comprehensive online assessment platform with AI-powered proctoring, advanced analytics, and intelligent examination monitoring.',
        overview: 'A comprehensive online assessment platform similar to Testbook, enhanced with AI-powered proctoring, advanced analytics, and intelligent examination monitoring.',
        problem: 'Organizations require secure and scalable online examination systems capable of preventing cheating and monitoring candidate behavior.',
        solution: 'An intelligent testing ecosystem combining online examinations with AI proctoring, facial monitoring, and advanced performance analytics.',
        features: ['Online Test Creation', 'AI Proctoring', 'Face Detection', 'Multiple Face Detection Alerts', 'Tab Switching Detection', 'Browser Monitoring', 'Screen Activity Tracking', 'Automated Violation Reports', 'Question Bank Management', 'Mock Tests', 'Adaptive Testing', 'Performance Analytics', 'Leaderboards', 'Certification System', 'Institution Management'],
        businessImpact: 'Secure online examinations • Reduced malpractice incidents • Detailed performance insights • Scalable assessment infrastructure',
        results: 'Secure online examinations, reduced malpractice, detailed performance insights',
        featuredImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&h=600&fit=crop',
        galleryImages: ['https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop'],
        isFeatured: true, status: 'published', completionDate: new Date('2025-03-15'),
      },
      {
        title: 'InstaStore AI – Multi-Tenant Ecommerce Builder Platform',
        slug: 'instastore-ai-ecommerce-builder',
        clientName: 'Ecommerce SaaS',
        category: 'SaaS',
        technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe', 'Razorpay', 'AWS', 'Docker'],
        description: 'A next-generation SaaS ecommerce platform that enables businesses to launch a fully functional online store within 60 seconds. Includes Super Admin Panel for managing thousands of stores, subscriptions, domains, themes, and platform-wide operations.',
        overview: 'InstaStore AI is a next-generation SaaS ecommerce platform that enables businesses to launch a fully functional online store within 60 seconds. Similar to Shopify, merchants can create stores instantly, choose themes, manage products, accept payments, and run their business from a powerful admin dashboard. The platform includes a Super Admin Panel for managing thousands of stores, subscriptions, domains, themes, and platform-wide operations.',
        problem: 'Small and medium businesses face high development costs, technical complexity, and lengthy deployment times when creating an online store.',
        solution: 'InstaStore AI allows anyone to launch a professional ecommerce website with a custom subdomain, modern storefront, payment gateway integration, and complete store management tools in under a minute.',
        features: ['Multi-Tenant SaaS Architecture', '60-Second Store Creation', 'AI Store Creation', 'AI Product Description Generator', 'AI SEO Content Generator', 'Theme Builder with Drag & Drop', 'Custom Domain Support', 'Subdomain Management', 'Super Admin Panel', 'Merchant Admin Dashboard', 'Product Management', 'Inventory Management', 'Order Processing', 'Multi-Payment Gateway (Stripe, Razorpay, PayPal)', 'Coupon & Discount Management', 'Abandoned Cart Recovery', 'Subscription Management', 'Analytics Dashboard', 'Mobile Responsive Design', 'GST & Tax Management'],
        businessImpact: 'Launch Ecommerce Store in 60 Seconds • Zero Coding Required • Reduced Setup Costs • Faster Time to Market • Scalable SaaS Infrastructure • Unlimited Store Creation',
        results: 'Launch store in 60 seconds, zero coding required, scalable SaaS infrastructure',
        featuredImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        galleryImages: ['https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop'],
        isFeatured: true, status: 'published', completionDate: new Date('2025-04-01'),
      },
    ]);

    // Blogs
    await Blog.insertMany([
      { title: 'The Future of AI in Business: Trends for 2025', slug: 'future-of-ai-in-business-2024', excerpt: 'Explore how artificial intelligence is reshaping business operations and what trends will dominate the coming years.', content: '<p>Artificial intelligence continues to transform industries at an unprecedented pace...</p>', category: 'AI', tags: ['AI', 'Business', 'Technology'], readTime: '8 min read', isPublished: true, publishedAt: new Date('2025-01-15'), metaTitle: 'Future of AI in Business 2025 | Agentrax', metaDescription: 'Explore how AI is reshaping business operations.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop' },
      { title: 'Why Next.js 15 is the Ultimate Choice for Modern Web Apps', slug: 'why-choose-nextjs-for-web-development', excerpt: 'Discover the powerful features of Next.js 15 and why it is the preferred framework.', content: '<p>Next.js 15 brings groundbreaking features...</p>', category: 'Software Development', tags: ['Next.js', 'Web Development', 'React'], readTime: '6 min read', isPublished: true, publishedAt: new Date('2025-01-10'), image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop' },
      { title: 'Mobile App Development Cost: Complete Guide 2025', slug: 'mobile-app-development-cost-guide', excerpt: 'A comprehensive breakdown of mobile app development costs and factors that influence pricing.', content: '<p>Understanding mobile app development costs...</p>', category: 'Mobile Apps', tags: ['Mobile Apps', 'Development', 'Cost Guide'], readTime: '10 min read', isPublished: true, publishedAt: new Date('2025-01-05'), image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop' },
      { title: 'SaaS Development Best Practices for 2025', slug: 'saas-development-best-practices', excerpt: 'Learn the essential best practices for building scalable and successful SaaS platforms.', content: '<p>Building a successful SaaS platform requires...</p>', category: 'SaaS', tags: ['SaaS', 'Development', 'Best Practices'], readTime: '7 min read', isPublished: true, publishedAt: new Date('2024-12-28'), image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop' },
      { title: 'How to Implement a DevOps Pipeline: Step-by-Step Guide', slug: 'implementing-devops-pipeline', excerpt: 'A practical guide to setting up CI/CD pipelines and DevOps practices.', content: '<p>DevOps has become essential for modern software development...</p>', category: 'DevOps', tags: ['DevOps', 'CI/CD', 'Automation'], readTime: '9 min read', isPublished: true, publishedAt: new Date('2024-12-20'), image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop' },
      { title: 'Business Process Automation: Complete Implementation Guide', slug: 'business-process-automation-guide', excerpt: 'Transform your business operations with intelligent automation.', content: '<p>Business process automation is revolutionizing...</p>', category: 'Business Automation', tags: ['Automation', 'Business', 'Workflow'], readTime: '8 min read', isPublished: true, publishedAt: new Date('2024-12-15'), image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop' },
    ]);

    // Testimonials
    await Testimonial.insertMany([
      { name: 'Sarah Johnson', company: 'TechVentures Inc', designation: 'CEO', content: 'Agentrax transformed our digital presence completely. Their team\'s expertise in AI and modern web technologies helped us achieve 3x growth in just 6 months.', rating: 5, order: 1 },
      { name: 'Michael Chen', company: 'DataFlow Systems', designation: 'CTO', content: 'The custom software solution from Agentrax revolutionized our operations. Professional, on-time, and exceeded all expectations.', rating: 5, order: 2 },
      { name: 'Emily Rodriguez', company: 'HealthTech Labs', designation: 'Founder', content: 'Our AI-powered healthcare platform built by Agentrax is absolutely phenomenal. They truly understand how to blend technology with business needs.', rating: 5, order: 3 },
      { name: 'David Park', company: 'FinScale Corp', designation: 'VP Engineering', content: 'Outstanding DevOps and cloud migration services. Zero downtime during migration and 40% cost reduction on infrastructure.', rating: 5, order: 4 },
      { name: 'Lisa Thompson', company: 'RetailTech Global', designation: 'Product Director', content: 'The mobile app Agentrax built for us has 4.8 stars on both stores. User engagement increased by 200% within the first quarter.', rating: 5, order: 5 },
    ]);

    // Leads
    await Lead.insertMany([
      { name: 'John Smith', company: 'TechCorp', email: 'john@techcorp.com', phone: '+1-555-0101', projectType: 'Web Application', budget: '$50,000 - $100,000', notes: 'Interested in enterprise web platform', status: 'new' },
      { name: 'Alice Wong', company: 'DataVista', email: 'alice@datavista.io', phone: '+1-555-0102', projectType: 'AI Solutions', budget: '$100,000+', notes: 'Looking for AI-powered analytics', status: 'contacted' },
      { name: 'Bob Martinez', company: 'CloudScale', email: 'bob@cloudscale.co', phone: '+1-555-0103', projectType: 'DevOps', budget: '$15,000 - $50,000', notes: 'Needs CI/CD pipeline setup', status: 'proposal_sent' },
    ]);

    // SEO defaults
    const defaultPages = [
      { page: 'home', metaTitle: 'Agentrax – Intelligence That Delivers | Software Development & AI Agency', metaDescription: 'We build websites, mobile apps, custom software, AI automation, and cloud solutions that help businesses scale faster.', isActive: true },
      { page: 'services', metaTitle: 'Our Services | Agentrax – Software Development & AI Agency', metaDescription: 'Comprehensive software development services including web, mobile, SaaS, AI, DevOps, and cloud solutions.', isActive: true },
      { page: 'portfolio', metaTitle: 'Portfolio | Agentrax – Our Work', metaDescription: 'Explore our portfolio of successful projects across web, mobile, SaaS, AI, and e-commerce.', isActive: true },
      { page: 'blog', metaTitle: 'Blog | Agentrax – Insights & Resources', metaDescription: 'Expert insights on software development, AI, mobile apps, SaaS, and digital transformation.', isActive: true },
    ];
    await SEO.insertMany(defaultPages);

    // Settings
    const defaultSettings = Setting.getDefaults();
    await Promise.all(
      Object.entries(defaultSettings).map(([key, value]) => Setting.create({ key, value }))
    );

    console.log('Database seeded successfully!');
    console.log('Admin login: admin@agentrax.com / Admin@123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
