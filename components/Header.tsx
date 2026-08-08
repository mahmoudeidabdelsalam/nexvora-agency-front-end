"use client";

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

export default function Header({ logoUrl, menu, ctaLabel, ctaHref }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-[#0997AA]/10 bg-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-2 py-4 lg:px-0">
        <a href="/" className="flex items-center gap-3">
          <img src={logoUrl} alt="Agency logo" className="h-14 w-auto" />
        </a>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-md border border-white/20 px-3 text-sm font-medium text-white md:hidden"
            onClick={() => setMobileOpen((current) => !current)}
          >
            {!mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                <path d="M 2 9 L 2 11 L 48 11 L 48 9 L 2 9 z M 2 24 L 2 26 L 48 26 L 48 24 L 2 24 z M 2 39 L 2 41 L 48 41 L 48 39 L 2 39 z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                <path d="M 7.7070312 6.2929688 L 6.2929688 7.7070312 L 23.585938 25 L 6.2929688 42.292969 L 7.7070312 43.707031 L 25 26.414062 L 42.292969 43.707031 L 43.707031 42.292969 L 26.414062 25 L 43.707031 7.7070312 L 42.292969 6.2929688 L 25 23.585938 L 7.7070312 6.2929688 z"></path>
              </svg>
            )}
          </button>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => {
              const hasSubmenu = item.submenu?.length;
              return (
                <div key={item.label} className="relative">
                  <div className="flex items-center gap-1.5">
                    {!hasSubmenu && (
                      <a
                        href={item.link?.url || "/"}
                        className="flex items-center gap-1.5 text-sm font-medium text-#262263 uppercase transition-colors hover:text-[#0997AA]"
                        onClick={() => setOpenMenu(null)}
                      >
                        <span>{item.label}</span>
                      </a>
                    )}
                    
                    {hasSubmenu ? (
                      <button
                        type="button"
                        onClick={() => toggleMenu(item.label)}
                        className="flex items-center gap-1.5 text-sm font-medium text-#262263 uppercase transition-colors hover:text-[#0997AA]"
                        aria-expanded={openMenu === item.label}
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <span>{item.label}</span>
                        <span className={`text-xs transition-transform icon-submenu ${openMenu === item.label ? "rotate-180" : ""}`}></span>
                      </button>
                    ) : null}
                  </div>
                  {hasSubmenu && openMenu === item.label && (
                    <div className="absolute left-0 top-full mt-3 w-80 rounded-md border border-[#262263]/10 bg-white p-3 shadow-xl">
                      {item.submenu?.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.link?.url || "/"}
                          className="block rounded-md px-3 py-2 text-xs uppercase text-[#262263] transition-colors hover:bg-[#f7fbfc] hover:text-[#0997AA]"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <a
            href={ctaHref}
            className="hidden rounded-md uppercase bg-[#0997AA] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-[#088392] md:inline-flex"
          >
            {ctaLabel}
          </a>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#262263] px-6 py-4 md:hidden lg:px-8">
          <div className="space-y-2">
            {navItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between rounded-md px-3 py-2 text-white">
                  <a href={item.link?.url || "/"} className="text-sm font-medium uppercase" onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </a>
                  {item.submenu?.length ? (
                    <button type="button" className="text-sm text-[#0997AA]" onClick={() => toggleMenu(item.label)}>
                      {openMenu === item.label ? "−" : "+"}
                    </button>
                  ) : null}
                </div>
                {item.submenu?.length && openMenu === item.label ? (
                  <div className="mt-2 space-y-1 rounded-md bg-white/10 p-2">
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.link?.url || "/"}
                        className="block uppercase rounded-md px-3 py-2 text-xs text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                        onClick={() => setMobileOpen(false)}
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <a
            href={ctaHref}
            className="mt-4 w-full inline-flex uppercase rounded-md bg-[#0997AA] px-4 py-2.5 text-sm font-semibold text-white"
            onClick={() => setMobileOpen(false)}
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </header>
  );
}
