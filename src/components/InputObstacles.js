import React, { useState } from "react";

function InputObstacles() {
  const [deepThought, setDeepThought] = useState("");
  const [selectedFruit, setSelectedFruit] = useState("mango");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedBeatle, setSelectedBeatle] = useState("John");
  const [selectedColor, setSelectedColor] = useState("#181456");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedNumber, setSelectedNumber] = useState(5);
  const [selectedFile, setSelectedFile] = useState("");

  const handleInputChange = (event) => {
    setDeepThought(event.target.value);
  };
  const handleFruitChange = (event) => {
    setSelectedFruit(event.target.value);
  };
  const handleToppingChange = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      setSelectedToppings((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedToppings((prevSelected) =>
        prevSelected.filter((item) => item !== id)
      );
    }
  };
  const renderSelectedToppings = () => {
    if (selectedToppings.length === 0) {
      return "(None)";
    } else {
      return selectedToppings.join(", ");
    }
  };
  const handleBeatleChange = (event) => {
    setSelectedBeatle(event.target.value);
  };
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleNumberChange = (event) => {
    setSelectedNumber(Number(event.target.value));
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileName = file ? file.name : "No file selected";
    setSelectedFile(fileName);
  };
  return (
    <div className="mt-5 ms-5">
      {/* Input Field */}
      <section className="d-flex gap-3 mb-3">
        <article className="border p-3 border-dark" style={{ width: "40%" }}>
          <label htmlFor="deep-thought">Deep thought</label>
          <input
            type="text"
            className="form-control w-50"
            data-test="deep-thought-field"
            onChange={handleInputChange}
          />
        </article>
        <article
          className="border p-3 border-dark d-flex align-items-center justify-content-center"
          style={{ width: "40%" }}
          data-test="deep-thought-result"
        >
          {deepThought ? deepThought : "(No Value)"}
        </article>
      </section>

      {/* Select Dropdown */}
      <section className="d-flex gap-3 mb-3">
        <article className="border p-3 border-dark" style={{ width: "40%" }}>
          <label htmlFor="fruit-select">Select a fruit</label>
          <select
            id="fruit-select"
            className="form-control w-50"
            defaultValue="mango"
            onChange={handleFruitChange}
            data-test="fruit-select-field"
          >
            <option value="Mango">Mango</option>
            <option value="Banana">Banana</option>
            <option value="Pineapple">Pineapple</option>
            <option value="Pomegranate">Pomegranate</option>
            <option value="Kiwi">Kiwi</option>
            <option value="Blueberry">Blueberry</option>
          </select>
        </article>
        <article
          className="border p-3 border-dark d-flex align-items-center justify-content-center"
          style={{ width: "40%" }}
          data-test="fruit-select-result"
        >
          {selectedFruit}
        </article>
      </section>

      {/* Checkbox Select */}
      <section className="d-flex gap-3 mb-3">
        <article
          className="border p-3 border-dark"
          style={{ width: "40%" }}
          data-test="toppings-section"
        >
          <label htmlFor="toppings">Toppings</label>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="lettuce"
              onChange={handleToppingChange}
            />
            <label className="form-check-label" htmlFor="Lettuce">
              Lettuce
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="tomato"
              onChange={handleToppingChange}
            />
            <label className="form-check-label" htmlFor="Tomato">
              Tomato
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="onion"
              onChange={handleToppingChange}
            />
            <label className="form-check-label" htmlFor="Onion">
              Onion
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="cabbage"
              onChange={handleToppingChange}
            />
            <label className="form-check-label" htmlFor="Cabbage">
              Cabbage
            </label>
          </div>
        </article>
        <article
          className="border p-3 border-dark d-flex align-items-center justify-content-center"
          style={{ width: "40%" }}
          data-test="toppings-result"
        >
          {renderSelectedToppings()}
        </article>
      </section>

      {/* Radio Select */}
      <section className="d-flex gap-3 mb-3">
        <article
          className="border p-3 border-dark"
          style={{ width: "40%" }}
          data-test="favorite-beatles-section"
        >
          <label htmlFor="favorite-beatle">Favorite Beatles</label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="george"
              name="George"
              value="George"
              onChange={handleBeatleChange}
              checked={selectedBeatle === "George"}
            />
            <label className="form-check-label" htmlFor="george">
              George
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="paul"
              name="Paul"
              value="Paul"
              onChange={handleBeatleChange}
              checked={selectedBeatle === "Paul"}
            />
            <label className="form-check-label" htmlFor="paul">
              Paul
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="john"
              name="John"
              value="John"
              defaultChecked
              onChange={handleBeatleChange}
              checked={selectedBeatle === "John"}
            />
            <label className="form-check-label" htmlFor="john">
              John
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="Ringo"
              name="Ringo"
              value="Ringo"
              defaultChecked
              onChange={handleBeatleChange}
              checked={selectedBeatle === "Ringo"}
            />
            <label className="form-check-label" htmlFor="ringo">
              John
            </label>
          </div>
        </article>
        <article
          className="border p-3 border-dark d-flex align-items-center justify-content-center"
          style={{ width: "40%" }}
          data-test="favorite-beatles-result"
        >
          {selectedBeatle}
        </article>
      </section>

      {/* Color Select */}
      <section className="d-flex gap-3 mb-3">
        <article
          className="border p-3 border-dark"
          style={{ width: "40%" }}
          data-test="favorite-color-section "
        >
          <label htmlFor="favoriteColor">Favorite color</label>
          <input
            type="color"
            id="favoriteColor"
            name="favoriteColor"
            className="form-control form-control-color mt-2 w-50"
            value={selectedColor}
            onChange={handleColorChange}
          />
        </article>
        <article
          className="border p-3 border-dark d-flex align-items-center justify-content-center"
          style={{ width: "40%" }}
          data-test="favorite-color-result"
        >
          {selectedColor}
        </article>
      </section>

      {/* Date Picker */}
      <section className="d-flex gap-3 mb-3">
        <article
          className="border p-3 border-dark"
          style={{ width: "40%" }}
          data-test="datePicker-section"
        >
          <label htmlFor="datePicker">Select Date</label>
          <input
            type="date"
            id="datePicker"
            className="form-control mt-2 w-50"
            defaultValue={new Date().toISOString().split("T")[0]}
            onChange={handleDateChange}
          />
        </article>
        <article
          className="border p-3 border-dark d-flex align-items-center justify-content-center"
          style={{ width: "40%" }}
          data-test="datePicker-result"
        >
          {selectedDate}
        </article>
      </section>

      {/* Number Range */}
      <section className="d-flex gap-3 mb-3">
        <article
          className="border p-3 border-dark d-flex flex-column"
          style={{ width: "40%" }}
          data-test="numberRange-section"
        >
          <label htmlFor="numberRange">Number (1 to 10)</label>
          <input
            type="range"
            id="numberRange"
            className="form-range mt-2 w-50"
            min="1"
            max="10"
            value={selectedNumber}
            onChange={handleNumberChange}
          />
        </article>
        <article
          className="border p-3 border-dark d-flex align-items-center justify-content-center"
          style={{ width: "40%" }}
          data-test="numberRange-result"
        >
          {selectedNumber}
        </article>
      </section>

      {/* Choose FIle */}
      <section className="d-flex gap-3 mb-3">
        <article
          className="border p-3 border-dark"
          style={{ width: "40%" }}
          data-test="fileInput-section"
        >
          <label htmlFor="fileInput">Choose a file</label>
          <input
            type="file"
            id="fileInput"
            className="form-control mt-2 w-75"
            onChange={handleFileChange}
          />
        </article>
        <article
          className="border p-3 border-dark d-flex align-items-center justify-content-center"
          style={{ width: "40%" }}
          data-test="fileInput-result"
        >
          {selectedFile ? selectedFile : "No file selected"}
        </article>
      </section>
    </div>
  );
}

export default InputObstacles;
