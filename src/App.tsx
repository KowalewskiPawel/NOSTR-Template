import "./App.css";
import { CreateNote } from "./Components/CreateNote";
import { HashtagsFilter } from "./Components/HashtagsFilter";
import { NotesList } from "./Components/NotesList";
import { useGetPool } from "./hooks/useGetPool";

export const App = () => {
  const { pool, hashtags, setHashtags, metadata, events } = useGetPool();

  if (!pool) return null;

  return (
    <div className="app">
      <div className="flex flex-col gap-16">
        <h1 className="text-h1">Nostr Feed</h1>
        <CreateNote pool={pool} hashtags={hashtags} />
        <HashtagsFilter hashtags={hashtags} onChange={setHashtags} />
        <NotesList metadata={metadata} notes={events} />
      </div>
    </div>
  );
};
