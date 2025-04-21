
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2">
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
          </div>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            An AI-powered platform for social media trend prediction and analysis
            using Big Data Analytics.
          </p>
        </div>
        <div className="flex gap-8 md:gap-12">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/trends" className="text-muted-foreground hover:text-foreground">
                  Trends
                </Link>
              </li>
              <li>
                <Link to="/analysis" className="text-muted-foreground hover:text-foreground">
                  Analysis
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/documentation" className="text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/documentation/api" className="text-muted-foreground hover:text-foreground">
                  API
                </Link>
              </li>
              <li>
                <Link to="/documentation/models" className="text-muted-foreground hover:text-foreground">
                  ML Models
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground">
                  Project
                </Link>
              </li>
              <li>
                <Link to="/methodology" className="text-muted-foreground hover:text-foreground">
                  Methodology
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-2 border-t py-4 md:flex-row md:items-center md:gap-0 md:py-6">
        <p className="text-xs text-muted-foreground">
          &copy; 2025 TrendSeer AI - College Project
        </p>
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="text-xs text-muted-foreground">
            Built with React, Tailwind, and AI
          </div>
        </div>
      </div>
    </footer>
  );
}
