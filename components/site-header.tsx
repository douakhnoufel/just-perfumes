import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-block">
        <span className="muted">Luxury perfume house</span>
        <strong>parfume BADOU</strong>
      </Link>
      <nav className="nav-links">
        <Link href="/shop">Shop</Link>
        <Link href="/account">Rewards</Link>
        <Link href="/admin">Admin</Link>
        <Link href="/auth">Auth</Link>
      </nav>
    </header>
  );
}
