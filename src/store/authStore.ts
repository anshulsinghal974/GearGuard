import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'maintenance_team' | 'admin';
  teamId?: string; // For maintenance team members
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'maintenance_team';
    teamName?: string; // For maintenance team signup
  }) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
}

// Mock user database (in a real app, this would be on the backend)
const mockUsers: Array<AuthUser & { password: string }> = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    role: 'user',
    password: 'password123',
  },
  {
    id: '2',
    email: 'team@example.com',
    name: 'Maintenance Team',
    role: 'maintenance_team',
    password: 'password123',
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const user = mockUsers.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({
            user: userWithoutPassword,
            isAuthenticated: true,
          });
          return true;
        }

        return false;
      },

      signup: async (data) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Check if email already exists
        const existingUser = mockUsers.find((u) => u.email === data.email);
        if (existingUser) {
          return false; // Email already exists
        }

        // Create new user
        const newUser: AuthUser & { password: string } = {
          id: Date.now().toString(),
          email: data.email,
          name: data.name,
          role: data.role,
          password: data.password,
          teamId: data.role === 'maintenance_team' ? Date.now().toString() : undefined,
        };

        mockUsers.push(newUser);

        const { password: _, ...userWithoutPassword } = newUser;
        set({
          user: userWithoutPassword,
          isAuthenticated: true,
        });

        return true;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      checkAuth: () => {
        return get().isAuthenticated;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

