import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, image }) {
  const siteTitle = title || 'Sri Satya Sai Aarogya Pradayini';
  const siteDesc = description || 'Free monthly medical camps in Kalwakurthy, Telangana. Specialist healthcare for all.';
  
  // Use a default social banner fallback if no specific image is provided
  const siteImage = image || 'https://sssap.vercel.app/assets/images/logo.jpg';

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDesc} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDesc} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDesc} />
      <meta name="twitter:image" content={siteImage} />
    </Helmet>
  );
}
