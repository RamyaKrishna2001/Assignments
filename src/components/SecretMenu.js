import React, { useState } from "react";
import { tableData } from "../constants";

function SecretMenu() {
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [selectedValue, setSelectedValue] = useState("All");
  const [showName, setShowName] = useState(true);
  const [showWhereToOrder, setShowWhereToOrder] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showSecret, setShowSecret] = useState(true);
  const [showPopularity, setShowPopularity] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  const handleNumberChange = (event) => {
    setSelectedNumber(Number(event.target.value));
  };

  const handleValueChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // Filter tableData based on selectedValue and selectedNumber
  const filteredData = tableData.filter((item) => {
    const meetsNumberCriteria = item.popularity >= selectedNumber;
    const meetsValueCriteria =
      selectedValue === "All" || item.whereToOrder === selectedValue;
    return meetsNumberCriteria && meetsValueCriteria;
  });

  console.log(selectedNumber);

  const handleCheckboxChange = (key, value) => {
    switch (key) {
      case "name":
        setShowName(value);
        break;
      case "whereToOrder":
        setShowWhereToOrder(value);
        break;
      case "description":
        setShowDescription(value);
        break;
      case "secret":
        setShowSecret(value);
        break;
      case "popularity":
        setShowPopularity(value);
        break;
      case "price":
        setShowPrice(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="mt-3 pe-3">
      <strong className="fs-5 ps-5" id="secret-menu">
        Secret Menu Items
      </strong>
      <section className="d-flex gap-5 px-5">
        <article className="mt-2">
          <p>
            Minimum Rating: <strong>{selectedNumber}</strong>
          </p>
          <input
            type="range"
            id="numberRange"
            className="form-range"
            style={{ width: "160px" }}
            min="1"
            max="7"
            value={selectedNumber}
            onChange={handleNumberChange}
            data-test="numberRange-input"
          />
        </article>
        <article>
          <p>Restaurants</p>
          <select
            id="fruit-select"
            className="form-control"
            defaultValue="mango"
            onChange={handleValueChange}
            data-test="restaurants-input"
            style={{ width: "160px" }}
          >
            <option value="All">All</option>
            <option value="Subway">Subway</option>
            <option value="KFC">KFC</option>
            <option value="McDonalds">McDonalds</option>
            <option value="Starbucks">Starbucks</option>
            <option value="Dairy Queen">Dairy Queen</option>
            <option value="Burger King">Burger King</option>
            <option value="Taco Bell">Taco Bell</option>
            <option value="Dominos">Dominos</option>
            <option value="Pizza Hut">Pizza Hut</option>
          </select>
        </article>
        <article>
          <p>Show Columns</p>
          <input
            type="checkbox"
            className="form-check-input"
            id="name-input"
            checked={showName}
            onChange={(e) => handleCheckboxChange("name", e.target.checked)}
          />
          <label className="form-check-label ps-2 pe-3" htmlFor="name">
            Name
          </label>
          <input
            type="checkbox"
            className="form-check-input"
            id="whereToOrder-input"
            checked={showWhereToOrder}
            onChange={(e) =>
              handleCheckboxChange("whereToOrder", e.target.checked)
            }
          />
          <label className="form-check-label ps-2 pe-3" htmlFor="whereToOrder">
            Where To Order
          </label>
          <input
            type="checkbox"
            className="form-check-input"
            id="description-input"
            checked={showDescription}
            onChange={(e) =>
              handleCheckboxChange("description", e.target.checked)
            }
          />
          <label className="form-check-label ps-2 pe-3" htmlFor="description">
            Description
          </label>
          <input
            type="checkbox"
            className="form-check-input"
            id="secret-input"
            checked={showSecret}
            onChange={(e) => handleCheckboxChange("secret", e.target.checked)}
          />
          <label className="form-check-label ps-2 pe-3" htmlFor="secret">
            Secret
          </label>
          <input
            type="checkbox"
            className="form-check-input"
            id="popularity-input"
            checked={showPopularity}
            onChange={(e) =>
              handleCheckboxChange("popularity", e.target.checked)
            }
          />
          <label className="form-check-label ps-2 pe-3" htmlFor="popularity">
            Popularity
          </label>
          <input
            type="checkbox"
            className="form-check-input"
            id="price-input"
            checked={showPrice}
            onChange={(e) => handleCheckboxChange("price", e.target.checked)}
          />
          <label className="form-check-label ps-2 pe-3" htmlFor="price">
            Price
          </label>
        </article>
      </section>

      <table className="table table-striped table-bordered mt-4">
        <thead className="thead-dark">
          <tr>
            {showName && <th id="name-column">Name</th>}
            {showWhereToOrder && (
              <th id="whereToOrder-column">Where To Order</th>
            )}
            {showDescription && <th id="description-column">Description</th>}
            {showSecret && <th id="secret-column">Secret</th>}
            {showPopularity && <th id="popularity-column">Popularity</th>}
            {showPrice && <th id="price-column">Price</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              {showName && <td id="name">{item.name}</td>}
              {showWhereToOrder && (
                <td id="whereToOrder">{item.whereToOrder}</td>
              )}
              {showDescription && <td id="description">{item.description}</td>}
              {showSecret && <td id="secret">{item.secret}</td>}
              {showPopularity && <td id="popularity">{item.popularity}</td>}
              {showPrice && <td id="price">{item.price}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SecretMenu;
