import {PropsWithChildren} from "react";
import {Container} from "react-bootstrap";

export function Development({ children }: PropsWithChildren) {
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    return (
      <div className="mt-5 mb-5 bg-light">
        <Container>
          {children}
        </Container>
      </div>
    )
  }

  return null;
}
