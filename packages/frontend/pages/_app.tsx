import { SessionProvider } from "next-auth/react";
import "./styles.css";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { RootLayoutFn } from "../components/layout";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

export type FnGetLayout = (page: ReactElement) => ReactNode;

export type FamilyViewsPage<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: FnGetLayout;
};

type FamilyViewsAppProps = AppProps & {
  Component: FamilyViewsPage;
  session: Session;
};

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: FamilyViewsAppProps) {
  // const getLayout = Component.getLayout ?? ((page) => page)
  const getLayout = Component.getLayout ?? RootLayoutFn;
  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
      {/* <Layout>
        <Component {...pageProps} />
      </Layout> */}
    </SessionProvider>
  );
}
