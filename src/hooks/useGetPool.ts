import { SimplePool, type Event } from "nostr-tools";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { insertEventIntoDescendingList } from "../utils";
import { RELAYS } from "../consts";
import type { Metadata } from "../types";

export const useGetPool = () => {
  const [pool, setPool] = useState<SimplePool | null>(null);
  const [eventsImmediate, setEvents] = useState<Event[]>([]);
  const [events] = useDebounce(eventsImmediate, 1500);
  const [metadata, setMetadata] = useState<Record<string, Metadata>>({});
  const metadataFetched = useRef<Record<string, boolean>>({});
  const [hashtags, setHashtags] = useState<string[]>([]);

  // setup a relays pool

  useEffect(() => {
    const _pool = new SimplePool();
    setPool(_pool);

    return () => {
      _pool.close(RELAYS);
    };
  }, []);

  // subscribe to some events
  useEffect(() => {
    if (!pool) return;

    setEvents([]);
    const sub = pool.sub(RELAYS, [
      {
        kinds: [1],
        limit: 100,
        "#t": hashtags,
      },
    ]);

    sub.on("event", (event: Event) => {
      setEvents((events) => insertEventIntoDescendingList(events, event));
    });

    return () => {
      sub.unsub();
    };
  }, [hashtags, pool]);

  useEffect(() => {
    if (!pool) return;

    const pubkeysToFetch = events
      .filter((event) => metadataFetched.current[event.pubkey] !== true)
      .map((event) => event.pubkey);

    pubkeysToFetch.forEach(
      (pubkey) => (metadataFetched.current[pubkey] = true)
    );

    const sub = pool.sub(RELAYS, [
      {
        kinds: [0],
        authors: pubkeysToFetch,
      },
    ]);

    sub.on("event", (event: Event) => {
      const metadata = JSON.parse(event.content) as Metadata;

      setMetadata((cur) => ({
        ...cur,
        [event.pubkey]: metadata,
      }));
    });

    sub.on("eose", () => {
      sub.unsub();
    });

    return () => {};
  }, [events, pool]);

  return { pool, hashtags, setHashtags, metadata, events };
};
