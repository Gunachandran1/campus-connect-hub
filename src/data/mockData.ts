export interface Event {
  id: string;
  title: string;
  type: 'symposium' | 'workshop' | 'hackathon' | 'placement' | 'cultural';
  college: string;
  location: string;
  date: string;
  time?: string;
  venue?: string;
  description: string;
  company?: string;
  eligibility?: string;
  subEvents?: SubEvent[];
  poster?: string;
  registeredCount: number;
}

export interface SubEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
}

export interface College {
  id: string;
  name: string;
  location: string;
  distance?: string;
  eventCount: number;
}

export const mockColleges: College[] = [
  { id: '1', name: 'Anna University', location: 'Chennai, Tamil Nadu', distance: '5 km', eventCount: 4 },
  { id: '2', name: 'SRM Institute', location: 'Chennai, Tamil Nadu', distance: '12 km', eventCount: 3 },
  { id: '3', name: 'VIT University', location: 'Vellore, Tamil Nadu', distance: '25 km', eventCount: 5 },
  { id: '4', name: 'PSG College of Technology', location: 'Coimbatore, Tamil Nadu', distance: '45 km', eventCount: 2 },
  { id: '5', name: 'NIT Trichy', location: 'Tiruchirappalli, Tamil Nadu', distance: '30 km', eventCount: 6 },
  { id: '6', name: 'BITS Pilani', location: 'Pilani, Rajasthan', distance: '120 km', eventCount: 3 },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'TechVista 2026',
    type: 'symposium',
    college: 'Anna University',
    location: 'Chennai, Tamil Nadu',
    date: '2026-03-15',
    description: 'A national-level technical symposium featuring competitions, workshops, and guest lectures from industry leaders.',
    registeredCount: 234,
    subEvents: [
      { id: 's1', title: 'Paper Presentation', description: 'Present your research papers on emerging technologies.', date: '2026-03-15', time: '10:00 AM', venue: 'Auditorium A' },
      { id: 's2', title: 'Coding Contest', description: 'Competitive programming challenge with exciting prizes.', date: '2026-03-15', time: '2:00 PM', venue: 'Lab Block 3' },
      { id: 's3', title: 'Technical Quiz', description: 'Test your knowledge across various tech domains.', date: '2026-03-16', time: '10:00 AM', venue: 'Seminar Hall' },
      { id: 's4', title: 'Photography Contest', description: 'Capture the essence of campus life.', date: '2026-03-16', time: '9:00 AM', venue: 'Campus-wide' },
    ],
  },
  {
    id: '2',
    title: 'Google Placement Drive',
    type: 'placement',
    college: 'SRM Institute',
    location: 'Chennai, Tamil Nadu',
    date: '2026-03-20',
    company: 'Google',
    eligibility: 'B.Tech CSE/IT, 7.5+ CGPA, No active backlogs',
    description: 'Google is hiring for SDE roles. Multiple rounds including coding, system design, and behavioral interviews.',
    registeredCount: 567,
  },
  {
    id: '3',
    title: 'AI/ML Workshop',
    type: 'workshop',
    college: 'VIT University',
    location: 'Vellore, Tamil Nadu',
    date: '2026-03-22',
    time: '9:00 AM - 5:00 PM',
    venue: 'Tech Park Auditorium',
    description: 'Hands-on workshop on machine learning fundamentals, neural networks, and real-world AI applications.',
    registeredCount: 189,
  },
  {
    id: '4',
    title: 'HackFest 2026',
    type: 'hackathon',
    college: 'NIT Trichy',
    location: 'Tiruchirappalli, Tamil Nadu',
    date: '2026-04-01',
    time: '24 Hours',
    venue: 'Innovation Center',
    description: '24-hour hackathon with themes including HealthTech, EdTech, and Sustainability. Cash prizes worth ₹2,00,000.',
    registeredCount: 312,
  },
  {
    id: '5',
    title: 'Amazon Recruitment Drive',
    type: 'placement',
    college: 'Anna University',
    location: 'Chennai, Tamil Nadu',
    date: '2026-04-05',
    company: 'Amazon',
    eligibility: 'B.Tech/M.Tech, 7.0+ CGPA',
    description: 'Amazon is conducting an on-campus recruitment drive for SDE-1 positions.',
    registeredCount: 421,
  },
  {
    id: '6',
    title: 'Culturama 2026',
    type: 'cultural',
    college: 'PSG College of Technology',
    location: 'Coimbatore, Tamil Nadu',
    date: '2026-04-10',
    description: 'Annual cultural festival with music, dance, drama, and literary events. Open to all colleges.',
    registeredCount: 876,
  },
  {
    id: '7',
    title: 'Microsoft Hiring Day',
    type: 'placement',
    college: 'BITS Pilani',
    location: 'Pilani, Rajasthan',
    date: '2026-04-12',
    company: 'Microsoft',
    eligibility: 'B.Tech CSE/IT/ECE, 8.0+ CGPA',
    description: 'Microsoft is hiring for multiple roles including SDE, PM, and Data Scientist positions.',
    registeredCount: 345,
  },
  {
    id: '8',
    title: 'Cybersecurity Workshop',
    type: 'workshop',
    college: 'NIT Trichy',
    location: 'Tiruchirappalli, Tamil Nadu',
    date: '2026-04-15',
    time: '10:00 AM - 4:00 PM',
    venue: 'Lecture Hall Complex',
    description: 'Learn ethical hacking, penetration testing, and cybersecurity fundamentals from industry experts.',
    registeredCount: 156,
  },
];

export const eventTypeLabels: Record<string, string> = {
  symposium: 'Symposium',
  workshop: 'Workshop',
  hackathon: 'Hackathon',
  placement: 'Placement Drive',
  cultural: 'Cultural Event',
};

export const eventTypeColors: Record<string, string> = {
  symposium: 'bg-primary/10 text-primary',
  workshop: 'bg-accent/10 text-accent',
  hackathon: 'bg-destructive/10 text-destructive',
  placement: 'bg-emerald-500/10 text-emerald-600',
  cultural: 'bg-amber-500/10 text-amber-600',
};
