// Serverless function that returns proper Open Graph HTML for social media crawlers
// This solves the SPA problem where WhatsApp/Twitter/LinkedIn can't read
// client-side rendered meta tags

import campReportsJson from '../src/data/campReports.json';
import blogsJson from '../src/data/blogs.json';

const SITE_URL = 'https://sssap.vercel.app';

// Map of blog slugs to their OG metadata
const blogMeta = {
  'importance-of-regular-health-checkups': {
    title: 'Importance of Regular Health Checkups',
    description: 'Many life-threatening diseases develop silently without displaying symptoms. Regular checkups can help catch metabolic issues, heart conditions, and hypertension early.',
    image: '/og/camp_doctor_consultation.jpeg'
  },
  'how-to-prevent-diabetes': {
    title: 'How to Prevent Diabetes: Essential Lifestyle Tips',
    description: 'Type 2 diabetes is largely preventable. Simple shifts in nutrition, active living, and weight management can protect you from long-term blood sugar complications.',
    image: '/og/camp_lab_diagnostics.jpeg'
  },
  'understanding-high-blood-pressure': {
    title: 'Understanding High Blood Pressure (Hypertension)',
    description: 'Known as the "silent killer", high blood pressure can gradually damage blood vessels and lead to heart attacks or strokes without warning symptoms.',
    image: '/og/camp_vital_signs.jpeg'
  },
  'how-cataracts-affect-vision': {
    title: 'How Cataracts Affect Vision in Older Adults',
    description: 'Cataracts are the leading cause of reversible blindness worldwide. Learn how to recognize symptoms early and why safe micro-surgery can restore 100% vision.',
    image: '/og/camp_eye_screening.jpeg'
  },
  'eye-care-tips-for-senior-citizens': {
    title: 'Eye Care and Vision Tips for Senior Citizens',
    description: 'Protecting your eyesight as you age requires simple protective habits, a nutrient-rich diet, and early screenings for common conditions like glaucoma or cataracts.',
    image: '/og/camp_health_awareness.jpeg'
  },
  'june-2026-free-medical-camp': {
    title: 'June 2026 Free Medical Camp Report',
    description: 'Our monthly camp for June saw an exceptional turnout of over 520 villagers with comprehensive checkups, diagnostic testing, and free drug distributions.',
    image: '/og/camp_registration_queue.jpeg'
  },
  'may-2026-free-medical-camp': {
    title: 'May 2026 Free Medical Camp Report',
    description: 'The May medical camp was completed successfully with the support of 12 visiting specialist doctors. Our cardiology unit performed ECG tests on-site.',
    image: '/og/camp_consultation_hall.jpeg'
  },
  'april-2026-free-medical-camp': {
    title: 'April 2026 Free Medical Camp Report',
    description: 'April\'s monthly camp focused on diabetes awareness and vision care. Over 200 patients underwent comprehensive blood tests.',
    image: '/og/camp_doctor_consultation.jpeg'
  }
};

// Map of page names to their OG metadata
const pageMeta = {
  'volunteer': {
    title: 'Volunteer | Sri Satya Sai Aarogya Pradayini',
    description: 'Join our team of volunteers and make a real difference. Doctors, nurses, students, and general helpers are welcome at our monthly medical camps.',
    image: '/og/volunteer.jpeg',
    path: '/volunteer'
  }
};

const assetImageMap = {
  imgRegistration: '/og/camp_registration_queue.jpeg',
  imgConsultation: '/og/camp_consultation_hall.jpeg',
  imgEye: '/og/camp_eye_screening.jpeg',
  imgVital: '/og/camp_vital_signs.jpeg',
  imgLab: '/og/camp_lab_diagnostics.jpeg',
  imgMedicine: '/og/camp_doctor_consultation.jpeg',
  imgTeam: '/og/camp_registration_queue.jpeg',
  imgAwareness: '/og/camp_health_awareness.jpeg',
  imgDoctor: '/og/camp_doctor_consultation.jpeg'
};

function resolveImageUrl(image) {
  if (!image) {
    return `${SITE_URL}/og/camp_registration_queue.jpeg`;
  }
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  if (assetImageMap[image]) {
    return `${SITE_URL}${assetImageMap[image]}`;
  }
  
  // Try matching by substring first (e.g. from Vite-bundled assets /src/assets/images/...)
  const lower = image.toLowerCase();
  for (const [key, value] of Object.entries(assetImageMap)) {
    if (lower.includes(key.toLowerCase()) || lower.includes(value.replace('/og/', '').replace('.jpeg', ''))) {
      return `${SITE_URL}${value}`;
    }
  }

  if (image.startsWith('/')) {
    return `${SITE_URL}${image}`;
  }
  
  return `${SITE_URL}/og/camp_registration_queue.jpeg`;
}

export default function handler(req, res) {
  const { slug, page, title, summary, image } = req.query;

  let meta = null;
  let pageUrl = '';
  let fullTitle = '';
  let imageUrl = '';
  let ogType = 'article';

  if (page && pageMeta[page]) {
    meta = pageMeta[page];
    fullTitle = meta.title;
    imageUrl = `${SITE_URL}${meta.image}`;
    pageUrl = `${SITE_URL}${meta.path}`;
    ogType = 'website';
  } else if (slug) {
    if (title && summary && image) {
      meta = {
        title: title,
        description: summary,
        image: image
      };
    } else {
      // Dynamic lookup fallback from compiled JSON databases
      const allItems = [...(campReportsJson || []), ...(blogsJson || [])];
      const dynamicItem = allItems.find(x => x.slug === slug);
      if (dynamicItem) {
        meta = {
          title: dynamicItem.title,
          description: dynamicItem.summary,
          image: dynamicItem.coverImage || dynamicItem.image
        };
      } else if (blogMeta[slug]) {
        meta = blogMeta[slug];
      }
    }

    if (meta) {
      fullTitle = `${meta.title} | Sri Satya Sai Aarogya Pradayini`;
      imageUrl = resolveImageUrl(meta.image);
      pageUrl = `${SITE_URL}/blog/${slug}`;
      ogType = 'article';
    }
  }

  if (!meta) {
    // If it's a slug, fallback to redirect to the actual blog page
    if (slug) {
      return res.redirect(302, `${SITE_URL}/blog/${slug}`);
    }
    // General fallback
    return res.redirect(302, SITE_URL);
  }

  // Return HTML with proper OG tags + instant redirect for real users
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${fullTitle}</title>
  <meta name="description" content="${meta.description}" />

  <!-- Open Graph (WhatsApp, LinkedIn, Facebook) -->
  <meta property="og:title" content="${fullTitle}" />
  <meta property="og:description" content="${meta.description}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:site_name" content="Sri Satya Sai Aarogya Pradayini" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${fullTitle}" />
  <meta name="twitter:description" content="${meta.description}" />
  <meta name="twitter:image" content="${imageUrl}" />

  <!-- Redirect real users to the actual SPA page -->
  <meta http-equiv="refresh" content="0;url=${pageUrl}" />
  <link rel="canonical" href="${pageUrl}" />
</head>
<body>
  <p>Redirecting to <a href="${pageUrl}">${meta.title || 'the page'}</a>...</p>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
  return res.status(200).send(html);
}
