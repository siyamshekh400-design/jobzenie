import { Briefcase } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-card border-border border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-bold">
              <div className="bg-primary text-primary-foreground rounded-lg p-2">
                <Briefcase size={18} />
              </div>
              <span>JobZenie</span>
            </div>
            <p className="text-muted-foreground text-sm">Connecting talent with opportunity</p>
          </div>

          {/* For Candidates */}
          <div>
            <h3 className="mb-4 font-semibold">For Candidates</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href="/jobs" className="hover:text-foreground">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/talents" className="hover:text-foreground">
                  Talents
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="mb-4 font-semibold">For Employers</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              {/* <li>
                <Link href="#" className="hover:text-foreground">
                  Post a Job
                </Link>
              </li> */}
              <li>
                <Link href="/talents" className="hover:text-foreground">
                  Find Talent
                </Link>
              </li>
              <li>
                <Link href="/company" className="hover:text-foreground">
                  Company Page
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold">Legal</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="hover:text-foreground">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border text-muted-foreground border-t pt-8 text-center text-sm">
          <p>&copy; 2025 JobZenie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
