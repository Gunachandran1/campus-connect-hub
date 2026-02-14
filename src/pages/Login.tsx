import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, Building2, Mail, Lock, User, MapPin, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const Login = () => {
  const { role } = useParams<{ role: 'student' | 'college' }>();
  const isStudent = role === 'student';
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: isRegister ? "Account Created!" : "Logged In!", description: `Welcome to CampusConnect` });
    navigate(isStudent ? '/dashboard' : '/admin');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
        {/* BG blobs */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-accent/8 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="gradient-primary rounded-xl p-3 inline-flex mb-4">
              {isStudent ? <GraduationCap className="h-7 w-7 text-primary-foreground" /> : <Building2 className="h-7 w-7 text-primary-foreground" />}
            </div>
            <h1 className="font-display text-2xl font-bold mb-1">
              {isStudent ? 'Student' : 'College Admin'} {isRegister ? 'Registration' : 'Login'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isRegister ? 'Create your account to get started' : 'Welcome back! Sign in to continue'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <>
                <div>
                  <Label className="text-xs">{isStudent ? 'Full Name' : 'College Name'}</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder={isStudent ? 'John Doe' : 'Anna University'} className="pl-10" required />
                  </div>
                </div>

                {isStudent && (
                  <>
                    <div>
                      <Label className="text-xs">Department</Label>
                      <Input placeholder="Computer Science" required />
                    </div>
                    <div>
                      <Label className="text-xs">College Name</Label>
                      <div className="relative mt-1">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Your college name" className="pl-10" required />
                      </div>
                    </div>
                  </>
                )}

                {!isStudent && (
                  <div>
                    <Label className="text-xs">College Code</Label>
                    <div className="relative mt-1">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Unique college ID" className="pl-10" required />
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-xs">Location (City, State)</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Chennai, Tamil Nadu" className="pl-10" required />
                  </div>
                </div>
              </>
            )}

            <div>
              <Label className="text-xs">{isStudent ? 'Email' : 'Official Email'}</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="email" placeholder="you@example.com" className="pl-10" required />
              </div>
            </div>

            <div>
              <Label className="text-xs">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="password" placeholder="••••••••" className="pl-10" required />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              {isRegister ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <button onClick={() => setIsRegister(!isRegister)} className="text-primary hover:underline">
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
            </button>
          </div>

          <div className="mt-3 text-center">
            <Link to={isStudent ? '/login/college' : '/login/student'} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {isStudent ? 'Are you a college admin?' : 'Are you a student?'}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
