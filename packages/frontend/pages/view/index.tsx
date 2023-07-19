import { useState, useEffect, use, FormEventHandler } from "react";
import { GetAllViewsAPIEndpoint, ViewInfoType } from "@family-views/common";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { callApiEndpoint } from "../../data-access/api-access";
import * as either from "fp-ts/Either";
// import { useRouter } from 'next/router';

export default function Views() {
  const { data: session } = useSession();
  const [options, setOptions] = useState<JSX.Element[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (selectedOption && selectedOption.length > 0) {
      const url = `/view/${selectedOption}`;
      router.push(url);
      // redirect(url)
    }
  }, [selectedOption]);

  useEffect(() => {
    callApiEndpoint(GetAllViewsAPIEndpoint, {}).then((result) => {
      console.log(result);
      const body = result.body;
      console.log(body);
      if (either.isLeft(body)) {
        console.log(`Error ${body.left}`);
      } else {
        setOptions(
          body.right.map((viewInfo: ViewInfoType) => (
            <option value={viewInfo.viewInfoId} key={viewInfo.viewInfoId}>
              {viewInfo.displayName}
            </option>
          ))
        );
      }
    });
  }, [session]);

  return (
    <>
      <form>
        <label>
          Select a view to display:
          <select
            id="view"
            onChange={(e) => {
              const value = e.target.selectedOptions[0].value;
              setSelectedOption(value);
            }}
          >
            <option key="empty" value="empty"></option>
            {options}
          </select>
        </label>
      </form>
    </>
  );
}
