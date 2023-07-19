import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./entity-admin-list.module.css";

export type EntityData = {
  id: string;
  displayName: string;
};

export type EntityAdminListInput = {
    displayName:string;
  entities: EntityData[];
  linkForNewEntity:string;
  partialLinkForEditEntity:string
} | null;

export default function EntityAdminList({
  data,
}: {
  data: EntityAdminListInput;
}) {
  const [entityElements, setEntityElements] = useState<JSX.Element[]>([
    <>Loading...</>,
  ]);

  useEffect(() => {
    if (!data || !data.entities) {
      return;
    }
    let entityElements: JSX.Element[] = [];
    console.log(data.entities);
    data.entities.forEach((entity) => {
      const href: string = `${data.partialLinkForEditEntity}${entity.id}`;
      entityElements.push(
        <>
          <li className={styles.entityItem} key={`entity_${entity.id}`}>
            {entity.displayName}
            <Link href={href}>Edit</Link>
            <span data-tab-id={entity.id}>
              Delete
            </span>
          </li>
        </>
      );
    });
    setEntityElements(entityElements);
  }, [data?.entities]);

  return (
    <>
      <ul>{entityElements}</ul>
      <Link href={data?.linkForNewEntity ?? ""}>
        <button type="button">New {data?.displayName}</button>
      </Link>
    </>
  );
}
