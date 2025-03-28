import { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase.ts";
import { ethers } from "ethers";

interface UseWithdrawPollTokensReturn {
  withdraw: (punchlineId: string, walletAddress: string, pollAddress: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

interface WithdrawPollTokensRequest {
  punchlineId: string;
  walletAddress: string;
}

interface WithdrawPollTokensResponse {
  success: boolean;
  message: string;
  signature?: {
    v: number;
    r: string;
    s: string;
    deadline: number;
    value: string;
  };
}

export const useWithdrawPollTokens = (): UseWithdrawPollTokensReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const withdrawTokens = async (punchlineId: string, walletAddress: string, pollAddress: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Firebase Functionsを呼び出して署名を取得
      const functions = getFunctions(app, "asia-northeast1");
      const getWithdrawSignature = httpsCallable<WithdrawPollTokensRequest, WithdrawPollTokensResponse>(
        functions,
        'getPollTokenWithdrawSignature'
      );

      const response = await getWithdrawSignature({
        punchlineId,
        walletAddress
      });

      if (!response.data.success || !response.data.signature) {
        throw new Error(response.data.message || "署名の取得に失敗しました");
      }

      // 署名を使用してトランザクションを送信
      const { v, r, s, deadline, value } = response.data.signature;

      // コントラクトアドレスを環境変数から取得
      const tokenAddress = import.meta.env.VITE_POLL_TOKEN as string;

      const abi = [
        "function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)",
        "function transferFrom(address from, address to, uint256 value)"
      ];

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // コントラクトインスタンスを作成
      const contract = new ethers.Contract(tokenAddress, abi, signer);

      const permitTx = await contract.permit(
        pollAddress,                  // owner
        walletAddress,                // spender
        value,                        // value
        deadline,                     // deadline
        v,                            // v
        r,                            // r
        s                             // s
      );

      await permitTx.wait();

      await new Promise(resolve => setTimeout(resolve, 5000));

      const transferTx = await contract.transferFrom(pollAddress, walletAddress, value);

      await transferTx.wait();

      setSuccess(true);
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
  };

  return { withdraw: withdrawTokens, isLoading, error, success };
};

interface UseWithdrawPunchlineTokenReturn {
  withdraw: (punchlineId: string, walletAddress: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  hash: string | null;
}

interface WithdrawPunchlineTokenRequest {
  punchlineId: string;
  walletAddress: string;
}

interface WithdrawPunchlineTokenResponse {
  success: boolean;
  hash: string;
}

export const useWithdrawPunchlineToken = (): UseWithdrawPunchlineTokenReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [hash, setHash] = useState<string | null>(null);

  const withdrawTokens = async (punchlineId: string, walletAddress: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setHash(null);

    try {
      // Firebase Functionsを呼び出して署名を取得
      const functions = getFunctions(app, "asia-northeast1");
      const withdrawPunchlineToken = httpsCallable<WithdrawPunchlineTokenRequest, WithdrawPunchlineTokenResponse>(
        functions,
        'withdrawPunchlineToken'
      );

      const response = await withdrawPunchlineToken({
        punchlineId,
        walletAddress
      });

      if (!response.data.success) {
        throw new Error("引き出しに失敗しました");
      }

      setSuccess(true);
      setHash(response.data.hash);
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
  }

  return { withdraw: withdrawTokens, isLoading, error, success, hash };
}
