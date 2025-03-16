import {FC} from "react";
import {Badge, Card, Placeholder} from "react-bootstrap";
import {Link} from "react-router";
import {Punchline} from "../libs/interfaces";
import {checkDateStatus} from "./utils.ts";

interface Props {
  punchline: Punchline
  showUser?: boolean
  showContest?: boolean
  showRanking?: boolean
}

export const PunchlineCard: FC<Props> = ({ punchline, showUser = true, showContest = true, showRanking = false, }) => {

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <h3 className="text-center">
            <Link to={`/punchlines/${punchline.id}`}>
              {punchline.title}
            </Link>
          </h3>
        </Card.Title>
      </Card.Body>
      <iframe src={punchline.url}
              style={{ aspectRatio: 9/16, width: "100%" }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen></iframe>
      <Card.Footer>
        <div className="mb-2 small text-center">
          {showContest && punchline.contest &&
            <Link
              to={`/contests/${punchline.contest.id}`}
              title={`お題 ${punchline.contest.title}`}
              className="me-2"
            >
              <i className="bi bi-question-square me-1"></i>
              <span>{punchline.contest.title}</span>
            </Link>
          }
          {showUser && punchline.user &&
            <Link
              to={`/users/${punchline.userId}/profile`}
              title={`ユーザー ${punchline.user.displayName}`}
              className="me-2"
            >
              <i className="bi bi-person-circle me-1"></i>
              <span>{punchline.user.displayName}</span>
            </Link>
          }
          <span
            className="me-2"
            title={`投票数 ${punchline.pollCount}`}
          >
            <i className="bi bi-balloon-heart"></i>
            <span>{punchline.pollCount}</span>
          </span>
          <span
            title={`投稿日 ${new Date(punchline.createdAt).toLocaleString()}`}
          >
            <i className="bi bi-calendar-week"></i>
          </span>
        </div>
        {showRanking &&
          <div className="mb-3">
            <span>順位: </span>
            <span>{punchline.rankingInContest}</span>
            {punchline?.contest &&
              <>
                <span> / </span>
                <span>{punchline.contest.punchlineCount}</span>
              </>
            }
          </div>
        }
        {punchline.contest &&
          <div className="text-center">
            {checkDateStatus(punchline.contest.pollStartDate, punchline.contest.pollEndDate) === "before" &&
              <Badge bg="info">投票前</Badge>
            }
            {checkDateStatus(punchline.contest.pollStartDate, punchline.contest.pollEndDate) === "now" &&
              <Badge>投票中！</Badge>
            }
            {checkDateStatus(punchline.contest.pollStartDate, punchline.contest.pollEndDate) === "after" &&
              <Badge bg="secondary">投票終了</Badge>
            }
          </div>
        }
      </Card.Footer>
    </Card>
  );
}

export const PunchlineCardPlaceholder: FC = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Placeholder as="h3" animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
        </Card.Title>
      </Card.Body>
      <Placeholder
        as="div"
        animation="glow"
        style={{ aspectRatio: 9 / 16, width: "100%" }}
      >
        <Placeholder xs={12} />
      </Placeholder>
      <Card.Footer>
        <Placeholder as="div" animation="glow" className="text-center">
          <Placeholder xs={4} className="me-2" />
          <Placeholder xs={3} />
        </Placeholder>
      </Card.Footer>
    </Card>
  );
}
