"use client";

import * as React from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { Award, ShieldCheck, Sparkles } from "lucide-react";

export default function AboutPage() {
  const containerRef = useGSAP(() => {
    gsap.from(".about-reveal", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.from(".about-image", {
      scale: 1.1,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
    });
  });

  const stats = [
    { label: "Years of Heritage", value: "25+" },
    { label: "Satisfied Clients", value: "50k+" },
    { label: "Exquisite Designs", value: "10k+" },
    { label: "Purity Rating", value: "99.9%" },
  ];

  const values = [
    {
      icon: <Award className="text-gold" size={32} strokeWidth={1} />,
      title: "Authenticity",
      description: "We guarantee the highest standards of silver purity, hallmarked and certified for your trust.",
    },
    {
      icon: <Sparkles className="text-gold" size={32} strokeWidth={1} />,
      title: "Craftsmanship",
      description: "Our pieces are handcrafted by master artisans who blend traditional techniques with modern aesthetics.",
    },
    {
      icon: <ShieldCheck className="text-gold" size={32} strokeWidth={1} />,
      title: "Integrity",
      description: "Transparency in pricing and quality is the cornerstone of our long-standing relationship with customers.",
    },
  ];

  return (
    <main ref={containerRef} className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-silver-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="about-reveal text-xs uppercase tracking-[0.4em] text-gold font-bold mb-6">
              Our Story
            </p>
            <h1 className="about-reveal text-5xl md:text-7xl font-serif text-charcoal mb-8 leading-tight">
              A Legacy of <span className="italic text-silver-400 text-6xl md:text-8xl">Purity</span> & Elegance.
            </h1>
            <p className="about-reveal text-lg md:text-xl text-charcoal/60 font-sans leading-relaxed max-w-2xl mx-auto">
              Since 1995, Silver Spoon has been a sanctuary for those who appreciate the timeless beauty and divine aura of pure silver.
            </p>
          </div>
        </div>
      </section>

      {/* Image & Mission Section */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="about-image relative aspect-[4/5] bg-silver-100 overflow-hidden border border-silver-100 shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1573408302382-90cd444b0598?q=80&w=1200&auto=format&fit=crop"
                alt="Silver Craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col">
              <h2 className="about-reveal text-4xl font-serif text-charcoal mb-8">
                Our Mission is to redefine the silver experience.
              </h2>
              <div className="about-reveal space-y-6 text-charcoal/70 leading-relaxed font-sans text-lg">
                <p>
                  Silver Spoon was born from a vision to bring the highest quality silver products to discerning customers who seek both aesthetic appeal and material integrity.
                </p>
                <p>
                  Over the past two decades, we have evolved from a small family-run workshop into a premier destination for silver jewellery, pooja idols, and luxury gifting items. Our journey is defined by a relentless pursuit of perfection and a deep respect for Indian silver-working traditions.
                </p>
                <p>
                  Every piece in our collection is meticulously inspected for purity and craftsmanship, ensuring that what you take home is not just an object, but a treasure that lasts for generations.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="about-reveal grid grid-cols-2 gap-8 pt-12 mt-12 border-t border-silver-100">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-serif text-charcoal mb-1">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-ultra font-bold text-gold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-silver-50">
        <div className="container mx-auto px-6 md:px-12 text-center mb-16">
          <p className="about-reveal text-xs uppercase tracking-[0.4em] text-gold font-bold mb-6">
            Our Core Values
          </p>
          <h2 className="about-reveal text-4xl font-serif text-charcoal">
            Principles that guide us.
          </h2>
        </div>
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value) => (
              <div key={value.title} className="about-reveal flex flex-col items-center text-center p-10 bg-white shadow-sm border border-silver-100">
                <div className="mb-8 p-4 bg-silver-50 rounded-full">
                  {value.icon}
                </div>
                <h3 className="text-xl font-serif text-charcoal mb-4 uppercase tracking-widest">{value.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed font-sans">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
