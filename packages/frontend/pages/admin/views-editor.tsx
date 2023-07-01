import { ViewInfoType } from '@family-views/common';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import ViewEditor from '../../components/admin/view/view-editor';

export default function ViewsEditor() {
    const { data: session } = useSession();
    const [options, setOptions] = useState<JSX.Element[]>([])
    const [selectedOption, setSelectedOption] = useState<string>("empty")
  
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

    // useEffect(() => {
    //     if (selectedOption && selectedOption.length > 0) {
    //     }
    //   }, [selectedOption])

  return (
    <div>
    <form>
      <label>
        Select a view to edit:
        <select id="view" onChange={e => {
            const value = e.target.selectedOptions[0].value
            setSelectedOption(value)
          }}>
          <option key='empty' value="empty"></option>
          <option key='new' value="new">New View</option>
          {options}
        </select>
      </label>
    </form>
    <ViewEditor viewId={selectedOption}></ViewEditor>
    </div>
  )
}
