import { jest } from "@jest/globals";

const add = (num, num2) => num + num2;

test("add takes two numbers and return a sum", () => {
  expect(add(1, 2)).toBe(3);
});

jest.unstable_mockModule("../src/db.js", () => ({
  insert: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../src/db.js");
const { createNote, getAllNotes, removeNote, findNote, removeAllNotes } =
  await import("../src/notes.js");

beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

describe("CLI App", () => {
  test("createNote inserts data and returns it", async () => {
    const note = "Clean my room";
    const tags = ["Serious", "Work"];
    const data = {
      tags,
      content: note,
      id: Date.now(),
    };
    insertDB.mockResolvedValue(data);

    const result = await createNote(note, tags);
    expect(result.content).toEqual(note);
    expect(result.tags).toEqual(tags);
  });

  test("getAllNotes returns all notes", async () => {
    const db = {
      notes: [
        {
          tags: ["Laptop", "Charger"],
          content: "Do my work",
          id: 1,
        },
        {
          tags: ["Food", "Fun"],
          content: "Walk my dog",
          id: 1,
        },
        {
          tags: ["Kitchen", "resources"],
          content: "Cook my food",
          id: 1,
        },
      ],
    };
    getDB.mockResolvedValue(db);

    const result = await getAllNotes();
    expect(result).toEqual(db.notes);
  });

  test("removeNote does nothing if id is not found", async () => {
    const notes = [
      { id: 1, content: "note 1", tags: ["tag 1", "tag 2"] },
      { id: 2, content: "note 2", tags: ["tag 3", "tag 4", "tag 5"] },
      { id: 3, content: "note 3", tags: ["tag 6"] },
    ];
    saveDB.mockResolvedValue(notes);

    let idToRemove = 4;
    let result = await removeNote(idToRemove);
    expect(result).toBeUndefined();
    idToRemove = 1;
    result = await removeNote(idToRemove);
    expect(result).toEqual(notes[0].id);
  });

  test("findNote finds the matched note and returns it", async () => {
    const notes = [
      {
        tags: ["Milk", "Sugar"],
        content: "Give a glass of milk",
        id: 1,
      },
      {
        tags: ["Sneakers", "KitKat"],
        content: "Get me a chocolate",
        id: 2,
      },
    ];
    saveDB.mockResolvedValue(notes);

    const result = await findNote("get");
    // expect(result[0].content).toBe("Get me a chocolate");
    expect(result).toEqual([notes[1]]);
  });

  test("removeAllNotes remove notes from the database", async () => {
    const notes = [
      {
        tags: ["Beans", "Cup"],
        content: "Make me Coffee",
        id: 1,
      },
    ];
    saveDB.mockResolvedValue(notes);

    const result = await removeAllNotes();
    expect(result.notes).toEqual([]);
  });
});
