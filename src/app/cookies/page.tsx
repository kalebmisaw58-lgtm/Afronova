import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <div className="pt-32 pb-20 bg-transparent">
      <div className="container-custom max-w-3xl card-dark p-8 md:p-12">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 transition-colors text-[#101312]/60 hover:text-[#9A6A31] text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
        <h1 className="section-heading text-[#101312] mb-2">Cookie Policy</h1>
        <p className="text-[#101312]/50 text-sm mb-6 font-semibold">Last updated: July 2026</p>
        <div className="space-y-6 text-[#101312]/75 leading-relaxed font-medium">
          <p>This website uses cookies to improve your experience and analyse traffic.
             By continuing to browse, you consent to our use of cookies.</p>
          <h2 className="font-display font-bold text-xl text-[#9A6A31]">Types of Cookies</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-[#101312]">Essential:</strong> Required for the site to function.</li>
            <li><strong className="text-[#101312]">Analytics:</strong> Google Analytics to understand traffic patterns.</li>
            <li><strong className="text-[#101312]">Marketing:</strong> Social media pixels for event promotion.</li>
          </ul>
          <h2 className="font-display font-bold text-xl text-[#101312]">Managing Cookies</h2>
          <p>You can control cookies through your browser settings. Disabling cookies may affect site functionality.</p>
        </div>
      </div>
    </div>
  );
}
