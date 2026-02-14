import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { College } from "@/data/mockData";

interface CollegeCardProps {
  college: College;
  onClick?: (id: string) => void;
}

const CollegeCard = ({ college, onClick }: CollegeCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
    className="glass-card rounded-xl p-5 cursor-pointer"
    onClick={() => onClick?.(college.id)}
  >
    <div className="flex items-start justify-between mb-3">
      <div className="gradient-primary rounded-lg p-2.5">
        <span className="text-primary-foreground font-display font-bold text-sm">
          {college.name.split(' ').map(w => w[0]).join('').slice(0, 3)}
        </span>
      </div>
      {college.distance && (
        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
          {college.distance}
        </span>
      )}
    </div>
    <h3 className="font-display font-semibold mb-1">{college.name}</h3>
    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
      <MapPin className="h-3.5 w-3.5" /> {college.location}
    </p>
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground flex items-center gap-1">
        <Calendar className="h-3.5 w-3.5" /> {college.eventCount} upcoming events
      </span>
      <ArrowRight className="h-4 w-4 text-primary" />
    </div>
  </motion.div>
);

export default CollegeCard;
