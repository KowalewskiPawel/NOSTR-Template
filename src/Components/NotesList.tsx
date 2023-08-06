import { type Event, nip19 } from "nostr-tools";
import { Metadata } from "../App";
import { NoteCard } from "./NoteCard";

type NoteListProps = {
  notes: Event[];
  metadata: Record<string, Metadata>;
}

export const NotesList = ({ notes, metadata }: NoteListProps) => {
  return (
    <div className="flex flex-col gap-16">
      {notes.map((note) => (
        <NoteCard
          created_at={note.created_at}
          user={{
            name:
              metadata[note.pubkey]?.name ??
              `${nip19.npubEncode(note.pubkey).slice(0, 12)}...`,
            image:
              metadata[note.pubkey]?.picture ??
              `https://api.dicebear.com/5.x/identicon/svg?seed=${note.pubkey}`,
            pubkey: note.pubkey,
          }}
          key={note.id}
          content={note.content}
          hashtags={note.tags.filter((t) => t[0] === "t").map((t) => t[1])}
        />
      ))}
    </div>
  );
}
