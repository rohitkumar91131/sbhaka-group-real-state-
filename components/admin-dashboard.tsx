"use client";

import { useEffect, useState, type FormEvent } from "react";

type AdminCopy = typeof import("../lib.json").default.admin;
type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  division: string;
  message: string;
  createdAt: string;
};

export function AdminDashboard({ copy }: { copy: AdminCopy }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [error, setError] = useState("");

  async function loadEnquiries() {
    const response = await fetch("/api/admin/enquiries", { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load enquiries");
    const data = await response.json() as { enquiries: Enquiry[] };
    setEnquiries(data.enquiries);
    setAuthenticated(true);
  }

  useEffect(() => {
    loadEnquiries()
      .catch(() => undefined)
      .finally(() => setChecking(false));
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setChecking(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        setError(response.status === 401 ? copy.invalidPasswordMessage : copy.loadErrorMessage);
        return;
      }
      setPassword("");
      await loadEnquiries();
    } catch {
      setError(copy.loadErrorMessage);
    } finally {
      setChecking(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setEnquiries([]);
  }

  if (checking && !authenticated) {
    return <p className="admin-loading">{copy.loadingLabel}</p>;
  }

  if (!authenticated) {
    return (
      <section className="admin-login" aria-labelledby="admin-login-heading">
        <h1 id="admin-login-heading">{copy.loginHeading}</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="admin-password">{copy.passwordLabel}</label>
          <input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button className="btn-primary" type="submit" disabled={checking}>
            {checking ? copy.loadingLabel : copy.loginButton}
          </button>
          <p className="admin-error" role="alert">{error}</p>
        </form>
      </section>
    );
  }

  return (
    <section className="admin-dashboard" aria-labelledby="admin-dashboard-heading">
      <div className="admin-dashboard-head">
        <div>
          <p className="admin-kicker">{copy.title}</p>
          <h1 id="admin-dashboard-heading">{copy.dashboardHeading}</h1>
        </div>
        <button className="admin-logout" type="button" onClick={handleLogout}>{copy.logoutButton}</button>
      </div>
      {error && <p className="admin-error" role="alert">{error}</p>}
      {enquiries.length === 0 ? (
        <p className="admin-empty">{copy.emptyMessage}</p>
      ) : (
        <div className="admin-enquiries">
          {enquiries.map((enquiry) => (
            <article className="admin-enquiry" key={enquiry.id}>
              <div className="admin-enquiry-head">
                <h2>{enquiry.name}</h2>
                <time dateTime={enquiry.createdAt}>{new Date(enquiry.createdAt).toLocaleString()}</time>
              </div>
              <dl className="admin-enquiry-contact">
                <div><dt>{copy.emailLabel}</dt><dd><a href={`mailto:${enquiry.email}`}>{enquiry.email}</a></dd></div>
                {enquiry.phone && <div><dt>{copy.phoneLabel}</dt><dd><a href={`tel:${enquiry.phone}`}>{enquiry.phone}</a></dd></div>}
                <div><dt>{copy.divisionLabel}</dt><dd>{enquiry.division}</dd></div>
              </dl>
              <h3>{copy.messageLabel}</h3>
              <p className="admin-enquiry-message">{enquiry.message}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
