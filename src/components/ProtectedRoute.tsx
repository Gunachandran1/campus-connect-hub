import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

type Role = "student" | "college" | "admin";

interface ProtectedRouteProps {
  children: ReactNode;
  requireRole?: Role;
}

const ProtectedRoute = ({ children, requireRole }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [roleChecked, setRoleChecked] = useState(!requireRole);
  const [hasRole, setHasRole] = useState(false);

  useEffect(() => {
    let active = true;
    if (!requireRole || !user) {
      setRoleChecked(!requireRole);
      return;
    }
    setRoleChecked(false);
    supabase
      .from("user_roles" as any)
      .select("role")
      .eq("user_id", user.id)
      .eq("role", requireRole)
      .maybeSingle()
      .then(({ data }) => {
        if (!active) return;
        setHasRole(!!data);
        setRoleChecked(true);
      });
    return () => {
      active = false;
    };
  }, [user, requireRole]);

  if (loading || !roleChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    const loginPath = requireRole === "college" ? "/login/college" : "/login/student";
    return <Navigate to={loginPath} replace state={{ from: location }} />;
  }

  if (requireRole && !hasRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;