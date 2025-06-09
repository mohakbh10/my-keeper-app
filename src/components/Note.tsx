import DeleteIcon from "@mui/icons-material/Delete";
import type { JSX } from "react";

interface NoteProps {
  title: string;
  content: string;
  id: number;
  onDelete: (id: number) => void;
}

function Note(props: NoteProps): JSX.Element {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button type="button" title="DeleteIcon" onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
