import { Spinner, Button } from "react-bootstrap";

const CommonButton = ({ title, handler, loader }) => {
  return (
    <Button
      variant="primary"
      onClick={handler}
      disabled={loader}
      style={{ width: "8rem" }}
    >
      {loader ? <Spinner animation="border" role="status" size="sm" /> : title}
    </Button>
  );
};

export default CommonButton;
