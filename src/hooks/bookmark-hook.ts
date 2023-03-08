import { TPokemon } from "@/types/pokemon";
import { useCallback, useEffect, useState } from "react";

const BOOKMARK_LOCAL_ID = "BOOKMARK";

export function useBookmark() {
  const [bookmarks, setBookmarks] = useState<Map<string, TPokemon>>(new Map());

  const loadData = useCallback(() => {
    const localBookmarks = localStorage.getItem(BOOKMARK_LOCAL_ID);
    if (!localBookmarks) return;
    const data = localBookmarks as unknown as TPokemon[];

    setBookmarks((curr) => {
      const newBookmarks = new Map<string, TPokemon>();
      data.forEach((e) => {
        newBookmarks.set(e.id + "", e);
      });
      return new Map(newBookmarks);
    });
  }, []);

  const addBookmark = useCallback(
    ({ newPokemon }: { newPokemon: TPokemon }) => {
      setBookmarks((curr) => {
        const newBookmarks = curr.set(newPokemon.id + "", newPokemon);
        return new Map(newBookmarks);
      });
    },
    []
  );

  const removeBookmark = useCallback((pokemonId: string) => {
    setBookmarks((curr) => {
      curr.delete(pokemonId);
      return new Map(curr);
    });
  }, []);

  useEffect(() => {
    loadData();
    return () => {};
  }, []);

  useEffect(() => {
    localStorage.setItem(BOOKMARK_LOCAL_ID, JSON.stringify(bookmarks));
    return () => {};
  }, [bookmarks]);

  return { bookmarks, addBookmark, removeBookmark };
}
