import { useSession } from "next-auth/react";
import RootLayout from "../components/layout";

export default function MePage() {
  const { data } = useSession();

  return (
    <RootLayout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </RootLayout>
  );
}
