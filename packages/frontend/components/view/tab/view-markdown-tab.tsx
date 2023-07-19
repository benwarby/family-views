import { MarkdownTabInfoType } from "@family-views/common";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ViewMarkdownTab({ tab }: { tab: MarkdownTabInfoType }) {
  const [content, setContent] = useState<JSX.Element>(<>Loading.</>);

  useEffect(() => {
    console.log("Content updated");
    setContent(<ReactMarkdown>{tab.markdownContent}</ReactMarkdown>);
  }, [tab, tab.markdownContent]);

  return <>{content}</>;
}
