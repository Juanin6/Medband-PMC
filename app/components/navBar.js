import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-10">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-blue-500 blur-sm opacity-70 animate-pulse"></div>
            <Heart className="h-6 w-6 text-primary relative" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-transparent bg-clip-text">
            MedBand
          </span>
        </div>
        <nav className="hidden md:flex gap-8">
          {[
            "Características",
            "Beneficios",
            "Testimonios",
            "Precio",
            "Privacidad",
          ].map((item, i) => (
            <Link
              key={i}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className=" border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
          >
            <Link href="/sign-in">Iniciar Sesion</Link>
          </Button>
          <Button className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300 rounded-full px-6">
            Comprar Ahora
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </header>
  );
}
