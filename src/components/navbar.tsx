import { useState, useEffect } from "react"; // ✅ Add useState to track menu open/close
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,

} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, SearchIcon } from "@/components/icons";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(true); // ✅ Default to open on desktop
  const [isMobile, setIsMobile] = useState(true); // Track if it's mobile

  // ✅ Check screen size to control menu behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Check if viewport is below 1024px
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Ensure menu is always open on desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(true);
  }, [isMobile]);

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="visible lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  // @ts-ignore
  // @ts-ignore
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      {/* Left Side - Logo & Desktop Links */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link className="flex justify-start items-center gap-1" color="foreground" href="/">
            <Logo />
            <p className="font-bold text-inherit">Emotion AI</p>
          </Link>
        </NavbarBrand>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      {/* Right Side - Desktop Theme Switch & Search */}
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
      </NavbarContent>

      {/* Mobile Menu Toggle (Only for Mobile) */}
      {isMobile && (
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />

          {/* ✅ Fix: Only show the toggle on mobile */}
          <NavbarMenuToggle
            onClick={() => setMenuOpen(!menuOpen)}
            aria-pressed={menuOpen}
          />
        </NavbarContent>
      )}

      {/* ✅ Always Show Navbar Menu on Desktop */}

    </HeroUINavbar>
  );
};
