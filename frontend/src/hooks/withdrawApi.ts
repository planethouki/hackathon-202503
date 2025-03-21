import { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase.ts";
import { ethers } from "ethers";

interface UseWithdrawPollTokensReturn {
  withdraw: (punchlineId: string, walletAddress: string) => Promise<void>;
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

  const withdrawTokens = async (punchlineId: string, walletAddress: string) => {
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

      // ERC20のABIを定義（permitメソッドのみ）
      const permitAbi = [
        "function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)"
      ];

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // コントラクトインスタンスを作成
      const contract = new ethers.Contract(tokenAddress, permitAbi, signer);

      // permitを呼び出し
      const tx = await contract.permit(
        walletAddress,                // owner
        import.meta.env.VITE_CONTRACT_OWNER as string, // spender (コントラクト所有者)
        value,                        // value
        deadline,                     // deadline
        v,                            // v
        r,                            // r
        s                             // s
      );

      // トランザクションの完了を待つ
      await tx.wait();

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
