# Pawnshop Manager - Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Setup Guide](#setup-guide)
3. [API References](#api-references)
4. [Frontend Components](#frontend-components)
5. [Database Schema](#database-schema)
6. [Security Considerations](#security-considerations)
7. [Code Structure](#code-structure)
8. [Page Index](#page-index)

## Project Overview

Pawnshop Manager is a modern web-based system built to simulate core business operations such as customer management, transaction processing, cash handling, and reporting. This version is a demo representation created for portfolio purposes, showcasing clean architecture and modern development practices.

## Setup Guide

### Prerequisites
- PHP 8.2+
- Node.js 18+
- MySQL 8.0+
- Composer
- NPM

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd pawnshop-manager
```

2. **Install PHP dependencies**
```bash
composer install
```

3. **Install Node.js dependencies**
```bash
npm install
```

4. **Copy and configure environment files**
```bash
cp .env.example .env
```
Edit `.env` with your database credentials and other configurations.

5. **Generate application key**
```bash
php artisan key:generate
```

6. **Run database migrations**
```bash
php artisan migrate
```

7. **Start the development server**
```bash
# For frontend
npm run dev

# For backend (in another terminal)
php artisan serve
```

### Environment Configuration

The application uses the following environment variables:
- `APP_NAME` - Application name
- `DB_CONNECTION` - Database connection type (mysql)
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_DATABASE` - Database name
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password

## API References

### Groups API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/groups` | List all groups |
| GET | `/groups/{id}` | Show a specific group |
| POST | `/groups` | Create a new group |
| PUT | `/groups/{id}` | Update a group |
| DELETE | `/groups/{id}` | Delete a group |

### Users API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List all users |
| GET | `/users/{id}` | Show a specific user |
| POST | `/users` | Create a new user |
| PUT | `/users/{id}` | Update a user |
| DELETE | `/users/{id}` | Delete a user |

### Roles API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/roles` | List all roles |
| GET | `/roles/{id}` | Show a specific role |
| POST | `/roles` | Create a new role |
| PUT | `/roles/{id}` | Update a role |
| DELETE | `/roles/{id}` | Delete a role |

## Frontend Components

### Data Table Component
The `DataTable` component provides a reusable table implementation with:
- Search functionality
- Sorting capabilities
- Pagination
- Column visibility toggling
- Responsive design

### Delete Modal Component
The `DeleteModal` component provides a consistent way to handle delete operations with:
- Confirmation prompts
- Input validation
- Error handling
- Success feedback

### Form Layout Component
The `FormLayout` component provides a consistent form structure with:
- Breadcrumb navigation
- Form submission handling
- Error display
- Loading states

## Database Schema

### Groups Table
```sql
CREATE TABLE groups (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(100) NOT NULL,
    disabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### Users Table
```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### Roles Table
```sql
CREATE TABLE roles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

## Security Considerations

### Input Validation
All API endpoints use Laravel's built-in validation to prevent malicious input.

### CSRF Protection
CSRF tokens are automatically included in all forms and AJAX requests.

### Authentication
The application uses Laravel's built-in authentication system with proper session management.

### Authorization
Role-based access control is implemented using Laravel's Spatie Permission package.

### Data Sanitization
All user inputs are properly sanitized before being processed or stored.

## Code Structure

### Backend Structure
```
app/
├── Http/
│   ├── Controllers/
│   │   └── PM/
│   │       ├── GroupController.php
│   │       ├── RoleController.php
│   │       └── UserController.php
│   └── Requests/
│       └── PM/
│           ├── GroupFormRequest.php
│           ├── RoleFormRequest.php
│           └── UserFormRequest.php
├── Models/
│   ├── Group.php
│   ├── Role.php
│   └── User.php
└── Traits/
    ├── CrudTrait.php
    └── ActiveTrait.php
```

### Frontend Structure
```
resources/
├── js/
│   ├── components/
│   │   └── PM/
│   │       ├── delete.tsx
│   │       ├── form-layout.tsx
│   │       └── table-actions.tsx
│   ├── pages/
│   │   └── PM/
│   │       ├── groups/
│   │       ├── roles/
│   │       └── users/
│   └── layouts/
│       └── app-layout.tsx
```

## Development Guidelines

### Code Standards
- Follow PSR-12 coding standards for PHP
- Use TypeScript for frontend components
- Maintain consistent naming conventions
- Write clear and concise comments

### Reusable Hooks
The project includes several reusable hooks to eliminate code duplication:

#### useForm Hook
A custom hook that provides consistent form handling across the application:
- State management for form data
- Error handling and validation
- Loading states and success indicators
- Consistent API integration with Inertia.js

### Testing
- Unit tests for models and traits
- Feature tests for controllers
- End-to-end tests for critical workflows

### Deployment
- Use Laravel Forge or similar for production deployment
- Configure proper environment variables
- Set up proper database backups
- Implement proper logging and monitoring
## Page Index

This section provides a comprehensive index of all pages in the application, organized by section with their corresponding routes and components.

### Root Pages

| Page | Route | Component | Description |
|------|-------|-----------|-------------|
| Dashboard | `/dashboard` | `resources/js/pages/dashboard.tsx` | Main application dashboard |
| Welcome | `/` | `resources/js/pages/welcome.tsx` | Welcome page (currently redirects to portfolio) |

### Authentication Pages

| Page | Route | Component | Description |
|------|-------|-----------|-------------|
| Login | `/login` | `resources/js/pages/auth/login.tsx` | User login page |
| Register | `/register` | `resources/js/pages/auth/register.tsx` | New user registration |
| Forgot Password | `/forgot-password` | `resources/js/pages/auth/forgot-password.tsx` | Password reset request |
| Reset Password | `/reset-password/{token}` | `resources/js/pages/auth/reset-password.tsx` | Password reset form |
| Verify Email | `/verify-email` | `resources/js/pages/auth/verify-email.tsx` | Email verification prompt |
| Verify Email (with token) | `/verify-email/{id}/{hash}` | Controller action | Email verification processing |
| Confirm Password | `/confirm-password` | `resources/js/pages/auth/confirm-password.tsx` | Password confirmation for sensitive actions |

### PM (Project Management) Pages

#### Groups
| Page | Route | Component | Description |
|------|-------|-----------|-------------|
| Groups List | `/groups` | `resources/js/pages/PM/groups/index.tsx` | List all groups |
| Create Group | `/groups/create` | `resources/js/pages/PM/groups/form.tsx` | Form to create new group |
| Edit Group | `/groups/{id}/edit` | `resources/js/pages/PM/groups/form.tsx` | Form to edit existing group |
| Group Columns | N/A | `resources/js/pages/PM/groups/columns.tsx` | Column definitions for groups table |
| Group Props | N/A | `resources/js/pages/PM/groups/props.tsx` | Props definitions for groups components |

#### Roles
| Page | Route | Component | Description |
|------|-------|-----------|-------------|
| Roles List | `/roles` | `resources/js/pages/PM/roles/index.tsx` | List all roles |
| Create Role | `/roles/create` | `resources/js/pages/PM/roles/form.tsx` | Form to create new role |
| Edit Role | `/roles/{id}/edit` | `resources/js/pages/PM/roles/form.tsx` | Form to edit existing role |
| Role Columns | N/A | `resources/js/pages/PM/roles/column.tsx` | Column definitions for roles table |
| Role Props | N/A | `resources/js/pages/PM/roles/props.tsx` | Props definitions for roles components |

#### Users
| Page | Route | Component | Description |
|------|-------|-----------|-------------|
| Users List | `/users` | `resources/js/pages/PM/users/index.tsx` | List all users |
| Create User | `/users/create` | `resources/js/pages/PM/users/form.tsx` | Form to create new user |
| Edit User | `/users/{id}/edit` | `resources/js/pages/PM/users/form.tsx` | Form to edit existing user |
| User Columns | N/A | `resources/js/pages/PM/users/column.tsx` | Column definitions for users table |
| User Props | N/A | `resources/js/pages/PM/users/props.tsx` | Props definitions for users components |

### Portfolio Pages

| Page | Route | Component | Description |
|------|-------|-----------|-------------|
| Portfolio | `/` | `resources/js/pages/portfolio/index.tsx` | Portfolio landing page |
| About Me | N/A | `resources/js/pages/portfolio/about-me.tsx` | About me section component |
| Contact Section | N/A | `resources/js/pages/portfolio/contact-section.tsx` | Contact section component |
| Footer | N/A | `resources/js/pages/portfolio/footer.tsx` | Footer component |
| Hero Section | N/A | `resources/js/pages/portfolio/hero-section.tsx` | Hero section component |
| Navigation Bar | N/A | `resources/js/pages/portfolio/nav-bar.jsx` | Navigation bar component |
| Project Section | N/A | `resources/js/pages/portfolio/project-section.tsx` | Project section component |
| Skills Section | N/A | `resources/js/pages/portfolio/skills-section.jsx` | Skills section component |
| Star Background | N/A | `resources/js/pages/portfolio/star-background.tsx` | Background component |

### Settings Pages

| Page | Route | Component | Description |
|------|-------|-----------|-------------|
| Profile Settings | `/settings/profile` | `resources/js/pages/settings/profile.tsx` | User profile management |
| Password Settings | `/settings/password` | `resources/js/pages/settings/password.tsx` | Password change form |
| Appearance Settings | `/settings/appearance` | `resources/js/pages/settings/appearance.tsx` | Application appearance settings |

### Component Architecture

The application follows a structured component architecture:

1. **Pages** - Located in `resources/js/pages/`, these are the main Inertia.js pages
2. **Layouts** - Located in `resources/js/layouts/`, these provide page structure
3. **Components** - Located in `resources/js/components/`, these are reusable UI elements
4. **Hooks** - Located in `resources/js/hooks/`, these provide reusable logic

### Navigation Structure

The application navigation is organized as follows:
- Public routes (portfolio, auth) are accessible to all users
- Authenticated routes (dashboard, PM sections, settings) require login
- PM routes are grouped under the PM namespace
- Settings routes are grouped under the settings namespace

This index provides a complete overview of all pages and components in the application, making it easier to understand the structure and navigate the codebase.