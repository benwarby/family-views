import {  ReactNode } from "react";
import AdminLinkBar from "../../components/admin/admin-link-bar";
import { FnGetLayout } from "../../pages/_app";
import RootLayout from "../layout";

function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminLinkBar></AdminLinkBar>
      {children}
    </>
  );
}

export const AdminLayoutFn: FnGetLayout = (page) => {
  return (
    <>
      <RootLayout>
        <AdminLayout>{page}</AdminLayout>
      </RootLayout>
    </>
  );
};
