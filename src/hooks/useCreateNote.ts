import { useState } from "react";
import { type EventTemplate, type Event, type SimplePool, getEventHash, } from "nostr-tools";
import { RELAYS } from "../consts";

export const useCreateNote = (pool: SimplePool,
    hashtags: string[]) => {
    const [noteContent, setNoteContent] = useState("");

    const publishNote = async () => {
  
      if (!window.nostr) {
        alert("Nostr extension not found");
        return;
      }
      // Construct the event object
      const _baseEvent = {
        content: noteContent,
        created_at: Math.round(Date.now() / 1000),
        kind: 1,
        tags: [...hashtags.map((hashtag) => ["t", hashtag])],
      } as EventTemplate;
  
      // Sign this event (allow the user to sign it with their private key)
      // // check if the user has a nostr extension
      try {
        const pubkey = await window.nostr.getPublicKey();
  
        const sig = await (await window.nostr.signEvent(_baseEvent)).sig;
  
        const event: Event = {
          ..._baseEvent,
          sig,
          pubkey,
          id: getEventHash({ ..._baseEvent, pubkey }),
        };
  
        const pubs = pool.publish(RELAYS, event);
  
        let clearedInput = false;
  
        pubs.on("ok", () => {
          if (clearedInput) return;
  
          clearedInput = true;
          setNoteContent("");
        });
      } catch (error) {
        alert("User rejected operation");
      }
    };

    return { noteContent, setNoteContent, publishNote };
}