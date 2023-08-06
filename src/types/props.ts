import { type SimplePool, type Event } from "nostr-tools";
import { Metadata } from "./metadata";

export type NoteProps = {
  pool: SimplePool;
  hashtags: string[];
};

export type HashtagFilterProps = {
  hashtags: string[];
  onChange: (hashtags: string[]) => void;
};

export type NoteCardProps = {
  content: string;
  user: {
    name: string;
    image: string;
    pubkey: string;
  };
  created_at: number;
  hashtags: string[];
};

export type NoteListProps = {
  notes: Event[];
  metadata: Record<string, Metadata>;
};
