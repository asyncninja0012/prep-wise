import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Navbar ─────────────────────────────────────────── */}
      <header className="landing-nav">
        <div className="landing-nav-inner">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image src="/logo.svg" alt="PrepWise logo" width={38} height={32} />
            <span className="text-2xl font-bold text-primary-100 tracking-tight">
              PrepWise
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How it Works</a>
            <a href="#testimonials" className="nav-link">Testimonials</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="nav-btn-secondary">
              Sign In
            </Link>
            <Link href="/sign-up" className="nav-btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />

        <div className="hero-inner">
          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            AI-Powered Interview Coach
          </div>

          <h1 className="hero-heading">
            Ace Every Interview with{' '}
            <span className="hero-heading-gradient">AI-Powered</span>{' '}
            Practice
          </h1>

          <p className="hero-subheading">
            PrepWise gives you real interview questions, instant AI feedback,
            and detailed performance analytics — so you walk into every
            interview with confidence.
          </p>

          <div className="hero-cta">
            <Link href="/sign-up" className="hero-btn-primary">
              Start Practicing Free
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/sign-in" className="hero-btn-secondary">
              Sign In to Dashboard
            </Link>
          </div>

          <p className="hero-note">No credit card required · Free forever plan</p>
        </div>

        {/* Robot mascot */}
        <div className="hero-image-wrapper">
          <div className="hero-image-glow" />
          <Image
            src="/robot.png"
            alt="PrepWise AI Interviewer"
            width={480}
            height={480}
            className="relative z-10 drop-shadow-2xl animate-float"
            priority
          />
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────── */}
      <section className="stats-bar">
        {[
          { value: '10K+', label: 'Interviews Conducted' },
          { value: '95%', label: 'Success Rate' },
          { value: '500+', label: 'Question Types' },
          { value: '4.9★', label: 'User Rating' },
        ].map((stat) => (
          <div key={stat.label} className="stat-item">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section id="features" className="features-section">
        <div className="section-header">
          <div className="section-pill">Features</div>
          <h2 className="section-title">Everything you need to land the job</h2>
          <p className="section-subtitle">
            Our platform combines cutting-edge AI with proven interview techniques
            to prepare you for any role.
          </p>
        </div>

        <div className="features-grid">
          {[
            {
              icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="feature-icon-svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              ),
              title: 'AI-Driven Questions',
              desc: 'Our AI generates tailored interview questions based on the role, tech stack, and seniority level you select.',
              color: 'from-[#CAC5FE]/20 to-transparent',
              border: 'border-[#CAC5FE]/20',
            },
            {
              icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="feature-icon-svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                </svg>
              ),
              title: 'Instant AI Feedback',
              desc: 'Receive comprehensive feedback on your answers — clarity, technical accuracy, communication and more.',
              color: 'from-[#49de50]/20 to-transparent',
              border: 'border-[#49de50]/20',
            },
            {
              icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="feature-icon-svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              ),
              title: 'Voice Interview Mode',
              desc: 'Simulate real interviews with voice-to-voice AI conversations — just like talking to a real recruiter.',
              color: 'from-[#f75353]/20 to-transparent',
              border: 'border-[#f75353]/20',
            },
            {
              icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="feature-icon-svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              ),
              title: 'Performance Analytics',
              desc: 'Track your progress over time with detailed scoring breakdowns and improvement suggestions.',
              color: 'from-[#CAC5FE]/20 to-transparent',
              border: 'border-[#CAC5FE]/20',
            },
            {
              icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="feature-icon-svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                </svg>
              ),
              title: 'Tech Stack Coverage',
              desc: 'From React and TypeScript to Python, Kubernetes, and System Design — we cover hundreds of tech stacks.',
              color: 'from-[#49de50]/20 to-transparent',
              border: 'border-[#49de50]/20',
            },
            {
              icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="feature-icon-svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              ),
              title: 'Interview History',
              desc: 'Review past interviews, revisit feedback, and see exactly how you\'ve improved over every session.',
              color: 'from-[#f75353]/20 to-transparent',
              border: 'border-[#f75353]/20',
            },
          ].map((feature) => (
            <div key={feature.title} className={`feature-card bg-gradient-to-br ${feature.color} border ${feature.border}`}>
              <div className="feature-icon-wrapper">{feature.icon}</div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it Works ───────────────────────────────────── */}
      <section id="how-it-works" className="how-section">
        <div className="section-header">
          <div className="section-pill">Process</div>
          <h2 className="section-title">Get interview-ready in 3 steps</h2>
          <p className="section-subtitle">
            Simple, effective, and designed to maximise your preparation in the shortest time.
          </p>
        </div>

        <div className="steps-grid">
          {[
            {
              step: '01',
              title: 'Choose Your Role',
              desc: 'Select the job role, tech stack, experience level, and interview type (behavioral, technical, or mixed).',
            },
            {
              step: '02',
              title: 'Interview with AI',
              desc: 'Engage in a realistic voice interview with our AI agent. Answer questions naturally — just like the real thing.',
            },
            {
              step: '03',
              title: 'Review & Improve',
              desc: 'Get a detailed score report with category breakdowns, strengths, and personalized improvement tips.',
            },
          ].map((step, i) => (
            <div key={step.step} className="step-card">
              <div className="step-number">{step.step}</div>
              {i < 2 && <div className="step-connector" />}
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────── */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-header">
          <div className="section-pill">Testimonials</div>
          <h2 className="section-title">Loved by job seekers worldwide</h2>
        </div>

        <div className="testimonials-grid">
          {[
            {
              name: 'Aisha Patel',
              role: 'Software Engineer @ Google',
              avatar: '👩🏽‍💻',
              text: 'PrepWise helped me land my dream job at Google. The AI feedback was incredibly specific — it pointed out exactly where my answers lacked depth.',
            },
            {
              name: 'Marcus Chen',
              role: 'Frontend Dev @ Stripe',
              avatar: '👨🏻‍💻',
              text: 'After 2 weeks of daily practice on PrepWise, I went from failing every technical round to getting 3 offers. The voice interview mode is incredibly realistic.',
            },
            {
              name: 'Priya Sharma',
              role: 'Full-Stack Dev @ Shopify',
              avatar: '👩🏾‍💻',
              text: 'The performance analytics showed me I kept struggling with system design. Focused on that area and aced my final interviews. Can\'t recommend this enough!',
            },
          ].map((t) => (
            <div key={t.name} className="testimonial-card">
              <p className="testimonial-quote">&quot;{t.text}&quot;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────── */}
      <section className="cta-banner-section">
        <div className="cta-banner">
          <div className="cta-banner-glow" />
          <div className="cta-banner-content">
            <h2 className="cta-banner-title">Ready to ace your next interview?</h2>
            <p className="cta-banner-subtitle">
              Join thousands of engineers who transformed their interview performance with PrepWise.
            </p>
            <div className="cta-banner-buttons">
              <Link href="/sign-up" className="hero-btn-primary">
                Create Free Account
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/sign-in" className="hero-btn-secondary">
                Sign In
              </Link>
            </div>
          </div>
          <Image src="/robot.png" alt="PrepWise robot" width={280} height={280} className="cta-robot max-md:hidden" />
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="PrepWise logo" width={28} height={24} />
            <span className="font-bold text-primary-100">PrepWise</span>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} PrepWise. All rights reserved.</p>
          <div className="footer-links">
            <a href="#features" className="footer-link">Features</a>
            <a href="#how-it-works" className="footer-link">How it Works</a>
            <Link href="/sign-in" className="footer-link">Sign In</Link>
            <Link href="/sign-up" className="footer-link">Sign Up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
