import { NoteProps } from "../types";
import { useCreateNote } from "../hooks";

export const CreateNote = ({ pool, hashtags }: NoteProps) => {
const { noteContent, setNoteContent, publishNote } = useCreateNote(pool, hashtags);


  return (
    <div>
      <h2 className="text-h3 text-white mb-12">What's In Your Mind??</h2>
      <form onSubmit={publishNote}>
        <textarea
          placeholder="Write your note here..."
          className="w-full p-12 rounded"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          rows={6}
        />
        <div className="flex justify-end">
          <button className="bg-violet-500 px-16 py-4 rounded-8 font-bold hover:bg-violet-600 active:scale-90">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
