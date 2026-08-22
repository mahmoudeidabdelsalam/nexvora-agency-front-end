"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

type HeaderMenuItem = {
  label: string;
  link: { url: string };
  submenu?: { label: string; link: { url: string } }[];
};

type HeaderProps = {
  logoUrl: string;
  menu: HeaderMenuItem[];
  ctaLabel: string;
  ctaHref: string;
};

const normalizePath = (value: string) => {
  if (!value || value === "#") return "/";
  const cleaned = value.trim();
  if (cleaned === "/") return "/";
  return cleaned.replace(/\/+$/, "") || "/";
};

export default function Header({ logoUrl, menu, ctaLabel, ctaHref }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const navItems = menu?.length ? menu : [];
  const headerRef = useRef<HTMLElement | null>(null);

  const toggleMenu = (label: string) => {
    setOpenMenu((current) => (current === label ? null : label));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenu && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header ref={headerRef} className="sticky top-3 z-50 px-3 sm:px-4">
      <div
        className={[
          "mx-auto flex max-w-7xl items-center justify-between gap-5 rounded-md border px-3 py-3 transition-all duration-300 ease-out sm:px-5 lg:px-6",
          isScrolled
            ? "border-[rgba(16,25,54,0.08)] bg-[rgba(255,255,255,0.84)] shadow-[0_12px_30px_rgba(15,23,42,0.03)] backdrop-blur-[18px]"
            : "border-[rgba(16,25,54,0.05)] bg-[rgba(255,255,255,0.72)] shadow-[0_4px_16px_rgba(15,23,42,0.02)] backdrop-blur-[18px]",
        ].join(" ")}
      >
        <Link href="/" className="flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02]">
          <img src={logoUrl} alt="Agency logo" className="h-10 w-auto sm:h-12" />
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(16,25,54,0.08)] bg-white/70 text-(--secondary) shadow-[0_4px_12px_rgba(15,23,42,0.04)] transition-colors duration-200 hover:border-[rgba(79,70,255,0.2)] hover:text-(--primary) md:hidden"
            onClick={() => setMobileOpen((current) => !current)}
          >
            <span className="relative h-4 w-5">
              <span
                className={[
                  "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                  mobileOpen ? "top-2 rotate-45" : "top-0",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                  mobileOpen ? "opacity-0" : "top-2 opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                  mobileOpen ? "top-2 -rotate-45" : "top-4",
                ].join(" ")}
              />
            </span>
          </button>

          <nav className="hidden items-center gap-7 md:flex lg:gap-8">
            {navItems.map((item) => {
              const hasSubmenu = !!item.submenu?.length;
              const itemHref = normalizePath(item.link?.url || "/");
              const currentPath = normalizePath(pathname || "/");
              const isActive = currentPath === itemHref || (itemHref !== "/" && currentPath.startsWith(`${itemHref}/`));

              return (
                <div
                  key={item.label}
                  className="group relative"
                  onMouseEnter={() => {
                    if (hasSubmenu) {
                      setOpenMenu(item.label);
                    }
                  }}
                  onMouseLeave={() => {
                    if (hasSubmenu) {
                      setOpenMenu(null);
                    }
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    {!hasSubmenu && (
                      <Link
                        href={itemHref}
                        className={[
                          "group relative flex items-center gap-1.5 text-[15px] font-medium uppercase leading-none tracking-[-0.01em] text-(--secondary) transition-colors duration-250 ease-out hover:text-(--primary)",
                          isActive ? "text-(--primary)" : "",
                        ].join(" ")}
                        onClick={() => setOpenMenu(null)}
                      >
                        <span
                          className={[
                            "relative after:absolute after:-bottom-2 after:left-1/2 after:h-px after:w-full after:-translate-x-1/2 after:origin-center after:scale-x-0 after:bg-(--primary) after:transition-all after:duration-250 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:after:scale-x-100",
                            isActive ? "after:scale-x-100" : "",
                          ].join(" ")}
                        >
                          {item.label}
                        </span>
                      </Link>
                    )}

                    {hasSubmenu && (
                      <button
                        type="button"
                        className={[
                          "group relative flex items-center gap-1.5 text-[15px] font-medium uppercase leading-none tracking-[-0.01em] text-(--secondary) transition-colors duration-250 ease-out hover:text-(--primary)",
                          openMenu === item.label || isActive
                            ? "text-(--primary)"
                            : "",
                        ].join(" ")}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMenu(item.label);
                        }}
                        aria-expanded={openMenu === item.label}
                        aria-haspopup="true"
                      >
                        <span
                          className={[
                            "relative after:absolute after:-bottom-2 after:left-1/2 after:h-px after:w-full after:-translate-x-1/2 after:origin-center after:scale-x-0 after:bg-(--primary) after:transition-all after:duration-250 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
                            openMenu === item.label || isActive
                              ? "after:scale-x-100"
                              : "",
                          ].join(" ")}
                        >
                          {item.label}
                        </span>

                        <span
                          className={[
                            "inline-block h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent transition-transform duration-200",
                            openMenu === item.label
                              ? "rotate-180 border-t-(--primary)"
                              : "border-t-(--secondary)",
                          ].join(" ")}
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </div>

                  {hasSubmenu && (
                    <>
                      {/* Invisible bridge prevents hover from breaking */}
                      <div className="absolute left-0 top-full h-4 w-full" />

                      <div
                        className={[
                          "absolute left-0 top-[calc(100%+16px)] z-20 w-80 origin-top rounded-2xl border border-[rgba(16,25,54,0.08)] bg-white/95 p-2 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-md transition-all duration-200 ease-out",
                          openMenu === item.label
                            ? "visible translate-y-0 opacity-100 pointer-events-auto"
                            : "invisible translate-y-1 opacity-0 pointer-events-none",
                        ].join(" ")}
                      >
                        {item.submenu?.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={normalizePath(subItem.link?.url || "/")}
                            className="block rounded-md px-3 py-2.5 text-[12px] font-medium uppercase tracking-[0.08em] text-(--secondary) transition-colors duration-200 hover:bg-[#f7fbfc] hover:text-(--primary)"
                            onClick={() => setOpenMenu(null)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </nav>

          <Link
            href={ctaHref}
            className="group hidden items-center gap-2 rounded-md  px-5 py-2.5 text-sm font-semibold uppercase tracking-[-0.01em] text-[#0b97ab] border border-[#0b97ab] transition-all duration-250 ease-out hover:brightness-110 md:inline-flex"
          >
            <span>{ctaLabel}</span>
            <span aria-hidden="true" className="inline-block transition-transform duration-250 ease-out group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="mt-3 rounded-[18px] border border-[rgba(16,25,54,0.08)] bg-[rgba(255,255,255,0.92)] px-3 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.04)] backdrop-blur-[18px] md:hidden">
          <div className="space-y-1.5">
            {navItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between rounded-md px-3 py-2.5">
                  <Link href={normalizePath(item.link?.url || "/")} className="text-sm font-medium uppercase tracking-[-0.01em] text-(--secondary)" onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                  {item.submenu?.length ? (
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full text-base font-semibold text-(--primary) transition-colors hover:bg-[#F3F5FF]"
                      onClick={() => toggleMenu(item.label)}
                    >
                      {openMenu === item.label ? "−" : "+"}
                    </button>
                  ) : null}
                </div>
                {item.submenu?.length && openMenu === item.label ? (
                  <div className="space-y-1 rounded-xl bg-[#f7fbfc] p-2">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={normalizePath(subItem.link?.url || "/")}
                        className="block rounded-[10px] px-3 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-(--secondary) transition-colors hover:bg-white hover:text-(--primary)"
                        onClick={() => setMobileOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <Link
            href={ctaHref}
            className="group mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#4F46FF_0%,#7C3AED_52%,#5B8CFF_100%)] px-4 py-3 text-sm font-semibold uppercase tracking-[-0.01em] text-white shadow-[0_12px_28px_rgba(79,70,255,0.2)] transition-all duration-250 hover:brightness-110"
            onClick={() => setMobileOpen(false)}
          >
            <span>{ctaLabel}</span>
            <span aria-hidden="true" className="inline-block transition-transform duration-250 ease-out group-hover:translate-x-1">→</span>
          </Link>
        </div>
      )}
    </header>
  );
}
