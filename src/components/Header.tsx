import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import SearchButton from "@/components/search/SearchButton";

const Header = () => {
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();

  return (
    <header className="bg-white border-b fixed top-0 left-0 right-0 z-50">
      <div className="container-custom h-16 flex items-center justify-between">
        {/* Main Navigation */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Logo />
          
          {/* Search Button */}
          <div className="hidden md:flex">
            <SearchButton />
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-stone-100">
              Home
            </Link>
            <Link to="/destinations" className="px-3 py-2 rounded-md hover:bg-stone-100">
              Destinations
            </Link>
            <Link to="/hotels" className="px-3 py-2 rounded-md hover:bg-stone-100">
              Hotels
            </Link>
            <Link to="/adventures" className="px-3 py-2 rounded-md hover:bg-stone-100">
              Adventures
            </Link>
            <Link to="/rentals/car" className="px-3 py-2 rounded-md hover:bg-stone-100">
              Car Rental
            </Link>
            <Link to="/bike-rentals" className="px-3 py-2 rounded-md hover:bg-stone-100">
              Bike Rental
            </Link>
          </nav>
        </div>

        {/* Right Side Navigation */}
        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.user_metadata?.avatar_url as string} alt={user?.user_metadata?.full_name as string} />
                    <AvatarFallback>{(user?.user_metadata?.full_name as string)?.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/admin/hotels" className="w-full block">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href={`mailto:${user.email}`} className="w-full block">
                    Support
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-64">
                <div className="flex flex-col h-full">
                  <Link to="/" className="px-4 py-3 rounded-md hover:bg-stone-100">
                    Home
                  </Link>
                  <Link to="/destinations" className="px-4 py-3 rounded-md hover:bg-stone-100">
                    Destinations
                  </Link>
                  <Link to="/hotels" className="px-4 py-3 rounded-md hover:bg-stone-100">
                    Hotels
                  </Link>
                  <Link to="/adventures" className="px-4 py-3 rounded-md hover:bg-stone-100">
                    Adventures
                  </Link>
                   <Link to="/rentals/car" className="px-4 py-3 rounded-md hover:bg-stone-100">
                    Car Rental
                  </Link>
                  <Link to="/bike-rentals" className="px-4 py-3 rounded-md hover:bg-stone-100">
                    Bike Rental
                  </Link>
                  {user ? (
                    <>
                      <Link to="/admin/hotels" className="px-4 py-3 rounded-md hover:bg-stone-100">
                        Dashboard
                      </Link>
                      <Button variant="outline" size="sm" className="mt-auto" onClick={() => signOut()}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <div className="mt-auto">
                      <Link to="/login">
                        <Button variant="outline" size="sm" className="w-full mb-2">
                          Login
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button size="sm" className="w-full">
                          Register
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
