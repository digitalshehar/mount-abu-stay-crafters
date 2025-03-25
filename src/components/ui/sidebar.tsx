
// First, import and common utilities section
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Configuration constants
import { sidebarConfig } from "./sidebar/sidebar-config"

// Context provider
import { SidebarProvider, useSidebar } from "./sidebar/sidebar-context"

// Core components
import { Sidebar } from "./sidebar/sidebar-core"
import { SidebarRail } from "./sidebar/sidebar-rail"
import { SidebarTrigger } from "./sidebar/sidebar-trigger"
import { SidebarInset } from "./sidebar/sidebar-inset"

// Layout components
import { SidebarHeader } from "./sidebar/sidebar-header"
import { SidebarFooter } from "./sidebar/sidebar-footer"
import { SidebarContent } from "./sidebar/sidebar-content"
import { SidebarSeparator } from "./sidebar/sidebar-separator"

// Group components
import { SidebarGroup } from "./sidebar/sidebar-group"
import { SidebarGroupLabel } from "./sidebar/sidebar-group-label"
import { SidebarGroupAction } from "./sidebar/sidebar-group-action"
import { SidebarGroupContent } from "./sidebar/sidebar-group-content"

// Menu components
import { SidebarMenu } from "./sidebar/sidebar-menu"
import { SidebarMenuItem } from "./sidebar/sidebar-menu-item"
import { SidebarMenuButton } from "./sidebar/sidebar-menu-button"
import { SidebarMenuAction } from "./sidebar/sidebar-menu-action"
import { SidebarMenuBadge } from "./sidebar/sidebar-menu-badge"
import { SidebarMenuSkeleton } from "./sidebar/sidebar-menu-skeleton"
import { 
  SidebarMenuSub, 
  SidebarMenuSubItem, 
  SidebarMenuSubButton 
} from "./sidebar/sidebar-menu-sub"

// Input component
import { SidebarInput } from "./sidebar/sidebar-input"

// Export everything
export {
  // Context provider
  SidebarProvider,
  useSidebar,
  
  // Core components
  Sidebar,
  SidebarRail,
  SidebarTrigger,
  SidebarInset,
  
  // Layout components
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
  
  // Group components
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  
  // Menu components
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  
  // Input component
  SidebarInput,
}
