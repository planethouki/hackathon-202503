export interface Punchline {
  id: string;
  title: string;
  url: string;
  contestId: string;
  userId: string;
  createdAt: string;
  user?: User;
  contest?: Contest;
  polls?: Poll[];
  pollCount: number;
  pollAddress: string;
  rankingInContest: number;
}

export interface Poll {
  id: string;
  userId: string;
  createdAt: string;
  emoji: string;
  user?: User;
}

export interface Contest {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
  postStartDate: string;
  postEndDate: string;
  pollStartDate: string;
  pollEndDate: string;
  punchlineCount: number;
}

export interface User {
  id: string;
  authenticateId?: string;
  displayName?: string;
  bio?: string;
  avatarFileName: string;
  photoURL?: string;
  createdAt: string;
}
