import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const eventTypes = ['All', 'Symposium', 'Workshop', 'Hackathon', 'Placement Drive', 'Cultural Event'];

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeFilter: string;
  onFilterChange: (f: string) => void;
}

const SearchFilter = ({ searchQuery, onSearchChange, activeFilter, onFilterChange }: SearchFilterProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="glass-card rounded-2xl p-6 mb-10"
  >
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by college, event, or company..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className="pl-10 bg-background/60"
        />
      </div>
      <Button variant="outline" className="gap-2 shrink-0">
        <SlidersHorizontal className="h-4 w-4" /> Filters
      </Button>
    </div>
    <div className="flex flex-wrap gap-2">
      {eventTypes.map(type => (
        <Badge
          key={type}
          variant={activeFilter === type ? "default" : "outline"}
          className="cursor-pointer transition-all hover:scale-105"
          onClick={() => onFilterChange(type)}
        >
          {type}
        </Badge>
      ))}
    </div>
  </motion.div>
);

export default SearchFilter;
