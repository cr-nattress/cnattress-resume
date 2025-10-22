# Next.js + TypeScript Guidelines for LLM Coding Agents

This document provides comprehensive guidelines, best practices, and design patterns for building Next.js applications with TypeScript, specifically optimized for AI coding agents like Claude Code.

## Table of Contents

1. [Project Structure](#project-structure)
2. [TypeScript Configuration](#typescript-configuration)
3. [Naming Conventions](#naming-conventions)
4. [Component Patterns](#component-patterns)
5. [State Management](#state-management)
6. [Data Fetching](#data-fetching)
7. [Routing & Navigation](#routing--navigation)
8. [API Routes](#api-routes)
9. [Error Handling](#error-handling)
10. [Performance Optimization](#performance-optimization)
11. [Testing](#testing)
12. [Code Organization](#code-organization)
13. [Common Patterns](#common-patterns)
14. [Security Best Practices](#security-best-practices)

---

## Project Structure

### Recommended Directory Structure

```
project-root/
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── (auth)/            # Route groups
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── api/               # API routes
│   │   │   └── users/
│   │   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── error.tsx
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components
│   │   ├── forms/            # Form components
│   │   ├── layout/           # Layout components
│   │   └── shared/           # Shared components
│   ├── lib/                   # Utility functions & configs
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── api-client.ts
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── useDebounce.ts
│   ├── types/                 # TypeScript type definitions
│   │   ├── api.ts
│   │   ├── models.ts
│   │   └── index.ts
│   ├── services/              # Business logic & API calls
│   │   ├── auth.service.ts
│   │   └── user.service.ts
│   ├── store/                 # State management (if needed)
│   │   ├── slices/
│   │   └── index.ts
│   └── styles/                # Global styles
│       └── globals.css
├── public/                    # Static assets
├── tests/                     # Test files
│   ├── unit/
│   └── integration/
├── .env.local                 # Environment variables
├── .env.example              # Example environment variables
├── next.config.js            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind configuration (if used)
└── package.json
```

### Key Principles

- **Separation of Concerns**: Keep components, business logic, and API calls separate
- **Colocation**: Place related files close together (tests, types, styles)
- **Modularity**: Create small, focused modules that do one thing well
- **Flat Structure**: Avoid deeply nested directories (max 3-4 levels)

---

## TypeScript Configuration

### Recommended `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/services/*": ["./src/services/*"]
    },
    "forceConsistentCasingInFileNames": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### TypeScript Best Practices

1. **Enable Strict Mode**: Always use `"strict": true`
2. **Use Path Aliases**: Configure path aliases for cleaner imports
3. **Explicit Return Types**: Always specify return types for functions
4. **Avoid `any`**: Use `unknown` or proper types instead
5. **Use Type Guards**: Implement runtime type checking when needed

---

## Naming Conventions

### Files and Directories

- **Components**: PascalCase (`UserProfile.tsx`, `NavigationBar.tsx`)
- **Utilities**: camelCase (`formatDate.ts`, `apiClient.ts`)
- **Types**: PascalCase with `.types.ts` suffix (`User.types.ts`)
- **Hooks**: camelCase with `use` prefix (`useAuth.ts`, `useLocalStorage.ts`)
- **Services**: camelCase with `.service.ts` suffix (`auth.service.ts`)
- **Constants**: UPPER_SNAKE_CASE in `constants.ts`
- **Route Segments**: kebab-case (`user-profile/`, `blog-posts/`)

### Variables and Functions

```typescript
// Components: PascalCase
const UserProfile: React.FC<UserProfileProps> = () => {};

// Functions: camelCase with verb prefix
function getUserById(id: string): User {}
function validateEmail(email: string): boolean {}
async function fetchUserData(): Promise<User[]> {}

// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Types/Interfaces: PascalCase
interface UserProfile {}
type ApiResponse<T> = {};

// Enums: PascalCase for enum, UPPER_SNAKE_CASE for values
enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST'
}
```

---

## Component Patterns

### Functional Components with TypeScript

```typescript
// src/components/UserCard.tsx
import { FC } from 'react';

interface UserCardProps {
  user: User;
  onEdit?: (userId: string) => void;
  className?: string;
}

export const UserCard: FC<UserCardProps> = ({ 
  user, 
  onEdit, 
  className = '' 
}) => {
  const handleEdit = () => {
    onEdit?.(user.id);
  };

  return (
    <div className={`card ${className}`}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {onEdit && (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};
```

### Server Components (Next.js 13+ App Router)

```typescript
// src/app/users/page.tsx
import { UserList } from '@/components/UserList';
import { getUsers } from '@/services/user.service';

export default async function UsersPage() {
  // Fetch data directly in Server Component
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      <UserList users={users} />
    </div>
  );
}
```

### Client Components

```typescript
// src/components/InteractiveButton.tsx
'use client';

import { FC, useState } from 'react';

interface InteractiveButtonProps {
  label: string;
  onClick?: () => void;
}

export const InteractiveButton: FC<InteractiveButtonProps> = ({ 
  label, 
  onClick 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await onClick?.();
    setIsLoading(false);
  };

  return (
    <button 
      onClick={handleClick} 
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : label}
    </button>
  );
};
```

### Component Composition Pattern

```typescript
// src/components/Card/Card.tsx
import { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className = '' }) => (
  <div className={`card ${className}`}>
    {children}
  </div>
);

// Subcomponents
Card.Header = ({ children }: { children: ReactNode }) => (
  <div className="card-header">{children}</div>
);

Card.Body = ({ children }: { children: ReactNode }) => (
  <div className="card-body">{children}</div>
);

Card.Footer = ({ children }: { children: ReactNode }) => (
  <div className="card-footer">{children}</div>
);

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Footer</Card.Footer>
</Card>
```

---

## State Management

### Local State (useState)

```typescript
'use client';

import { FC, useState } from 'react';

export const Counter: FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment
      </button>
    </div>
  );
};
```

### Complex State (useReducer)

```typescript
'use client';

import { useReducer } from 'react';

interface State {
  count: number;
  step: number;
}

type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + state.step };
    case 'DECREMENT':
      return { ...state, count: state.count - state.step };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'RESET':
      return { count: 0, step: 1 };
    default:
      return state;
  }
}

export const AdvancedCounter = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
};
```

### Context API for Global State

```typescript
// src/contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode, FC } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

---

## Data Fetching

### Server Component Data Fetching

```typescript
// src/app/posts/page.tsx
import { Post } from '@/types/models';

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // Revalidate every hour
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
```

### Client-Side Data Fetching with SWR

```typescript
'use client';

import useSWR from 'swr';
import { User } from '@/types/models';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const UserProfile = ({ userId }: { userId: string }) => {
  const { data, error, isLoading } = useSWR<User>(
    `/api/users/${userId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;
  if (!data) return null;

  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
    </div>
  );
};
```

### API Client Pattern

```typescript
// src/lib/api-client.ts
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  }

  async post<T, D>(endpoint: string, data: D): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  }

  async put<T, D>(endpoint: string, data: D): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  }
}

export const apiClient = new ApiClient(
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
);
```

---

## Routing & Navigation

### Dynamic Routes

```typescript
// src/app/posts/[id]/page.tsx
interface PostPageProps {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.id);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

### Programmatic Navigation

```typescript
'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

export const NavigationExample: FC = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/dashboard');
  };

  const handleNavigateWithQuery = () => {
    router.push('/search?q=nextjs');
  };

  return (
    <div>
      <button onClick={handleNavigate}>Go to Dashboard</button>
      <button onClick={handleNavigateWithQuery}>Search</button>
    </div>
  );
};
```

### Link Component

```typescript
import Link from 'next/link';

export const Navigation = () => (
  <nav>
    <Link href="/">Home</Link>
    <Link href="/about">About</Link>
    <Link href="/posts/123" prefetch={false}>
      Post 123
    </Link>
  </nav>
);
```

---

## API Routes

### Basic API Route

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export async function GET(request: NextRequest) {
  try {
    const users = await fetchUsersFromDB();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = userSchema.parse(body);
    
    const newUser = await createUser(validatedData);
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
```

### Dynamic API Routes

```typescript
// src/app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = context.params;
    const user = await getUserById(id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = context.params;
    await deleteUser(id);
    
    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
```

### Middleware for Authentication

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');

  // Protect routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
};
```

---

## Error Handling

### Error Boundaries

```typescript
// src/app/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### Not Found Page

```typescript
// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
```

### Try-Catch with Error Types

```typescript
// src/lib/errors.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends Error {
  constructor(message: string, public fields?: Record<string, string>) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Usage
async function fetchUser(id: string): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) {
      throw new ApiError(
        'Failed to fetch user',
        response.status
      );
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`API Error (${error.statusCode}):`, error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}
```

---

## Performance Optimization

### Image Optimization

```typescript
import Image from 'next/image';

export const OptimizedImage = () => (
  <Image
    src="/hero.jpg"
    alt="Hero image"
    width={1200}
    height={600}
    priority
    placeholder="blur"
    blurDataURL="/hero-blur.jpg"
  />
);
```

### Dynamic Imports

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  {
    loading: () => <p>Loading...</p>,
    ssr: false, // Disable server-side rendering if needed
  }
);

export const ParentComponent = () => (
  <div>
    <h1>My Page</h1>
    <HeavyComponent />
  </div>
);
```

### Memoization

```typescript
'use client';

import { useMemo, useCallback } from 'react';

interface Props {
  items: Item[];
  onItemClick: (id: string) => void;
}

export const ExpensiveList = ({ items, onItemClick }: Props) => {
  // Memoize expensive calculations
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  // Memoize callback functions
  const handleClick = useCallback((id: string) => {
    onItemClick(id);
  }, [onItemClick]);

  return (
    <ul>
      {sortedItems.map(item => (
        <li key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
};
```

### Streaming with Suspense

```typescript
import { Suspense } from 'react';

async function SlowComponent() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return <div>Loaded content</div>;
}

export default function StreamingPage() {
  return (
    <div>
      <h1>Fast Content</h1>
      <Suspense fallback={<div>Loading slow content...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
```

---

## Testing

### Component Testing with React Testing Library

```typescript
// src/components/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders button with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when loading', () => {
    render(<Button isLoading>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### API Route Testing

```typescript
// src/app/api/users/__tests__/route.test.ts
import { GET, POST } from '../route';
import { NextRequest } from 'next/server';

describe('/api/users', () => {
  describe('GET', () => {
    it('returns list of users', async () => {
      const request = new NextRequest('http://localhost:3000/api/users');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
    });
  });

  describe('POST', () => {
    it('creates a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const request = new NextRequest('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.name).toBe(userData.name);
    });
  });
});
```

### Integration Testing

```typescript
// tests/integration/user-flow.test.ts
import { test, expect } from '@playwright/test';

test('user can login and view dashboard', async ({ page }) => {
  await page.goto('/login');
  
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('h1')).toContainText('Dashboard');
});
```

---

## Code Organization

### Service Layer Pattern

```typescript
// src/services/user.service.ts
import { apiClient } from '@/lib/api-client';
import { User, CreateUserDto, UpdateUserDto } from '@/types/models';

export class UserService {
  async getUsers(): Promise<User[]> {
    return apiClient.get<User[]>('/users');
  }

  async getUserById(id: string): Promise<User> {
    return apiClient.get<User>(`/users/${id}`);
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return apiClient.post<User, CreateUserDto>('/users', data);
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    return apiClient.put<User, UpdateUserDto>(`/users/${id}`, data);
  }

  async deleteUser(id: string): Promise<void> {
    return apiClient.delete(`/users/${id}`);
  }
}

export const userService = new UserService();
```

### Custom Hooks Pattern

```typescript
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

### Type Definitions Pattern

```typescript
// src/types/models.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUserDto = Partial<CreateUserDto>;

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

// src/types/api.ts
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
```

---

## Common Patterns

### Form Handling with React Hook Form

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormData = z.infer<typeof schema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await loginUser(data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
};
```

### Pagination Pattern

```typescript
'use client';

import { useState } from 'react';
import useSWR from 'swr';

interface PaginationProps {
  pageSize?: number;
}

export const PaginatedList = ({ pageSize = 10 }: PaginationProps) => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useSWR(
    `/api/items?page=${page}&pageSize=${pageSize}`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <ul>
        {data.items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      <div>
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {data.totalPages}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page >= data.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
```

### Debounce Hook Pattern

```typescript
// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage
export const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
};
```

---

## Security Best Practices

### Environment Variables

```typescript
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://user:password@localhost:5432/db
AUTH_SECRET=your-secret-key

// Access in code
const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Client & Server
const dbUrl = process.env.DATABASE_URL; // Server only
```

### Input Validation

```typescript
import { z } from 'zod';

const userInputSchema = z.object({
  email: z.string().email(),
  age: z.number().min(0).max(150),
  website: z.string().url().optional(),
});

function validateUserInput(data: unknown) {
  try {
    return userInputSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Invalid input', 
        error.errors.reduce((acc, err) => ({
          ...acc,
          [err.path.join('.')]: err.message
        }), {})
      );
    }
    throw error;
  }
}
```

### CSRF Protection

```typescript
// src/lib/csrf.ts
import { NextRequest } from 'next/server';

export function validateCsrfToken(request: NextRequest): boolean {
  const token = request.headers.get('x-csrf-token');
  const cookieToken = request.cookies.get('csrf-token')?.value;
  
  return token === cookieToken;
}

// Usage in API route
export async function POST(request: NextRequest) {
  if (!validateCsrfToken(request)) {
    return NextResponse.json(
      { error: 'Invalid CSRF token' },
      { status: 403 }
    );
  }
  
  // Process request
}
```

### Content Security Policy

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

---

## LLM Agent Optimization Tips

### 1. Clear File Structure
- Keep files focused and single-purpose
- Use descriptive names that indicate purpose
- Organize by feature/domain rather than by type

### 2. Type Safety
- Always define interfaces for props and data structures
- Use union types for state machines
- Leverage TypeScript's type inference

### 3. Documentation
- Add JSDoc comments for complex functions
- Document non-obvious behavior
- Include usage examples in comments

### 4. Consistent Patterns
- Follow the same patterns across the codebase
- Use established conventions (e.g., `use` prefix for hooks)
- Keep similar code structures similar

### 5. Error Messages
- Make error messages descriptive and actionable
- Include context about what went wrong
- Suggest potential solutions

### 6. Modularity
- Break down large components into smaller pieces
- Extract reusable logic into hooks or utilities
- Keep components under 250 lines when possible

### 7. Testing
- Write tests alongside code
- Use descriptive test names
- Test edge cases and error conditions

---

## Next.js 13+ App Router vs Pages Router

### When to Use App Router (Recommended)
- New projects
- Need for React Server Components
- Better data fetching patterns
- Improved layouts and nested routing

### When to Use Pages Router
- Existing projects with heavy investment
- Team familiarity
- Specific library dependencies

---

## Common Gotchas

### 1. Client vs Server Components
```typescript
// ❌ Wrong: Using hooks in server component
export default async function Page() {
  const [state, setState] = useState(0); // Error!
  return <div>{state}</div>;
}

// ✅ Correct: Mark as client component
'use client';
export default function Page() {
  const [state, setState] = useState(0);
  return <div>{state}</div>;
}
```

### 2. Async Server Components
```typescript
// ✅ Correct: Server components can be async
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

### 3. Metadata Export
```typescript
// ✅ Correct: Export metadata in server components
export const metadata = {
  title: 'My Page',
  description: 'Page description',
};
```

---

## Conclusion

This guide provides a comprehensive foundation for building Next.js applications with TypeScript. Remember:

- **Consistency is key**: Follow established patterns
- **Type safety first**: Leverage TypeScript's full power
- **Performance matters**: Use Next.js optimization features
- **Test your code**: Write tests for critical paths
- **Keep learning**: Next.js evolves rapidly

For more information, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)

---

**Version**: 1.0  
**Last Updated**: October 2025  
**Optimized for**: Claude Code and LLM Coding Agents