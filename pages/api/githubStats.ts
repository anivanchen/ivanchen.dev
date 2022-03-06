import type { NextApiRequest, NextApiResponse } from 'next';
// const { Octokit } = require('@octokit/rest');

// // type Data = {
// //   name: string
// // }

// // export default function handler(
// //   req: NextApiRequest,
// //   res: NextApiResponse<Data>
// // ) {
// //   res.status(200).json({ name: 'John Doe' })
// // }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { query } = req;
//   const { owner, repo } = query;

//   if (!owner || !repo) {
//     return res.status(400).json({
//       error: 'Missing owner or repo query string parameter',
//     });
//   }

//   const octokit = new Octokit();
//   const { data } = await octokit.repos.get({
//     owner,
//     repo,
//   });

//   return res.status(200).json(data);
// }