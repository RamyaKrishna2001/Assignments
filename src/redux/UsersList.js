import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { fetchUsers, addUser, removeUser } from "./store";
import CommonButton from "./CustomButton";
import { useThunk } from "./hooks/useThunk";
import UsersAccordion from "./UsersAccordion";

function UsersList() {
  const dispatch = useDispatch();
  const [addUserLoader, addUserError, doCreateUser] = useThunk(addUser);
  const [removeUserLoader, removeUserError, doRemoveUser] =
    useThunk(removeUser);
  const { isLoading, data, error } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    doCreateUser();
  };

  const handleDeleteUser = (userId) => {
    doRemoveUser(userId);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} className="text-center my-3">
          {(error || addUserError || removeUserError) && (
            <Alert variant="danger">Error While Fetching Data...</Alert>
          )}
          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              <Spinner animation="grow" role="status" />
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between mt-5">
                <h4>List of Users</h4>
                <CommonButton
                  title={"+ Add User"}
                  btnLoader={addUserLoader}
                  handler={handleAddUser}
                />
              </div>
              <UsersAccordion
                data={data}
                deleteHandler={handleDeleteUser}
                deleteLoader={removeUserLoader}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default UsersList;
