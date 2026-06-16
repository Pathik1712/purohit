"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, User, X } from "lucide-react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/collections/all", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/corporate-gifting", label: "Corporate Gifting" },
  { href: "/about", label: "About" },
  { href: "/export", label: "Export" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
      <div className="container flex h-16 items-center justify-between gap-4">
        <button
          className="flex h-11 w-11 items-center justify-center lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/" className="font-heading text-xl font-bold text-primary lg:text-2xl">
          Purohit
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-muted"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/account/login"
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-muted"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Link>
          <CartDrawer.Trigger />
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-card p-4">
          <form action="/search" method="GET" className="container flex gap-2">
            <input
              name="q"
              type="search"
              placeholder="Search products..."
              className="flex-1 h-11 rounded-md border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            <button type="submit" className="h-11 px-6 bg-primary text-white rounded-md text-sm font-medium">
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile nav */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
        <nav className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-card shadow-xl flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-heading font-bold text-primary">Menu</span>
            <button onClick={() => setMobileOpen(false)} className="h-10 w-10 flex items-center justify-center" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 px-2 text-base font-medium hover:text-primary border-b border-border"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto p-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">Follow us</p>
            <div className="flex gap-4 text-sm">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Facebook</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">YouTube</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">LinkedIn</a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
