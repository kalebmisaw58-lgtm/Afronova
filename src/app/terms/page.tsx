import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 bg-transparent">
      <div className="container-custom max-w-3xl card-dark p-8 md:p-12">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 transition-colors text-[#101312]/60 hover:text-[#9A6A31] text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
        <h1 className="section-heading text-[#101312] mb-2">Terms of Use</h1>
        <p className="text-[#101312]/50 text-sm mb-6 font-semibold">Last updated: July 2026</p>
        <div className="space-y-6 text-[#101312]/75 leading-relaxed font-medium">
          <p>By accessing afronova.org, you agree to these Terms of Use. Please read them carefully.</p>
          <h2 className="font-display font-bold text-xl text-[#9A6A31]">Use of Content</h2>
          <p>All content on this website, including text, imagery, logos, and media, is owned by
             AfroNova Media House &amp; Events or its licensors. Reproduction without written
             permission is prohibited.</p>
          <h2 className="font-display font-bold text-xl text-[#101312]">Limitation of Liability</h2>
          <p>AfroNova is not liable for any damages arising from use of this website or attendance
             at our events beyond what is required by applicable law.</p>
          <h2 className="font-display font-bold text-xl text-[#101312]">Changes to Terms</h2>
          <p>We may update these terms at any time. Continued use of the site constitutes acceptance.</p>
          <h2 className="font-display font-bold text-xl text-[#101312]">Governing Law</h2>
          <p>These terms are governed by the laws of the Federal Democratic Republic of Ethiopia.</p>
        </div>
      </div>
    </div>
  );
}
