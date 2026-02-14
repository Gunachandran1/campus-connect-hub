import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Building2, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event, eventTypeLabels, eventTypeColors } from "@/data/mockData";

interface EventCardProps {
  event: Event;
  onEnroll?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const EventCard = ({ event, onEnroll, onViewDetails }: EventCardProps) => {
  const isPlacement = event.type === 'placement';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-xl overflow-hidden group"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge className={`${eventTypeColors[event.type]} border-0 font-medium`}>
            {eventTypeLabels[event.type]}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" /> {event.registeredCount} enrolled
          </span>
        </div>

        <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        {isPlacement && event.company && (
          <div className="flex items-center gap-2 mb-2 text-sm font-medium">
            <Briefcase className="h-4 w-4 text-primary" />
            {event.company}
          </div>
        )}

        <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 shrink-0" /> {event.college}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" /> {event.location}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0" /> {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>

        {isPlacement && event.eligibility && (
          <div className="text-xs bg-secondary rounded-lg px-3 py-2 mb-4">
            <span className="font-semibold">Eligibility:</span> {event.eligibility}
          </div>
        )}

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {event.description}
        </p>

        <div className="flex gap-2">
          {isPlacement ? (
            <Button className="w-full gap-2" onClick={() => onEnroll?.(event.id)}>
              Enroll Now <ArrowRight className="h-4 w-4" />
            </Button>
          ) : event.type === 'symposium' ? (
            <Button className="w-full gap-2" onClick={() => onViewDetails?.(event.id)}>
              View Events <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button className="w-full gap-2" onClick={() => onEnroll?.(event.id)}>
              Participate Now <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
