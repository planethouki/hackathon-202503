import { useState, useEffect, useCallback } from "react";
import { User, Punchline } from "../libs/interfaces.ts";
import { getFunctions, httpsCallable } from "firebase/functions";
import {app} from "../firebase.ts";

const apiUrl = import.meta.env.VITE_API_URL;

interface UseUsersDetailApiReturn {
  user: User | null;
  punchlines: Punchline[] | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useUsersDetailApi = (id: string | null | undefined): UseUsersDetailApiReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [punchlines, setPunchlines] = useState<Punchline[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsersDetail = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    if (!id) {
      setUser(null);
      setPunchlines(null);
      setError("IDが不正です");
      return;
    }
    try {
      const res = await fetch(new URL(`/users/${id}`, apiUrl)).then(res => res.json());
      const user: User = res.user || null;
      const punchlines: Punchline[] = res.punchlines || null;
      setUser(user);
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
    fetchUsersDetail();
  }, [fetchUsersDetail]);

  const refresh = async () => {
    await fetchUsersDetail();
  };

  return { user, punchlines, isLoading, error, refresh };
};

interface UseProfileSetCallReturn {
  send: (displayName: string, bio: string, avatarFileName: string) => Promise<{ success: boolean }>;
  isLoading: boolean;
  error: string | null;
}

export const useProfileSetCall = (): UseProfileSetCallReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const setProfile = useCallback(async (displayName: string, bio: string, avatarFileName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const functions = getFunctions(app, "asia-northeast1");
      const setProfile = httpsCallable(functions, 'setProfile');
      await setProfile({ displayName, bio, avatarFileName });
      return { success: true };
    } catch (err: unknown) {
      console.error(err);
      // errがError型であるか判定
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("予期しないエラーが発生しました");
      }
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { send: setProfile, isLoading, error };
};
