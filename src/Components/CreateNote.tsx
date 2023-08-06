import { NoteProps } from "../types";
import { useCreateNote } from "../hooks";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Button, Stack } from "@mui/material";
import { FormControl } from "@mui/material";

export const CreateNote = ({ pool, hashtags }: NoteProps) => {
  const { noteContent, setNoteContent, publishNote } = useCreateNote(
    pool,
    hashtags
  );

  return (
    <Stack>
      <h2>Publish Note</h2>
      <FormControl>
        <TextareaAutosize
          placeholder="Write your note here..."
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
        <Button sx={{ m: 2 }} variant="outlined" onClick={publishNote}>
          Publish
        </Button>
      </FormControl>
    </Stack>
  );
};
