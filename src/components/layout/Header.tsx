"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, User, Menu, X } from "lucide-react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { cn } from "@/lib/utils";
import Image from "next/image";


const leftNavLinks = [
  { href: "/collections/all", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/corporate-gifting", label: "Corporate Gifting" },
];

const rightNavLinks = [
  { href: "/about", label: "About" },
  { href: "/export", label: "Export" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white">

      {/* Desktop header */}
      {/* Desktop header */}
      <div className="hidden lg:block">
        <div className="relative mx-auto h-25.25 max-w-292">

          {/* Search — fixed to left */}
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center"
            aria-label="Search"
          >
            <Search
              className="h-5.5 w-5.5"
              strokeWidth={2}
            />
          </button>

          {/* LEFT NAVIGATION */}
          <nav
            className="
        absolute
        right-[calc(50%+75px)]
        top-1/2
        flex
        -translate-y-1/2
        items-center
        gap-7.5
        whitespace-nowrap
      "
          >
            {leftNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
            font-(--font-nunito)
            text-[18px]
            tracking-[-0.02em]
            text-black
            transition-opacity
            hover:opacity-60
          "
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CENTERED BRAND */}
          <Link
            href="/"
            aria-label="Purohit home"
            className="
        absolute
        left-1/2
        top-1/2
        flex
        -translate-x-1/2
        -translate-y-1/2
        items-center
        justify-center
      "
          >
            <Image alt="logo" width={100} height={20} src="/images/logo.jpg" />
          </Link>

          {/* RIGHT NAVIGATION */}
          <nav
            className="
        absolute
        left-[calc(50%+75px)]
        top-1/2
        flex
        -translate-y-1/2
        items-center
        gap-7.5
        whitespace-nowrap
      "
          >
            {rightNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
            font-(--font-nunito)
            text-[18px]
            tracking-[-0.02em]
            text-black
            transition-opacity
            hover:opacity-60
          "
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ACCOUNT + CART — fixed to right */}
          <div
            className="
        absolute
        right-0
        top-1/2
        flex
        -translate-y-1/2
        items-center
        gap-2.5
      "
          >
            <Link
              href="/account/login"
              className="flex h-10 w-10 items-center justify-center"
              aria-label="Account"
            >
              <User
                className="h-5.25 w-5.25"
                strokeWidth={2}
              />
            </Link>

            <div className="flex h-10 w-10 items-center justify-center">
              <CartDrawer.Trigger />
            </div>
          </div>
        </div>

        {/* Search dropdown */}
        {searchOpen && (
          <div className="border-t border-black/10 bg-white">
            <form
              action="/search"
              method="GET"
              className="mx-auto flex max-w-292 gap-3 py-4"
            >
              <input
                name="q"
                type="search"
                placeholder="Search products..."
                autoFocus
                className="
            h-11
            flex-1
            border
            border-black/20
            bg-white
            px-4
            text-sm
            text-black
            outline-none
            placeholder:text-black/40
            focus:border-black
          "
              />

              <button
                type="submit"
                className="
            h-11
            bg-black
            px-7
            text-sm
            font-medium
            text-white
            transition-opacity
            hover:opacity-80
          "
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile header */}
      <div className="flex h-18 items-center justify-between px-5 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" strokeWidth={2} />
        </button>

        <Link
          href="/"
          className="font-heading text-[22px] font-bold tracking-tighter text-black"
        >
          PUROHIT
        </Link>

        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center"
            aria-label="Search"
          >
            <Search className="h-5 w-5" strokeWidth={2} />
          </button>

          <CartDrawer.Trigger />
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div className="border-t border-black/10 bg-white px-5 py-4 lg:hidden">
          <form action="/search" method="GET" className="flex gap-2">
            <input
              name="q"
              type="search"
              placeholder="Search products..."
              autoFocus
              className="h-11 min-w-0 flex-1 border border-black/20 px-4 text-sm outline-none focus:border-black"
            />

            <button
              type="submit"
              className="h-11 bg-black px-5 text-sm font-medium text-white"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile navigation */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
          "transition-opacity duration-200"
        )}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <nav className="absolute left-0 top-0 flex h-full w-[320px] max-w-[85vw] flex-col bg-white shadow-2xl">
          <div className="flex h-21.25 items-center justify-between border-b border-black/10 px-5">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="font-heading text-[22px] font-bold tracking-tighter"
            >
              PUROHIT
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>

          <div className="flex flex-col px-5 py-4">
            {[...leftNavLinks, ...rightNavLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-black/10 py-4 text-[15px] font-normal"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto border-t border-black/10 p-5">
            <p className="mb-4 text-xs uppercase tracking-[0.15em] text-black/50">
              Follow us
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60"
              >
                Instagram
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60"
              >
                Facebook
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60"
              >
                YouTube
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}