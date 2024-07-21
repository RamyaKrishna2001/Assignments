import React from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CommonButton from "./CustomButton";
import { Alert } from "react-bootstrap";
import {
  useAddPhotoMutation,
  useFetchPhotosQuery,
  useRemovePhotoMutation,
} from "./store";

const PhotosAccordion = ({ album }) => {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();
  const [removePhoto, removePhotoResults] = useRemovePhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  const handleRemovePhoto = (photo) => {
    removePhoto(photo);
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
            <h5 className="mt-2">Photos in the {album.title}</h5>
            <CommonButton
              title="+ Add Photos"
              loader={addPhotoResults.isLoading}
              handler={handleAddPhoto}
            />
          </div>
          {data?.length > 0 && (
            <Row>
              <Col>
                {data.map((photo, index) => (
                  <div
                    className="mt-3 me-2"
                    key={index}
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    {removePhotoResults.isLoading ? (
                      <Spinner
                        size="sm"
                        animation="border"
                        className="position-absolute"
                        style={{
                          top: "5px",
                          right: "10px",
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="sm"
                        className="text-white me-2 position-absolute"
                        style={{
                          top: "5px",
                          right: "1px",
                          cursor: "pointer",
                          zIndex: 10,
                          backgroundColor: "rgba(0, 0, 0, 0.6)",
                          padding: "5px",
                          borderRadius: "20%",
                        }}
                        onClick={() => handleRemovePhoto(photo)}
                      />
                    )}
                    <img
                      style={{ width: "100px", height: "100px" }}
                      src={photo.url}
                      alt="random pic"
                    />
                  </div>
                ))}
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default PhotosAccordion;
