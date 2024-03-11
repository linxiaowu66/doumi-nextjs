"use client";
import { setContent } from "@/lib/features/admin/adminSlice";
import { setArticle } from "@/lib/features/editor/editorSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const Textarea = () => {
  const article = useAppSelector((state) => state.editor.article);
  const dispatch = useAppDispatch();
  return (
    <textarea
      spellCheck="true"
      value={article.content}
      className="markdown-realtext"
      onChange={(e) => {
        dispatch(
          setArticle({ article: { ...article, content: e.target.value } })
        );
        dispatch(setContent({ articleContent: e.target.value }));
      }}
    />
  );
};

export default Textarea;
