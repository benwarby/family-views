import Header from "./header";
import Footer from "./footer";
import type { ReactElement, ReactNode } from "react";
import { FnGetLayout } from "../pages/_app";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export const RootLayoutFn: FnGetLayout = (page: ReactElement) => {
  return (
    <>
      <RootLayout>{page}</RootLayout>
    </>
  );
};
