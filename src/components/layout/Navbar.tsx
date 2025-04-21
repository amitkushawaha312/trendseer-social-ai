
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled ? "bg-white/80 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-full bg-gradient-to-r from-trend-blue to-trend-purple p-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
              >
                <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                <path d="m13 13 6 6" />
              </svg>
            </div>
            <span className="font-bold text-xl">TrendSeer</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              to="/dashboard"
              className="text-sm font-medium hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              to="/trends"
              className="text-sm font-medium hover:text-primary"
            >
              Trends
            </Link>
            <Link
              to="/analysis"
              className="text-sm font-medium hover:text-primary"
            >
              Analysis
            </Link>
            <Link
              to="/documentation"
              className="text-sm font-medium hover:text-primary"
            >
              Documentation
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:inline-flex"
            asChild
          >
            <Link to="/documentation">
              Technical Docs
            </Link>
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-trend-blue to-trend-purple hidden md:inline-flex">
            <Link to="/dashboard">Start Analyzing</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
