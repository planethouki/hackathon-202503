import { useState, useEffect, useCallback } from "react";
import { Contest, Punchline } from "../libs/interfaces.ts";

const apiUrl = import.meta.env.VITE_API_URL;

interface UseContestsDetailApiReturn {
  contest: Contest | null;
  punchlinesLatest: Punchline[] | null;
  punchlinesPopular: Punchline[] | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useContestsDetailApi = (id: string | null | undefined): UseContestsDetailApiReturn => {
  const [contest, setContest] = useState<Contest | null>(null);
  const [punchlinesLatest, setPunchlinesLatest] = useState<Punchline[] | null>([]);
  const [punchlinesPopular, setPunchlinesPopular] = useState<Punchline[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContestsDetail = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    if (!id) {
      setContest(null);
      setPunchlinesLatest(null);
      setPunchlinesPopular(null);
      setError("IDが不正です");
      return;
    }
    try {
      const res = await fetch(new URL(`/contests/${id}`, apiUrl)).then(res => res.json());
      setContest(res.contest);
      setPunchlinesLatest(res.punchlinesLatest);
      setPunchlinesPopular(res.punchlinesPopular);
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

  return { contest, punchlinesLatest, punchlinesPopular, isLoading, error, refresh };
};

interface UseContestsLatestApiReturn {
  contests: Contest[] | null;
  totalContests: number | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useContestsLatestApi = (pageNumber = 1): UseContestsLatestApiReturn => {
  const [totalContests, setTotalContests] = useState<number | null>(null);
  const [contests, setContests] = useState<Contest[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContestsLatest = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(new URL(`/contests/latest?page=${pageNumber}`, apiUrl)).then(res => res.json());
      const totalContests = res.totalContests || null;
      const contests: Contest[] = res.contests || null;
      setTotalContests(totalContests);
      setContests(contests);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("予期しないエラーが発生しました");
      }
    } finally {
      setIsLoading(false);
    }
  }, [pageNumber]);

  useEffect(() => {
    fetchContestsLatest();
  }, [fetchContestsLatest]);

  const refresh = async () => {
    await fetchContestsLatest();
  };

  return { totalContests, contests, isLoading, error, refresh };
};
