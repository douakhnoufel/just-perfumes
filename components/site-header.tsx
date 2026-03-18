import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-block">
        <Image
          src="/logo-mark.svg"
          alt="JUST-PERFUM"
          width={40}
          height={40}
          className="brand-logo"
        />
        <div className="brand-text">
          <span className="muted">Extrait de Parfum</span>
          <strong>JUST-PERFUM</strong>
        </div>
      </Link>
      <nav className="nav-links">
        <Link href="/shop">Collection</Link>
        <Link href="/contact">Store</Link>
        <Link href="/account">Rewards</Link>
        <Link href="/auth">Account</Link>
      </nav>
    </header>
  );
}
