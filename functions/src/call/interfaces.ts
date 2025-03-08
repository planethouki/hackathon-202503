export interface Punchline {
  title: string;
  url: string;
  contestId: string;
}

export interface Poll {
  punchlineId: string;
  emoji: string;
}

export interface Profile {
  displayName: string;
  bio: string;
  avatarFileName: string;
}
