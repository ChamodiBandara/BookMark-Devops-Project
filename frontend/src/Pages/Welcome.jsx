import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  PlayCircle,
  Code,
} from "lucide-react";

// --- Sub-components ---
const FloatingCard = ({
  title,
  subtitle,
  icon: Icon,
  colorClass,
  className,
  animationClass,
}) => (
  <div
    className={`absolute hidden lg:flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ${className} ${animationClass}`}
  >
    <div className={`p-3 rounded-xl ${colorClass} bg-opacity-20`}>
      <Icon className={`w-6 h-6 ${colorClass.replace("bg-", "text-")}`} />
    </div>
    <div>
      <p className="text-sm font-semibold text-slate-200">{title}</p>
      <p className="text-xs text-slate-400">{subtitle}</p>
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className="rounded-3xl p-8 border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-colors duration-500"
  >
    <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 mb-6">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-2xl font-bold text-slate-100 mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </motion.div>
);

const PlatformPill = ({ icon: Icon, label }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.05 }}
    className="flex items-center gap-3 px-6 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl hover:border-blue-500/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)] transition-all duration-300 cursor-default"
  >
    <Icon className="w-5 h-5 text-blue-400" />
    <span className="font-medium text-slate-300">{label}</span>
  </motion.div>
);

// --- Main Page Component ---
export default function Welcome() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  const headline = "BookMark — Your Personal URL Library".split(" ");

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden selection:bg-blue-500/30">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-6">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen blur-[110px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-screen blur-[110px] animate-pulse" />
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-slate-800/60 rounded-full mix-blend-screen blur-[110px] animate-pulse" />

        {/* Floating cards */}
        <FloatingCard
          title="DevOps Notes"
          subtitle="Runbooks & Commands"
          icon={Code}
          colorClass="bg-blue-500"
          className="top-1/4 left-[10%] -rotate-6"
          animationClass="animate-bounce"
        />
        <FloatingCard
          title="Learning Links"
          subtitle="Docs & Tutorials"
          icon={BookOpen}
          colorClass="bg-cyan-500"
          className="bottom-1/3 left-[15%] rotate-3"
          animationClass="animate-bounce"
        />
        <FloatingCard
          title="Watch Later"
          subtitle="YouTube Playlists"
          icon={PlayCircle}
          colorClass="bg-red-500"
          className="top-1/3 right-[10%] rotate-6"
          animationClass="animate-bounce"
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-x-3 gap-y-2 mb-8"
          >
            {headline.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-50"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            className="text-lg md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Save, organize, and instantly search your important URLs — DevOps
            docs, dashboards, playlists, tools, and tutorials — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
          >
            <button
              onClick={() => navigate("/login")}
              className="group inline-flex items-center gap-3 px-9 py-4 rounded-full text-lg font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] hover:-translate-y-1"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-28 px-6 border-t border-white/5 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Your personal link hub,
              <br />
              <span className="text-blue-400">clean & organized.</span>
            </motion.h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Built for quick saving and fast retrieval — especially useful for
              DevOps learning and daily tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Bookmark}
              title="Save Anything"
              description="Paste any URL from YouTube, docs, dashboards, GitHub, or anywhere. Keep it safe for later."
              delay={0.1}
            />
            <FeatureCard
              icon={Folder}
              title="Organize Your Way"
              description="Create folders and subfolders to match your workflow: CI/CD, Docker, K8s, Monitoring, etc."
              delay={0.3}
            />
            <FeatureCard
              icon={Search}
              title="Find Instantly"
              description="Search by title, URL, or tags and retrieve links instantly when you need them most."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/60 pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-10"
          >
            Save Links From Anywhere
          </motion.h2>

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
      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-blue-500/5 mix-blend-screen pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10 rounded-[3rem] p-12 md:p-20 border border-white/10 bg-white/5 backdrop-blur-xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-8 text-slate-50"
          >
            Ready to organize your links?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => navigate("/login")}
              className="px-10 py-5 rounded-full text-lg font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.55)] hover:-translate-y-1"
            >
              Go to Login
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}