
import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceInfo {
  type: DeviceType;
  deviceType: DeviceType; // Adding this to match the expected interface
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
  isTouchDevice: boolean;
}

/**
 * Hook to detect device type, screen dimensions, and other device capabilities
 */
export function useDeviceDetect(): DeviceInfo {
  // Default to desktop in SSR or initial render
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    type: 'desktop',
    deviceType: 'desktop', // Adding the required property
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    orientation: 'landscape',
    isTouchDevice: false
  });

  useEffect(() => {
    // Function to detect device type based on screen width and user agent
    const detectDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const userAgent = navigator.userAgent.toLowerCase();
      
      // Check for touch capability
      const isTouchDevice = 'ontouchstart' in window || 
                            navigator.maxTouchPoints > 0 ||
                            (navigator as any).msMaxTouchPoints > 0;
      
      // Determine device type based on screen width and user agent
      let type: DeviceType = 'desktop';
      let isMobile = false;
      let isTablet = false;
      let isDesktop = true;
      
      // Mobile detection (phones)
      if (width < 768 || 
          /iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(userAgent)) {
        type = 'mobile';
        isMobile = true;
        isTablet = false;
        isDesktop = false;
      } 
      // Tablet detection
      else if (width < 1024 || 
               /ipad|android(?!.*mobile)|tablet|kindle|silk/i.test(userAgent)) {
        type = 'tablet';
        isMobile = false;
        isTablet = true;
        isDesktop = false;
      }
      
      // Determine orientation
      const orientation = height > width ? 'portrait' : 'landscape';
      
      setDeviceInfo({
        type,
        deviceType: type, // Set the deviceType property
        isMobile,
        isTablet,
        isDesktop,
        width,
        height,
        orientation,
        isTouchDevice
      });
    };

    // Detect device on mount
    detectDevice();
    
    // Update on resize
    window.addEventListener('resize', detectDevice);
    
    // Device orientation change
    window.addEventListener('orientationchange', detectDevice);
    
    return () => {
      window.removeEventListener('resize', detectDevice);
      window.removeEventListener('orientationchange', detectDevice);
    };
  }, []);

  return deviceInfo;
}
