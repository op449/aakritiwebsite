import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone, Star, MessageCircle } from 'lucide-react';
import './App.css';
import childPaintingImg from './assets/child_painting.png';
import artKitImg from './assets/art_kit.png';
import masterpieceImg from './assets/student_masterpiece.png';
import instructorImg from './assets/instructor.jpg';
import uidLogo from './assets/uid_logo.jpg';

// SVGs
const BehanceIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-2.904h4.658c-.146-2.203-2.115-2.617-3.088-2.617-1.129 0-2.311.66-2.57 2.617zM6.92 11.196c1.17 0 2.217-.68 2.217-2.527 0-1.896-1.558-2.669-2.883-2.669h-5.254v13h6.143c1.55 0 2.85-.92 2.85-2.91 0-1.63-1.07-2.5-2.09-2.73 1.25-.21 2.45-1.07 2.45-2.85 0-1.84-1.29-2.68-2.84-2.68h-5.68v5.36h5.08zm-2.08-3.06h1.9c.74 0 1.2.33 1.2 1.05 0 .73-.46 1.06-1.2 1.06h-1.9v-2.11zm0 5.8h2.09c.8 0 1.34.36 1.34 1.16 0 .8-.54 1.15-1.34 1.15h-2.09v-2.31z" /></svg>);
const MediumIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h7.358l5.378 11.798 4.798-11.798h7.163v.403l-2.62 2.61c-.13.13-.19.311-.16.495v11c-.03.184.03.365.16.495l2.62 2.61v.403h-8.28v-.403l2.52-2.3c.24-.24.24-.32.24-.71v-8.89l-5.32 12.3h-.7l-6.17-12.3v9c.005.419.167.818.455 1.115l3.295 3.99v.403h-7.82v-.403l3.295-3.99c.287-.297.45-.696.455-1.115v-10.455z" /></svg>);
const DribbbleIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 2.3-4.362 7.46-6.386 2.73-1.075 4.62-1.25 5.17-1.3l-.014-.055c-.173-.55-1.636-5.06-4.502-8.528-3.064 1.055-6.32 3.2-7.55 5.42-.32.576-1.55 3.235-1.03 7.844 0 .973.16 1.956.46 2.924zm1.09-11.23c1.1-2.193 4.2-4.238 7.08-5.26-.525-.262-1.125-.418-1.745-.418-2.6 0-4.996 1.15-6.626 2.98.423-.105 1.57-.393 1.29 2.7zm9.64-4.5c2.72 3.266 4.14 7.633 4.27 8.083 2.505-.333 4.414-.025 4.885.086-1.01-4.2-4.29-7.6-8.54-8.81-.19.2-.38.41-.61.64z" /></svg>);
const LinkedinIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>);
const FacebookIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>);
const TwitterIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>);
const InstagramIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>);
const TrustpilotIcon = () => (<svg viewBox="0 0 512 512" width="16" height="16" fill="#00b67a"><path d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M353.6,350.2L256,290.5l-97.6,59.7l30-111.4l-88.7-72.2h112.5l33.8-109l33.8,109h112.5l-88.7,72.2L353.6,350.2z" /></svg>);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const RevealText = ({ text, delay = 0, onHover }) => {
  const words = text.split(" ");
  return (
    <motion.span
      className="reveal-text-container"
      variants={{
        visible: { transition: { staggerChildren: 0.05, delayChildren: delay } }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' }}>
          {word.split("").map((char, j) => (
            <motion.span
              key={j}
              style={{ display: 'inline-block', originY: "100%" }}
              variants={{
                hidden: { y: "110%", rotate: 10, opacity: 0 },
                visible: {
                  y: 0, rotate: 0, opacity: 1,
                  transition: { type: "spring", damping: 12, stiffness: 100 }
                }
              }}
              onMouseEnter={() => onHover && onHover(true)}
              onMouseLeave={() => onHover && onHover(false)}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};

const Magnetic = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

const FloatingArtAssets = ({ mouseX, mouseY }) => {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Stroke 1 */}
      <motion.svg
        width="300" height="100" viewBox="0 0 300 100"
        style={{
          position: 'absolute',
          top: '15%', left: '5%',
          opacity: 0.15,
          x: useTransform(mouseX, [0, 1000], [20, -20]),
          y: useTransform(mouseY, [0, 1000], [20, -20]),
        }}
      >
        <path d="M10 50 Q 75 10, 150 50 T 290 50" stroke="#ff4081" strokeWidth="20" fill="none" strokeLinecap="round" />
      </motion.svg>

      {/* Stroke 2 */}
      <motion.svg
        width="200" height="200" viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          top: '60%', right: '10%',
          opacity: 0.1,
          rotate: 45,
          x: useTransform(mouseX, [0, 1000], [-30, 30]),
          y: useTransform(mouseY, [0, 1000], [-30, 30]),
        }}
      >
        <circle cx="100" cy="100" r="80" stroke="#6366f1" strokeWidth="15" fill="none" strokeDasharray="20 10" />
      </motion.svg>

      {/* Stroke 3 */}
      <motion.svg
        width="150" height="300" viewBox="0 0 150 300"
        style={{
          position: 'absolute',
          bottom: '10%', left: '50%',
          opacity: 0.08,
          x: useTransform(mouseX, [0, 1000], [-10, 10]),
          y: useTransform(mouseY, [0, 1000], [-40, 40]),
        }}
      >
        <path d="M75 10 L 75 290" stroke="#f59e0b" strokeWidth="12" fill="none" strokeLinecap="round" strokeDasharray="5 15" />
      </motion.svg>
    </div>
  );
};

const ImageCard = ({ src, title, pY, onHover }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef(null);
  const [isInside, setIsInside] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      className="work-image-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setIsInside(true); onHover && onHover(true); }}
      onMouseLeave={() => { setIsInside(false); onHover && onHover(false); }}
      whileHover={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.img
        src={src}
        alt={title}
        style={{ y: pY, scale: 1.25 }}
      />
      <AnimatePresence>
        {isInside && (
          <motion.div
            className="view-tag"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
          >
            Explore
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CustomCursor = ({ hovering }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 250, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 250, damping: 25 });

  useEffect(() => {
    const moveMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveMouse);
    return () => window.removeEventListener('mousemove', moveMouse);
  }, []);

  return (
    <motion.div
      className={`custom-cursor ${hovering ? 'hovering' : ''}`}
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%'
      }}
    />
  );
};

const Navbar = ({ onHover }) => (
  <nav className="navbar">
    <div className="container nav-content">
      <Magnetic>
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          style={{ cursor: 'pointer' }}
        >
          <div className="logo-circles">
            <div className="circle circle-pink"></div>
            <div className="circle circle-blue"></div>
            <div className="circle circle-orange"></div>
            <div className="circle circle-purple"></div>
          </div>
          <span>AS.</span>
        </motion.div>
      </Magnetic>
    </div>
  </nav>
);

const Hero = ({ mouseX, mouseY, onHover, lenisRef }) => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityFade = useTransform(scrollY, [0, 500], [1, 0]);

  // Increased sensitivity for the main blobs
  const w = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const h = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const blobX = useTransform(mouseX, [0, w], ['-15%', '15%']);
  const blobY = useTransform(mouseY, [0, h], ['-15%', '15%']);


  return (
    <section className="hero" style={{ overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 11 }}>
        <div className="hero-split" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-text-col" style={{ position: 'relative', zIndex: 20 }}>
            <motion.h1
              className="hero-title"
            >
              <span className="text-dark">Nurturing the Next</span><br />
              <span className="text-dark">Generation of Artists</span>
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              We empower children to express their unique vision through personalized 1-on-1 art mentorship.
            </motion.p>

            <motion.p
              className="hero-achievement"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              from blank canvases to portfolio-ready masterpieces—we guide every step of their creative journey.
            </motion.p>

            <motion.div
              className="hero-cta-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              style={{ marginTop: '3rem' }}
            >
              <Magnetic>
                <motion.button
                  className="btn-primary"
                  onMouseEnter={() => onHover(true)}
                  onMouseLeave={() => onHover(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => lenisRef.current?.scrollTo('#contact')}
                >
                  reserve a 1-1 spot <ArrowRight size={20} />
                </motion.button>
              </Magnetic>
            </motion.div>
          </div>

          <div className="hero-image-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              style={{ y: yParallax }}
              className="hero-large-image-wrapper"
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
            >
              <img src={instructorImg} alt="Meet your instructor" className="hero-large-image" loading="eager" />
              <div className="hero-image-badge" onClick={() => lenisRef.current?.scrollTo('#about')}>
                <img src={uidLogo} alt="UID" style={{ width: '32px', height: 'auto', borderRadius: '4px' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="instructor-name">Aakriti Singh</span>
                  <span className="meet-text" style={{ fontSize: '0.65rem' }}>Student at Unitedworld Institute of Design</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = ({ onHover, lenisRef }) => (
  <section id="about" className="about-section">
    <div className="container">
      <motion.div
        className="about-layout-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <motion.div variants={fadeInUp} className="about-left">
          <div className="pill-badge">Our Philosophy</div>
        </motion.div>
        <div className="about-right">
          <motion.h2 variants={fadeInUp} className="section-h2">A Bespoke Precise<br />Artistic Journey</motion.h2>

          <motion.p variants={fadeInUp} className="section-p">
            <span className="text-dark">Standardized group classes often overlook individual potential.</span>{' '}
            <span className="text-light">Our 100% Online Private Atelier offers the undivided attention and tailored curriculum your child needs to truly excel, from anywhere in the world.</span>
          </motion.p>

          <motion.div variants={fadeInUp} className="stats-row">
            <div className="stat-block">
              <span className="plus">+</span>
              <motion.span
                className="num"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
              >85</motion.span>
              <p className="label">ORIGINAL ARTWORKS<br />CREATED</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-block">
              <span className="plus">+</span>
              <motion.span
                className="num"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
              >6+</motion.span>
              <p className="label">YEARS OF PROFESSIONAL<br />ART EXPERIENCE</p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="journey-section">
            <p className="journey-label">Professional Background</p>
            <div className="journey-list">
              <motion.div className="j-item" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 400 }}>
                <span className="j-num">01</span>
                <div className="j-content">
                  <h3>Artistic Journey</h3>
                  <span className="j-date">(2026)</span>
                </div>
                <span className="j-company">6+ Years of Professional Art</span>
              </motion.div>
              <motion.div className="j-item border-none" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 400 }}>
                <span className="j-num">02</span>
                <div className="j-content">
                  <h3>Artist & Scholar</h3>
                  <span className="j-date">(Current)</span>
                </div>
                <div className="j-images">
                  <div className="j-img-box" style={{ background: '#fff', padding: '5px' }}><img src={uidLogo} alt="UID" /></div>
                </div>
                <span className="j-company">Unitedworld Institute of Design (UID)</span>
              </motion.div>
            </div>

            <Magnetic>
              <motion.button
                className="btn-outline"
                onMouseEnter={() => onHover(true)}
                onMouseLeave={() => onHover(false)}
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                onClick={() => lenisRef.current?.scrollTo('#contact')}
              >
                <span>reserve a 1-1 spot</span>
                <motion.div whileHover={{ x: 5 }}><ArrowRight size={14} /></motion.div>
              </motion.button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

const WorksSection = ({ onHover }) => {
  const { scrollYProgress } = useScroll();
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section id="work" className="works-section">
      <div className="stripe-box stripe-right"></div>
      <div className="stripe-box stripe-left"></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          className="works-header-flex"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="pill-badge">Selection of My Works</div>
          <h2 className="section-h2">Personal Artist <br />Portfolio</h2>
        </motion.div>

        <div className="works-list">
          {[
            { year: '2024', title: 'Ephemeral Dreams', sub: 'Conceptual Digital Painting', img: masterpieceImg, pY: parallaxY1, loading: 'lazy' },
            { year: '2024', title: 'Urban Solace', sub: 'Fine Arts Exploration', img: childPaintingImg, pY: parallaxY2, loading: 'lazy' },
            { year: '2023', title: 'Canvas of Thought', sub: 'Traditional Oil Series', img: artKitImg, pY: parallaxY3, loading: 'lazy' }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="work-item"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
            >
              <div className="work-year">{item.year}</div>
              <div className="work-title">{item.title}<br />{item.sub}</div>
              <ImageCard
                src={item.img}
                title={item.title}
                pY={item.pY}
                onHover={onHover}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialSection = ({ onHover }) => {
  const [index, setIndex] = useState(0);
  const testimonials = [
    {
      text: "Aakriti has been a wonderful guide for our son Aarav. Her 1-on-1 online classes are incredibly deep and personalized. Since joining her atelier, Aarav's understanding of classical sketching has transformed. Highly recommended for gifted young artists.",
      author: "Sanjay Mehra",
      role: "Parent of Aarav (10yrs)",
      initials: "SM"
    },
    {
      text: "The progress my daughter has made in her portraiture is astounding. Aakriti's technical knowledge combined with her gentle teaching style makes every session something she looks forward to. Truly premium 1-on-1 instruction.",
      author: "Priya Sharma",
      role: "Parent of Ananya (12yrs)",
      initials: "PS"
    },
    {
      text: "Finding a mentor who actually understands the nuances of digital art as well as traditional techniques was rare. Aakriti is that bridge. My son's portfolio for design school is now world-class.",
      author: "Rajesh Gupta",
      role: "Parent of Ishaan (16yrs)",
      initials: "RG"
    }
  ];

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="testimonial-section">
      <div className="container">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="testi-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="pill-badge">Client Perspective</div>
            <h2 className="section-h2">Unparalleled<br />Growth</h2>

            <div className="quote-flex">
              <div className="huge-quote">“</div>
              <div className="quote-body">
                <div className="line-sep"></div>
                <p className="quote-text" style={{ margin: 0, padding: 0 }}>
                  {testimonials[index].text}
                </p>
              </div>
            </div>

            <div className="testi-footer">
              <div className="testi-nav">
                <motion.button
                  onClick={prev}
                  onMouseEnter={() => onHover(true)}
                  onMouseLeave={() => onHover(false)}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="nav-arrow"
                >←</motion.button>
                <div className="dots">
                  {testimonials.map((_, i) => (
                    <motion.span
                      key={i}
                      onClick={() => setIndex(i)}
                      onMouseEnter={() => onHover(true)}
                      onMouseLeave={() => onHover(false)}
                      whileHover={{ scale: 1.3 }}
                      className={`dot ${i === index ? 'active' : ''}`}
                    ></motion.span>
                  ))}
                </div>
                <motion.button
                  onClick={next}
                  onMouseEnter={() => onHover(true)}
                  onMouseLeave={() => onHover(false)}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="nav-arrow active"
                >→</motion.button>
              </div>
              <div className="testi-author">
                <div className="author-avatar"><div className="avatar-placeholder">{testimonials[index].initials}</div></div>
                <div className="author-info">
                  <p className="author-name">{testimonials[index].author}</p>
                  <p className="author-role">{testimonials[index].role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const Footer = ({ onHover }) => {
  return (
    <footer id="contact" className="footer-section">
      <div className="container footer-inner">
        <motion.h2
          className="footer-h2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          style={{ opacity: 0.4, color: '#fff' }}
        >
          Secure Your Child's Place<br />in our Private Atelier
        </motion.h2>

        <motion.div
          className="pretty-form-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="form-header">
            <div className="limited-badge">LIMITED SLOTS: 3 REMAINING</div>
            <h3>Exclusive 1-on-1 Inquiry</h3>
            <p>Our online classes are strictly 1-on-1 to ensure elite quality. Share your child's creative goals below.</p>
          </div>

          <form className="atelier-form">
            <div className="form-row">
              <input type="text" placeholder="Your Name" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} />
              <input type="text" placeholder="Child's Name & Age" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} />
            </div>
            <input type="email" placeholder="Email Address" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} />
            <textarea placeholder="Tell us about their artistic interests..." rows="4" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}></textarea>

            <p className="form-notice">Online 1-on-1 classes only. No group sessions. Limited availability for Fall intake.</p>

            <Magnetic>
              <motion.button
                type="submit"
                className="btn-form-submit"
                onMouseEnter={() => onHover(true)}
                onMouseLeave={() => onHover(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Request 1-on-1 Session <ArrowRight size={16} />
              </motion.button>
            </Magnetic>
          </form>
        </motion.div>

        <motion.div
          className="socials-box"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.a onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.1)' }} href="#"><DribbbleIcon /></motion.a>
          <motion.a onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.1)' }} href="#"><LinkedinIcon /></motion.a>
          <motion.a onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.1)' }} href="#"><TwitterIcon /></motion.a>
          <motion.a onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.1)' }} href="#"><InstagramIcon /></motion.a>
        </motion.div>

        <div className="footer-bottom">
          <p>© 2024 Aakriti Singh Art Mentorship</p>
          <div className="legal">
            <a href="#" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}>Studio Policy</a>
            <a href="#" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}>Scheduling</a>
            <a href="#" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [isHovering, setIsHovering] = useState(false);
  const lenisRef = useRef(null);
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const { scrollYProgress } = useScroll();
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ['#FAF9F6', '#F5F5F7', '#E8E8E8', '#FAF9F6']
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.08
    });
    lenisRef.current = lenis;
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="page-wrapper" style={{ position: 'relative' }}>
      <motion.div
        style={{
          backgroundColor: bgColor,
          position: 'fixed',
          inset: 0,
          zIndex: -1
        }}
      />
      <div className="grain-overlay"></div>
      <CustomCursor hovering={isHovering} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Global Reactive Background Elements */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
          <FloatingArtAssets mouseX={smoothMouseX} mouseY={smoothMouseY} />
          <motion.div
            className="hero-blob-bg"
            style={{
              x: useTransform(smoothMouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], ['-10%', '10%']),
              y: useTransform(smoothMouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], ['-10%', '10%']),
              opacity: 0.4
            }}
          />
          <motion.div
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '800px', height: '800px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(74, 78, 215, 0.2) 0%, rgba(197, 160, 89, 0.1) 40%, transparent 80%)',
              filter: 'blur(100px)',
              x: useTransform(smoothMouseX, val => val - 400),
              y: useTransform(smoothMouseY, val => val - 400),
              zIndex: 0,
            }}
          />
          <div className="hero-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}></div>
        </div>

        <Navbar onHover={setIsHovering} />
        <main style={{ position: 'relative', zIndex: 1 }}>
          <Hero mouseX={smoothMouseX} mouseY={smoothMouseY} onHover={setIsHovering} lenisRef={lenisRef} />
          <AboutSection onHover={setIsHovering} lenisRef={lenisRef} />
          <WorksSection onHover={setIsHovering} />
          <TestimonialSection onHover={setIsHovering} />
        </main>
        <Footer onHover={setIsHovering} />
      </div>
    </div>
  );
}
