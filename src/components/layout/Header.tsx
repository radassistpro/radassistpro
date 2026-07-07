"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { navLinks, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const onDarkHero =
    (isHome || pathname === "/book-a-call") && !scrolled && !mobileOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        onDarkHero
          ? "bg-gradient-to-b from-navy-950/80 to-transparent"
          : "bg-cream-50/95 backdrop-blur-md border-b border-border/60 shadow-sm shadow-navy-950/5",
      )}
    >
      <div className="container-wide flex items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <Link href="/" className="relative z-10 shrink-0 cursor-pointer">
          <Image
            src={onDarkHero ? "/logo-light.png" : "/logo.png"}
            alt={siteConfig.name}
            width={180}
            height={82}
            className="h-10 w-auto object-contain drop-shadow-sm lg:h-11"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "link-underline text-sm font-medium transition-colors cursor-pointer",
                pathname === link.href
                  ? onDarkHero
                    ? "text-white"
                    : "text-accent"
                  : onDarkHero
                    ? "text-white/85 hover:text-white"
                    : "text-navy-800 hover:text-accent",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            href="/how-it-works"
            variant={onDarkHero ? "outlineLight" : "outline"}
            size="sm"
          >
            See Process
          </Button>
          <Button href="/book-a-call" variant="primary" size="sm">
            Book a 15-Min Call
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "relative z-10 rounded-lg p-2 lg:hidden cursor-pointer",
            onDarkHero ? "text-white" : "text-navy-900",
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-cream-50 px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-lg font-medium cursor-pointer",
                  pathname === link.href ? "text-accent" : "text-navy-900",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/book-a-call" variant="primary" className="mt-4 w-full">
              Book a 15-Min Call
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
