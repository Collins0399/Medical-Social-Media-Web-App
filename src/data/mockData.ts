import { User, Post, Opportunity, Resource, Notification, Conversation, Message, SubscriptionPlan } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Dr. Sarah Johnson',
  username: 'sarahj_md',
  email: 'sarah.johnson@medschool.edu',
  profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  bio: 'Medical student | Year 4 | Passionate about cardiology and global health',
  school: 'Harvard Medical School',
  level: 'Year 4',
  specialty: 'Cardiology',
  verified: true,
  isPremium: true,
  followers: 1247,
  following: 532,
  joinedDate: '2023-01-15'
};

export const mockUsers: User[] = [
  {
    id: '2',
    name: 'Dr. Michael Chen',
    username: 'mchen_neuro',
    email: 'mchen@example.com',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Neurology resident | Research enthusiast',
    school: 'Johns Hopkins University',
    level: 'Resident',
    specialty: 'Neurology',
    verified: true,
    isPremium: false,
    followers: 892,
    following: 421,
    joinedDate: '2022-08-20'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    username: 'emily_peds',
    email: 'erodriguez@example.com',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    bio: 'Pediatrics specialist | Child health advocate',
    school: 'Stanford Medical School',
    level: 'Attending',
    specialty: 'Pediatrics',
    verified: true,
    isPremium: true,
    followers: 2341,
    following: 678,
    joinedDate: '2021-05-10'
  },
  {
    id: '4',
    name: 'James Wilson',
    username: 'jwilson_med',
    email: 'jwilson@example.com',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    bio: 'Year 2 medical student | Future surgeon',
    school: 'UCLA Medical School',
    level: 'Year 2',
    specialty: 'General Surgery',
    verified: false,
    isPremium: false,
    followers: 234,
    following: 189,
    joinedDate: '2024-01-05'
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    author: mockUsers[0],
    content: 'Just finished an amazing case study on neuroplasticity. The brain\'s ability to reorganize itself is truly fascinating! 🧠 #Neurology #MedicalEducation',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800',
    category: 'Education',
    tags: ['Neurology', 'MedicalEducation', 'Research'],
    likes: 234,
    comments: [],
    shares: 45,
    bookmarked: false,
    liked: true,
    createdAt: '2024-11-01T10:30:00Z'
  },
  {
    id: '2',
    author: mockUsers[1],
    content: 'Remember: The best doctors treat the disease; great doctors treat the patient who has the disease. Patient-centered care should always be our priority. 💙',
    category: 'Clinical Practice',
    tags: ['PatientCare', 'Medicine', 'Inspiration'],
    likes: 567,
    comments: [],
    shares: 89,
    bookmarked: true,
    liked: false,
    createdAt: '2024-11-01T08:15:00Z'
  },
  {
    id: '3',
    author: currentUser,
    content: 'Excited to share my research poster at the upcoming cardiology conference! Working on novel biomarkers for early detection of heart failure. Looking forward to connecting with fellow researchers! 📊',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    category: 'Research',
    tags: ['Cardiology', 'Research', 'Conference'],
    likes: 412,
    comments: [],
    shares: 67,
    bookmarked: false,
    liked: false,
    createdAt: '2024-10-31T16:45:00Z'
  }
];

export const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Summer Research Internship - Oncology Department',
    type: 'internship',
    location: 'Boston, MA',
    specialty: 'Oncology',
    description: 'Join our cutting-edge research team studying immunotherapy approaches for solid tumors. This is a 10-week paid internship for medical students.',
    institution: 'Massachusetts General Hospital',
    deadline: '2025-02-15',
    requirements: ['Medical student (any year)', 'Interest in oncology research', 'Basic lab experience preferred'],
    link: 'https://example.com/apply',
    bookmarked: false,
    status: 'active'
  },
  {
    id: '2',
    title: 'Emergency Medicine Residency Position',
    type: 'job',
    location: 'New York, NY',
    specialty: 'Emergency Medicine',
    description: 'Seeking passionate physicians for our EM residency program. Excellent training, competitive salary, and comprehensive benefits package.',
    institution: 'Mount Sinai Hospital',
    deadline: '2025-01-30',
    requirements: ['MD/DO degree', 'USMLE Step 2 completed', 'Strong clinical skills'],
    link: 'https://example.com/apply',
    bookmarked: true,
    status: 'active'
  },
  {
    id: '3',
    title: 'Global Health Scholarship Program',
    type: 'scholarship',
    location: 'Various International',
    specialty: 'Global Health',
    description: 'Full funding for medical students interested in global health initiatives. Includes travel, accommodation, and project support.',
    institution: 'WHO Foundation',
    deadline: '2025-03-01',
    requirements: ['Enrolled medical student', 'Demonstrated interest in global health', 'Project proposal required'],
    bookmarked: false,
    status: 'active'
  },
  {
    id: '4',
    title: 'Annual Medical Education Conference',
    type: 'event',
    location: 'San Francisco, CA',
    specialty: 'Medical Education',
    description: 'Three-day conference featuring workshops, keynote speakers, and networking opportunities for medical educators and students.',
    institution: 'American Medical Association',
    deadline: '2025-11-10',
    requirements: ['Registration fee: $299 (students: $149)', 'Medical professionals and students welcome'],
    link: 'https://example.com/register',
    bookmarked: true,
    status: 'active'
  }
];

