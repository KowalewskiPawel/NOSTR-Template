import { Stack } from "@mui/material";
import { NoteListProps } from "../types";
import { encodePubKey, filterHashtags } from "../utils";
import { NoteCard } from "./NoteCard";

export const NotesList = ({ notes, metadata }: NoteListProps) => {
  return (
    <Stack spacing={2}>
      {notes.map((note) => (
        <NoteCard
          created_at={note.created_at}
          user={{
            name: metadata[note.pubkey]?.name ?? encodePubKey(note.pubkey),
            image:
              metadata[note.pubkey]?.picture ??
              `https://api.dicebear.com/5.x/identicon/svg?seed=${note.pubkey}`,
            pubkey: note.pubkey,
          }}
          key={note.id}
          content={note.content}
          hashtags={filterHashtags(note.tags as unknown as string[])}
        />
      ))}
    </Stack>
  );
};
