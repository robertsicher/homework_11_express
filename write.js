//VAriable
const fs = require("fs").promises;
const newNotes = [];
let id = 0;
const deleteArr = [];
let sortingArr = [];

//Delete function
async function searchDelete(obj) {
  const notes = await read();
  deleteArr.push(...notes);
  deleteArr.splice(
    deleteArr.findIndex(({
      id
    }) => id == obj.id),
    1
  );
  let filt = deleteArr.filter(
    (v, i, a) =>
    a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
  );
  fs.writeFile("./db/db.json", JSON.stringify(filt), function (err) {
    if (err) console.log(err);
    console.log("Your note was deleted");
  });
  deleteArr.length = 0;
}


//note function
async function note(body) {
  id += Math.floor(Math.random() * 100 + 1);
  body.id = id;
  const notes = await read();
  sortingArr.push(...notes);
  sortingArr.push(body);
  let filt = sortingArr.filter(
    (v, i, a) =>
    a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
  );
  fs.writeFile("./db/db.json", JSON.stringify(filt), function (err) {
    if (err) console.log(err);
    console.log("Your note was saved");
  });
  sortingArr.length = 0;
}

//read function
async function read() {
  const notesBuffer = await fs.readFile("./db/db.json");
  const notes = await JSON.parse(notesBuffer);
  return notes;
}

module.exports = {
  searchDelete,
  newNotes,
  note,
  read,
};