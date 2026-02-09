# AI_RULES.md - RoboRace 26 Application

## Tech Stack Overview

This application is built using the following technology stack:

### Core Technologies
- **React 19** - Modern React with latest features and optimizations
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing for single-page application

### UI Components & Libraries
- **Lucide React** - Icon library for consistent iconography
- **Custom Components** - Proprietary design system built specifically for RoboRace

### Deployment & Hosting
- **Static Site Generation** - Optimized for performance and scalability
- **Responsive Design** - Mobile-first approach with graceful desktop enhancements

## Library Usage Rules

### 🚫 CRITICAL PROHIBITIONS
- **NO** direct DOM manipulation - Always use React state and props
- **NO** jQuery or legacy libraries - Modern React patterns only
- **NO** CSS-in-JS libraries - Tailwind CSS exclusively for styling
- **NO** state management libraries (Redux, Zustand, etc.) - React hooks only
- **NO** UI component libraries (Material-UI, Ant Design, etc.) - Custom components only

### ✅ MANDATORY REQUIREMENTS
- **ALWAYS** use TypeScript for type safety
- **ALWAYS** create responsive designs with Tailwind CSS
- **ALWAYS** follow React best practices (functional components, hooks)
- **ALWAYS** use Lucide React for icons when available
- **ALWAYS** maintain consistent design language (see design tokens below)

### 📁 File Structure Rules
```
src/
├── components/          # Reusable UI components
├── pages/               # Page-level components
├── constants/           # Application constants and data
├── types.ts            # TypeScript type definitions
└── index.tsx           # Application entry point
```

### 🎨 Design System Rules
**Color Palette:**
- Primary: `sky-600` (#0284c7)
- Secondary: `slate-900` (#0f172a)
- Background: `white` and `slate-50` gradients
- Text: `slate-600` (#475569) for body, `slate-900` for headings

**Typography:**
- Font Family: Poppins (300, 400, 500, 600, 700, 800, 900 weights)
- Scale: Responsive text scaling with Tailwind classes
- Hierarchy: Clear visual hierarchy with consistent spacing

**Spacing:**
- Use Tailwind spacing scale (4px increments)
- Maintain consistent vertical rhythm
- Mobile-first responsive breakpoints

### 🔧 Component Development Rules

1. **Single Responsibility**: Each component should have one clear purpose
2. **Props Interface**: Always define TypeScript interfaces for props
3. **File Naming**: Use PascalCase for component files (`ComponentName.tsx`)
4. **Export Default**: Each component file should export a default component
5. **Styling**: Use Tailwind classes exclusively, no inline styles or CSS files

### 📱 Responsive Design Rules
- **Mobile First**: Design for mobile, enhance for desktop
- **Breakpoints**: Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:)
- **Touch Targets**: Minimum 44px touch targets for mobile interactions
- **Performance**: Optimize images and assets for fast loading

### 🔒 Security Rules
- **No Eval**: Never use eval() or similar dangerous functions
- **XSS Protection**: Sanitize user inputs where necessary
- **Environment Variables**: Use Vite's environment variable system
- **Content Security**: Follow CSP guidelines for static assets

### 🚀 Performance Rules
- **Code Splitting**: Use React.lazy() for route-based code splitting
- **Image Optimization**: Use modern image formats and responsive sizes
- **Bundle Size**: Keep dependencies minimal and tree-shakeable
- **Loading States**: Implement skeleton screens and loading indicators

### 📝 Code Quality Rules
- **ESLint**: Enforce code style consistency
- **Prettier**: Automated code formatting
- **TypeScript Strict**: Enable strict TypeScript configuration
- **Meaningful Names**: Use descriptive variable and function names

## Implementation Priority Order

When adding new features, follow this priority:
1. **Functionality** - Make it work correctly
2. **Accessibility** - Ensure screen reader compatibility
3. **Performance** - Optimize for speed and efficiency
4. **Maintainability** - Write clean, documented code
5. **Aesthetics** - Polish the visual appearance

## Emergency Exceptions

In case of critical bugs or performance issues, temporary exceptions may be granted by the project lead. All exceptions must be documented and addressed in subsequent sprints.

---

*Last Updated: ${new Date().toISOString().split('T')[0]}*
*Maintained by: RoboRace 26 Development Team*