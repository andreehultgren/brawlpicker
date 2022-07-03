import { useEffect, useRef, useState } from "react";
import { createBrawler } from "../database";
import classnames from "classnames";
import styles from "../styles/Forms.module.css";

async function onFormSubmit(e) {
  // Stop form defaults
  e.preventDefault();
  e.stopPropagation();

  // Extract values from the form
  const brawlerName: string = e.target.name.value;
  const image: Blob = e.target.file.files[0];

  // Create the brawler
  createBrawler(brawlerName, image);
  e.target.reset();
}

function AddBrawler() {
  const [dropping, setDropping] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();

  function addDroppedFileToInput(e) {
    e.preventDefault();
    e.stopPropagation();
    setDropping(false);
    const items = e.dataTransfer.items;
    if (items.length === 1) {
      fileRef.current.files = e.dataTransfer.files;
      const fileName = e.dataTransfer.files[0].name;
      const brawlerName = fileName.split(".")[0];
      nameRef.current.value = brawlerName;
    }
  }

  return (
    <form
      className={classnames(
        styles.dropZone,
        dropping ? styles.dropping : undefined
      )}
      onSubmit={onFormSubmit}
      onDrop={addDroppedFileToInput}
      onDragEnter={() => setDropping(true)}
      onDragLeave={() => setDropping(false)}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {dropping && (
        <div className={styles.overlay}>
          <h2>Drop files here</h2>
        </div>
      )}

      <label style={{ zIndex: 3 }}>Name</label>
      <br></br>
      <input
        ref={nameRef}
        type="text"
        id="name"
        name="name"
        style={{ zIndex: 3 }}
      />
      <br></br>
      <br></br>
      <label style={{ zIndex: 3 }}>Image</label>
      <br></br>
      <input
        ref={fileRef}
        type="file"
        id="file"
        name="file"
        height={300}
        width={500}
        style={{ zIndex: 3 }}
      />

      <br></br>
      <br></br>
      <input type="submit" />
    </form>
  );
}
export default AddBrawler;
