import {FC} from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router";
import {Punchline} from "../libs/interfaces";

interface Props {
  punchline: Punchline
  showUser?: boolean
  showContest?: boolean
}

const PunchlineCard: FC<Props> = ({ punchline, showUser = true, showContest = true }) => {

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <span>回答: </span>
          <Link to={`/punchlines/${punchline.id}`}>
            {punchline.title}
          </Link>
        </Card.Title>
      </Card.Body>
      <iframe src={punchline.url}
              style={{ aspectRatio: 9/16, width: "100%" }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen></iframe>
      <Card.Footer>
        {showContest && punchline.contest &&
          <div className="mb-3" key={punchline.contest.id}>
            <span>お題: </span>
            <Link to={`/contests/${punchline.contest.id}`}>
              {punchline.contest.title}
            </Link>
          </div>
        }
        {showUser && punchline.user &&
          <div className="mb-3">
            <span>投稿者: </span>
            <Link to={`/users/${punchline.userId}/profile`}>
              {punchline.user.displayName}
            </Link>
          </div>
        }
        <div className="mb-3">
          <span>得票数: </span>
          <span>{punchline.pollCount}</span>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default PunchlineCard;
