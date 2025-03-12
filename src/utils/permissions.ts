
export type UserRole = 'admin' | 'user' | 'guest';

export const hasPermission = (userRole: UserRole, permission: string): boolean => {
  const permissions = {
    admin: [
      'manage_bookings',
      'manage_hotels',
      'manage_users',
      'view_dashboard',
      'manage_cars',
      'manage_bikes',
      'manage_adventures'
    ],
    user: [
      'view_bookings',
      'create_booking',
      'cancel_booking'
    ],
    guest: [
      'view_hotels',
      'view_cars',
      'view_bikes',
      'view_adventures'
    ]
  };

  return permissions[userRole]?.includes(permission) || false;
};

export const isAdmin = (role?: string): boolean => {
  return role === 'admin';
};

export const getUserRole = (user: any): UserRole => {
  if (!user) return 'guest';
  return user.role || 'user';
};
