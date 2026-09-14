import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20 bg-transparent">
      <div className="container-custom max-w-3xl card-dark p-8 md:p-12">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 transition-colors text-[#101312]/60 hover:text-[#9A6A31] text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
        <h1 className="section-heading text-[#101312] mb-2">Privacy Policy</h1>
        <p className="text-[#101312]/50 text-sm mb-6 font-semibold">Last updated: July 2026</p>
        <div className="space-y-6 text-[#101312]/75 leading-relaxed font-medium">
          <p>AfroNova Media House &amp; Events (&quot;AfroNova&quot;, &quot;we&quot;, &quot;our&quot;) is committed to protecting your personal data.</p>
          <h2 className="font-display font-bold text-xl text-[#9A6A31]">Information We Collect</h2>
          <p>We collect information you provide directly: name, email address, phone number,
             organisation, and any details submitted via our contact or application forms.</p>
          <h2 className="font-display font-bold text-xl text-[#101312]">How We Use Your Information</h2>
          <p>We use your data to respond to inquiries, process applications for Africa Celebrates,
             send event updates and newsletters (with consent), and improve our services.</p>
          <h2 className="font-display font-bold text-xl text-[#101312]">Data Security</h2>
          <p>We implement industry-standard security measures. Your data is never sold to third parties.</p>
          <h2 className="font-display font-bold text-xl text-[#101312]">Contact</h2>
          <p>For privacy-related inquiries, contact us at <Link href="/contact" className="text-[#9A6A31] hover:underline font-bold">our contact page</Link>.</p>
        </div>
      </div>
    </div>
  );
}
