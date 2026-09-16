import { Link } from "@tanstack/react-router";
import { navLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">

        {/* Logo */}
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src="/tevexxo-logo.jpg"
              alt="Tevexxo logo"
              className="logo-image h-10 w-auto object-contain"
            />

            <span className="font-display text-lg font-semibold">
              Tevexxo
            </span>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            Build. Learn. Scale.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap items-start gap-x-6 gap-y-3 md:justify-center">
          {navLinks.slice(0, 5).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground md:text-right">
          © {new Date().getFullYear()} Tevexxo. All rights reserved.
        </p>

      </div>
    </footer>
  );
}