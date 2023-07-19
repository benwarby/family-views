import {
  DeleteTabAPIEndpoint,
  GetAllTabsAPIEndpoint,
  TabInfoType,
} from "@family-views/common";
import { useSession } from "next-auth/react";
import { MouseEventHandler, useEffect, useState } from "react";
import styles from "./index.module.css";
import * as either from "fp-ts/Either";
import { AdminLayoutFn } from "../../../components/admin/admin-layout";
import Link from "next/link";
import { callApiEndpoint } from "../../../data-access/api-access";

export default function TabsAdmin() {
  const [tabsInfo, setTabsInfo] = useState<TabInfoType[]>();
  const { data: session } = useSession();
  const [tabElements, setTabElements] = useState<JSX.Element[]>([
    <>Loading...</>,
  ]);

  const updateTabsInfo = async () => {
    callApiEndpoint(GetAllTabsAPIEndpoint, {
      body: {},
    }).then((result) => {
      const body = result.body;

      if (either.isLeft(body)) {
        console.log(`Error ${body.left}`);
      } else {
        let info: TabInfoType[] = body.right;
        setTabsInfo(info);
      }
    });
  };

  useEffect(() => {
    updateTabsInfo();
  }, [session]);

  const deleteTab: MouseEventHandler<HTMLSpanElement> = (e) => {
    console.log(e.currentTarget.dataset.tabId);
    if (!e.currentTarget.dataset.tabId) {
      return;
    }
    callApiEndpoint(DeleteTabAPIEndpoint, {
      tabId: e.currentTarget.dataset.tabId,
    }).then((result) => {
      const body = result.body;

      if (either.isLeft(body)) {
        console.log(`Error ${body.left}`);
      } else {
        // let info: TabInfoType[] = body.right;
        // setTabsInfo(info);
        updateTabsInfo();
      }
    });
  };

  useEffect(() => {
    if (!tabsInfo) {
      return;
    }
    let tabElements: JSX.Element[] = [];
    console.log(tabsInfo);
    tabsInfo.forEach((tabInfo) => {
      const href: string = `/admin/tab/edit/${tabInfo.tabInfoId}`;
      tabElements.push(
        <>
          <li className={styles.tabItem} key={`tab_${tabInfo.tabInfoId}`}>
            {tabInfo.name} - {tabInfo.tagType}
            <Link href={href}>Edit</Link>
            <span onClick={deleteTab} data-tab-id={tabInfo.tabInfoId}>
              Delete
            </span>
          </li>
        </>
      );
    });
    setTabElements(tabElements);
  }, [tabsInfo]);

  return (
    <>
      <ul>{tabElements}</ul>
      <Link href="/admin/tab/new">
        <button type="button">New tab</button>
      </Link>
    </>
  );
}

TabsAdmin.getLayout = AdminLayoutFn;
