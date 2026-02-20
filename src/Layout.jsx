
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Camera, Images, Sparkles } from "lucide-react";
import { User } from "@/entities/all";
import UserNav from "./components/layout/UserNav";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
    icon: Home,
    color: "bg-[#2B59C3] text-white",
    hover: "hover:bg-[#24479c]",
    active: "bg-[#24479c]"
  },
  {
    title: "Upload",
    url: createPageUrl("Upload"),
    icon: Camera,
    color: "bg-[#F7A1C4] text-pink-800",
    hover: "hover:bg-[#f590b8]",
    active: "bg-[#f590b8]"
  },
  {
    title: "Gallery",
    url: createPageUrl("Gallery"),
    icon: Images,
    color: "bg-[#FF6B35] text-white",
    hover: "hover:bg-[#fa5a1f]",
    active: "bg-[#fa5a1f]"
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
      } catch (e) {
        setUser(null);
      }
    };
    checkUser();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#FDFBF5] text-[#5E3B85]">
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;800&display=swap');
          
          :root {
            --brand-purple: #5E3B85;
            --brand-lavender: #C3B1E1;
            --brand-blue: #2B59C3;
            --brand-pink: #F7A1C4;
            --brand-orange: #FF6B35;
            --brand-yellow: #FFD23F;
            --brand-green: #96E6B3;
          }

          .funky-card {
            background-color: white;
            border: 3px solid var(--brand-purple);
            box-shadow: 6px 6px 0px var(--brand-purple);
            border-radius: 24px;
            transition: all 0.2s ease-out;
          }

          .funky-card-hover:hover {
            transform: translate(2px, 2px);
            box-shadow: 4px 4px 0px var(--brand-purple);
          }

          .funky-button {
            border: 3px solid var(--brand-purple);
            box-shadow: 4px 4px 0px var(--brand-purple);
            border-radius: 16px;
            transition: all 0.2s ease-out;
            font-family: 'Fredoka One', cursive;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .funky-button:hover {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0px var(--brand-purple);
          }

          .funky-button:active {
            transform: translate(4px, 4px);
            box-shadow: 0px 0px 0px var(--brand-purple);
          }
          
          .header-font {
            font-family: 'Fredoka One', cursive;
            letter-spacing: -0.01em;
          }
          
          .body-font {
            font-family: 'Nunito', sans-serif;
            font-weight: 600;
          }

          .body-font-light {
             font-family: 'Nunito', sans-serif;
             font-weight: 400;
          }
      `}</style>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row p-4 lg:p-8 gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-8 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-4 p-4">
              <div className="funky-button w-16 h-16 bg-[var(--brand-lavender)] flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="header-font text-4xl uppercase">Pixel Paws</h1>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-4">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`funky-button flex items-center gap-4 p-4 text-xl ${item.color} ${item.hover} ${isActive ? item.active : ''}`}>
                    <item.icon className="w-6 h-6" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="pt-8 px-4">
              <UserNav user={user} />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Mobile Header */}
          <header className="mb-6 px-4 py-2 lg:hidden flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="funky-button w-14 h-14 bg-[var(--brand-lavender)] flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl header-font text-[var(--brand-purple)]">Pixel Paws</h1>
                </div>
            </div>
            <UserNav user={user} />
          </header>
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-[var(--brand-purple)] mt-16">
        <div className="max-w-6xl mx-auto px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="body-font-light text-gray-600 text-center md:text-left">
                 © 2024 Pixel Paws. Magical Pet Transformations.
              </p>
              <div className="flex items-center gap-6 body-font text-gray-700">
                <Link to={createPageUrl("Help")} className="hover:text-[var(--brand-purple)]">Help</Link>
                <Link to={createPageUrl("Privacy")} className="hover:text-[var(--brand-purple)]">Privacy Policy</Link>
              </div>
            </div>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 p-2 sm:p-4 bg-[#FDFBF5]/80 backdrop-blur-sm border-t-3 border-[var(--brand-purple)]">
        <div className="flex justify-around">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <Link
                key={item.title}
                to={item.url}
                className={`flex flex-col items-center gap-1 transition-transform duration-200 ${isActive ? 'scale-105' : 'scale-95 opacity-80'}`}>
                <div className={`funky-button w-14 h-14 rounded-full flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-7 h-7" />
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
