import { Box } from "@mui/material";
import { CreateNote } from "./Components/CreateNote";
import { HashtagsFilter } from "./Components/HashtagsFilter";
import { NotesList } from "./Components/NotesList";
import { useGetPool } from "./hooks/useGetPool";

export const App = () => {
  const { pool, hashtags, setHashtags, metadata, events } = useGetPool();

  if (!pool) return null;

  return (
    <Box
      sx={{
        height: '100%',
        width: 400,
        m: 'auto'
      }}
    >
      <h1 className="text-h1">Nostr Feed</h1>
      <CreateNote pool={pool} hashtags={hashtags} />
      <HashtagsFilter hashtags={hashtags} onChange={setHashtags} />
      <NotesList metadata={metadata} notes={events} />
    </Box>
  );
};
