import type { NextApiRequest, NextApiResponse } from "next"
import { toDataAccessDependencies } from "../../data-access/dependencies"
import {getViewInfoList} from "../../data-access/view-info-access"

const deps = toDataAccessDependencies()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    let viewInfo = await getViewInfoList(deps)
    res.status(200).json(viewInfo)
}
