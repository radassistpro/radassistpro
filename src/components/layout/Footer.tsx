import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { navLinks, siteConfig, audienceLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white grain">
      <div className="section-padding-tight">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Image
                src="/logo-light.png"
                alt={siteConfig.name}
                width={200}
                height={91}
                className="h-12 w-auto object-contain"
              />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
                PACS administration and preliminary teleradiology support for
                U.S. radiology groups. {siteConfig.unit}.
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-blue-400">
                {siteConfig.tagline}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                Navigation
              </h3>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/book-a-call" className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer">
                    Book a Call
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                Services
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link href="/services/virtual-pacs-admin" className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer">
                    Virtual PACS Admins
                  </Link>
                </li>
                <li>
                  <Link href="/services/prelim-teleradiology" className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer">
                    Prelim Teleradiologists
                  </Link>
                </li>
                <li>
                  <Link href="/platforms/onepacs" className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer">
                    OnePACS Support
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer">
                    Onboarding Process
                  </Link>
                </li>
              </ul>
              <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                Who We Serve
              </h3>
              <ul className="mt-4 space-y-2.5">
                {audienceLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                Contact
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3 text-sm text-white/70">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                  <a href={`tel:${siteConfig.phone.replace(/\D/g, "")}`} className="hover:text-white transition-colors cursor-pointer">
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/70">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors cursor-pointer">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                  <span>{siteConfig.address}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} {siteConfig.name}. {siteConfig.unit}.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/privacy" className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer">
                Terms
              </Link>
              <Link href="/book-a-call" className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
                Book a call
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
