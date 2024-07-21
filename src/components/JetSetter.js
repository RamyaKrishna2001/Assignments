import React, { useEffect, useState } from "react";
import { itemsList } from "../constants";

function JetSetter() {
  const [inputValue, setInputValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [unpackedItems, setUnpackedItems] = useState([]);
  const [packedItems, setPackedItems] = useState([]);

  useEffect(() => {
    const packedItems = itemsList.filter((item) => item.packed);
    const unpackedItems = itemsList.filter((item) => !item.packed);

    setPackedItems(packedItems);
    setUnpackedItems(unpackedItems);
  }, []);

  // Function to handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to handle filter change
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredUnpackedItems = unpackedItems.filter((item) =>
    item.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const filteredPackedItems = packedItems.filter((item) =>
    item.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  // Function to handle button click to add new item
  const handleAddItemClick = () => {
    if (inputValue.trim() !== "") {
      const newItem = {
        id: Math.floor(Math.random() * 10000), // Generate a random id
        name: inputValue.trim(),
        packed: false,
      };
      setUnpackedItems([...unpackedItems, newItem]);
      setInputValue("");
    }
  };

  // Function to handle checkbox toggle for items
  const handleToggleItem = (itemId, packed) => {
    if (packed) {
      const updatedPackedItems = packedItems.map((item) => {
        if (item.id === itemId) {
          item.packed = !item.packed;
        }
        return item;
      });
      const uncheckedItem = updatedPackedItems.find(
        (item) => item.id === itemId
      );
      if (!uncheckedItem.packed) {
        setUnpackedItems([...unpackedItems, uncheckedItem]);
      }
      setPackedItems(updatedPackedItems.filter((item) => item.packed));
    } else {
      const updatedUnpackedItems = unpackedItems.map((item) => {
        if (item.id === itemId) {
          item.packed = !item.packed;
        }
        return item;
      });
      const checkedItem = updatedUnpackedItems.find(
        (item) => item.id === itemId
      );
      if (checkedItem.packed) {
        setPackedItems([...packedItems, checkedItem]);
      }
      setUnpackedItems(updatedUnpackedItems.filter((item) => !item.packed));
    }
  };

  // Function to handle button click to remove an item
  const handleRemoveItem = (itemId, listType) => {
    if (listType === "packed") {
      setPackedItems(packedItems.filter((item) => item.id !== itemId));
    } else {
      setUnpackedItems(unpackedItems.filter((item) => item.id !== itemId));
    }
  };

  // Function to handle button click to mark all items as unpacked
  const handleMarkAllUnpacked = () => {
    const updatedPackedItems = packedItems.map((item) => ({
      ...item,
      packed: false,
    }));
    setUnpackedItems([...unpackedItems, ...updatedPackedItems]);
    setPackedItems([]);
  };

  // Function to handle button click to remove all items
  const handleRemoveAll = () => {
    setUnpackedItems([]);
    setPackedItems([]);
  };

  return (
    <div className="ms-5 mt-5">
      {/* Input field for adding items */}
      <div className="mb-4">
        <label className="pe-2 fs-3">Item</label>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="New item"
          data-test="add-item-input"
          className="w-50 py-3 px-2"
        />
        <button
          onClick={handleAddItemClick}
          data-test="add-item-button"
          className={`px-5 py-3 bg-secondary text-white ${
            !inputValue.trim() ? "opacity-50" : ""
          }`}
          disabled={!inputValue.trim()}
        >
          Add Item
        </button>
      </div>
      {/* Filter input field */}
      <div>
        <label className="pe-2 fs-3">Filter</label>
        <input
          type="text"
          value={filterValue}
          onChange={handleFilterChange}
          placeholder="Filter items"
          data-test="filter-input"
          className="w-50 py-3 px-2"
        />
      </div>
      <div className="d-flex gap-5" data-test="all-items">
        {/* Unpacked items */}
        <div className="mt-5 me-5" data-test="unpacked-items-section">
          <h3>Unpacked Items</h3>
          {filteredUnpackedItems?.length > 0 ? (
            <>
              {filteredUnpackedItems.map((item, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <input
                    type="checkbox"
                    checked={item.packed}
                    onChange={() => handleToggleItem(item.id, false)}
                    className="me-2"
                  />
                  <span>{item.name}</span>
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => handleRemoveItem(item.id, "unpacked")}
                    data-test="remove"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </>
          ) : (
            <div data-test="no-unpacked-items-message">
              <p>No items to display.</p>
            </div>
          )}
        </div>
        {/* Packed items */}
        <div className="mt-5 ms-5" data-test="packed-items-section">
          <h3>Packed Items</h3>
          {filteredPackedItems?.length > 0 ? (
            <>
              {filteredPackedItems.map((item, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <input
                    type="checkbox"
                    checked={item.packed}
                    onChange={() => handleToggleItem(item.id, true)}
                    className="me-2"
                  />
                  <span>{item.name}</span>
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => handleRemoveItem(item.id, "packed")}
                    data-test="remove"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </>
          ) : (
            <div data-test="no-packed-items-message">
              <p>No items to display.</p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-5">
        <button
          className="btn btn-primary me-3"
          onClick={handleMarkAllUnpacked}
          data-test="mark-all-as-unpacked"
        >
          Mark all as unpacked
        </button>
        <button
          className="btn btn-danger"
          onClick={handleRemoveAll}
          data-test="remove-all"
        >
          Remove All
        </button>
      </div>
    </div>
  );
}

export default JetSetter;
