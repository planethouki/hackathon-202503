import { useState, useEffect, useCallback } from "react";
import { Contest, Punchline, User } from "../libs/interfaces.ts";

const apiUrl = import.meta.env.VITE_API_URL;

interface UseHomeApiReturn {
  contests: Contest[] | null;
  users: User[] | null;
  punchlines: Punchline[] | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useHomeApi = (): UseHomeApiReturn => {
  const [contests, setContests] = useState<Contest[] | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [punchlines, setPunchlines] = useState<Punchline[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHome = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(new URL("/home", apiUrl)).then(res => res.json());
      const contests: Contest[] = res.contests || [];
      const users: User[] = res.users || [];
      const punchlines: Punchline[] = res.punchlines || [];
      setContests(contests);
      setUsers(users);
      setPunchlines(punchlines);
    } catch (err: unknown) {
      // errがError型であるか判定
      if (err instanceof Error) {
        setError(err.message); // Error のメッセージを使用
      } else {
        setError("予期しないエラーが発生しました"); // その他の型の場合
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHome();
  }, [fetchHome]);

  const refresh = async () => {
    await fetchHome();
  };

  return { contests, punchlines, users, isLoading, error, refresh };
};
