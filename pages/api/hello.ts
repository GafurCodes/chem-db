// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../util/MongoDBConnection";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  (await db)
    .collection("users")
    .insertOne({ username: "user", password: "pass" });
  res.status(200).json({ name: "John Doe" });
}
