import { useEffect, useMemo, useCallback, useState } from "react";
import { Button, ButtonGroup, Image } from "react-bootstrap";
import { usePollPostCall } from "../hooks/pollPostApi.ts";
import { usePollInfoGetCall } from "../hooks/pollPostApi.ts";

interface PollComponentProps {
  punchlineId: string;
  isInPollPeriod: boolean;
  onPollSuccess?: () => Promise<void>;
}

export function PollComponent({ punchlineId, isInPollPeriod, onPollSuccess }: PollComponentProps) {
  const { isLoading: isSending, send, error: sendError } = usePollPostCall();
  const { poll, alreadyPolled, refresh: refreshPollInfo, error: pollInfoError } = usePollInfoGetCall(punchlineId);

  const [showSentSuccess, setShowSentSuccess] = useState(false);
  const [showSentError, setShowSentError] = useState(false);

  useEffect(() => {
    if (!showSentSuccess) {return}
    const timeout = setTimeout(() => setShowSentSuccess(false), 2000);
    return () => clearTimeout(timeout);
  }, [showSentSuccess, setShowSentSuccess]);

  useEffect(() => {
    if (!showSentError) {return}
    const timeout = setTimeout(() => setShowSentError(false), 2000);
    return () => clearTimeout(timeout);
  }, [showSentError, setShowSentError]);

  const disabledPoll = useMemo(() => {
    if (isSending) return true;
    if (alreadyPolled === null) return true;
    return alreadyPolled;
  }, [alreadyPolled, isSending]);

  const isPolledEmoji = useCallback((emoji: string) => {
    if (poll === null) return false;
    return poll.emoji === emoji;
  }, [poll]);

  const submitPoll = async (emoji: string) => {
    if (punchlineId === undefined) {
      return;
    }

    const {success} = await send(punchlineId, emoji);
    if (success) {
      setShowSentSuccess(true);
    } else {
      setShowSentError(true);
    }
    await refreshPollInfo();
    if (onPollSuccess) {
      await onPollSuccess();
    }
  };

  return (
    <>
      <div className="mb-3">
        <h5>投票する</h5>
        {isInPollPeriod ? (
          <>
            <ButtonGroup as="div">
              {[1,2,3,4].map((emoji) => (
                <Button
                  key={emoji}
                  variant={isPolledEmoji(emoji.toString()) ? "primary" : "outline-primary"}
                  className="position-relative"
                  style={{ maxWidth: 100 }}
                  onClick={() => submitPoll(emoji.toString())}
                  disabled={disabledPoll}
                >
                  <Image src={`/emoji${emoji}.jpg`} alt={`絵文字${emoji}`} className="w-100" />
                  {isPolledEmoji(emoji.toString()) &&
                    <span
                      className="position-absolute top-50 start-50 bold text-nowrap bg-primary rounded"
                      style={{ transform: "translate(-50%, -50%)" }}
                    >
                      投票済み
                    </span>
                  }
                </Button>
              ))}
            </ButtonGroup>
          </>
        ) : (
          <span>投票の期間は終了しました。</span>
        )}
      </div>
      <div>
        {showSentSuccess &&
          <span>投票しました！</span>
        }
        {showSentError &&
          <span>{sendError}</span>
        }
        {alreadyPolled === true &&
          <span>すでに投票済みです</span>
        }
        {pollInfoError &&
          <span>{pollInfoError}</span>
        }
      </div>
    </>
  );
}
