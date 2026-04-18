import React, { useMemo, useState } from 'react';
import { BrowserRouter, Link, NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

const campaigns = [
  {
    id: 1,
    title: 'Clean Up Canberra Parks',
    description: 'Help organise volunteers and raise awareness for cleaner public spaces.',
    category: 'Environment',
  },
  {
    id: 2,
    title: 'Support Local Food Drives',
    description: 'Connect donors, volunteers, and organisers to support families in need.',
    category: 'Community',
  },
  {
    id: 3,
    title: 'Promote Small Local Businesses',
    description: 'Give local businesses a place to share their services and reach more people.',
    category: 'Business',
  },
  {
    id: 4,
    title: 'Mental Health Awareness Week',
    description: 'Share support resources and encourage open conversations in the community.',
    category: 'Health',
  },
  {
    id: 5,
    title: 'Youth Skills Workshop',
    description: 'Create learning opportunities for young people through local mentoring programs.',
    category: 'Education',
  },
  {
    id: 6,
    title: 'Local Makers Market',
    description: 'Help small business owners reach more people through a community event.',
    category: 'Business',
  },
];

function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          SocialSpark
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/campaigns">Campaigns</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/logout">Logout</NavLink>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="btn btn-outline-light">
            Login
          </Link>
          <Link to="/register" className="btn btn-green">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">Social awareness platform</p>
          <h1>Support causes that matter in your community</h1>
          <p className="hero-text">
            Browse campaigns, share ideas, and give small local businesses a place to be seen.
          </p>
          <div className="hero-buttons">
            <Link to="/campaigns" className="btn btn-green">
              Explore Campaigns
            </Link>
            <Link to="/register" className="btn btn-light">
              Create Account
            </Link>
          </div>
        </div>

        <div className="hero-card-wrap">
          <div className="hero-card">
            <div className="hero-image-placeholder"></div>
            <div className="hero-lines">
              <div></div>
              <div></div>
              <div></div>
            </div>

            <div className="stats-grid">
              <div className="stat-box stat-green">
                <p>Active campaigns</p>
                <h3>24</h3>
              </div>
              <div className="stat-box stat-blue">
                <p>New supporters</p>
                <h3>138</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCards() {
  const features = [
    {
      title: 'Browse Causes',
      text: 'Find campaigns based on issues that matter to you and your local area.',
    },
    {
      title: 'Create Campaigns',
      text: 'Share ideas, spread awareness, and invite other people to support your cause.',
    },
    {
      title: 'Support Businesses',
      text: 'Give small businesses a platform to reach more people in the community.',
    },
  ];

  return (
    <section className="features-section">
      <div className="container card-grid three-col">
        {features.map((feature) => (
          <div key={feature.title} className="feature-card">
            <div className="icon-box"></div>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CampaignCard({ title, description, category }) {
  return (
    <article className="campaign-card">
      <div className="campaign-image"></div>
      <div className="campaign-content">
        <span className="badge">{category}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        <button className="btn btn-outline-blue">Learn More</button>
      </div>
    </article>
  );
}

function FeaturedCampaigns() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow green-text">Featured</p>
          <h2>Featured campaigns</h2>
        </div>

        <div className="card-grid three-col">
          {campaigns.slice(0, 3).map((campaign) => (
            <CampaignCard key={campaign.id} {...campaign} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <AppLayout>
      <Hero />
      <FeatureCards />
      <FeaturedCampaigns />
    </AppLayout>
  );
}

function CampaignsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = useMemo(() => ['All', ...new Set(campaigns.map((item) => item.category))], []);

  const filteredCampaigns =
    selectedCategory === 'All'
      ? campaigns
      : campaigns.filter((item) => item.category === selectedCategory);

  return (
    <AppLayout>
      <section className="section">
        <div className="container">
          <div className="campaign-top">
            <div>
              <p className="eyebrow green-text">Campaigns</p>
              <h1 className="page-title">Explore community campaigns</h1>
              <p className="page-text">
                This page shows sample campaign cards for the frontend prototype. Users can browse
                different causes and business promotions.
              </p>
            </div>

            <div className="filter-box">
              <label>Filter by category</label>
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="card-grid three-col">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}

function AuthCard({ title, subtitle, children, footer }) {
  return (
    <AppLayout>
      <section className="auth-section">
        <div className="auth-card">
          <div className="auth-left">
            <p className="eyebrow">SocialSpark</p>
            <h2>Build a simple and friendly user experience</h2>
            <p>
              This frontend prototype focuses on clean design, easy navigation, and basic form
              validation for Stage 2.
            </p>
          </div>

          <div className="auth-right">
            <h1>{title}</h1>
            <p className="auth-subtitle">{subtitle}</p>
            <div className="auth-form-wrap">{children}</div>
            {footer ? <div className="auth-footer">{footer}</div> : null}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}

function FormField({ label, type = 'text', name, value, onChange, error, placeholder }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? 'input-error' : ''}
      />
      {error ? <p className="error-text">{error}</p> : null}
    </div>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!form.email.includes('@')) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!form.password.trim()) {
      nextErrors.password = 'Please enter your password.';
    } else if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      navigate('/campaigns');
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Use the sample form below to log in to the frontend prototype."
      footer={
        <>
          Don't have an account?{' '}
          <Link to="/register" className="text-link">
            Create one here
          </Link>
          .
        </>
      }
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <FormField
          label="Email address"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email"
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
        />
        <button type="submit" className="btn btn-blue full-width">
          Log In
        </button>
      </form>
    </AuthCard>
  );
}

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!form.email.includes('@')) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!form.password.trim()) {
      nextErrors.password = 'Please enter a password.';
    } else if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }

    if (!form.confirmPassword.trim()) {
      nextErrors.confirmPassword = 'Please confirm your password.';
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      navigate('/login');
    }
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="This sample registration form includes simple frontend validation."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="text-link">
            Log in here
          </Link>
          .
        </>
      }
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <FormField
          label="Full name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="Enter your full name"
        />
        <FormField
          label="Email address"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email"
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Create a password"
        />
        <FormField
          label="Confirm password"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
        />
        <button type="submit" className="btn btn-green full-width">
          Register
        </button>
      </form>
    </AuthCard>
  );
}

function LogoutPage() {
  return (
    <AuthCard
      title="You have been logged out"
      subtitle="This is a simple frontend-only logout screen for the prototype."
      footer={
        <Link to="/login" className="text-link">
          Return to login
        </Link>
      }
    >
      <div className="logout-box">
        <p>
          In the full version of the project, this page can clear the user session and redirect the
          user back to the home page or login page.
        </p>
      </div>
    </AuthCard>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h4>SocialSpark</h4>
          <p>A simple frontend prototype for a social awareness web application.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Campaigns</li>
            <li>Login</li>
            <li>Register</li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>FAQ</li>
            <li>Help Centre</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function NotFoundPage() {
  return (
    <AppLayout>
      <section className="not-found">
        <div className="container center-text">
          <p className="eyebrow green-text">404</p>
          <h1>Page not found</h1>
          <p>The page you are looking for does not exist in this frontend prototype.</p>
          <Link to="/" className="btn btn-blue">
            Back to home
          </Link>
        </div>
      </section>
    </AppLayout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}