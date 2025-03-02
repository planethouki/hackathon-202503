import { useState, useEffect, useCallback } from "react";
import { Punchline } from "../libs/interfaces.ts";

const apiUrl = import.meta.env.VITE_API_URL;

interface UsePunchlinesDetailApiReturn {
  punchline: Punchline | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const usePunchlinesDetailApi = (id: string | null | undefined): UsePunchlinesDetailApiReturn => {
  const [punchline, setPunchline] = useState<Punchline | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPunchlinesDetail = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    if (!id) {
      setPunchline(null);
      setError("IDが不正です");
      return;
    }
    try {
      const res = await fetch(new URL(`/punchlines/${id}`, apiUrl)).then(res => res.json());
      const punchline: Punchline = res.punchline || null;
      setPunchline(punchline);
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
    fetchPunchlinesDetail();
  }, [fetchPunchlinesDetail]);

  const refresh = async () => {
    await fetchPunchlinesDetail();
  };

  return { punchline, isLoading, error, refresh };
};


interface UsePunchlinesLatestApiReturn {
  punchlines: Punchline[] | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const usePunchlinesLatestApi = (pageNumber = 1): UsePunchlinesLatestApiReturn => {
  const [punchlines, setPunchlines] = useState<Punchline[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPunchlinesLatest = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(new URL(`/punchlines/latest?page=${pageNumber}`, apiUrl)).then(res => res.json());
      const punchlines: Punchline[] = res.punchlines || null;
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
  }, [pageNumber]);

  useEffect(() => {
    fetchPunchlinesLatest();
  }, [fetchPunchlinesLatest]);

  const refresh = async () => {
    await fetchPunchlinesLatest();
  };

  return { punchlines, isLoading, error, refresh };
};
