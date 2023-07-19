import { MarkdownTabInfoType, TabInfoType } from "@family-views/common";
import styles from "./edit-markdown-tab.module.css";
import { useEffect, useState } from "react";
// import MarkdownPreview from '@uiw/react-markdown-preview';
// import MarkdownEditor from "@uiw/react-markdown-editor";
import dynamic from "next/dynamic";
// import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import "@uiw/react-md-editor/markdown-editor.css";
import { ActionType, TabDispatch } from "./tab-editor";
import { MarkdownEditor } from "./markdown-editor";


// const MarkdownEditor = dynamic(
//     () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
//     { ssr: false }
//   );
const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
  );

export default function EditMarkdownTab({
  tab,
  tabDispatch,
}: {
  tab: MarkdownTabInfoType;
  tabDispatch: TabDispatch;
}) {
    // const [markdown, setMarkdown] = useState('');
    // const markdown = tab.markdownContent;
    const [markdown, setMarkdown] = useState(tab.markdownContent);

    // useEffect(() => {
    //     setMarkdown(tab.markdownContent)
    // })

//   const MarkdownPreview = dynamic(
//     () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
//     { ssr: false }
//   );

  const updateMarkdown = (value: string) => {
    console.log(`Setting markdown ${value}`);
    tabDispatch({
      action: ActionType.UPDATE,
      fieldName: "markdownContent",
      value: value,
    });
    setMarkdown(value)
  };

  return (
    <>
      Editing Markdown Tab
      <label>
          <p>Markdown Content:</p>

          {/* <MarkdownEditor
            className={styles.textinput}
            value={markdown}
            onChange={(value, viewUpdate) => {
                updateMarkdown(value)
            }}
            visible={true}
          /> */}
          <MDEditor value={markdown} onChange={(value) => {
                if (value) {
                    updateMarkdown(value)
                }
            }} />
          {/* <MarkdownPreview source={tab.markdownContent}></MarkdownPreview> */}
        </label>
    </>
  );
}
