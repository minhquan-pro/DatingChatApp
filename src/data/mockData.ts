import type { MatchItem, Message, User } from '@/types'

/** Curated portrait crops — replace with your own assets in production */
export const MOCK_DISCOVER_USERS: User[] = [
  {
    id: 'u1',
    name: 'Mai',
    age: 24,
    bio: 'Matcha, vinyl nights, and spontaneous road trips.',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80&auto=format&fit=crop',
    interests: ['Photography', 'Indie', 'Coffee'],
  },
  {
    id: 'u2',
    name: 'Huy',
    age: 27,
    bio: 'Runner. Amateur chef. Always down for ramen.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80&auto=format&fit=crop',
    interests: ['Fitness', 'Food', 'Dogs'],
  },
  {
    id: 'u3',
    name: 'Trang',
    age: 23,
    bio: 'UX designer who sketches on the train.',
    image:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80&auto=format&fit=crop',
    interests: ['Design', 'Art', 'Cats'],
  },
  {
    id: 'u4',
    name: 'Khoa',
    age: 29,
    bio: 'Night owl + coffee addict. Let’s find a rooftop bar.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop',
    interests: ['Nightlife', 'Cinema', 'Tech'],
  },
  {
    id: 'u5',
    name: 'Linh',
    age: 25,
    bio: 'Plant mom. Soft playlists. Picnic dates.',
    image:
      'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=800&q=80&auto=format&fit=crop',
    interests: ['Plants', 'R&B', 'Outdoors'],
  },
  {
    id: 'u6',
    name: 'Duy',
    age: 26,
    bio: 'Software engineer by day, DJ by weekend.',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c29002914?w=800&q=80&auto=format&fit=crop',
    interests: ['Music', 'Gaming', 'Travel'],
  },
  {
    id: 'u7',
    name: 'An',
    age: 22,
    bio: 'Studying psych, obsessed with good convos.',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80&auto=format&fit=crop',
    interests: ['Books', 'Psychology', 'Tea'],
  },
  {
    id: 'u8',
    name: 'Vy',
    age: 28,
    bio: 'Yoga + matcha + slow mornings.',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80&auto=format&fit=crop',
    interests: ['Wellness', 'Yoga', 'Travel'],
  },
]

/** Logged-in “me” profile (editable). */
export const DEFAULT_ME: User = {
  id: 'me',
  name: 'Alex',
  age: 26,
  bio: 'Product designer, weekend hikes, terrible at karaoke.',
  image:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80&auto=format&fit=crop',
  interests: ['Design', 'Hiking', 'Coffee'],
}

/** Pre-seeded matches so Matches screen shows content on first load. */
export const INITIAL_MATCHES: MatchItem[] = [
  {
    id: 'seed-1',
    user: {
      id: 'seed-1',
      name: 'Emma',
      age: 25,
      bio: 'Coffee shop regular. Sunset chaser.',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80&auto=format&fit=crop',
      interests: ['Coffee', 'Travel', 'Film'],
    },
    lastMessagePreview: 'See you tonight! 🌇',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    id: 'seed-2',
    user: {
      id: 'seed-2',
      name: 'Noah',
      age: 28,
      bio: 'Runner. Amateur chef. Always down for ramen.',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80&auto=format&fit=crop',
      interests: ['Fitness', 'Food', 'Dogs'],
    },
    lastMessagePreview: 'Haha that meme was perfect 😂',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
]

export const INITIAL_MESSAGES: Record<string, Message[]> = {
  'seed-1': [
    {
      id: 'm1',
      matchId: 'seed-1',
      text: 'Hey! Loved your vibe in your photos.',
      sentAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      fromMe: false,
    },
    {
      id: 'm2',
      matchId: 'seed-1',
      text: 'Thanks! Your profile is super clean too.',
      sentAt: new Date(Date.now() - 1000 * 60 * 118).toISOString(),
      fromMe: true,
    },
    {
      id: 'm3',
      matchId: 'seed-1',
      text: 'See you tonight! 🌇',
      sentAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
      fromMe: false,
    },
  ],
  'seed-2': [
    {
      id: 'm4',
      matchId: 'seed-2',
      text: 'Did you try the new ramen spot?',
      sentAt: new Date(Date.now() - 1000 * 60 * 400).toISOString(),
      fromMe: true,
    },
    {
      id: 'm5',
      matchId: 'seed-2',
      text: 'Haha that meme was perfect 😂',
      sentAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
      fromMe: false,
    },
  ],
}
