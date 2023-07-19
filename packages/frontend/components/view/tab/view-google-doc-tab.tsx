import { GoogleDocTabInfoType } from "@family-views/common";

export default function ViewGoogleDocTab({
  tab,
}: {
  tab: GoogleDocTabInfoType;
}) {
  return <>Google Doc: {tab.documentUrl}</>;
}
