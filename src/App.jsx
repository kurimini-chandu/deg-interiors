import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  Camera,
  Cctv,
  DoorClosed,
  Droplets,
  Home,
  Instagram,
  Layers,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Paintbrush,
  Play,
  Phone,
  Sofa,
  Sparkles,
  Sun,
  Video,
  X,
  Zap,
} from 'lucide-react'

const MAP_QUERY = encodeURIComponent(
  'Shakshi Ganapathi Temple Road, Railway New Colony, Visakhapatnam 530016, Andhra Pradesh, India',
)

const BRAND = {
  name: 'DEG Interiors',
  owner: 'Hema Sundara Kiran Polla',
  city: 'Visakhapatnam',
  region: 'Andhra Pradesh, India',
  serviceRegions: 'Andhra Pradesh & Telangana',
  phones: [
    { display: '+91 9494781100', e164: '+919494781100' },
    { display: '+91 9949933556', e164: '+919949933556' },
  ],
  whatsappE164: '+919494781100',
  email: 'paintplayers@gmail.com',
  instagramUrl: 'https://www.instagram.com/deg_interiors',
  addressLines: [
    'Shakshi Ganapathi Temple Road',
    'Railway New Colony',
    'Visakhapatnam – 530016',
    'Andhra Pradesh, India',
  ],
  mapsEmbedUrl: `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`,
  mapsLinkUrl: `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`,
}

const _motion = motion

function Reveal({ children, className, delay = 0, hover = false }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={hover ? { y: -6 } : undefined}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}

function MotionSection({ id, className, children }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 22, scale: 0.995 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="relative text-sm text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-amber-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-zinc-950/70 after:transition-transform after:duration-300 hover:after:scale-x-100 dark:after:bg-amber-200/70"
    >
      {children}
    </a>
  )
}

function SectionHeader({ icon: Icon, kicker, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/70 bg-white/70 px-3 py-1 text-xs font-medium tracking-wide text-zinc-700 backdrop-blur dark:border-amber-300/20 dark:bg-zinc-950/50 dark:text-amber-200">
        {Icon ? <Icon className="h-4 w-4" /> : null}
        <span className="uppercase">{kicker}</span>
      </div>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-pretty text-sm leading-6 text-zinc-600 dark:text-zinc-300 md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}

function WhatsAppIcon({ className }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M19.11 17.47c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.34-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.44-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.11 2.82c.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.83-1.27.23-.61.23-1.14.16-1.27-.07-.13-.25-.2-.52-.34z"
      />
      <path
        fill="currentColor"
        d="M16.04 5.33c-5.87 0-10.64 4.77-10.64 10.64 0 1.87.49 3.69 1.43 5.29L5.33 26.67l5.54-1.46c1.54.84 3.27 1.29 5.17 1.29 5.87 0 10.64-4.77 10.64-10.64S21.91 5.33 16.04 5.33zm0 19.2c-1.71 0-3.37-.46-4.79-1.33l-.34-.2-3.29.87.88-3.21-.22-.33c-.92-1.42-1.41-3.07-1.41-4.77 0-4.86 3.95-8.8 8.8-8.8 4.86 0 8.8 3.95 8.8 8.8 0 4.86-3.95 8.8-8.8 8.8z"
      />
    </svg>
  )
}

