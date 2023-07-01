import type { NextApiRequest, NextApiResponse } from "next"
import { toDataAccessDependencies } from "../../data-access/dependencies"
import { getTabInfoList } from "../../data-access/tab-info-access"

const deps = toDataAccessDependencies()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    let viewInfo = await getTabInfoList(deps)
    res.status(200).json(viewInfo)
}
