import { GraduationCap, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground/[0.03] border-t border-border mt-20">
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="gradient-primary rounded-lg p-2">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">CampusConnect</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Bridging the gap between students and opportunities. Discover events, symposiums, and placement drives near you.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/login/student" className="hover:text-foreground transition-colors">Student Login</Link>
            <Link to="/login/college" className="hover:text-foreground transition-colors">College Admin</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Inspiration</h4>
          <div className="space-y-2 text-sm text-muted-foreground italic">
            <p>"Opportunities don't happen. You create them."</p>
            <p>"Your next achievement is just one event away."</p>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
        <p className="flex items-center justify-center gap-1">
          Made with <Heart className="h-3.5 w-3.5 text-destructive fill-destructive" /> by CampusConnect © 2026
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
