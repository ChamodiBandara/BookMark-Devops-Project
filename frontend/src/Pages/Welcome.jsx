import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bookmark,
  Folder,
  Search,
  Youtube,
  Globe,
  BookOpen,
  Briefcase,
  Music,
  Film,
  ArrowRight,
  Zap,
  Lock,
  Tag
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, accent, delay }) => (
  <div
    className="group relative rounded-2xl p-7 border border-white/8 overflow-hidden transition-all duration-500 hover:-translate-y-1"
    style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
      animationDelay: delay,
    }}
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse at 0% 0%, ${accent}18 0%, transparent 60%)`,
      }}
    />
    <div
      className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5"
      style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
    >
      <Icon className="w-5 h-5" style={{ color: accent }} />
    </div>
    <h3 className="text-lg font-semibold text-slate-100 mb-2 relative">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed relative">{description}</p>
  </div>
);

const PlatformPill = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/10 bg-white/4 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300 cursor-default">
    <Icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
    <span className="text-sm font-medium text-slate-300 whitespace-nowrap">{label}</span>
  </div>
);

const StatBadge = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl font-bold text-white tabular-nums">{value}</span>
    <span className="text-xs text-slate-500 mt-1 tracking-wide uppercase">{label}</span>
  </div>
);

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen text-white overflow-hidden"
      style={{
        background: "#020617",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-28 text-center">
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Eyebrow badge */}
        <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 border border-blue-500/25 bg-blue-500/8 text-blue-400 text-xs font-semibold tracking-widest uppercase">
          <span
            className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"
          />
          Your personal link hub
        </div>

        {/* Title */}
        <h1
          className="relative text-[clamp(4rem,12vw,8.5rem)] font-black tracking-tight leading-none text-white mb-0"
          style={{ letterSpacing: "-0.04em" }}
        >
          Book
          <span
            style={{
              background: "linear-gradient(135deg, #60a5fa 0%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Mark
          </span>
        </h1>

        {/* Thin rule under title */}
        <div className="relative flex items-center justify-center gap-4 my-8 w-full max-w-xs mx-auto">
          <div className="flex-1 h-px bg-white/8" />
          <Bookmark className="w-4 h-4 text-blue-500/60" />
          <div className="flex-1 h-px bg-white/8" />
        </div>

        {/* Tagline — split into two clear lines for rhythm */}
        <p className="relative text-slate-400 max-w-xl mx-auto text-lg leading-relaxed mb-10">
          Save any URL in seconds.
          <br />
          <span className="text-slate-300">
            Organize into folders. Find anything instantly.
          </span>
        </p>

        {/* CTA row */}
        <div className="relative flex flex-col sm:flex-row items-center gap-4 mb-20">
          <button
            onClick={() => navigate("/login")}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_48px_-8px_rgba(59,130,246,0.55)]"
            style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
          >
            Get Started Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-medium text-slate-300 border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
          >
            Sign In
          </button>
        </div>

        {/* Stats row */}
        <div className="relative flex items-center justify-center gap-12 py-5 px-10 rounded-2xl border border-white/6 bg-white/3">
          <StatBadge value="10k+" label="Bookmarks saved" />
          <div className="w-px h-8 bg-white/10" />
          <StatBadge value="50+" label="Platforms supported" />
          <div className="w-px h-8 bg-white/10" />
          <StatBadge value="< 1s" label="Search speed" />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section
        className="relative py-28 px-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400/70 mb-4">
              Why BookMark
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight">
              Everything you need,
              <br />
              <span className="text-slate-400 font-light">nothing you don't.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={Bookmark}
              title="Save in One Click"
              description="Paste any URL — YouTube videos, documentation, GitHub repos, dashboards — and save instantly with automatic title detection."
              accent="#3b82f6"
              delay="0ms"
            />
            <FeatureCard
              icon={Folder}
              title="Smart Folders"
              description="Build nested folder hierarchies that match your workflow: CI/CD → Docker → K8s. Your structure, your rules."
              accent="#06b6d4"
              delay="80ms"
            />
            <FeatureCard
              icon={Search}
              title="Instant Search"
              description="Full-text search across titles, URLs, and tags. Find any link in under a second, no matter how large your collection."
              accent="#8b5cf6"
              delay="160ms"
            />
            <FeatureCard
              icon={Tag}
              title="Tags & Labels"
              description="Attach multiple tags to any bookmark. Cross-reference links across folders without duplicating them."
              accent="#10b981"
              delay="240ms"
            />
            <FeatureCard
              icon={Zap}
              title="Lightning Fast"
              description="Built for speed from the ground up. Add, search, and open links with minimal friction — even on slow connections."
              accent="#f59e0b"
              delay="320ms"
            />
            <FeatureCard
              icon={Lock}
              title="Private & Secure"
              description="Your bookmarks are yours. Everything is stored securely with end-to-end protection and no third-party tracking."
              accent="#ef4444"
              delay="400ms"
            />
          </div>
        </div>
      </section>

      {/* ── PLATFORMS ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-600 mb-10">
            Save links from anywhere
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <PlatformPill icon={Youtube} label="YouTube" />
            <PlatformPill icon={Globe} label="Web & Social" />
            <PlatformPill icon={BookOpen} label="Learning" />
            <PlatformPill icon={Briefcase} label="Work Tools" />
            <PlatformPill icon={Music} label="Music" />
            <PlatformPill icon={Film} label="Videos" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div
          className="relative max-w-3xl mx-auto text-center rounded-3xl p-14 overflow-hidden"
          style={{
            border: "1px solid rgba(59,130,246,0.2)",
            background:
              "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(8,8,30,0.6) 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 120%, rgba(59,130,246,0.15), transparent)",
            }}
          />
          <p className="relative text-xs font-bold tracking-[0.2em] uppercase text-blue-400/70 mb-4">
            Get started today
          </p>
          <h2 className="relative text-3xl md:text-4xl font-bold text-slate-100 mb-4 leading-tight">
            Ready to take control
            <br />
            of your links?
          </h2>
          <p className="relative text-slate-500 mb-10 text-base">
            Free to use. No credit card required.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="relative inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_48px_-8px_rgba(59,130,246,0.6)]"
            style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
          >
            Create your free account
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer line */}
      <div className="pb-10 text-center">
        <p className="text-slate-700 text-xs">
          © {new Date().getFullYear()} BookMark · Built for people who save things
        </p>
      </div>
    </div>
  );
}