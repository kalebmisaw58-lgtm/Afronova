import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-afro-black adinkra-bg">
      <div className="text-center space-y-6 px-4">
        <p className="text-8xl font-display font-black text-gradient">404</p>
        <h1 className="text-3xl font-display font-bold text-white">Page Not Found</h1>
        <p className="text-white/55 max-w-sm mx-auto">
          This page doesn&apos;t exist, but Africa does, and so does everything you need at AfroNova.
        </p>
        <Link href="/" className="btn-primary inline-flex">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}

