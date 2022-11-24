import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { lowlight } from "lowlight/lib/core";
import "./style.scss";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

const SingleViewEditor = (props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "justify",
      }),
      Link.configure({
        openOnClick: false,
        protocols: ["http", "https", "mailto", "tel", "ftp"],
        autolink: false,
        linkOnPaste: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: `${props.content}`,
    editable: false,
  });

  return (
    <div className="single-view">
      <EditorContent editor={editor} {...props} />
    </div>
  );
};

export default SingleViewEditor;
