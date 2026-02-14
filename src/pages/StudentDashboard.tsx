import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import CollegeCard from "@/components/CollegeCard";
import SearchFilter from "@/components/SearchFilter";
import { mockEvents, mockColleges } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const filterMap: Record<string, string> = {
  'All': '',
  'Symposium': 'symposium',
  'Workshop': 'workshop',
  'Hackathon': 'hackathon',
  'Placement Drive': 'placement',
  'Cultural Event': 'cultural',
};

const StudentDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const { toast } = useToast();

  const filteredEvents = mockEvents.filter(e => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.company?.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = activeFilter === 'All' || e.type === filterMap[activeFilter];
    return matchesSearch && matchesFilter;
  });

  const handleEnroll = (id: string) => {
    toast({ title: "🎉 Enrolled Successfully!", description: "You've been registered for this event. Check your email for confirmation." });
  };

  const handleViewDetails = (id: string) => {
    toast({ title: "Event Details", description: "Sub-events view coming soon!" });
  };

  return (
    <div className="min-h-screen">
      <Navbar isLoggedIn userName="Rahul" userRole="student" />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-80 h-80 rounded-full bg-primary/8 blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-accent/8 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" /> Welcome back, Rahul!
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-3 leading-tight">
              Discover Opportunities
              <br />
              <span className="gradient-text">Beyond Your Campus</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-2">Explore. Compete. Achieve.</p>
            <p className="text-sm text-muted-foreground italic">
              "Your growth begins when you step outside your comfort zone."
            </p>
          </motion.div>
        </div>
      </section>

      {/* About section */}
      <section className="pb-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-center"
          >
            <div className="gradient-primary rounded-xl p-4 shrink-0">
              <TrendingUp className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold mb-2">How It Works</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                CampusConnect uses your college location to suggest nearby symposiums, hackathons, workshops, and placement drives.
                Browse events from multiple colleges, filter by type, and enroll instantly — all from one platform.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="pb-6">
        <div className="container mx-auto px-4">
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      </section>

      {/* Nearby Colleges */}
      <section className="pb-14">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold mb-6">Colleges Near You</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockColleges.slice(0, 6).map(c => (
              <CollegeCard key={c.id} college={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="pb-14">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold mb-6">
            {activeFilter === 'All' ? 'All Events' : activeFilter + 's'}
            <span className="text-sm font-normal text-muted-foreground ml-2">({filteredEvents.length} found)</span>
          </h2>
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">No events found matching your criteria.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(e => (
                <EventCard key={e.id} event={e} onEnroll={handleEnroll} onViewDetails={handleViewDetails} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Motivation CTA */}
      <section className="pb-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-primary rounded-3xl p-10 md:p-14 text-center"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
              Opportunities Don't Happen. You Create Them.
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              "Apply today. Lead tomorrow."
            </p>
            <Button variant="secondary" size="lg" className="gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Explore More Events <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
