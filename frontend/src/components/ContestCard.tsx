import {FC} from "react";
import {Badge, Card, Placeholder} from "react-bootstrap";
import {Link} from "react-router";
import {Contest} from "../libs/interfaces";
import {checkDateStatus} from "./utils.ts";
import {ContestImage} from "./ContestImage.tsx";

interface Props {
  contest: Contest
}

export const ContestCard: FC<Props> = ({ contest }) => {

  return (
    <Card>
      <div className="position-relative">
        <Link to={`/contests/${contest.id}`} >
          <ContestImage fileName={contest.imageName} alt={contest.title} />
        </Link>
        <div className="position-absolute d-flex flex-column gap-2" style={{ bottom: 10, right: 10 }}>
          {checkDateStatus(contest.postStartDate, contest.postEndDate) === "before" && <Badge bg="info">投稿受付前</Badge>}
          {checkDateStatus(contest.postStartDate, contest.postEndDate) === "now" && <Badge>投稿受付中！</Badge>}
          {checkDateStatus(contest.pollStartDate, contest.pollEndDate) === "before" && <Badge bg="info">投票前</Badge>}
          {checkDateStatus(contest.pollStartDate, contest.pollEndDate) === "now" && <Badge>投票中！</Badge>}
          {checkDateStatus(contest.pollStartDate, contest.pollEndDate) === "after" && <Badge bg="success">結果発表中！</Badge>}
        </div>
      </div>
      <Card.Body>
        <Card.Title>
          <Link to={`/contests/${contest.id}`} >
            {contest.title}
          </Link>
        </Card.Title>
        <Card.Text>
          {contest.punchlineCount !== undefined &&
            <span className="small me-3" title={`動画数: ${contest.punchlineCount}`}>
              <i className="bi bi-camera-video me-1"></i>
              <span>{contest.punchlineCount}</span>
            </span>
          }
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export const ContestCardPlaceholder: FC = () => {
  return (
    <Card>
      <Placeholder
        as="div"
        animation="glow"
        style={{ aspectRatio: 1, width: "100%" }}
      >
        <Placeholder xs={12} />
      </Placeholder>
      <Card.Footer>
        <Placeholder as="h4" animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as="div" animation="glow">
          <Placeholder xs={4} className="me-2" />
          <Placeholder xs={3} />
        </Placeholder>
      </Card.Footer>
    </Card>
  );
}
