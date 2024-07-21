import React from "react";
import {
  Form,
  Button,
  Container,
  Card,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import {
  addCar,
  changeCost,
  changeName,
  changeSearchTerm,
  removeCar,
} from "./store";

const CarHub = () => {
  const dispatch = useDispatch();
  const { name, cost, carsList, searchTerm, totalCost } = useSelector(
    ({ cars: { searchTerm, list }, form: { name, cost } }) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filteredCars = list.filter((car) =>
        car.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
      const totalCost = filteredCars.reduce((acc, car) => acc + car.cost, 0);
      return {
        name,
        cost,
        carsList: filteredCars,
        searchTerm,
        totalCost,
      };
    }
  );

  const handleNameChange = (value) => {
    dispatch(changeName(value));
  };

  const handleCostChange = (value) => {
    dispatch(changeCost(Number(value) || 0));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addCar({ name, cost }));
  };

  const handleCarDelete = (id) => {
    dispatch(removeCar(id));
  };

  const handleSearchTermChange = (value) => {
    dispatch(changeSearchTerm(value));
  };

  const renderCars = () => (
    <Row>
      {carsList.map((car) => {
        const matchedCar =
          name && car.name.toLowerCase().includes(name.toLowerCase());
        return (
          <Col md={6} key={car.id} className="mb-4">
            <Card className="shadow border-0">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <Card.Title
                  className={`mb-0 ${matchedCar ? "text-danger fs-3" : ""}`}
                >
                  {car.name} - ${car.cost}
                </Card.Title>
                <Button
                  variant="danger"
                  onClick={() => handleCarDelete(car.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );

  return (
    <Container className="mt-5">
      <h2>
        <FontAwesomeIcon icon={faCar} className="me-2" />
        Add Car
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formCarName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter car name"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formCarCost">
          <Form.Label>Cost</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter car cost"
            value={cost || ""}
            onChange={(e) => handleCostChange(e.target.value)}
          />
        </Form.Group>

        <Button variant="success" type="submit" block className="px-3 mb-3">
          Submit
        </Button>
      </Form>
      <hr />
      <Row className="align-items-center my-5">
        <Col xs="auto">
          <h3 className="mb-0">My Car</h3>
        </Col>
        <Col>
          <InputGroup className="w-50">
            <Form.Control
              value={searchTerm}
              type="text"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-input"
              onChange={(e) => handleSearchTermChange(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      {renderCars()}
      <hr />
      <h3>Total - ${totalCost}</h3>
    </Container>
  );
};

export default CarHub;
