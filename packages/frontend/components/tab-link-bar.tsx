import { useRouter } from "next/router";
import styles from "./tab-bar.module.css";
import "./tab-bar.module.css";
import Link from "next/link";

export type TabLinkBarInfo = {
  id: string;
  displayName: string;
  href: string;
};

export default function TabLinkBar({
  tabBarInfo,
}: {
  tabBarInfo: TabLinkBarInfo[];
}) {
  const router = useRouter();
  let tabs = tabBarInfo.map((tab: TabLinkBarInfo) => {
    let className: string = router.asPath === tab.href ? styles.active_tab : "";
    return (
      <li role="menuitem" key={tab.id} className={className}>
        <Link href={tab.href}>{tab.displayName}</Link>
      </li>
    );
  });

  return (
    <>
      <div className={styles.tab_bar}>
        <nav>
          <ul role="menubar">{tabs}</ul>
        </nav>
      </div>
    </>
  );
}
