import { createMap } from "../database";

async function onFormSubmit(e) {
  // Stop form defaults
  e.preventDefault();
  e.stopPropagation();

  // Extract values from the form
  const mapName: string = e.target.name.value;
  const image: Blob = e.target.file.files[0];

  // Create the brawler
  createMap(mapName, image);
}

function AddMap() {
  return (
    <form onSubmit={onFormSubmit}>
      <input type="text" id="name" name="name" />
      <input type="file" id="file" name="file" />
      <input type="submit" />
    </form>
  );
}
export default AddMap;
