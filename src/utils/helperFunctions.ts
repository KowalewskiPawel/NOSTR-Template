import { type Event, nip19 } from "nostr-tools";

export const insertEventIntoDescendingList = <T extends Event>(
  sortedArray: T[],
  event: T
) => {
  let start = 0;
  let end = sortedArray.length - 1;
  let midPoint;
  let position = start;

  if (end < 0) {
    position = 0;
  } else if (event.created_at < sortedArray[end].created_at) {
    position = end + 1;
  } else if (event.created_at >= sortedArray[start].created_at) {
    position = start;
  } else
    while (true) {
      if (end <= start + 1) {
        position = end;
        break;
      }
      midPoint = Math.floor(start + (end - start) / 2);
      if (sortedArray[midPoint].created_at > event.created_at) {
        start = midPoint;
      } else if (sortedArray[midPoint].created_at < event.created_at) {
        end = midPoint;
      } else {
        // aMidPoint === num
        position = midPoint;
        break;
      }
    }

  // insert when num is NOT already in (no duplicates)
  if (sortedArray[position]?.id !== event.id) {
    return [
      ...sortedArray.slice(0, position),
      event,
      ...sortedArray.slice(position),
    ];
  }

  return sortedArray;
}

export const formatDate = (created_at: number) => new Date(created_at * 1000).toISOString().split("T")[0];

export const encodePubKey = (pubkey: string) => `${nip19.npubEncode(pubkey).slice(0, 12)}...`;

export const filterHashtags = (tags: string[]) => tags.filter((tag: string) => tag[0] === "t").map((tag: string) => tag[1]);