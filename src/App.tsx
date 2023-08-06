import { useEffect, useState } from "react";
import { SimplePool, Event } from "nostr-tools";
import "./App.css";

const RELAYS = [
  "wss://nostr-pub.wellorder.net",
  "wss://nostr.drss.io",
  "wss://nostr.swiss-enigma.ch",
  "wss://relay.damus.io",
];

function App() {
  const [pool, setPool] = useState<SimplePool | null>(null);

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

    const sub = pool.sub(RELAYS, [
      {
        kinds: [1],
        limit: 10,
      },
    ]);

    sub.on("event", (event: Event) => {
      console.log(event);
    });

    return () => {
      sub.unsub();
    };
  }, [pool]);

  return (
    <>
      App
    </>
  );
}

export default App;
