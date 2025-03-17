import { Navbar } from "@/components/navbar";
import { Link } from "@heroui/link";

export default function DefaultLayout({
                                        children,
                                      }: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-400 py-4 text-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          {/* Left side */}
          <p>&copy; {new Date().getFullYear()} Emotion AI. All rights reserved.</p>

          {/* Right side */}
          <div className="flex space-x-4">
            <Link href="/about" className="hover:text-white transition">
              About
            </Link>

          </div>
        </div>
      </footer>
    </div>
  );
}
