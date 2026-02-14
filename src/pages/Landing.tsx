import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, MapPin, Calendar, Users, Sparkles, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { icon: Building2, label: "Colleges", value: "500+" },
  { icon: Calendar, label: "Events", value: "2,000+" },
  { icon: Users, label: "Students", value: "50,000+" },
];

const Landing = () => (
  <div className="min-h-screen">
    <Navbar />

    {/* Hero */}
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* BG decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" /> Your Gateway to Campus Opportunities
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Discover Opportunities
          <br />
          <span className="gradient-text">Beyond Your Campus</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4"
        >
          Explore. Compete. Achieve.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-sm text-muted-foreground max-w-lg mx-auto mb-10 italic"
        >
          "Your growth begins when you step outside your comfort zone."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/login/student">
            <Button size="lg" className="gap-2 text-base px-8 animate-pulse-glow">
              Get Started <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/login/college">
            <Button size="lg" variant="outline" className="gap-2 text-base px-8">
              <Building2 className="h-5 w-5" /> College Admin
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mt-16"
        >
          {stats.map(s => (
            <div key={s.label} className="glass-card rounded-xl px-6 py-4 text-center min-w-[140px]">
              <s.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="font-display text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* How it works */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">How CampusConnect Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find symposiums, hackathons, workshops, and placement drives happening at colleges near you — all in one place.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: MapPin, title: "Location-Based Discovery", desc: "Events are suggested based on your college location. Find what's happening near you." },
            { icon: Calendar, title: "Easy Enrollment", desc: "Browse event details, eligibility, and enroll with a single click." },
            { icon: GraduationCap, title: "Grow Your Network", desc: "Connect with students and colleges across the country. Level up your career." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card rounded-xl p-8 text-center"
            >
              <div className="gradient-primary rounded-xl p-3 inline-flex mb-4">
                <item.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Motivation */}
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="gradient-primary rounded-3xl p-12 md:p-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Apply Today. Lead Tomorrow.
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8 text-lg">
            "Your next achievement is just one event away."
          </p>
          <Link to="/login/student">
            <Button size="lg" variant="secondary" className="gap-2 text-base px-8">
              Explore More Events <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Landing;
