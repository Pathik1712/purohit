import Link from "next/link";
import { Mail, Phone, Share2 } from "lucide-react";

const footerLinks = {
  shop: [
    { href: "/collections/all", label: "All Products" },
    { href: "/collections/millet-namkeen", label: "Millet Namkeen" },
    { href: "/collections/roasted-namkeen", label: "Roasted Namkeen" },
    { href: "/collections/healthy-sweets", label: "Healthy Sweets" },
    { href: "/collections/snack-gift-hampers", label: "Gift Hampers" },
  ],
  company: [
    { href: "/about", label: "Our Story" },
    { href: "/corporate-gifting", label: "Corporate Gifting" },
    { href: "/export", label: "Export" },
    { href: "/account/login", label: "My Account" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">Purohit</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Delicious roasted snacks & namkeen made with nourishing superfoods such as quinoa, millets and Indian pulses.
            </p>
            <div className="flex gap-4 mt-6 text-sm">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 flex items-center gap-1">
                <Share2 className="h-4 w-4" /> Instagram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 flex items-center gap-1">
                <Share2 className="h-4 w-4" /> Facebook
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 flex items-center gap-1">
                <Share2 className="h-4 w-4" /> YouTube
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 flex items-center gap-1">
                <Share2 className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm opacity-90 hover:opacity-100 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm opacity-90 hover:opacity-100 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm opacity-90">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@purohit.com">info@purohit.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+919314483449">+91 93144 83449</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+918955121977">+91 89551 21977</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Purohit by Pioneer Foods Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
