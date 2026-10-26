import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-10 text-gray-600">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p>© {new Date().getFullYear()} ShopNest. Fullstack E-Commerce Demo.</p>
        <div className="flex gap-6">
          <Link href="/products" className="hover:text-black">
            Products
          </Link>
          <Link href="/cart" className="hover:text-black">
            Cart
          </Link>
          <Link href="/orders" className="hover:text-black">
            My Orders
          </Link>
        </div>
      </div>
    </footer>
  );
}
