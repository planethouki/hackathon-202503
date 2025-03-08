import { useState, useCallback } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import {app} from "../firebase.ts";

interface UsePollPostCallReturn {
  send: (punchlineId: string, emoji: string) => Promise<{ success: boolean }>;
  isLoading: boolean;
  error: string | null;
}

export const usePollPostCall = (): UsePollPostCallReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postPunchline = useCallback(async (punchlineId: string, emoji: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const functions = getFunctions(app, "asia-northeast1");
      const createPoll = httpsCallable(functions, 'createPoll');
      await createPoll({ punchlineId: punchlineId, emoji: emoji });
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

  return { send: postPunchline, isLoading, error };
};
