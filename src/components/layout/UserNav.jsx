import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { User as UserSDK } from '@/entities/all';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User as UserIcon, LogOut, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserNav({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await UserSDK.logout();
    navigate(createPageUrl('Home'));
    window.location.reload(); // Force a reload to clear state
  };

  if (!user) {
    const handleLogin = () => {
      UserSDK.login();
    };
    return (
      <Button onClick={handleLogin} className="funky-button bg-[var(--brand-purple)] text-white">
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-12 w-12 rounded-full funky-button p-0">
          <img
            src={user.profile_picture_url || `https://ui-avatars.com/api/?name=${user.full_name}&background=C3B1E1&color=5E3B85&size=128`}
            alt="User profile"
            className="h-12 w-12 rounded-full object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 funky-card !p-2 !border-2 !shadow-none" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none header-font">{user.full_name}</p>
            <p className="text-xs leading-none text-gray-500 body-font-light">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[var(--brand-purple)] opacity-20 my-2"/>
        <DropdownMenuItem asChild>
          <Link to={createPageUrl("Account")} className="cursor-pointer body-font">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Account</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={createPageUrl("Help")} className="cursor-pointer body-font">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[var(--brand-purple)] opacity-20 my-2" />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer body-font text-red-500 focus:text-red-500 focus:bg-red-100">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}