# Medical Social Media Web App - System Overview

## 📋 Table of Contents
1. [System Architecture](#system-architecture)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Data Models](#data-models)
5. [Key Features](#key-features)
6. [Component Hierarchy](#component-hierarchy)
7. [State Management](#state-management)
8. [Routing & Navigation](#routing--navigation)
9. [Current Implementation Status](#current-implementation-status)

---

## 🏗️ System Architecture

### High-Level Overview
This is a **React-based Single Page Application (SPA)** built with Vite, implementing a medical social media platform called **MedConnect**. The application follows a component-based architecture with:

- **Client-side routing** (implemented via state management)
- **Component composition** pattern
- **UI component library** (Radix UI + Tailwind CSS)
- **Mock data** for development

### Application Flow
```
Entry Point (main.tsx)
    ↓
App.tsx (Root Component)
    ↓
Layout Component (Wrapper)
    ├── Header (Global Navigation)
    ├── Sidebar (Page Navigation)
    └── Main Content Area
        └── Current Page Component
```

---

## 🛠️ Tech Stack

### Core Technologies
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Vite 6.3.5** - Build tool & dev server
- **Tailwind CSS** - Styling utility-first CSS

### UI Component Library
- **Radix UI** - Headless UI components (30+ components)
  - Accessibility-first
  - Unstyled, fully customizable
  - Primitive building blocks

### Additional Libraries
- **Lucide React** - Icon library
- **React Hook Form** - Form management
- **Sonner** - Toast notifications
- **Recharts** - Charts & data visualization
- **CMDK** - Command palette

---

## 📁 Project Structure

```
src/
├── main.tsx              # Application entry point
├── App.tsx               # Root component & routing logic
├── index.css             # Global styles
│
├── types/
│   └── index.ts          # TypeScript type definitions
│
├── data/
│   └── mockData.ts       # Mock data for all entities
│
├── components/
│   ├── Layout.tsx        # Main layout wrapper
│   ├── CreatePost.tsx    # Post creation component
│   ├── PostCard.tsx      # Individual post display
│   └── ui/               # Reusable UI components (30+ files)
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       └── ... (many more)
│
└── pages/
    ├── HomePage.tsx           # Main feed
    ├── ProfilePage.tsx        # User profiles
    ├── OpportunitiesPage.tsx  # Jobs, internships, events
    ├── ResourcesPage.tsx      # Educational resources
    ├── MessagesPage.tsx       # Direct messaging
    ├── NotificationsPage.tsx  # User notifications
    ├── SubscriptionPage.tsx   # Premium features
    ├── AdminPage.tsx          # Admin dashboard
    └── LoginPage.tsx         # Authentication (created)
```

---

## 📊 Data Models

### Core Entities

#### 1. **User** (`User`)
```typescript
{
  id: string
  name, username, email, phone?, institutionId?
  profilePicture?, bio?, school?, level?, specialty?
  verified: boolean
  isPremium: boolean
  followers, following: number
  joinedDate: string
  blockedUsers?: string[]
  followingUsers?: string[]
  privacySettings?: { ... }
  notificationSettings?: { ... }
}
```

#### 2. **Post** (`Post`)
```typescript
{
  id: string
  author: User
  content: string
  image?, video?, resourceLink?
  category: string
  tags: string[]
  likes: number
  comments: Comment[]
  shares: number
  bookmarked, liked: boolean
  createdAt, editedAt?: string
}
```

#### 3. **Comment** (`Comment`)
```typescript
{
  id: string
  author: User
  content: string
  likes: number
  liked: boolean
  replies: Comment[]
  parentId?: string
  createdAt, editedAt?: string
}
```

#### 4. **Opportunity** (`Opportunity`)
```typescript
{
  id: string
  title, description, institution, location
  type: 'internship' | 'job' | 'scholarship' | 'event'
  specialty: string
  deadline: string
  requirements: string[]
  status: 'active' | 'expired' | 'pending'
  postedBy?, approvedBy?: User
  isPremium?: boolean
}
```

#### 5. **Resource** (`Resource`)
```typescript
{
  id: string
  title, description, author
  type: 'article' | 'research' | 'video' | 'pdf'
  specialty: string
  tags: string[]
  url?, thumbnail?
  likes, saved: boolean
  uploadedBy?, approvedBy?: User
  status?: 'pending' | 'approved' | 'rejected'
  isPremium?: boolean
}
```

#### 6. **Other Entities**
- **Message** - Direct messages between users
- **Conversation** - Message threads
- **Notification** - User activity notifications
- **SubscriptionPlan** - Premium subscription plans
- **MentorshipRequest** - Mentorship connections
- **Product** - Marketplace items (for premium users)

---

## ✨ Key Features

### 1. User Account & Profile
- ✅ Profile setup (name, school, level, specialty, bio, picture)
- ✅ Verified accounts with badge
- ✅ Premium accounts with badge
- ⚠️ Registration/Login pages created but not integrated
- ⚠️ Follow/unfollow functionality (UI ready, logic pending)
- ⚠️ Block/report users (types defined, UI pending)

### 2. Feed & Posts
- ✅ Create posts (text, image, video, category/tag)
- ✅ Like/unlike posts
- ✅ Comment on posts
- ✅ Share/repost posts
- ✅ Bookmark posts
- ⚠️ Reply to comments (structure exists, UI partial)
- ⚠️ Edit/delete posts (UI buttons exist, logic pending)
- ⚠️ Resource links in posts (type defined, input pending)
- ⚠️ Filter feed by category/search (UI exists, logic pending)

### 3. User Interaction & Networking
- ✅ View follower/following counts
- ✅ Direct messaging interface
- ✅ Message read receipts
- ✅ View profiles
- ⚠️ Follow/unfollow implementation
- ⚠️ Mentorship requests (types defined, UI pending)
- ⚠️ Block/report functionality

### 4. Opportunities Board
- ✅ View internships, jobs, scholarships, events
- ✅ Filter by type, specialty, location
- ✅ Bookmark opportunities
- ✅ Apply to opportunities (modal exists)
- ⚠️ Institution posting workflow
- ⚠️ Admin approval system
- ⚠️ Expired opportunities auto-close
- ⚠️ Premium job posting

### 5. Educational & Resource Hub
- ✅ Browse articles, research papers, videos, PDFs
- ✅ Filter by type and specialty
- ✅ Like and save resources
- ⚠️ Search content by keyword/tag
- ⚠️ Upload content (verified users only)
- ⚠️ Admin approval workflow
- ⚠️ Flag inappropriate content

### 6. Notifications
- ✅ Receive notifications (likes, comments, follows, messages)
- ✅ Mark as read/unread
- ✅ Filter by type
- ⚠️ Notification settings page
- ⚠️ Email/push notification preferences
- ⚠️ Real-time updates (WebSocket/Firebase pending)

### 7. Admin Dashboard
- ✅ User management interface
- ✅ Content moderation interface
- ✅ Opportunities management
- ✅ Analytics/metrics display
- ✅ Send announcements
- ⚠️ Admin action logging

### 8. Security & Privacy
- ⚠️ Password hashing (backend concern)
- ⚠️ Two-factor authentication UI
- ⚠️ Privacy controls
- ⚠️ Data encryption (backend concern)

### 9. Subscription & Premium Features
- ✅ Subscription plans display
- ✅ Premium features showcase
- ✅ Payment modal
- ⚠️ Post job opportunities (UI exists)
- ⚠️ List products for sale
- ⚠️ Access to exclusive content
- ⚠️ Subscription management

### 10. UI/UX Features
- ✅ Responsive layout (desktop optimized)
- ✅ Hover effects and interactive buttons
- ✅ Modal dialogs
- ✅ Tabs and filtering
- ⚠️ Infinite scroll
- ⚠️ Global search functionality
- ⚠️ Tablet/mobile responsive design

---

## 🧩 Component Hierarchy

### Root Level
```
App
└── Layout
    ├── Header
    │   ├── Logo
    │   ├── Search Bar
    │   └── User Menu (Notifications, Settings, Avatar)
    ├── Sidebar
    │   ├── Navigation Items
    │   └── User Profile Card
    └── Main Content (Current Page)
        ├── HomePage
        │   ├── CreatePost
        │   ├── PostCard (multiple)
        │   └── Trending Topics / Suggested Users
        ├── ProfilePage
        ├── OpportunitiesPage
        ├── ResourcesPage
        ├── MessagesPage
        ├── NotificationsPage
        ├── SubscriptionPage
        └── AdminPage
```

### Key Components

#### **Layout.tsx**
- Wraps all pages
- Manages global navigation
- Provides header and sidebar
- Handles page routing via props

#### **CreatePost.tsx**
- Post creation form
- Category selection
- Media attachment buttons
- Expandable interface

#### **PostCard.tsx**
- Displays post content
- Author information
- Interaction buttons (like, comment, share, bookmark)
- Comments section (expandable)
- Dropdown menu (edit, delete, report)

---

## 🔄 State Management

### Current Approach
**Local State Only** - Each component manages its own state via React hooks:
- `useState` for component state
- No global state management library (Redux, Zustand, etc.)
- Props drilling for parent-child communication

### State Flow Example
```
App.tsx
  └── currentPage state
      └── passed to Layout
          └── onNavigate callback
              └── updates App state
                  └── triggers page re-render
```

### Data Source
- **Mock Data** - All data comes from `mockData.ts`
- Static data that doesn't persist
- No API calls or backend integration

---

## 🧭 Routing & Navigation

### Current Implementation
**State-Based Routing** - No React Router used:

```typescript
// App.tsx
const [currentPage, setCurrentPage] = useState("home");

const renderPage = () => {
  switch (currentPage) {
    case "home": return <HomePage />;
    case "profile": return <ProfilePage />;
    // ... etc
  }
};
```

### Navigation Flow
1. User clicks sidebar nav item
2. Calls `onNavigate(pageId)`
3. Updates `currentPage` state in App
4. `renderPage()` returns corresponding component
5. Layout re-renders with new page

### Available Routes
- `home` - Main feed
- `opportunities` - Opportunities board
- `resources` - Resource hub
- `messages` - Direct messages
- `notifications` - Notifications center
- `profile` - User profile
- `subscription` - Premium features
- `admin` - Admin dashboard (conditional)

---

## 📈 Current Implementation Status

### ✅ Fully Implemented
1. Basic UI structure and layout
2. All major page components
3. Post creation and display
4. User profiles
5. Opportunities browsing
6. Resource browsing
7. Messaging interface
8. Notifications display
9. Admin dashboard UI
10. Subscription page

### ⚠️ Partially Implemented
1. Authentication (Login page created, not integrated)
2. Post interactions (UI exists, some logic missing)
3. Comment replies (structure exists, UI incomplete)
4. Follow/unfollow (UI ready, logic missing)
5. Search functionality (UI exists, logic missing)
6. Filtering (UI exists, logic incomplete)

### ❌ Not Implemented
1. Backend integration
2. Real-time updates
3. File uploads
4. Payment processing
5. Email notifications
6. Two-factor authentication
7. Data persistence
8. Advanced search algorithms
9. Infinite scroll
10. Product marketplace UI

---

## 🔧 Development Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

---

## 🎯 Next Steps for Full Alignment

Based on the detailed feature specification, the following need to be implemented:

1. **Authentication Flow**
   - Integrate LoginPage into App
   - Add RegisterPage
   - Implement auth state management

2. **Core Interactions**
   - Follow/unfollow functionality
   - Block/report users
   - Mentorship requests

3. **Enhanced Post Features**
   - Reply to comments (full UI)
   - Edit/delete posts/comments
   - Resource links in posts
   - Real-time like/comment updates

4. **Opportunities Enhancement**
   - Institution posting workflow
   - Admin approval system
   - Expired opportunities handling

5. **Resource Management**
   - Upload functionality
   - Admin approval workflow
   - Content flagging

6. **Search & Filtering**
   - Global search implementation
   - Advanced filtering logic

7. **Premium Features**
   - Product listing UI
   - Exclusive content access
   - Subscription management

8. **Notifications**
   - Settings page
   - Real-time updates
   - Email/push preferences

9. **Responsive Design**
   - Tablet layout (2-column)
   - Mobile optimization

10. **Backend Integration**
    - API endpoints
    - Database models
    - Authentication system
    - File storage

---

## 📝 Notes

- **No Backend**: Currently a frontend-only application
- **Mock Data**: All data is static and doesn't persist
- **No Routing Library**: Uses state-based navigation (could migrate to React Router)
- **Component Library**: Extensive Radix UI components available
- **Type Safety**: Full TypeScript implementation
- **Styling**: Tailwind CSS utility classes throughout

---

## 🤝 Contributing

This is a UI/UX prototype based on a Figma design. To make it production-ready:
1. Add backend API
2. Implement state management (Context API or Redux)
3. Add React Router for proper routing
4. Integrate real authentication
5. Add data persistence
6. Implement real-time features (WebSocket/Firebase)

---

**Last Updated**: 2024-11-02
**Version**: 0.1.0

