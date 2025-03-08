import {Spinner} from "react-bootstrap";

export function LoadingBlock() {
  return (
    <Spinner animation="border" role="status" as="div">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}
