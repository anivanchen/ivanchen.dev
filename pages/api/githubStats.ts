import type { NextApiRequest, NextApiResponse } from "next";
// const { Octokit } = require('@octokit/rest');

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
