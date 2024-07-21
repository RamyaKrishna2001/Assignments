import { Row, Col, Accordion, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AlbumsAccordion from "./AlbumsAccordian";

const UsersAccordion = ({ data, deleteHandler, deleteLoader }) => {
  return (
    <>
      {data?.length > 0 && (
        <Row>
          <Col>
            {data.map((user, index) => (
              <Accordion key={index} className="mt-3">
                <Accordion.Item eventKey={user.id}>
                  <Accordion.Header>
                    {deleteLoader ? (
                      <Spinner size="sm" animation="border" />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="sm"
                        className="text-danger me-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteHandler(user.id)}
                      />
                    )}
                    <span className="mt-1">{user.name}</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <AlbumsAccordion user={user} />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
          </Col>
        </Row>
      )}
    </>
  );
};

export default UsersAccordion;
