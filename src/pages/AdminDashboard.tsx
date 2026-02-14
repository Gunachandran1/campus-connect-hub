import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Users, Eye, Image, Calendar, Building2, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockEvents, eventTypeLabels, eventTypeColors } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState(mockEvents.filter(e => e.college === 'Anna University'));

  const handleDelete = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    toast({ title: "Event Deleted", description: "The event has been removed." });
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "🎉 Event Created!", description: "Your event is now live and visible to students." });
  };

  const stats = [
    { icon: Calendar, label: "Active Events", value: events.length },
    { icon: Users, label: "Total Enrollments", value: events.reduce((s, e) => s + e.registeredCount, 0) },
    { icon: Eye, label: "Total Views", value: "3,240" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar isLoggedIn userName="Anna University" userRole="college" />

      <section className="relative pt-28 pb-10 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full bg-primary/8 blur-3xl animate-float" />
        </div>

        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Megaphone className="h-4 w-4" /> College Admin Panel
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Reach Thousands of Students <span className="gradient-text">Instantly</span>
            </h1>
            <p className="text-muted-foreground">Manage your events, track enrollments, and grow your reach.</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-10">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 text-center"
              >
                <s.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="font-display text-3xl font-bold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add Event */}
      <section className="pb-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold">Your Events</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" /> Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-display">Create New Event</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddEvent} className="space-y-4 mt-4">
                  <div>
                    <Label>Event Title</Label>
                    <Input placeholder="TechFest 2026" required />
                  </div>
                  <div>
                    <Label>Event Type</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(eventTypeLabels).map(([k, v]) => (
                          <SelectItem key={k} value={k}>{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Date</Label>
                      <Input type="date" required />
                    </div>
                    <div>
                      <Label>Time</Label>
                      <Input type="time" />
                    </div>
                  </div>
                  <div>
                    <Label>Venue</Label>
                    <Input placeholder="Main Auditorium" />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea placeholder="Describe your event..." rows={3} required />
                  </div>
                  <div>
                    <Label>Eligibility (optional)</Label>
                    <Input placeholder="B.Tech, 7.0+ CGPA" />
                  </div>
                  <div>
                    <Label>Event Poster</Label>
                    <Input type="file" accept="image/*" />
                  </div>
                  <Button type="submit" className="w-full">Publish Event</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Event list */}
          <div className="space-y-4">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`${eventTypeColors[event.type]} border-0 text-xs`}>{eventTypeLabels[event.type]}</Badge>
                    <span className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <h3 className="font-display font-semibold">{event.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{event.description}</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {event.registeredCount}</span>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Edit className="h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive" onClick={() => handleDelete(event.id)}>
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
