import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20" style={{ background: "#101312" }}>
      <div className="container-custom max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 transition-colors text-white/40 hover:text-[#D6A34A] text-sm">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
        <h1 className="section-heading text-white mb-6">Privacy Policy</h1>
        <p className="text-white/40 text-sm mb-4">Last updated: July 2026</p>
        <div className="space-y-6 text-white/60 leading-relaxed">
          <p>AfroNova Media House &amp; Events (&quot;AfroNova&quot;, &quot;we&quot;, &quot;our&quot;) is committed to protecting your personal data.</p>
          <h2 className="text-white font-display font-bold text-xl" style={{ color: "#D6A34A" }}>Information We Collect</h2>
          <p>We collect information you provide directly: name, email address, phone number,
             organisation, and any details submitted via our contact or application forms.</p>
          <h2 className="text-white font-display font-bold text-xl">How We Use Your Information</h2>
          <p>We use your data to respond to inquiries, process applications for Africa Celebrates,
             send event updates and newsletters (with consent), and improve our services.</p>
          <h2 className="text-white font-display font-bold text-xl">Data Security</h2>
          <p>We implement industry-standard security measures. Your data is never sold to third parties.</p>
          <h2 className="text-white font-display font-bold text-xl">Contact</h2>
          <p>For privacy-related inquiries, contact us at <Link href="/contact" className="text-gold hover:underline">our contact page</Link>.</p>
        </div>
      </div>
    </div>
  );
}