export const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Fundamentals of Cardiovascular Pathophysiology',
    type: 'article',
    author: 'Dr. Robert Smith',
    specialty: 'Cardiology',
    tags: ['Cardiology', 'Pathophysiology', 'Education'],
    description: 'Comprehensive review of cardiovascular disease mechanisms and clinical correlations.',
    url: 'https://example.com/resource1',
    likes: 892,
    saved: true,
    uploadedAt: '2024-10-15',
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400'
  },
  {
    id: '2',
    title: 'Clinical Trials in Immunotherapy: A Meta-Analysis',
    type: 'research',
    author: 'Dr. Lisa Anderson et al.',
    specialty: 'Oncology',
    tags: ['Oncology', 'Immunotherapy', 'Research'],
    description: 'Systematic review of recent immunotherapy trials across multiple cancer types.',
    url: 'https://example.com/resource2',
    likes: 1247,
    saved: false,
    uploadedAt: '2024-10-28',
    thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400'
  },
  {
    id: '3',
    title: 'ECG Interpretation Masterclass',
    type: 'video',
    author: 'Dr. Michael Turner',
    specialty: 'Cardiology',
    tags: ['ECG', 'Cardiology', 'Clinical Skills'],
    description: 'Step-by-step guide to reading and interpreting ECGs with clinical case examples.',
    url: 'https://example.com/resource3',
    likes: 3456,
    saved: true,
    uploadedAt: '2024-10-20',
    thumbnail: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400'
  },
  {
    id: '4',
    title: 'Pediatric Emergency Medicine Handbook',
    type: 'pdf',
    author: 'Dr. Jennifer Lee',
    specialty: 'Pediatrics',
    tags: ['Pediatrics', 'Emergency Medicine', 'Reference'],
    description: 'Quick reference guide for common pediatric emergencies and treatment protocols.',
    url: 'https://example.com/resource4',
    likes: 2103,
    saved: false,
    uploadedAt: '2024-10-05',
    thumbnail: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: mockUsers[0],
    content: 'liked your post about cardiology research',
    read: false,
    timestamp: '2024-11-02T09:30:00Z'
  },
  {
    id: '2',
    type: 'follow',
    user: mockUsers[1],
    content: 'started following you',
    read: false,
    timestamp: '2024-11-02T08:15:00Z'
  },
  {
    id: '3',
    type: 'comment',
    user: mockUsers[2],
    content: 'commented on your post',
    read: true,
    timestamp: '2024-11-01T18:45:00Z'
  },
  {
    id: '4',
    type: 'message',
    user: mockUsers[0],
    content: 'sent you a message',
    read: false,
    timestamp: '2024-11-01T16:20:00Z'
  },
  {
    id: '5',
    type: 'opportunity',
    content: 'New internship opportunity matches your interests',
    read: true,
    timestamp: '2024-11-01T10:00:00Z'
  },
  {
    id: '6',
    type: 'announcement',
    content: 'System maintenance scheduled for November 5th',
    read: true,
    timestamp: '2024-10-31T12:00:00Z'
  }
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    participant: mockUsers[0],
    lastMessage: {
      id: 'm1',
      sender: mockUsers[0],
      content: 'Thanks for sharing that research paper!',
      read: false,
      timestamp: '2024-11-02T09:15:00Z'
    },
    unreadCount: 2
  },
  {
    id: '2',
    participant: mockUsers[1],
    lastMessage: {
      id: 'm2',
      sender: currentUser,
      content: 'See you at the conference!',
      read: true,
      timestamp: '2024-11-01T14:30:00Z'
    },
    unreadCount: 0
  },
  {
    id: '3',
    participant: mockUsers[2],
    lastMessage: {
      id: 'm3',
      sender: mockUsers[2],
      content: 'Would you be interested in mentoring a student?',
      read: false,
      timestamp: '2024-11-01T11:20:00Z'
    },
    unreadCount: 1
  }
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'monthly',
    features: [
      'Basic profile',
      'View posts and resources',
      'Follow up to 100 users',
      'Comment and like posts',
      'Basic search functionality'
    ]
  },
  {
    id: 'premium-monthly',
    name: 'Premium',
    price: 9.99,
    interval: 'monthly',
    features: [
      'All Free features',
      'Post job opportunities',
      'Apply to premium jobs',
      'List products for sale',
      'Access exclusive content',
      'Advanced search filters',
      'Unlimited follows',
      'Priority support',
      'Verified badge eligibility'
    ]
  },
  {
    id: 'premium-yearly',
    name: 'Premium Annual',
    price: 99.99,
    interval: 'yearly',
    features: [
      'All Premium features',
      'Save 17% with annual billing',
      'Early access to new features',
      'Featured profile placement',
      'Custom profile themes',
      'Download resources offline',
      'Analytics dashboard'
    ]
  }
];
