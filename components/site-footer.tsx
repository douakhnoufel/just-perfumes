import { MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>JUST-PERFUM</strong>
        <p className="muted">Extrait de Parfum — 100% Original designer fragrances by Badou.</p>
      </div>
      <div className="muted">
        <a
          href="https://maps.app.goo.gl/4op56WDqWCRzqWdY6"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-location"
        >
          <MapPin size={14} />
          <span>Visit our store</span>
        </a>
        <div>Your 6th bottle is on us — loyalty rewarded.</div>
      </div>
    </footer>
  );
}
