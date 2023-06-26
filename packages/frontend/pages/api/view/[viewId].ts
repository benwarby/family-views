import type { NextApiRequest, NextApiResponse } from "next"
import { toDataAccessDependencies } from "../../../data-access/dependencies"
import {getViewInfo} from "../../../data-access/view-info-access"

const deps = toDataAccessDependencies()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    let viewId = req.query.viewId as string
    let viewInfo = await getViewInfo(deps, viewId)
    res.status(200).json(viewInfo)
}
