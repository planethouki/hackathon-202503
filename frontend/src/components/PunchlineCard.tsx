import {FC} from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router";
import {Punchline} from "../libs/interfaces";

interface Props {
  punchline: Punchline
  showUser?: boolean
  showContest?: boolean
  showRanking?: boolean
}

const PunchlineCard: FC<Props> = ({ punchline, showUser = true, showContest = true, showRanking = false, }) => {

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
          title={`投票数 ${punchline.pollCount}`}>
            <i className="bi bi-balloon-heart"></i>
            <span>{punchline.pollCount}</span>
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
      </Card.Footer>
    </Card>
  );
}

export default PunchlineCard;
