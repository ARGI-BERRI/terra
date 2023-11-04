import { createHmac, randomUUID } from "crypto";

const SWITCHBOT_TOKEN = process.env.SWITCHBOT_TOKEN;
const SWITCHBOT_SECRET = process.env.SWITCHBOT_SECRET;

export function generateHeader() {
  const timestamp = Date.now();
  const nonce = randomUUID().toString();
  const text = `${SWITCHBOT_TOKEN}${timestamp}${nonce}`;
  const signature = createHmac("sha256", SWITCHBOT_SECRET)
    .update(text, "utf-8")
    .digest()
    .toString("base64");

  const header = {
    Authorization: SWITCHBOT_TOKEN,
    t: timestamp.toString(),
    sign: signature,
    nonce: nonce,
  };

  return header;
}
