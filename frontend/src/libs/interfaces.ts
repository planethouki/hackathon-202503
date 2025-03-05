export interface Punchline {
  id: string;
  title: string;
  url: string;
  contestId: string;
  userId: string;
  createdAt: string;
  user?: User;
  contest?: Contest;
}

export interface Contest {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
  punchlineCount?: number;
}

export interface User {
  id: string;
  authenticateId?: string;
  displayName?: string;
  bio?: string;
  photoURL?: string;
  createdAt: string;
}
