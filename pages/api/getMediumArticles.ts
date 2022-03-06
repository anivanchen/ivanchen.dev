import type { NextApiRequest, NextApiResponse } from 'next';
// import { parse } from "rss-to-json";

// type Data = {
//   name: string
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   await parse('https://medium.com/feed/@anivanchen', {}).then(rss => {
//     const data: any = rss;
//     res.status(200).json(data.items);
//   });
// }