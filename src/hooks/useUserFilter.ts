
import { useState, useEffect } from 'react';
import { User } from '@/hooks/useUserManagementActions';

export const useUserFilter = (users: User[]) => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!users) return;
    
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = users.filter(user => 
        user.email.toLowerCase().includes(query) || 
        (user.role && user.role.toLowerCase().includes(query))
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  return {
    filteredUsers,
    searchQuery,
    setSearchQuery
  };
};
