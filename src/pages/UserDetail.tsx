import { useParams, Link } from "react-router-dom";
import { useUser } from "@/hooks/useUsers";
import { ArrowLeft, Mail, Phone, Globe, Building2, MapPin } from "lucide-react";

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, error } = useUser(id!);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-destructive text-lg">User not found.</p>
        <Link to="/" className="text-primary hover:underline text-sm">← Back to directory</Link>
      </div>
    );
  }

  const InfoRow = ({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) => (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <Icon className="h-4 w-4 text-accent mt-0.5 shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-sm text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to directory
          </Link>
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display text-xl sm:text-2xl font-bold shrink-0">
              {user.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">{user.name}</h1>
              <p className="text-muted-foreground text-sm">@{user.username}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {/* Contact Info */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-semibold text-foreground mb-2">Contact Information</h2>
            <InfoRow icon={Mail} label="Email" value={user.email.toLowerCase()} />
            <InfoRow icon={Phone} label="Phone" value={user.phone} />
            <InfoRow icon={Globe} label="Website" value={user.website} />
          </div>

          {/* Address */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-semibold text-foreground mb-2">Address</h2>
            <InfoRow
              icon={MapPin}
              label="Street"
              value={`${user.address.suite}, ${user.address.street}`}
            />
            <InfoRow icon={MapPin} label="City" value={`${user.address.city} ${user.address.zipcode}`} />
            <InfoRow icon={Globe} label="Coordinates" value={`${user.address.geo.lat}, ${user.address.geo.lng}`} />
          </div>

          {/* Company */}
          <div className="rounded-xl border border-border bg-card p-5 md:col-span-2">
            <h2 className="font-semibold text-foreground mb-2">Company</h2>
            <InfoRow icon={Building2} label="Name" value={user.company.name} />
            <InfoRow icon={Building2} label="Catch Phrase" value={user.company.catchPhrase} />
            <InfoRow icon={Building2} label="Business" value={user.company.bs} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDetail;
