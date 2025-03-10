
import { 
  LayoutDashboard, 
  Hotel, 
  FileText, 
  Car, 
  Bike, 
  Map, 
  Settings, 
  PlusSquare,
  Globe,
  CalendarClock,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

export const adminNavItems: NavItem[] = [
  { 
    icon: LayoutDashboard, 
    label: "Overview", 
    path: "/admin/overview" 
  },
  { 
    icon: Hotel, 
    label: "Hotels", 
    path: "/admin/hotels" 
  },
  { 
    icon: CalendarClock, 
    label: "Bookings", 
    path: "/admin/booking-management" 
  },
  { 
    icon: FileText, 
    label: "Blog", 
    path: "/admin/blog" 
  },
  { 
    icon: Car, 
    label: "Car Rentals", 
    path: "/admin/car-rentals" 
  },
  { 
    icon: Bike, 
    label: "Bike Rentals", 
    path: "/admin/bike-rentals" 
  },
  { 
    icon: Map, 
    label: "Adventures", 
    path: "/admin/adventures" 
  },
  { 
    icon: PlusSquare, 
    label: "Page Builder", 
    path: "/admin/page-builder" 
  },
  { 
    icon: Globe, 
    label: "Website Settings", 
    path: "/admin/website-settings" 
  },
  { 
    icon: Settings, 
    label: "Admin Settings", 
    path: "/admin/settings" 
  },
];
