import { useState, useMemo } from "react";
import { useUsers } from "@/hooks/useUsers";
import { Link } from "react-router-dom";
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Building2, Phone, Mail, Users } from "lucide-react";
import { Input } from "@/components/ui/input";

type SortField = "name" | "company";
type SortDir = "asc" | "desc";

const UserDirectory = () => {
  const { data: users, isLoading, error } = useUsers();
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />;
    return sortDir === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5 text-primary" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-primary" />
    );
  };

  const filtered = useMemo(() => {
    if (!users) return [];
    const q = search.toLowerCase();
    const list = users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
    list.sort((a, b) => {
      const valA = sortField === "name" ? a.name : a.company.name;
      const valB = sortField === "name" ? b.name : b.company.name;
      return sortDir === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
    return list;
  }, [users, search, sortField, sortDir]);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive text-lg">Failed to load users.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <Users className="h-5 w-5 text-accent" />
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">BuyerForeSight</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                User Directory Dashboard
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                {users ? `${users.length} people` : "Loading…"}
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-background border-border"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block rounded-xl border border-border bg-card overflow-hidden shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <button onClick={() => toggleSort("name")} className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                        Name <SortIcon field="name" />
                      </button>
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <button onClick={() => toggleSort("company")} className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                        Company <SortIcon field="company" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user, i) => (
                    <tr
                      key={user.id}
                      className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors"
                      style={{ animation: `fade-in 0.4s ease-out ${i * 0.04}s both` }}
                    >
                      <td className="px-5 py-4">
                        <Link to={`/user/${user.id}`} className="font-medium text-foreground hover:text-primary transition-colors">
                          {user.name}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-0.5">@{user.username}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-muted-foreground">{user.email.toLowerCase()}</td>
                      <td className="px-5 py-4 text-sm text-muted-foreground">{user.phone}</td>
                      <td className="px-5 py-4 text-sm text-foreground">{user.company.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="px-5 py-12 text-center text-muted-foreground">No users found.</div>
              )}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => toggleSort("name")}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                    sortField === "name" ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border"
                  }`}
                >
                  Name <SortIcon field="name" />
                </button>
                <button
                  onClick={() => toggleSort("company")}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                    sortField === "company" ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border"
                  }`}
                >
                  Company <SortIcon field="company" />
                </button>
              </div>

              {filtered.map((user, i) => (
                <Link
                  to={`/user/${user.id}`}
                  key={user.id}
                  className="block rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow animate-fade-in"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <p className="font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground mb-3">@{user.username}</p>
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{user.email.toLowerCase()}</div>
                    <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{user.phone}</div>
                    <div className="flex items-center gap-2"><Building2 className="h-3.5 w-3.5" />{user.company.name}</div>
                  </div>
                </Link>
              ))}
              {filtered.length === 0 && (
                <div className="py-12 text-center text-muted-foreground">No users found.</div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default UserDirectory;
