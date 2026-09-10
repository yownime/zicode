import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import BlogAndClients from '../components/BlogAndClients';
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';

function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10px 0px',
      threshold: 0.01
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        } else {
          entry.target.classList.remove('reveal-active');
        }
      });
    }, observerOptions);

    const scrollSelector = '.reveal-on-scroll, .reveal-3d, .reveal-clip-right, .reveal-slide-left, .reveal-slide-right, .reveal-blur-zoom';
    const elements = document.querySelectorAll(scrollSelector);
    elements.forEach(el => observer.observe(el));

    const mutationObserver = new MutationObserver(() => {
      const currentElements = document.querySelectorAll(scrollSelector);
      currentElements.forEach(el => {
        observer.observe(el);
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-principal font-sans text-zinc-100 flex flex-col justify-between selection:bg-coral selection:text-white relative">
      <Navbar onOpenContact={openContact} />
      
      <main className="flex-grow">
        <Hero onOpenContact={openContact} />
        <Portfolio />
        <Services />
        <BlogAndClients onOpenContact={openContact} />
        <Testimonial onOpenContact={openContact} />
      </main>

      <Footer />

      <ContactModal isOpen={isContactOpen} onClose={closeContact} />
    </div>
  );
}

export default Home;
