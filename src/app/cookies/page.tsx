import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <div className="pt-32 pb-20" style={{ background: "#101312" }}>
      <div className="container-custom max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 transition-colors text-white/40 hover:text-[#D6A34A] text-sm">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
        <h1 className="section-heading text-white mb-6">Cookie Policy</h1>
        <p className="text-white/40 text-sm mb-4">Last updated: July 2026</p>
        <div className="space-y-6 text-white/65 leading-relaxed">
          <p>This website uses cookies to improve your experience and analyse traffic.
             By continuing to browse, you consent to our use of cookies.</p>
          <h2 className="text-white font-display font-bold text-xl">Types of Cookies</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-white/80">Essential:</strong> Required for the site to function.</li>
            <li><strong className="text-white/80">Analytics:</strong> Google Analytics to understand traffic patterns.</li>
            <li><strong className="text-white/80">Marketing:</strong> Social media pixels for event promotion.</li>
          </ul>
          <h2 className="text-white font-display font-bold text-xl">Managing Cookies</h2>
          <p>You can control cookies through your browser settings. Disabling cookies may affect site functionality.</p>
        </div>
      </div>
    </div>
  );
}
