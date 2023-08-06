import React, { useState } from "react";
import { HashtagFilterProps } from "../types";

export const HashtagsFilter = ({ hashtags, onChange }: HashtagFilterProps) => {
  const [hashtag, setHashtag] = useState("");

  const addHashtag = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onChange([...hashtags, hashtag.toLowerCase()]);
    setHashtag("");
  };

  const removeHashtag = (hashtag: string) => {
    onChange(hashtags.filter((h) => h !== hashtag));
  };

  return (
    <div className="flex flex-col gap-12">
      <h3 className="text-h3 text-white">Filtering hashtags</h3>
      <form onSubmit={addHashtag} className="flex gap-16">
        <input
          type="text"
          className="grow p-16 rounded"
          placeholder="Write a hashtag"
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value)}
        />
        <button
          className="bg-gray-500 px-16 py-4 rounded-8 font-bold hover:bg-gray-600 active:scale-90"
          type="submit"
        >
          + Add
        </button>
      </form>
      <ul className="flex flex-wrap gap-8">
        {hashtags.map((hashtag) => (
          <li
            className="bg-gray-300 text-body5 text-gray-900 font-medium rounded-24 px-12 py-4"
            key={hashtag}
          >
            {hashtag}{" "}
            <button className="ml-8" onClick={() => removeHashtag(hashtag)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
