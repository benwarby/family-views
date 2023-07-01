import type { NextApiRequest, NextApiResponse } from "next"
import { toDataAccessDependencies } from "../../../data-access/dependencies"
import {getViewInfo, updateViewTab} from "../../../data-access/view-info-access"

const deps = toDataAccessDependencies()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    let viewId = req.query.viewId as string
    let tabId = req.query.tabId as string
    let checked = req.query.checked as string
    
    const text = updateViewTab(deps, viewId, tabId, checked)
    res.status(200)
    res.send(text)
}
