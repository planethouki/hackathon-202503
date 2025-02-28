export interface Punchline {
  id: string;
  title: string;
  url: string;
  contestId: string;
  userId: string;
  createdAt: string;
  user: User | null;
  contest: Contest | null;
}

export interface Contest {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
}

export interface User {
  id: string;
  authenticateId: string | null;
  displayName: string | null;
  bio: string | null;
  photoURL: string | null;
  createdAt: string;
}
