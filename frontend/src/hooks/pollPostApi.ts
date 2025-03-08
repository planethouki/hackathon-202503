import {useState, useCallback, useEffect} from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import {app} from "../firebase.ts";
import {Poll} from "../libs/interfaces.ts";

interface UsePollPostCallReturn {
  send: (punchlineId: string, emoji: string) => Promise<{ success: boolean }>;
  isLoading: boolean;
  error: string | null;
}

export const usePollPostCall = (): UsePollPostCallReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postPoll = async (punchlineId: string, emoji: string) => {
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
  };

  return { send: postPoll, isLoading, error };
};

interface UsePollInfoGetCallReturn {
  poll: Poll | null;
  alreadyPolled: boolean | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

interface GetPollsRequest {
  punchlineId: string;
}

interface GetPollsResponse {
  success: boolean;
  message: string;
  polls: Poll[];
  alreadyPolled: boolean;
}

export const usePollInfoGetCall = (punchlineId: string | null | undefined): UsePollInfoGetCallReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [poll, setPoll] = useState<Poll | null>(null);
  const [alreadyPolled, setAlreadyPolled] = useState<boolean | null>(null);

  const fetchOwnPolls = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    if (!punchlineId) {
      setPoll(null);
      setAlreadyPolled(null);
      setError("IDが不正です");
      setIsLoading(false);
      return;
    }
    try {
      const functions = getFunctions(app, "asia-northeast1");
      const getPolls = httpsCallable<GetPollsRequest, GetPollsResponse, null>(functions, 'getPolls');
      const res = await getPolls({ punchlineId: punchlineId });
      setPoll(res.data.polls[0] || null);
      setAlreadyPolled(res.data.alreadyPolled);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("予期しないエラーが発生しました");
      }
    } finally {
      setIsLoading(false);
    }
  }, [punchlineId]);

  useEffect(() => {
    fetchOwnPolls();
  }, [fetchOwnPolls]);

  const refresh = async () => {
    await fetchOwnPolls();
  };

  return { poll, alreadyPolled, isLoading, error, refresh };
};
