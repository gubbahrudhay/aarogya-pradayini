import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, image }) {
  const siteTitle = title || 'Sri Satya Sai Aarogya Pradayini';
  const siteDesc = description || 'Free monthly medical camps in Kalwakurthy, Telangana. Specialist healthcare for all.';
  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDesc} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDesc} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDesc} />
    </Helmet>
  );
}
