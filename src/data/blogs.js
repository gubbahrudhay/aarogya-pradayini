import imgDoctor from '../assets/images/camp_doctor_consultation.jpeg';
import imgAwareness from '../assets/images/camp_health_awareness.jpeg';
import imgEye from '../assets/images/camp_eye_screening.jpeg';
import imgVital from '../assets/images/camp_vital_signs.jpeg';
import imgLab from '../assets/images/camp_lab_diagnostics.jpeg';

export const blogs = [
  {
    id: 'blog-checkups',
    slug: 'importance-of-regular-health-checkups',
    type: 'awareness',
    title: 'Importance of Regular Health Checkups',
    author: 'Dr. Rajesh Gubba',
    publishedDate: 'June 20, 2026',
    coverImage: imgDoctor,
    readingTime: '5 min read',
    category: 'Preventative Health',
    summary: 'Many life-threatening diseases develop silently without displaying symptoms. Regular checkups can help catch metabolic issues, heart conditions, and hypertension early.',
    tags: ['Prevention', 'General Wellness', 'Camps'],
    popular: true,
    content: [
      {
        type: 'paragraph',
        text: 'Routine health assessments are crucial for maintaining wellness and identifying potential health risks before they develop into chronic diseases. Many critical conditions, including hypertension, early-stage diabetes, and high cholesterol levels, do not exhibit noticeable symptoms initially.'
      },
      {
        type: 'heading',
        text: '1. Early Detection Saves Lives'
      },
      {
        type: 'paragraph',
        text: 'By checking parameters like blood pressure, blood glucose, and basic blood counts at regular intervals, healthcare providers can spot warning signs early. For instance, pre-diabetes can be managed effectively through diet and lifestyle modifications, avoiding the need for permanent medication.'
      },
      {
        type: 'heading',
        text: '2. Basic Parameters Everyone Should Monitor'
      },
      {
        type: 'paragraph',
        text: 'Every adult should ideally check their blood pressure and fasting blood sugar at least once a year. If you have a family history of diabetes, obesity, or cardiovascular disease, the frequency of these checks should be increased. In our monthly camps, BP and blood sugar checks are performed entirely free of charge.'
      },
      {
        type: 'heading',
        text: '3. Establishing a Healthy Baseline'
      },
      {
        type: 'paragraph',
        text: 'Understanding your normal physiological numbers helps doctors quickly spot anomalies when you fall ill. Keep record files of previous diagnostics so that comparative evaluations can be carried out during emergency consultations.'
      }
    ]
  },
  {
    id: 'blog-diabetes',
    slug: 'how-to-prevent-diabetes',
    type: 'awareness',
    title: 'How to Prevent Diabetes: Essential Lifestyle Tips',
    author: 'Dr. Sai Charan Gubba',
    publishedDate: 'June 5, 2026',
    coverImage: imgLab,
    readingTime: '4 min read',
    category: 'Preventative Health',
    summary: 'Type 2 diabetes is largely preventable. Simple shifts in nutrition, active living, and weight management can protect you from long-term blood sugar complications.',
    tags: ['Diabetes', 'Nutrition', 'Lifestyle'],
    popular: true,
    content: [
      {
        type: 'paragraph',
        text: 'Diabetes has become an epidemic, particularly affecting rural and urban communities alike. Type 2 diabetes is caused by insulin resistance, a state where body cells do not respond effectively to insulin. Fortunately, pre-diabetes and Type 2 diabetes are highly manageable and preventable.'
      },
      {
        type: 'heading',
        text: '1. Eat Fiber-Rich, Whole Foods'
      },
      {
        type: 'paragraph',
        text: 'Ditch refined carbs (like white rice, maida, and sugary drinks) and opt for fiber-rich grains, green leafy vegetables, and pulses. Fiber helps slow down sugar absorption in the bloodstream, preventing dangerous insulin spikes.'
      },
      {
        type: 'heading',
        text: '2. Physical Activity is Essential'
      },
      {
        type: 'paragraph',
        text: 'Just 30 minutes of brisk walking or light exercise five days a week increases insulin sensitivity. This means your muscles can use glucose for energy much more efficiently without taxing your pancreas.'
      },
      {
        type: 'heading',
        text: '3. Manage Your Portions and Weight'
      },
      {
        type: 'paragraph',
        text: 'Excess visceral fat around the belly releases chemicals that promote insulin resistance. Monitoring portion sizes and avoiding late-night heavy meals are simple ways to keep body mass index in check.'
      }
    ]
  },
  {
    id: 'blog-bp',
    slug: 'understanding-high-blood-pressure',
    type: 'awareness',
    title: 'Understanding High Blood Pressure (Hypertension)',
    author: 'Dr. Chandrakanth Chithanuri',
    publishedDate: 'May 18, 2026',
    coverImage: imgVital,
    readingTime: '6 min read',
    category: 'Cardiology',
    summary: 'Known as the "silent killer", high blood pressure can gradually damage blood vessels and lead to heart attacks or strokes without warning symptoms.',
    tags: ['Cardiology', 'Hypertension', 'Heart Care'],
    popular: false,
    content: [
      {
        type: 'paragraph',
        text: 'Hypertension occurs when the force of blood flowing against your artery walls is consistently too high. Over time, this constant pressure damages the lining of your blood vessels, leading to cardiovascular complications.'
      },
      {
        type: 'heading',
        text: '1. Why Hypertension is Called a Silent Killer'
      },
      {
        type: 'paragraph',
        text: 'Most people with high blood pressure do not experience headaches, dizziness, or chest discomfort. They only discover it when they experience a severe event like a stroke or kidney issues. This is why screening is absolutely critical.'
      },
      {
        type: 'heading',
        text: '2. Simple Ways to Manage Hypertension'
      },
      {
        type: 'paragraph',
        text: 'Reducing dietary sodium (salt intake), engaging in regular physical exercise, avoiding tobacco and alcohol, and managing stress levels are highly effective. If your doctor prescribes blood pressure medication, taking it consistently without self-stopping is essential.'
      }
    ]
  },
  {
    id: 'blog-cataracts',
    slug: 'how-cataracts-affect-vision',
    type: 'awareness',
    title: 'How Cataracts Affect Vision in Older Adults',
    author: 'Dr. Sridhar',
    publishedDate: 'April 25, 2026',
    coverImage: imgEye,
    readingTime: '5 min read',
    category: 'Eye Care',
    summary: 'Cataracts are the leading cause of reversible blindness worldwide. Learn how to recognize symptoms early and why safe micro-surgery can restore 100% vision.',
    tags: ['Eye Care', 'Cataract', 'Senior Citizens'],
    popular: true,
    content: [
      {
        type: 'paragraph',
        text: 'A cataract is the gradual clouding of the eye’s natural lens, which lies behind the iris and pupil. As proteins in the lens break down due to aging, the lens becomes opaque, blocking light from reaching the retina clearly.'
      },
      {
        type: 'heading',
        text: '1. Common Symptoms of Cataract'
      },
      {
        type: 'paragraph',
        text: 'Look out for cloudy or blurry vision, faded colors, difficulty seeing at night, sensitivity to bright glare, or seeing "halos" around light sources. Regular reading might become difficult even with spectacles.'
      },
      {
        type: 'heading',
        text: '2. Cataracts Are Reversible'
      },
      {
        type: 'paragraph',
        text: 'There are no eye drops or medications that can melt or reverse a cataract. The only safe and permanent cure is a quick, painless outpatient surgery where the cloudy lens is replaced with a clear artificial intraocular lens (IOL).'
      },
      {
        type: 'heading',
        text: '3. Our Cataract Surgery Program'
      },
      {
        type: 'paragraph',
        text: 'At our monthly Kalwakurthy camps, we identify cataract patients, transport them safely to our surgical facility, conduct operations, provide standard post-op medicines, and return them home—all entirely free of cost.'
      }
    ]
  },
  {
    id: 'blog-awareness',
    slug: 'eye-care-tips-for-senior-citizens',
    type: 'awareness',
    title: 'Eye Care and Vision Tips for Senior Citizens',
    author: 'Dr. Sridhar',
    publishedDate: 'April 10, 2026',
    coverImage: imgAwareness,
    readingTime: '4 min read',
    category: 'Eye Care',
    summary: 'Protecting your eyesight as you age requires simple protective habits, a nutrient-rich diet, and early screenings for common conditions like glaucoma or cataracts.',
    tags: ['Eye Care', 'Senior Citizens', 'Nutrition'],
    popular: false,
    content: [
      {
        type: 'paragraph',
        text: 'Our eyes undergo structural alterations as we grow older. Conditions like dry eyes, presbyopia (difficulty focusing up close), and age-related macular issues are common but highly manageable with proper care.'
      },
      {
        type: 'heading',
        text: '1. Eat Eye-Healthy Nutrients'
      },
      {
        type: 'paragraph',
        text: 'Diets rich in Vitamin A, C, E, and Zinc help block oxidative damage to the eye. Green leafy vegetables, carrots, sweet potatoes, and nuts are excellent sources of nutrients that protect macular health.'
      },
      {
        type: 'heading',
        text: '2. Protect Your Eyes from Dust and Sunlight'
      },
      {
        type: 'paragraph',
        text: 'Wearing protective sunglasses when traveling on dusty rural roads prevents scratching of the cornea and reduces exposure to harsh UV rays, which can accelerate cataract development.'
      }
    ]
  }
];
