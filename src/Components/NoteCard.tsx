import { Avatar, Box, Stack } from "@mui/material";
import { NoteCardProps } from "../types";
import { formatDate } from "../utils";

export const NoteCard = ({
  content,
  user,
  created_at,
  hashtags,
}: NoteCardProps) => {
  return (
    <Box sx={{ background: "#556cd6", p: 2, borderRadius: 10}}>
      <Stack>
        <Avatar alt="note" src={user.image} />
        <Stack>
          <a
            href={`https://nostr.guru/p/${user.pubkey}`}
            target="_blank"
            rel="noreferrer"
          >
            {user.name}
          </a>
          <p>{formatDate(created_at)}</p>
        </Stack>
      </Stack>
      <p>{content}</p>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {hashtags
          .filter((t) => hashtags.indexOf(t) === hashtags.lastIndexOf(t))
          .map((hashtag, index) => (
            <Box key={`${hashtag}-${index}`}>#{hashtag}</Box>
          ))}
      </Stack>
    </Box>
  );
};
