import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { HashtagFilterProps } from "../types";

export const HashtagsFilter = ({ hashtags, onChange }: HashtagFilterProps) => {
  const [hashtag, setHashtag] = useState("");

  const addHashtag = () => {
    if (hashtags.includes(hashtag)) {
      setHashtag("");
      return;
    }
    onChange([...hashtags, hashtag.toLowerCase()]);
    setHashtag("");
  };

  const removeHashtag = (hashtag: string) => {
    onChange(hashtags.filter((h) => h !== hashtag));
  };

  return (
    <Stack>
      <h3>Filter Content by Hashtags</h3>
      <TextField
        type="text"
        placeholder="Write a hashtag"
        value={hashtag}
        onChange={(e) => setHashtag(e.target.value)}
        variant="outlined"
        size="small"
      />
      <Button sx={{ m: 2 }} variant="outlined" onClick={addHashtag}>
        + Add
      </Button>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {hashtags.map((hashtag, index) => (
          <Box key={`${hashtag}-${index}`}>
            {hashtag}{" "}
            <Button
              sx={{ m: 2 }}
              variant="outlined"
              onClick={() => removeHashtag(hashtag)}
            >
              X
            </Button>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};
