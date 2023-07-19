import { GetAllViewsAPIEndpoint, ViewInfoType } from "@family-views/common";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { AdminLayoutFn } from "../../../components/admin/admin-layout";
import { callApiEndpoint } from "../../../data-access/api-access";
import * as either from "fp-ts/Either";
import EntityAdminList, { EntityAdminListInput } from "../../../components/admin/entity-admin-list";

export default function ViewAdmin() {
    const { data: session } = useSession();
    const [options, setOptions] = useState<JSX.Element[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>("empty");
    const [entityAdminListInput, setEntityAdminListInput] = useState<EntityAdminListInput>(null)
  
    useEffect(() => {
      callApiEndpoint(GetAllViewsAPIEndpoint, {}).then((result) => {
        const body = result.body;
        if (either.isLeft(body)) {
          console.log(`Error ${body.left}`);
        } else {
          const result = body.right;
          const entityInput:EntityAdminListInput = {
            displayName: 'View',
            entities: [],
            linkForNewEntity: '/admin/view/new',
            partialLinkForEditEntity: '/admin/view/edit/'
          }
          result.forEach(viewInfo => {
            entityInput.entities.push({
                id: viewInfo.viewInfoId,
                displayName: viewInfo.displayName
            })
          })
          setEntityAdminListInput(entityInput)
          setOptions(
            result.map((viewInfo: ViewInfoType) => (
              <option value={viewInfo.viewInfoId} key={viewInfo.viewInfoId}>
                {viewInfo.displayName}
              </option>
            ))
          );
        }
      });
    }, [session]);
  
    return (
      <div>
        <EntityAdminList data={entityAdminListInput}></EntityAdminList>
      </div>
    );
}

ViewAdmin.getLayout = AdminLayoutFn