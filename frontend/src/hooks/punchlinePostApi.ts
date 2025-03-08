import { useState, useEffect, useCallback } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Contest } from "../libs/interfaces.ts";
import { useContestsDetailApi } from "./contestsApi.ts";
import {app} from "../firebase.ts";

const apiUrl = import.meta.env.VITE_API_URL;

interface UsePunchlinePostContestsApiReturn {
  contests: Contest[] | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const usePunchlinePostContestsApi = (): UsePunchlinePostContestsApiReturn => {
  const [contests, setContests] = useState<Contest[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPunchlinePostDetail = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(new URL(`/punchline/post/contests`, apiUrl)).then(res => res.json());
      const contests: Contest[] = res.contests || null;
      setContests(contests);
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
    fetchPunchlinePostDetail();
  }, [fetchPunchlinePostDetail]);

  const refresh = async () => {
    await fetchPunchlinePostDetail();
  };

  return { contests, isLoading, error, refresh };
};

export const usePunchlinePostContestDetailApi = useContestsDetailApi;

interface UsePunchlinePostCallReturn {
  send: (title: string, url: string, contestId: string) => Promise<{ success: boolean }>;
  isLoading: boolean;
  error: string | null;
}

export const usePunchlinePostCall = (): UsePunchlinePostCallReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postPunchline = async (title: string, url: string, contestId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const functions = getFunctions(app, "asia-northeast1");
      const createPunchline = httpsCallable(functions, 'createPunchline');
      await createPunchline({ title, url, contestId });
      return { success: true };
    } catch (err: unknown) {
      console.error(err);
      // errがError型であるか判定
      if (err instanceof Error) {
        setError(err.message); // Error のメッセージを使用
      } else {
        setError("予期しないエラーが発生しました"); // その他の型の場合
      }
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return { send: postPunchline, isLoading, error };
};
