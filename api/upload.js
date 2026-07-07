export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fileContent, filename, month, year } = req.body;

  if (!fileContent || !filename || !month || !year) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'gubbahrudhay';
  const repo = process.env.GITHUB_REPO || 'aarogya-pradayini';

  if (!token) {
    return res.status(500).json({ error: 'GitHub Token is not configured on Vercel backend' });
  }

  try {
    // base64 content from client
    const base64Data = fileContent.replace(/^data:image\/\w+;base64,/, '');

    // Target path in GitHub repository: e.g. src/assets/images/gallery/2026/june/filename.webp
    const folderPath = `src/assets/images/gallery/${year}/${month}`.toLowerCase();
    const cleanFilename = filename.toLowerCase().replace(/[^a-z0-9.]+/g, '_');
    const path = `${folderPath}/${cleanFilename}`;

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    // Push to GitHub using standard fetch
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Vercel-Serverless-Upload'
      },
      body: JSON.stringify({
        message: `upload: add ${cleanFilename} to gallery archives`,
        content: base64Data
      })
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: result.message || 'Failed to commit file to GitHub repository'
      });
    }

    // Generate public URL pointing to Vercel/GitHub pages or CDN
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`;

    return res.status(200).json({
      success: true,
      path,
      url: rawUrl
    });
  } catch (err) {
    console.error('Server upload error:', err);
    return res.status(500).json({ error: err.message || 'Internal server upload error' });
  }
}
