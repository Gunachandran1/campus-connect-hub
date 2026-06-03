import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, Building2, Mail, Lock, User, MapPin, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

const Login = () => {
  const { role } = useParams<{ role: 'student' | 'college' }>();
  const isStudent = role === 'student';
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${isStudent ? '/dashboard' : '/admin'}`,
            data: { full_name: fullName, role: isStudent ? 'student' : 'college' },
          },
        });
        if (error) throw error;
        toast({ title: "Account Created!", description: "Welcome to CampusConnect" });
        navigate(isStudent ? '/dashboard' : '/admin');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Logged In!", description: "Welcome back to CampusConnect" });
        navigate(isStudent ? '/dashboard' : '/admin');
      }
    } catch (err: any) {
      toast({ title: "Authentication Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${window.location.origin}${isStudent ? '/dashboard' : '/admin'}`,
      });
      if (result.error) {
        toast({ title: "Google Sign-in Failed", description: String(result.error?.message || result.error), variant: "destructive" });
        setLoading(false);
        return;
      }
      if (result.redirected) return;
      navigate(isStudent ? '/dashboard' : '/admin');
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
      setLoading(false);
    }
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
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={isStudent ? 'John Doe' : 'Anna University'} className="pl-10" required />
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
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-10" required />
              </div>
            </div>

            <div>
              <Label className="text-xs">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10" required minLength={6} />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Button type="button" variant="outline" className="w-full gap-2" onClick={handleGoogle} disabled={loading}>
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.93l3.66-2.83z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/>
            </svg>
            Continue with Google
          </Button>

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
