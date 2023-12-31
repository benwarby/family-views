import type { NextApiRequest, NextApiResponse } from "next";
import { toDataAccessDependencies } from "../../data-access/dependencies";

const deps = toDataAccessDependencies();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(deps);
}
