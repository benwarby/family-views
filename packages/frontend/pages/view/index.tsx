import { useState, useEffect, use, FormEventHandler } from "react";
import { ViewInfoType } from "@family-views/common";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';

export default function Views() {
  const { data: session } = useSession()
  const [options, setOptions] = useState<JSX.Element[]>([])
  const [selectedOption, setSelectedOption] = useState<string>("")

  const router = useRouter()

  useEffect(() => {
    if (selectedOption && selectedOption.length > 0) {
      const url = `/view/${selectedOption}`;
      router.push(url)
      // redirect(url)
    }
  }, [selectedOption])

  useEffect(() => {
    const fetchData = async () => {
      fetch('/api/views', {
        method: 'GET'
      }).then((result) => {
        return result.json()
      }).then((result) => {
        setOptions(result.map((viewInfo:ViewInfoType) => 
        (
          <option value={viewInfo.ViewInfoId} key={viewInfo.ViewInfoId}> 
          {viewInfo.displayName}
          </option>
        )))
      })
    };
    fetchData();
  }, [session]);

  return (
    <>
      <form>
        <label>
          Select a view to display:
          <select id="view" onChange={e => {
              const value = e.target.selectedOptions[0].value
              setSelectedOption(value)
            }}>
            <option key='empty' value="empty"></option>
            {options}
          </select>
        </label>
      </form>
    </>
  );
}
