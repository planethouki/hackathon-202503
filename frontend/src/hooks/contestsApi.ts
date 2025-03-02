import { useState, useEffect, useCallback } from "react";
import { Contest, Punchline } from "../libs/interfaces.ts";

const apiUrl = import.meta.env.VITE_API_URL;

interface UseContestsDetailApiReturn {
  contest: Contest | null;
  punchlines: Punchline[] | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useContestsDetailApi = (id: string | null | undefined): UseContestsDetailApiReturn => {
  const [contest, setContest] = useState<Contest | null>(null);
  const [punchlines, setPunchlines] = useState<Punchline[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContestsDetail = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    if (!id) {
      setContest(null);
      setPunchlines(null);
      setError("IDが不正です");
      return;
    }
    try {
      const res = await fetch(new URL(`/contests/${id}`, apiUrl)).then(res => res.json());
      const contest: Contest = res.contest || null;
      const punchlines: Punchline[] = res.punchlines || null;
      setContest(contest);
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
  }, [id]);

  useEffect(() => {
    fetchContestsDetail();
  }, [fetchContestsDetail]);

  const refresh = async () => {
    await fetchContestsDetail();
  };

  return { contest, punchlines, isLoading, error, refresh };
};
