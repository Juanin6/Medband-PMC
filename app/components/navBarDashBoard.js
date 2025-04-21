
import { Heart, UserRound } from "lucide-react";
import Link from "next/link";


export function NavBarDashBoard({user}) {
  
  
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
        <nav className="hidden md:flex gap-9">
          <Link
            href="/dashboard/chat"
            className="text-md font-bold relative group"
          >
            {" "}
            Chat
          </Link>
          <Link
            href="/dashboard/stadistics"
            className="text-md font-bold relative group"
          >
            {" "}
            Stadistics
          </Link>
          <Link
            href="/dashboard/upload"
            className="text-md font-bold relative group"
          >
            {" "}
            Upload
          </Link>
          <div className="flex items-center gap-2">
          <UserRound></UserRound>
         
          </div>
           
        </nav>
      </div>
    </header>
  );
}
