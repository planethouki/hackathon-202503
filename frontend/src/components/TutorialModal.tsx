import {Button, Modal, Carousel, Image} from "react-bootstrap";
import {useState, useEffect} from "react";

export function TutorialModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("hasSeenTutorial", "true");
  };

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");

    if (!hasSeenTutorial) {
      setShow(true);
    }
  }, []);

  return (
    <Modal show={show} onHide={handleClose} centered={true} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>チュートリアル</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel variant="dark" interval={null}>
          <Carousel.Item>
            <Image src="/tutorial1.png" title="ログインしよう" className="w-100" />
          </Carousel.Item>
          <Carousel.Item>
            <Image src="/tutorial2.png" title="投票しよう" className="w-100" />
          </Carousel.Item>
          <Carousel.Item>
            <Image src="/tutorial3.png" title="動画投稿しよう" className="w-100" />
          </Carousel.Item>
        </Carousel>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          完了
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
