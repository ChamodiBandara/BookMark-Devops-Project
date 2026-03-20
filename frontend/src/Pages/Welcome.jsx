import React from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
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
  ArrowRight
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="rounded-3xl p-8 border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-colors duration-300">
    <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 mb-6">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-2xl font-bold text-slate-100 mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const PlatformPill = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-3 px-6 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300">
    <Icon className="w-5 h-5 text-blue-400" />
    <span className="font-medium text-slate-300">{label}</span>
  </div>
);

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden selection:bg-blue-500/30">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-24">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[110px]" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[110px]" />
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-slate-800/60 rounded-full blur-[110px]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-50 mb-6">
            BookMark
          </h1>

          <p className="text-lg md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Save, organize, and instantly search your important URLs — DevOps docs,
            dashboards, playlists, tools, and tutorials — all in one place.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="group inline-flex items-center gap-3 px-9 py-4 rounded-full text-lg font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] hover:-translate-y-1"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-24 px-6 border-t border-white/5 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Your personal link hub,
              <br />
              <span className="text-blue-400">clean & organized.</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Built for quick saving and fast retrieval — especially useful for DevOps learning and daily tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Bookmark}
              title="Save Anything"
              description="Paste any URL from YouTube, docs, dashboards, GitHub, or anywhere. Keep it safe for later."
            />
            <FeatureCard
              icon={Folder}
              title="Organize Your Way"
              description="Create folders and subfolders to match your workflow: CI/CD, Docker, K8s, Monitoring, etc."
            />
            <FeatureCard
              icon={Search}
              title="Find Instantly"
              description="Search by title, URL, or tags and retrieve links instantly when you need them most."
            />
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/60 pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-10">
            Save Links From Anywhere
          </h2>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <PlatformPill icon={Youtube} label="YouTube" />
            <PlatformPill icon={Globe} label="Web & Social" />
            <PlatformPill icon={BookOpen} label="Learning" />
            <PlatformPill icon={Briefcase} label="Work" />
            <PlatformPill icon={Music} label="Music" />
            <PlatformPill icon={Film} label="Videos" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center rounded-[2rem] p-12 md:p-16 border border-white/10 bg-white/5 backdrop-blur-xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-50">
            Ready to organize your links?
          </h2>

          <button
            onClick={() => navigate("/login")}
            className="px-10 py-5 rounded-full text-lg font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 hover:-translate-y-1"
          >
            Go to Login
          </button>
        </div>
      </section>
    </div>
  );
}