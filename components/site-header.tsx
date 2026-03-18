import Link from "next/link";
import { signOutAction } from "@/lib/actions";
import { Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function SiteHeader() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="site-header-side">
          <button type="button" className="icon-button mobile-menu" aria-label="Open navigation">
            <Menu size={18} />
          </button>
          <nav className="nav-links" aria-label="Primary">
            <Link href="/shop">Shop</Link>
            <Link href="/shop">Collections</Link>
            <Link href="/contact">About</Link>
          </nav>
        </div>

        <Link href="/" className="brand-mark" aria-label="BADOU home">
          BADOU
        </Link>

        <div className="site-header-actions">
          <button type="button" className="icon-button" aria-label="Search">
            <Search size={18} />
          </button>
          {user ? (
            <form action={signOutAction}>
              <button type="submit" className="icon-button" aria-label="Sign out">
                <UserRound size={18} />
              </button>
            </form>
          ) : (
            <Link href="/auth" className="icon-button" aria-label="Account">
              <UserRound size={18} />
            </Link>
          )}
          <button type="button" className="icon-button cart-button" aria-label="Shopping bag">
            <ShoppingBag size={18} />
            <span className="cart-count">0</span>
          </button>
        </div>
      </div>
    </header>
  );
}
