export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { filePath, content, commitMessage } = req.body;

  if (!filePath || !content) {
    return res.status(400).json({ error: 'Missing required parameters: filePath and content' });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'gubbahrudhay';
  const repo = process.env.GITHUB_REPO || 'aarogya-pradayini';

  if (!token) {
    return res.status(500).json({ error: 'GitHub Token is not configured on Vercel backend' });
  }

  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

    // Get the current file SHA if it exists, to allow update
    let sha = null;
    try {
      const getFileResponse = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': 'Vercel-Serverless-Publish'
        }
      });
      if (getFileResponse.ok) {
        const fileData = await getFileResponse.json();
        sha = fileData.sha;
      }
    } catch (e) {
      console.log('File does not exist yet or error getting SHA, proceeding without SHA', e);
    }

    const base64Content = Buffer.from(content).toString('base64');

    // Commit file to GitHub using PUT
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Vercel-Serverless-Publish'
      },
      body: JSON.stringify({
        message: commitMessage || `update: publish updates to ${filePath}`,
        content: base64Content,
        sha: sha || undefined
      })
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: result.message || 'Failed to commit file to GitHub repository'
      });
    }

    return res.status(200).json({
      success: true,
      message: `Successfully committed ${filePath} to GitHub.`,
      sha: result.content.sha
    });
  } catch (err) {
    console.error('Server publish error:', err);
    return res.status(500).json({ error: err.message || 'Internal server publish error' });
  }
}
