import { Row, Col, Accordion, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CommonButton from "./CustomButton";
import {
  useFetchAlbumsQuery,
  useRemoveAlbumMutation,
  useAddAlbumMutation,
} from "./store";
import { Alert } from "react-bootstrap";
import PhotosAccordion from "./PhotosAccordion";

const AlbumsAccordion = ({ user }) => {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, addAlbumResults] = useAddAlbumMutation();
  const [removeAlbum, removeAlbumResults] = useRemoveAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  const handleRemoveAlbum = (album) => {
    removeAlbum(album);
  };

  return (
    <>
      {error && (
        <Alert variant="danger" className="mt-3">
          Error While Fetching Data...
        </Alert>
      )}
      {isFetching ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="grow" role="status" />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mt-2">Albums for {user.name}</h5>
            <CommonButton
              title="+ Add Albums"
              loader={addAlbumResults.isLoading}
              handler={handleAddAlbum}
            />
          </div>
          {data?.length > 0 && (
            <Row>
              <Col>
                {data.map((album, index) => (
                  <Accordion key={index} className="mt-3">
                    <Accordion.Item eventKey={album.id}>
                      <Accordion.Header>
                        {removeAlbumResults.isLoading ? (
                          <Spinner size="sm" animation="border" />
                        ) : (
                          <FontAwesomeIcon
                            icon={faTrash}
                            size="sm"
                            className="text-danger me-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRemoveAlbum(album)}
                          />
                        )}
                        <span className="mt-1">{album.title}</span>
                      </Accordion.Header>
                      <Accordion.Body>
                        <PhotosAccordion album={album} />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ))}
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default AlbumsAccordion;