function VideoCard({ title, src, delay = 0 }) {
  const videoRef = useRef(null)
  const [activated, setActivated] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const play = async () => {
    try {
      setActivated(true)
      await videoRef.current?.play?.()
    } catch {
      // Some browsers may still block autoplay; user can press play in controls.
      setActivated(true)
    }
  }

  return (
    <Reveal
      delay={delay}
      hover
      className="overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-sm transition dark:border-amber-300/15 dark:bg-zinc-950"
    >
      <div className="px-6 pt-6">
        <div className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {title}
        </div>
        <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Click to play • Full screen supported
        </div>
      </div>

      <div className="p-6">
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-950 shadow-sm shadow-black/10 dark:border-amber-300/15 dark:shadow-black/40">
          <motion.video
            ref={videoRef}
            className="aspect-video w-full"
            src={src}
            preload="metadata"
            playsInline
            controls={activated}
            onPlay={() => {
              setActivated(true)
              setIsPlaying(true)
            }}
            onPause={() => setIsPlaying(false)}
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />

          <AnimatePresence>
            {!isPlaying ? (
              <motion.button
                key="overlay"
                type="button"
                onClick={play}
                className="absolute inset-0 grid place-items-center bg-gradient-to-t from-black/55 via-black/10 to-black/0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                aria-label="Play video"
              >
                <motion.span
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="h-7 w-7 translate-x-[1px]" />
                </motion.span>

                <div className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-xs font-medium tracking-wide text-white/80">
                  Tap to play
                </div>
              </motion.button>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </Reveal>
  )
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('deg-theme') ?? 'dark'
    } catch {
      return 'dark'
    }
  })
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
    const shouldDark = theme === 'dark' || (theme === 'system' && prefersDark)
    document.documentElement.classList.toggle('dark', shouldDark)
    if (theme === 'system') localStorage.removeItem('deg-theme')
    else localStorage.setItem('deg-theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (lightboxIndex == null) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
    }
    window.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [lightboxIndex])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [menuOpen])

  const services = useMemo(
    () => [
      {
        title: 'Modular Kitchens',
        icon: LayoutGrid,
        desc: 'Modern layouts, seamless workflow, premium hardware and finishes.',
      },
      {
        title: 'Wardrobes',
        icon: DoorClosed,
        desc: 'Space-optimized storage with clean lines and premium shutters.',
      },
      {
        title: 'Furniture',
        icon: Sofa,
        desc: 'Custom furniture crafted to match your home’s style and scale.',
      },
      {
        title: 'False Ceiling',
        icon: Layers,
        desc: 'Lighting-ready ceiling concepts with neat, aligned detailing.',
      },
      {
        title: 'Painting',
        icon: Paintbrush,
        desc: 'Premium paints with crisp edges and long-lasting durability.',
      },
      {
        title: 'Texture Work',
        icon: Sparkles,
        desc: 'Luxury textures that add depth, warmth, and a premium finish.',
      },
      {
        title: 'Plumbing',
        icon: Droplets,
        desc: 'Clean concealed routing, leak-proof fittings, reliable execution.',
      },
      {
        title: 'Electrical Work',
        icon: Zap,
        desc: 'Safe wiring, smart switch layouts, and tidy final finishing.',
      },
      {
        title: 'CCTV Installation',
        icon: Cctv,
        desc: 'Discrete camera placement with dependable, clean integration.',
      },
      {
        title: 'Home Decor Work',
        icon: Home,
        desc: 'Finishing touches that make the space feel complete and premium.',
      },
      {
        title: 'House Keeping',
        icon: Sparkles,
        desc: 'Post-work cleanup support to keep your site looking polished.',
      },
    ],
    [],
  )

  const galleryImages = useMemo(
    () => Array.from({ length: 24 }, (_, i) => `/images/project${i + 1}.jpg`),
    [],
  )

  const videos = useMemo(
    () => [
      {
        title: 'Complete Home Interior Walkthrough',
        src: '/videos/video1.mp4',
      },
      {
        title: 'Luxury Full House Interior Design Tour',
        src: '/videos/video2.mp4',
      },
      {
        title: 'Modern Home Interior Project Showcase',
        src: '/videos/video3.mp4',
      },
    ],
    [],
  )

  const prefersDark =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)')?.matches

  const isDark = theme === 'dark' || (theme === 'system' && prefersDark)

  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-50">
      {/* Top navigation */}
      <header
        className={
          "sticky top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-[8px] transition-shadow" +
          (hasScrolled ? ' shadow-[0_18px_50px_-35px_rgba(0,0,0,0.55)]' : '')
        }
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <a href="#top" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200/70 bg-white text-zinc-950 dark:border-amber-300/20 dark:bg-zinc-950 dark:text-amber-200">
              <Building2 className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">{BRAND.name}</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">{BRAND.city}</div>
            </div>
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Toggle theme"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200/70 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm transition-all duration-300 ease-[ease] hover:-translate-y-0.5 hover:bg-zinc-50 hover:brightness-105 dark:border-amber-300/20 dark:bg-zinc-950 dark:text-amber-200 dark:hover:border-amber-300/35"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-[ease] hover:-translate-y-0.5 hover:bg-zinc-900 hover:brightness-105 dark:bg-amber-300 dark:text-zinc-950 dark:hover:bg-amber-200 md:inline-flex"
            >
              Book Consultation
              <ArrowRight className="h-4 w-4" />
            </a>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white/85 shadow-sm transition-all duration-300 ease-[ease] hover:-translate-y-0.5 hover:bg-white/10"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-in Menu */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setMenuOpen(false)}
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: 'easeOut' }}
              className="absolute right-0 top-0 h-full w-[340px] max-w-[88vw] border-l border-white/10 bg-black/70 p-5 text-white backdrop-blur"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold tracking-tight">Menu</div>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 transition hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 space-y-2">
                {[
                  { label: 'About', href: '#about' },
                  { label: 'Services', href: '#services' },
                  { label: 'Gallery', href: '#gallery' },
                  { label: 'Videos', href: '#videos' },
                  { label: 'Contact', href: '#contact' },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 text-white/60" />
                  </a>
                ))}

                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-2">
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </span>
                  <ArrowRight className="h-4 w-4 text-white/60" />
                </a>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Hero */}
      <section id="top" className="relative">
        <div className="relative min-h-[110vh] overflow-hidden bg-black">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/images/project28.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#0f0f0f',
              transform: 'none',
              filter: 'none',
            }}
          />

          <div className="relative mx-auto flex min-h-[110vh] max-w-7xl items-center justify-center px-4 py-16 text-center md:px-6 md:py-0">
            <div className="mt-10 max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="text-balance text-5xl font-semibold tracking-tight text-white md:text-6xl"
              >
                We Design Elegant
                <br />
                Modern Living Spaces
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut', delay: 0.08 }}
                className="mt-6 text-pretty text-base leading-7 text-white/85 md:text-lg"
              >
                {BRAND.name} creates premium interiors in Visakhapatnam and Hyderabad — combining modern design, clean layouts, and architectural finishing.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut', delay: 0.16 }}
                className="mt-8"
              >
                <a
                  href="#gallery"
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-black/30 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  View Our Projects
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <MotionSection
        id="about"
        className="border-t border-zinc-200/60 bg-white py-20 dark:border-zinc-800/60 dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            icon={Building2}
            kicker="About"
            title="A premium studio for modern interiors"
            description="DEG Interiors delivers luxury interior design and execution in Visakhapatnam — built on clean layouts, precise detailing, and finishing that feels architectural and timeless."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal className="rounded-3xl border border-zinc-200/70 bg-white p-7 shadow-sm dark:border-amber-300/15 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                Who we are
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {BRAND.name} is led by {BRAND.owner} and based in {BRAND.city}, {BRAND.region}. We deliver premium interiors with a clear focus: functional layouts, calm minimalism, and precision finishing.
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                From consultation to final handover, we keep decisions simple, timelines clear, and execution consistent — serving {BRAND.serviceRegions}.
              </p>
            </Reveal>

            <Reveal className="rounded-3xl border border-zinc-200/70 bg-white p-7 shadow-sm dark:border-amber-300/15 dark:bg-zinc-950" delay={0.05}>
              <h3 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                Our approach
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                {[
                  'Minimal luxury aesthetics — calm, clean, premium.',
                  'Material-first detailing for long-lasting finishes.',
                  'Lighting-aware design for day & night ambiance.',
                  'Site-ready execution with clear milestones.',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-950/80 dark:bg-amber-200" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <a
                  className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-950 hover:opacity-80 dark:text-amber-200"
                  href="#contact"
                >
                  Talk to us
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </MotionSection>

      {/* Services */}
      <MotionSection
        id="services"
        className="relative overflow-hidden border-t border-zinc-200/60 py-24 dark:border-zinc-800/60"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/images/project1.jpg)' }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(251,191,36,0.10),transparent_55%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            icon={Building2}
            kicker="Services"
            title="Everything you need, beautifully executed"
            description="A focused set of interior services delivered with consistent quality and refined finishing."
          />

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, idx) => (
              <Reveal
                key={s.title}
                delay={idx * 0.03}
                hover
                className="group relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-white p-7 shadow-sm transition hover:border-zinc-300 dark:border-amber-300/15 dark:bg-zinc-950 dark:hover:border-amber-300/30"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_20%_10%,rgba(251,191,36,0.12),transparent_55%)]" />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200/70 bg-zinc-50 text-zinc-900 transition group-hover:bg-white dark:border-amber-300/15 dark:bg-zinc-900/50 dark:text-amber-200 dark:group-hover:border-amber-300/25">
                        <s.icon className="h-5 w-5" />
                      </span>
                      <div className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                        {s.title}
                      </div>
                    </div>
                    <div className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                      {s.desc}
                    </div>
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200/70 bg-zinc-50 text-zinc-900 transition group-hover:bg-white dark:border-amber-300/15 dark:bg-zinc-900/50 dark:text-amber-200 dark:group-hover:border-amber-300/25">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Project Gallery */}
      <MotionSection
        id="gallery"
        className="relative overflow-hidden border-t border-zinc-200/60 py-20 dark:border-zinc-800/60"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/project26.jpg')",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            icon={Camera}
            kicker="Projects"
            title="Project Gallery"
            description="A modern masonry portfolio grid — tap any image to view fullscreen."
          />

          {/* Masonry columns: 1 (mobile), 2 (tablet), 4 (desktop) */}
          <div className="mt-12 columns-1 gap-4 [column-fill:_balance] md:columns-2 lg:columns-4">
            {galleryImages.map((src, idx) => (
              <motion.button
                key={src}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: (idx % 8) * 0.03 }}
                className="group relative mb-4 w-full break-inside-avoid overflow-hidden rounded-3xl border border-zinc-200/70 bg-zinc-100 text-left shadow-xl outline-none transition hover:border-zinc-300 focus-visible:ring-2 focus-visible:ring-zinc-950/15 dark:border-amber-300/15 dark:bg-zinc-900 dark:shadow-black/40 dark:hover:border-amber-300/30 dark:focus-visible:ring-amber-300/30"
              >
                <img
                  src={src}
                  alt={`DEG Interiors project ${idx + 1}`}
                  loading="lazy"
                  className="block h-auto w-full object-cover transition-all duration-[400ms] ease-[ease] group-hover:scale-[1.03]"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-black/0 opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-5 bottom-5 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white/90 backdrop-blur">
                    View Project
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex != null ? (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4 py-8"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setLightboxIndex(null)}
                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="w-full">
                <img
                  src={galleryImages[lightboxIndex]}
                  alt={`DEG Interiors project ${lightboxIndex + 1}`}
                  className="mx-auto max-h-[78vh] w-auto max-w-full rounded-3xl border border-white/10 bg-black object-contain shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Video Showcase */}
      <MotionSection id="videos" className="border-t border-zinc-200/60 py-20 dark:border-zinc-800/60">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            icon={Video}
            kicker="Showcase"
            title="Video Showcase"
            description="Three premium walkthroughs — click any card to play."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((v, idx) => (
              <VideoCard key={v.title} title={v.title} src={v.src} delay={idx * 0.06} />
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Contact */}
      <MotionSection
        id="contact"
        className="relative overflow-hidden border-t border-zinc-200/60 pb-20 pt-24 dark:border-zinc-800/60"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/project26.jpg')",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            icon={MessageCircle}
            kicker="Contact"
            title="Let’s design your space"
            description="Call, WhatsApp, or email — and find us on Google Maps."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal className="flex items-center justify-center rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-amber-300/15 dark:bg-zinc-950 md:p-7">
              <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-7 shadow-[0_40px_120px_-85px_rgba(0,0,0,0.95)] backdrop-blur">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(251,191,36,0.18),transparent_55%)]" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-xs font-semibold tracking-[0.25em] text-amber-200/90">
                        DEG INTERIORS
                      </div>
                      <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
                        Experts in Modular Kitchens
                      </div>
                    </div>
                    <div className="hidden rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-right text-xs text-white/70 backdrop-blur sm:block">
                      <div className="font-semibold text-white/90">{BRAND.serviceRegions}</div>
                      <div className="mt-1">Visakhapatnam • Hyderabad</div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <div className="text-xs font-semibold tracking-widest text-white/70">SERVICES</div>
                      <div className="mt-2 text-sm leading-6 text-white/85">
                        Wardrobes
                        <br />
                        Furniture
                        <br />
                        False Ceiling
                        <br />
                        Texture Work
                        <br />
                        Plumbing
                        <br />
                        Painting
                        <br />
                        CCTV Work
                        <br />
                        House Keeping
                        <br />
                        Deco Work
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <div className="text-xs font-semibold tracking-widest text-white/70">PHONE</div>
                        <div className="mt-2 space-y-1 text-sm font-semibold text-white">
                          <a className="hover:text-amber-200" href={`tel:${BRAND.phones[0].e164}`}>
                            {BRAND.phones[0].display}
                          </a>
                          <br />
                          <a className="hover:text-amber-200" href={`tel:${BRAND.phones[1].e164}`}>
                            {BRAND.phones[1].display}
                          </a>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-semibold tracking-widest text-white/70">EMAIL</div>
                        <div className="mt-2 text-sm font-semibold text-white">
                          <a className="hover:text-amber-200" href={`mailto:${BRAND.email}`}>
                            {BRAND.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-xs font-semibold tracking-widest text-white/70">LOCATIONS</div>
                    <div className="mt-2 text-sm font-semibold text-white/90">Visakhapatnam | Hyderabad</div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/85 backdrop-blur">
                        <div className="font-semibold text-white">Visakhapatnam Office</div>
                        <div className="mt-1 text-xs leading-5 text-white/70">
                          Shakshi Ganapathi Temple Road
                          <br />
                          Railway New Colony
                          <br />
                          Visakhapatnam – 530016
                          <br />
                          Andhra Pradesh, India
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/85 backdrop-blur">
                        <div className="font-semibold text-white">Hyderabad Office</div>
                        <div className="mt-1 text-xs leading-5 text-white/70">
                          Vengalrao Nagar
                          <br />
                          SR Nagar
                          <br />
                          Beside Metro Station
                          <br />
                          Hyderabad
                          <br />
                          Telangana, India
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-sm dark:border-amber-300/15 dark:bg-zinc-950" delay={0.05}>
              <div className="p-7">
                <div className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Find us on Maps</div>
                <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {BRAND.city}, {BRAND.region}
                </div>
              </div>
              <div className="px-7 pb-7">
                <iframe
                  title="DEG Interiors location"
                  src={BRAND.mapsEmbedUrl}
                  className="aspect-video w-full rounded-2xl border border-zinc-200/70 bg-zinc-100 dark:border-amber-300/15 dark:bg-zinc-900"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </MotionSection>

      {/* Footer */}
      <footer className="border-t border-zinc-200/60 py-10 text-sm text-zinc-600 dark:border-zinc-800/60 dark:text-zinc-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">{BRAND.name}</span>{' '}
            <span>— Premium Interiors in {BRAND.city}</span>
          </div>
          <div className="flex items-center gap-4">
            <a className="hover:text-zinc-900 dark:hover:text-amber-200" href="#services">
              Services
            </a>
            <a className="hover:text-zinc-900 dark:hover:text-amber-200" href="#gallery">
              Gallery
            </a>
            <a
              className="inline-flex items-center gap-2 hover:text-zinc-900 dark:hover:text-amber-200"
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Call Button */}
      <a
        href="tel:+919494781100"
        aria-label="Call now"
        className="group fixed bottom-24 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
      >
        <span className="pointer-events-none absolute right-full mr-3 hidden items-center rounded-full bg-zinc-950 px-3 py-1 text-xs font-medium text-white shadow-sm shadow-black/30 opacity-0 transition group-hover:opacity-100 md:inline-flex">
          Call Now
        </span>
        <Phone className="h-6 w-6" />
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919494781100"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300/60"
      >
        <span className="pointer-events-none absolute right-full mr-3 hidden items-center rounded-full bg-zinc-950 px-3 py-1 text-xs font-medium text-white shadow-sm shadow-black/30 opacity-0 transition group-hover:opacity-100 md:inline-flex">
          Chat on WhatsApp
        </span>
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  )
}
