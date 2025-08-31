// Editor.js
import React from "react";
import {
  Editor,
  EditorProvider,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
  BtnClearFormatting,
  BtnUndo,
  BtnRedo,
} from "react-simple-wysiwyg";

export default function RichTextEditor({ value, onChange }) {
  // Custom Code Button function
  const insertCodeBlock = () => {
    document.execCommand("formatBlock", false, "pre");
  };

  return (
    <EditorProvider>
      <Editor
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="shadow-sm rounded-3 bg-white"
        style={{
          minHeight: "250px",
          padding: "12px",
          fontSize: "15px",
          lineHeight: "1.6",
        }}
      >
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <BtnNumberedList />
          <BtnBulletList />
          <BtnLink />
          <BtnClearFormatting />
          <BtnUndo />
          <BtnRedo />

          {/* ✅ Custom Code Button */}
          <button
            type="button"
            onClick={insertCodeBlock}
            title="Code Block"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontWeight: "bold",
              marginLeft: "8px",
            }}
          >
            {"</>"}
          </button>
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}
