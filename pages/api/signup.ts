// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../util/MongoDBConnection";
import bcrypt from "bcrypt";

type Data = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const obj = JSON.parse(req.body);
  const { username, password } = obj;

  try {
    bcrypt.hash(password, 10, async function (err, hash) {
      try {
        (await db).collection("users").insertOne({
          username: username,
          password: hash,
        });
      } catch (error) {
        console.log("Couldn't save user to the database");
        console.error(err);
        console.error(error);
      }
    });
    res.status(200).send({ status: "success" });
  } catch (error) {
    console.log("Couldn't hash password");
    console.error(error);
  }
}
