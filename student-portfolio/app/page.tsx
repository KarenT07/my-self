"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, Mail, ExternalLink, Code2, Database, Palette, Brain, ChevronDown, Sparkles, Star, Heart, Coffee, Cloud, Moon, Sun, Ribbon } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

// 浮遊するバブル
function FloatingBubble({ delay, x, y, size, color }: { delay: number; x: number; y: number; size: number; color: string }) {
  return (
    <motion.div
      className={`absolute rounded-full ${color} blur-[1px]`}
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -40, 0],
        x: [0, 15, 0],
        scale: [1, 1.3, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 5 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

// キラキラ星
function TwinkleStar({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute text-yellow-300"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        opacity: [0.2, 1, 0.2],
        scale: [0.5, 1.2, 0.5],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 2 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Star className="fill-yellow-300" style={{ width: size, height: size }} />
    </motion.div>
  )
}

// 浮遊するハート
function FloatingHeart({ delay, x, y, size, color }: { delay: number; x: number; y: number; size: number; color: string }) {
  return (
    <motion.div
      className={`absolute ${color}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -30, 0],
        x: [0, 10, -10, 0],
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Heart className="fill-current" style={{ width: size, height: size }} />
    </motion.div>
  )
}

// ふわふわ雲
function CloudShape({ className, delay, scale = 1 }: { className: string; delay: number; scale?: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.4, 0.7, 0.4],
        x: [0, 30, 0],
        y: [0, -10, 0],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ scale }}
    >
      <div className="relative">
        <div className="w-40 h-20 bg-white/70 rounded-full blur-sm shadow-lg" />
        <div className="absolute -top-6 left-8 w-24 h-24 bg-white/60 rounded-full blur-sm" />
        <div className="absolute -top-3 left-20 w-20 h-20 bg-white/50 rounded-full blur-sm" />
        <div className="absolute top-2 -left-4 w-16 h-16 bg-white/40 rounded-full blur-sm" />
      </div>
    </motion.div>
  )
}

// リボン装飾
function RibbonDecoration({ className, color }: { className: string; color: string }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <svg width="60" height="40" viewBox="0 0 60 40" className={color}>
        <path d="M30 15 L10 5 L15 20 L5 35 L30 25 L55 35 L45 20 L50 5 Z" fill="currentColor" opacity="0.6"/>
        <circle cx="30" cy="20" r="8" fill="currentColor"/>
      </svg>
    </motion.div>
  )
}

// 浮遊する絵文字
function FloatingEmoji({ emoji, delay, x, y, size }: { emoji: string; delay: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: `${x}%`, top: `${y}%`, fontSize: size }}
      animate={{
        y: [0, -50, 0],
        x: [0, 20, -20, 0],
        rotate: [0, 15, -15, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {emoji}
    </motion.div>
  )
}

// キラキラスパークル
function SparkleEffect({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 2 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "easeOut"
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" className="text-yellow-300 fill-current">
        <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
      </svg>
    </motion.div>
  )
}

// 夢みたいな背景
function DreamyBackground() {
  const bubbleColors = [
    "bg-sky-200/60",
    "bg-cyan-200/60",
    "bg-blue-200/50",
    "bg-pink-200/50", 
    "bg-purple-200/40",
    "bg-indigo-200/50",
  ]

  const heartColors = [
    "text-sky-300/70",
    "text-cyan-300/70",
    "text-blue-300/60",
    "text-pink-300/60",
  ]

  // 可愛い絵文字リスト
  const cuteEmojis = [
    { emoji: "💙", count: 10 },
    { emoji: "💗", count: 8 },
    { emoji: "🩵", count: 12 },
    { emoji: "🩷", count: 7 },
    { emoji: "⭐", count: 8 },
    { emoji: "✨", count: 15 },
    { emoji: "🌸", count: 6 },
    { emoji: "🎀", count: 6 },
    { emoji: "☁️", count: 8 },
    { emoji: "🫧", count: 10 },
    { emoji: "💫", count: 8 },
    { emoji: "🦋", count: 5 },
    { emoji: "🍬", count: 4 },
    { emoji: "🧁", count: 3 },
    { emoji: "🌈", count: 3 },
  ]

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* 多層グラデーション背景 - もっとカラフルに */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-cyan-100 to-sky-200" />
      <div className="absolute inset-0 bg-gradient-to-r from-pink-200/60 via-transparent to-purple-200/60" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/40 via-transparent to-pink-200/40" />
      <div className="absolute inset-0 bg-gradient-to-bl from-violet-100/30 via-transparent to-rose-100/30" />
      
      {/* ふわふわ雲模様 SVG パターン - もっと目立つように */}
      <div className="absolute inset-0 opacity-50">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="clouds" x="0" y="0" width="180" height="90" patternUnits="userSpaceOnUse">
              <ellipse cx="40" cy="55" rx="40" ry="22" fill="#bae6fd" opacity="0.7" />
              <ellipse cx="65" cy="45" rx="30" ry="20" fill="#e0f2fe" opacity="0.8" />
              <ellipse cx="25" cy="50" rx="25" ry="18" fill="#f0f9ff" opacity="0.6" />
              <ellipse cx="130" cy="60" rx="45" ry="25" fill="#bae6fd" opacity="0.6" />
              <ellipse cx="155" cy="50" rx="32" ry="20" fill="#e0f2fe" opacity="0.7" />
              <ellipse cx="115" cy="55" rx="28" ry="18" fill="#f0f9ff" opacity="0.5" />
              <ellipse cx="90" cy="70" rx="20" ry="12" fill="#fbcfe8" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#clouds)" />
        </svg>
      </div>
      
      {/* 水玉パターンオーバーレイ - もっと濃く */}
      <div className="absolute inset-0 pattern-polka opacity-60" />
      
      {/* ハート柄オーバーレイ - もっと濃く */}
      <div className="absolute inset-0 pattern-hearts opacity-70" />
      
      {/* 星柄オーバーレイ - もっと濃く */}
      <div className="absolute inset-0 pattern-stars opacity-50" />
      
      {/* 大きなぼかしオーブ - もっと明るく鮮やかに */}
      <motion.div
        className="absolute -top-20 -left-20 w-[900px] h-[900px] rounded-full bg-gradient-to-br from-sky-400/50 via-cyan-300/40 to-blue-300/30 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 80, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 -right-20 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-pink-300/60 via-rose-200/50 to-purple-300/40 blur-3xl"
        animate={{
          scale: [1.1, 0.9, 1.1],
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-purple-200/50 via-pink-100/40 to-sky-200/30 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -60, 0],
          x: [0, -50, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-200/50 via-sky-100/40 to-blue-200/30 blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-yellow-100/30 via-orange-50/20 to-pink-100/30 blur-3xl"
        animate={{
          scale: [0.9, 1.2, 0.9],
          x: [0, -30, 30, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* 追加の小さなぼかしオーブ */}
      <motion.div
        className="absolute top-[20%] left-[60%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-pink-300/40 to-rose-200/30 blur-2xl"
        animate={{
          scale: [1, 1.5, 1],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[10%] w-[250px] h-[250px] rounded-full bg-gradient-to-br from-cyan-300/40 to-sky-200/30 blur-2xl"
        animate={{
          scale: [1.2, 0.8, 1.2],
          x: [0, 20, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 虹のアーチ */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] h-[80vh] rounded-b-full opacity-10"
        style={{
          background: "linear-gradient(180deg, transparent 0%, #fca5a5 15%, #fcd34d 30%, #86efac 45%, #7dd3fc 60%, #c4b5fd 75%, #f9a8d4 90%, transparent 100%)"
        }}
        animate={{
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 雲 - もっと多く */}
      <CloudShape className="top-10 left-[5%]" delay={0} scale={1.1} />
      <CloudShape className="top-20 right-[8%]" delay={1} scale={1.3} />
      <CloudShape className="top-[35%] left-[15%]" delay={2} scale={0.9} />
      <CloudShape className="bottom-48 left-[25%]" delay={3} scale={1} />
      <CloudShape className="top-[45%] right-[20%]" delay={4} scale={0.85} />
      <CloudShape className="bottom-32 right-[25%]" delay={5} scale={0.75} />
      <CloudShape className="top-[60%] left-[40%]" delay={6} scale={0.7} />
      <CloudShape className="bottom-[15%] left-[50%]" delay={7} scale={0.95} />

      {/* キラキラスパークル - もっと増やす */}
      {[...Array(35)].map((_, i) => (
        <SparkleEffect
          key={`sparkle-${i}`}
          delay={i * 0.3}
          x={Math.random() * 100}
          y={Math.random() * 100}
        />
      ))}

      {/* キラキラ星 */}
      {[...Array(30)].map((_, i) => (
        <TwinkleStar
          key={`star-${i}`}
          delay={i * 0.2}
          x={Math.random() * 100}
          y={Math.random() * 100}
          size={10 + Math.random() * 18}
        />
      ))}

      {/* 浮遊ハート - 水色系 */}
      {[...Array(25)].map((_, i) => (
        <FloatingHeart
          key={`heart-${i}`}
          delay={i * 0.3}
          x={Math.random() * 100}
          y={Math.random() * 100}
          size={14 + Math.random() * 22}
          color={heartColors[i % heartColors.length]}
        />
      ))}

      {/* 可愛い絵文字たち */}
      {cuteEmojis.map((item, emojiIndex) =>
        [...Array(item.count)].map((_, i) => (
          <FloatingEmoji
            key={`emoji-${emojiIndex}-${i}`}
            emoji={item.emoji}
            delay={emojiIndex * 0.2 + i * 0.4}
            x={Math.random() * 100}
            y={Math.random() * 100}
            size={18 + Math.random() * 28}
          />
        ))
      )}

      {/* ふわふわバブル - もっと増やす */}
      {[...Array(45)].map((_, i) => (
        <FloatingBubble
          key={`bubble-${i}`}
          delay={i * 0.2}
          x={Math.random() * 100}
          y={Math.random() * 100}
          size={Math.random() * 70 + 20}
          color={bubbleColors[i % bubbleColors.length]}
        />
      ))}

      {/* リボン装飾 - もっと増やす */}
      <RibbonDecoration className="top-20 left-[12%]" color="text-pink-300" />
      <RibbonDecoration className="top-[30%] right-[8%]" color="text-sky-300" />
      <RibbonDecoration className="top-[55%] left-[6%]" color="text-purple-300" />
      <RibbonDecoration className="bottom-40 right-[15%]" color="text-cyan-300" />
      <RibbonDecoration className="bottom-24 left-[20%]" color="text-rose-300" />
      <RibbonDecoration className="top-[70%] right-[30%]" color="text-indigo-300" />
    </div>
  )
}

function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      <div className="max-w-5xl mx-auto glass rounded-full px-6 py-3 fluffy-shadow border-2 border-white/60">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Cloud className="w-6 h-6 text-primary" />
            </motion.div>
            <span className="font-bold text-lg gradient-text">Yuki.dev</span>
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-1">
            {["About", "Skills", "Projects", "Contact"].map((item, idx) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.1, y: -2 }}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors rounded-full hover:bg-primary/10 hover:text-primary"
              >
                {item}
                {idx === 0 && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute -top-1 -right-1"
                  >
                    <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                  </motion.div>
                )}
              </motion.a>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <motion.a
              whileHover={{ scale: 1.2, rotate: 10, y: -3 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center text-primary fluffy-shadow border border-white/60"
            >
              <Github className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, rotate: -10, y: -3 }}
              whileTap={{ scale: 0.9 }}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center text-accent-foreground fluffy-shadow border border-white/60"
            >
              <Linkedin className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-20">
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="text-center max-w-4xl"
      >
        {/* バッジ */}
        <motion.div
          variants={fadeInUp}
          className="mb-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 border-2 border-primary/20 fluffy-shadow-lg pattern-dots"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          </motion.div>
          <span className="text-sm font-bold text-primary">Information Science Student</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <Sparkles className="w-5 h-5 text-pink-400" />
          </motion.div>
        </motion.div>
        
        {/* メインタイトル */}
        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tight"
        >
          <span className="text-foreground">Hello! </span>
          <motion.span 
            className="gradient-text inline-block"
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            I&apos;m Yuki
          </motion.span>
          <motion.span
            className="inline-flex items-center ml-3"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-4xl md:text-5xl">{"(๑>◡<๑)"}</span>
          </motion.span>
        </motion.h1>
        
        {/* サブタイトル */}
        <motion.div variants={fadeInUp} className="mb-4">
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-bold inline-flex items-center gap-3 bg-white/60 px-6 py-3 rounded-full fluffy-shadow">
            <Code2 className="w-5 h-5 text-primary" />
            Web Development & Machine Learning
            <Brain className="w-5 h-5 text-purple-400" />
          </p>
        </motion.div>
        
        <motion.p
          variants={fadeInUp}
          className="text-lg text-muted-foreground/80 mb-12 max-w-xl mx-auto leading-relaxed"
        >
          {"ふわふわなデザインと使いやすいUIが大好き！"}
          <br />
          <span className="inline-flex items-center gap-1">
            {"一緒に素敵なプロダクトを作りましょう"}
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400 inline" />
            </motion.span>
          </span>
        </motion.p>
        
        {/* CTAボタン */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-5 bg-gradient-to-r from-primary via-chart-5 to-accent text-white rounded-full font-bold flex items-center justify-center gap-3 fluffy-shadow-lg overflow-hidden animate-rainbow"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            View My Work
            <Star className="w-4 h-4 fill-white" />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-5 bg-white/90 border-3 border-primary/30 text-foreground rounded-full font-bold flex items-center justify-center gap-3 fluffy-shadow pattern-dots"
          >
            <Mail className="w-5 h-5 text-primary" />
            Say Hello
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
          </motion.a>
        </motion.div>
      </motion.div>
      
      {/* スクロールインジケーター */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 bg-white/70 px-4 py-3 rounded-full fluffy-shadow"
        >
          <span className="text-xs text-muted-foreground font-bold">Scroll</span>
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function AboutSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.3], [80, 0])

  return (
    <section id="about" ref={ref} className="py-32 px-6 relative">
      {/* セクション装飾 */}
      <div className="absolute top-10 left-0 right-0 h-20 pattern-waves opacity-40" />
      
      <motion.div style={{ opacity, y }} className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* 左: イメージカード */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative order-2 md:order-1"
          >
            <motion.div 
              className="aspect-square rounded-[3rem] bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100 p-8 relative overflow-hidden fluffy-shadow-lg border-4 border-white/80 pattern-polka"
              whileHover={{ rotate: 2, scale: 1.02 }}
            >
              {/* 装飾リング */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 border-3 border-dashed border-primary/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-16 border-3 border-dotted border-accent/40 rounded-full"
              />
              
              {/* コンテンツ */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="bg-white/80 rounded-full p-6 fluffy-shadow mb-4"
                >
                  <Coffee className="w-16 h-16 text-primary" />
                </motion.div>
                <p className="text-5xl font-extrabold gradient-text">500+</p>
                <p className="text-sm text-muted-foreground font-bold mt-2 bg-white/60 px-4 py-1 rounded-full">Cups of Coffee</p>
              </div>

              {/* 角装飾 */}
              <motion.div 
                className="absolute top-4 right-4 w-14 h-14 rounded-full bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
              </motion.div>
              <motion.div 
                className="absolute bottom-8 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-sky-200 to-blue-200 flex items-center justify-center"
                animate={{ scale: [1.2, 1, 1.2], rotate: [0, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </motion.div>
              <motion.div 
                className="absolute top-1/2 left-2 w-10 h-10 rounded-full bg-gradient-to-br from-purple-200 to-violet-200 flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-purple-500" />
              </motion.div>
            </motion.div>
            
            {/* フローティングカード */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.08, rotate: -3 }}
              className="absolute -bottom-6 -right-4 bg-white rounded-2xl p-4 fluffy-shadow-lg flex items-center gap-3 border-2 border-pink-100 pattern-hearts"
            >
              <motion.div 
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-7 h-7 text-pink-500 fill-pink-500" />
              </motion.div>
              <div>
                <p className="font-extrabold text-foreground">3+ Years</p>
                <p className="text-xs text-muted-foreground font-medium">Coding Journey</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* 右: テキストコンテンツ */}
          <div className="order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-3"
            >
              <div className="w-14 h-2 rounded-full bg-gradient-to-r from-primary via-chart-5 to-accent" />
              <span className="text-primary font-extrabold flex items-center gap-2">
                About Me
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight"
            >
              {"ものづくりが"}
              <br />
              <span className="gradient-text inline-flex items-center gap-2">
                {"大好きです！"}
                <motion.span
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="w-8 h-8 text-pink-400 fill-pink-400" />
                </motion.span>
              </span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-muted-foreground leading-relaxed"
            >
              <div className="bg-white/80 rounded-2xl p-5 fluffy-shadow border-2 border-sky-100/60 pattern-dots">
                <p>{"東京の大学で情報工学を学んでいます。プログラミングを始めたのは高校生の時で、最初に作ったのはシンプルなToDoアプリでした。"}</p>
              </div>
              <div className="bg-white/80 rounded-2xl p-5 fluffy-shadow border-2 border-purple-100/60 pattern-stripes">
                <p>{"今はフロントエンド開発と機械学習に特に興味があり、React/Next.jsを使ったWebアプリケーション開発や、Pythonでのデータ分析に取り組んでいます。"}</p>
              </div>
              <div className="bg-white/80 rounded-2xl p-5 fluffy-shadow border-2 border-pink-100/60 pattern-hearts">
                <p>{"コードを書くこと以外では、カフェ巡りと写真撮影が��味です。新しい技術を学ぶことが大好きで、常に成長し続けたいと思っています！"}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function SkillsSection() {
  const skills = [
    {
      icon: Code2,
      title: "Frontend",
      description: "React, Next.js, TypeScript, Tailwind CSS",
      gradient: "from-sky-100 via-blue-50 to-cyan-100",
      iconBg: "bg-gradient-to-br from-sky-200 to-blue-200",
      iconColor: "text-sky-600",
      borderColor: "border-sky-200",
      pattern: "pattern-dots"
    },
    {
      icon: Database,
      title: "Backend",
      description: "Node.js, Python, PostgreSQL, Firebase",
      gradient: "from-purple-100 via-violet-50 to-fuchsia-100",
      iconBg: "bg-gradient-to-br from-purple-200 to-violet-200",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
      pattern: "pattern-stripes"
    },
    {
      icon: Brain,
      title: "Machine Learning",
      description: "PyTorch, TensorFlow, scikit-learn",
      gradient: "from-emerald-100 via-green-50 to-teal-100",
      iconBg: "bg-gradient-to-br from-emerald-200 to-green-200",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-200",
      pattern: "pattern-grid"
    },
    {
      icon: Palette,
      title: "Design",
      description: "Figma, Adobe XD, UI/UX Design",
      gradient: "from-pink-100 via-rose-50 to-red-100",
      iconBg: "bg-gradient-to-br from-pink-200 to-rose-200",
      iconColor: "text-pink-600",
      borderColor: "border-pink-200",
      pattern: "pattern-hearts"
    }
  ]

  return (
    <section id="skills" className="py-32 px-6 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 left-0 right-0 h-40 pattern-waves opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 h-40 pattern-waves opacity-30 rotate-180" />
      
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="mb-6 inline-flex items-center gap-4 justify-center bg-white/70 px-6 py-3 rounded-full fluffy-shadow">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sun className="w-6 h-6 text-yellow-400" />
            </motion.div>
            <span className="text-primary font-extrabold">Skills</span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Moon className="w-6 h-6 text-purple-400" />
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold">
            What I <span className="gradient-text">Can Do</span>
            <motion.span
              animate={{ rotate: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block ml-2"
            >
              <Sparkles className="w-8 h-8 text-yellow-400 inline" />
            </motion.span>
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, rotate: 1 }}
              className="group"
            >
              <div className={`h-full rounded-[2rem] bg-gradient-to-br ${skill.gradient} p-7 fluffy-shadow-lg transition-all duration-300 border-3 ${skill.borderColor} ${skill.pattern} relative overflow-hidden`}>
                {/* 角装飾 */}
                <motion.div
                  className="absolute top-3 right-3"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-5 h-5 text-yellow-400/60 fill-yellow-400/60" />
                </motion.div>
                
                <div className="flex items-start gap-5 relative">
                  <motion.div
                    whileHover={{ rotate: 20, scale: 1.15 }}
                    className={`w-16 h-16 rounded-2xl ${skill.iconBg} flex items-center justify-center flex-shrink-0 fluffy-shadow border-2 border-white/60`}
                  >
                    <skill.icon className={`w-8 h-8 ${skill.iconColor}`} />
                  </motion.div>
                  <div>
                    <h3 className="font-extrabold text-xl mb-2 text-foreground flex items-center gap-2">
                      {skill.title}
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                      </motion.span>
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">{skill.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const projects = [
    {
      title: "AI Chat Application",
      description: "Next.js 15とOpenAI APIを使用したリアルタイムチャットアプリ。Streaming対応で高速なレスポンスを実現。",
      tags: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS"],
      gradient: "from-sky-100 via-blue-50 to-cyan-50",
      borderColor: "border-sky-200",
      pattern: "pattern-dots",
      link: "#"
    },
    {
      title: "E-Commerce Platform",
      description: "フルスタックECサイト。Stripe決済、在庫管理、管理者ダッシュボード機能を実装。",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      gradient: "from-purple-100 via-violet-50 to-fuchsia-50",
      borderColor: "border-purple-200",
      pattern: "pattern-stripes",
      link: "#"
    },
    {
      title: "Image Classification Model",
      description: "PyTorchを使用した画像分類モデル。転移学習により95%以上の精度を達成。",
      tags: ["Python", "PyTorch", "CNN", "Docker"],
      gradient: "from-emerald-100 via-green-50 to-teal-50",
      borderColor: "border-emerald-200",
      pattern: "pattern-grid",
      link: "#"
    }
  ]

  return (
    <section id="projects" className="py-32 px-6 relative">
      <div className="absolute inset-0 pattern-stars opacity-20" />
      
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="mb-6 inline-flex items-center gap-4 justify-center bg-white/70 px-6 py-3 rounded-full fluffy-shadow">
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-pink-400" />
            </motion.div>
            <span className="text-primary font-extrabold">Projects</span>
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Featured <span className="gradient-text">Works</span>
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block ml-2"
            >
              <Heart className="w-8 h-8 text-pink-400 fill-pink-400 inline" />
            </motion.span>
          </h2>
        </motion.div>
        
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Link href={project.link}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -6 }}
                  className={`group rounded-[2rem] bg-gradient-to-br ${project.gradient} p-8 fluffy-shadow-lg transition-all duration-300 border-3 ${project.borderColor} ${project.pattern} relative overflow-hidden`}
                >
                  {/* 角装飾 */}
                  <motion.div
                    className="absolute top-4 right-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="w-6 h-6 text-yellow-400/50 fill-yellow-400/50" />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-4 left-4"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-5 h-5 text-pink-400/50 fill-pink-400/50" />
                  </motion.div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className="w-14 h-14 rounded-xl bg-white/90 flex items-center justify-center fluffy-shadow border-2 border-white/60"
                        >
                          <Sparkles className="w-7 h-7 text-primary" />
                        </motion.div>
                        <h3 className="text-xl font-extrabold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                          {project.title}
                          <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                          </motion.span>
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-5 leading-relaxed font-medium bg-white/50 p-3 rounded-xl">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-2 text-xs rounded-full bg-white/90 text-foreground font-bold fluffy-shadow border border-white/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ x: 8 }}
                      className="flex items-center gap-2 text-primary font-bold bg-white/70 px-5 py-3 rounded-full fluffy-shadow"
                    >
                      <span className="text-sm">View Project</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="absolute inset-0 pattern-hearts opacity-20" />
      
      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100 rounded-[3rem] p-10 md:p-16 text-center fluffy-shadow-lg border-4 border-white/80 pattern-polka relative overflow-hidden"
        >
          {/* 角装飾 */}
          <motion.div
            className="absolute top-6 left-6"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-8 h-8 text-yellow-400/60 fill-yellow-400/60" />
          </motion.div>
          <motion.div
            className="absolute top-6 right-6"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-8 h-8 text-pink-400/60 fill-pink-400/60" />
          </motion.div>
          <motion.div
            className="absolute bottom-6 left-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-7 h-7 text-purple-400/60" />
          </motion.div>
          <motion.div
            className="absolute bottom-6 right-6"
            animate={{ rotate: [-360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Cloud className="w-8 h-8 text-sky-400/60" />
          </motion.div>
          
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/90 fluffy-shadow-lg border-3 border-primary/20">
              <Mail className="w-12 h-12 text-primary" />
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            {"Let's "}
            <span className="gradient-text">Connect!</span>
            <motion.span
              animate={{ rotate: [0, 20, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block ml-2"
            >
              <Heart className="w-8 h-8 text-pink-400 fill-pink-400 inline" />
            </motion.span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed font-medium bg-white/50 p-4 rounded-2xl">
            {"新しいプロジェクトやコラボレーションのお話、お気軽にご連絡ください！一緒に素敵なものを作りましょう "}
            <Sparkles className="w-4 h-4 text-yellow-400 inline" />
          </p>
          
          <motion.a
            href="mailto:yuki@example.com"
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-primary via-chart-5 to-accent text-white rounded-full font-extrabold fluffy-shadow-lg text-lg animate-rainbow"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            yuki@example.com
            <Star className="w-5 h-5 fill-white" />
          </motion.a>
          
          <div className="flex justify-center gap-5 mt-10">
            {[
              { icon: Github, href: "https://github.com", gradient: "from-gray-100 to-slate-100", iconColor: "text-gray-700" },
              { icon: Linkedin, href: "https://linkedin.com", gradient: "from-sky-100 to-blue-100", iconColor: "text-blue-600" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.25, rotate: 15, y: -8 }}
                whileTap={{ scale: 0.9 }}
                className={`w-14 h-14 rounded-full bg-gradient-to-br ${social.gradient} flex items-center justify-center fluffy-shadow-lg border-2 border-white/60`}
              >
                <social.icon className={`w-6 h-6 ${social.iconColor}`} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 px-6 text-center relative">
      <div className="absolute top-0 left-0 right-0 h-20 pattern-waves opacity-30" />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-4 relative"
      >
        <motion.div 
          className="flex items-center gap-3 bg-white/70 px-6 py-3 rounded-full fluffy-shadow"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Cloud className="w-6 h-6 text-primary" />
          </motion.div>
          <span className="font-extrabold gradient-text text-lg">Yuki.dev</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </motion.div>
        </motion.div>
        
        <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
          {"Made with "}
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-flex"
          >
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
          </motion.span>
          {" and lots of "}
          <Coffee className="w-4 h-4 text-amber-600 inline" />
        </p>
        
        <p className="text-xs text-muted-foreground/60 flex items-center gap-2">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          {new Date().getFullYear()} All rights reserved.
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
        </p>
      </motion.div>
    </footer>
  )
}

export default function Portfolio() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <DreamyBackground />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
