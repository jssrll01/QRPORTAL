const CDN = 'https://res.cloudinary.com/bvw3okdf/image/upload/';
const pics = (list) => list.map(([p, c]) => ({ src: CDN + p, caption: c }));

export const HERO = {
  name: 'Jessrell M. Custodio',
  role: 'Programmer • UI/UX Designer • Explorer',
  intro: 'I build with artificial intelligence — turning ideas into real-world web apps, intelligent tools, and creative experiments.',
};
export const QUOTES = [
  'Where Intelligence Meets Innovation.',
  'Where Vision Meets Innovation.',
  'Where Logic Meets Imagination.',
  'Where Vision Drives Creation.',
  'Where Creativity Meets Precision.',
];
export const STATS = [
  ['19', 'Years Old'], ['2+', 'Years of Learning'], ['4+', 'Projects'], ['5+', 'AI Projects'],
];

export const ABOUT = {
  blocks: [
    { title: 'My Story', paras: [
      'My interest in technology grew from wanting to understand how digital platforms and applications work. Instead of only using technology, I started exploring how to build my own projects. Every project gives me an opportunity to learn something new, solve problems, and improve my skills.',
      'Along the way I discovered artificial intelligence — not just as a tool, but as a creative partner. I began using AI to assist with code, explore UI concepts, and compose music. I found that the most exciting part of technology is not just what it can do, but what it lets me do. Every project — finished or abandoned — has taught me something I could not have learned from a book alone.'] },
    { title: 'My Philosophy',
      quote: '"I believe the best way to understand technology is to create with it. Every project, whether successful or not, is an opportunity to learn."',
      paras: ['Technology is not just a tool — it is a canvas for ideas. The act of building, breaking, and rebuilding is where true understanding lives. Every bug is a lesson, every failure a stepping stone, and every finished project a story of persistence.'] },
    { title: 'Interests & Focus', paras: [
      'I am passionate about Artificial Intelligence and its potential to transform creativity, technology, and everyday life. I explore AI tools, study how intelligent systems work, and discover new ways to use AI for music, design, software, and innovative projects.',
      'Beyond AI, I am deeply interested in web development, UI/UX design, and the craft of building interfaces that feel effortless to use. I love the intersection where design meets engineering — where aesthetics and function work hand in hand.'] },
    { title: 'Goals & Vision', paras: [
      'To gain innovative experiences, continuously learn new technologies, and create unique digital projects that turn creative ideas into reality.',
      'To become an innovative technology creator who combines programming, artificial intelligence, UI/UX design, and creative technology to build meaningful digital solutions — projects that are not only advanced, but practical, accessible, and useful to people.'] },
    { title: 'What Motivates Me', paras: [
      'I am motivated by curiosity, creativity, and the challenge of turning ideas into something real. Learning how things work and building my own projects keeps me motivated.',
      'I am also motivated by the people who will use what I create. Knowing that a project could help someone, inspire someone, or simply make their day easier gives my work meaning beyond the code itself.'] },
  ],
  roles: [
    ['Programmer', 'Building web apps and turning ideas into working code.'],
    ['UI/UX Designer', 'Creating modern, user-friendly digital experiences.'],
    ['Researcher', 'Continuously learning and exploring emerging tech.'],
  ],
  hobbies: ['Badminton', 'Mobile Legends', 'Call of Duty Mobile', 'Minecraft', 'UI Design', 'Video Editing'],
  education: { degree: 'Bachelor of Science in Information Technology', school: 'Mindoro State University – Calapan Campus', status: 'Currently Enrolled' },
  funFacts: [
    'I often fall asleep in the middle of class, especially during major subjects.',
    'I can spend hours working on something once I become genuinely interested in it.',
    'I like experimenting with technology just to see what I can make it do.',
    'I enjoy turning simple ideas into unnecessarily advanced projects.',
    'I sometimes start a project without knowing how I am going to finish it.',
    'I learn better by actually building things than by simply reading about them.',
    'I enjoy exploring AI tools and discovering unusual ways to use them.',
    'I can become extremely focused when working on a project I like.',
    'I enjoy designing interfaces almost as much as programming them.',
    'I do not always know the answer, but I enjoy figuring it out.',
  ],
};

export const JOURNEY = [
  ['2025', 'Started BSIT', 'Began exploring programming fundamentals.'],
  ['2025-2026', 'Web & Design', 'Experimented with web development and UI/UX.'],
  ['2026', 'AI-Assisted Development', 'Started exploring AI-assisted development and AI music composition.'],
  ['2026', 'Project Astra', 'Built a personal portfolio and technology ecosystem.'],
  ['2026', 'Xmarket', 'E-commerce and digital marketplace platform.'],
  ['2026', 'Xonline Wallet', 'Digital wallet for finance and payments.'],
  ['2026', 'Pricee', 'Business and e-commerce pricing tool.'],
  ['2026', 'Xentrepreneur', 'Business and course platform.'],
  ['2026', 'ReceiptX', 'Business and receipt management tool.'],
  ['Future', 'Larger Projects', 'Building larger and more innovative technology projects.'],
];

export const PROJECTS = [
  { name: 'PROJECT ASTRA', category: 'Portfolio, Web App, UI/UX Design', type: 'Web App', status: 'Beta', version: 'v2.1.0', started: '08/20/2026', deployed: '10/10/2026', updated: '10/11/2026' },
  { name: 'XMARKET', category: 'E-commerce, Digital Market, Marketplace', type: 'Web App', status: 'Active', version: 'v2.5.0', started: '08/20/2026', deployed: '09/25/2026', updated: '09/29/2026' },
  { name: 'XONLINE WALLET', category: 'Finance, Digital Wallet', type: 'Web App', status: 'Active', version: 'v1.7.1', started: '09/01/2026', deployed: '09/17/2026', updated: '09/20/2026' },
  { name: 'NOVAOKE', category: 'Casual, Entertainment, Tradition, Digital', type: 'Website / Web App', status: 'Archive', version: 'Unknown', started: 'N/A', deployed: 'N/A', updated: 'N/A' },
  { name: 'PRICEE', category: 'E-commerce, Business', type: 'Website / Web App', status: 'Active', version: 'v1.5.0', started: '09/01/2026', deployed: '09/10/2026', updated: '09/15/2026' },
  { name: 'XENTREPRENEUR', category: 'Business, Course', type: 'Website / Web App', status: 'Active', version: 'v2.5.0', started: 'N/A', deployed: 'N/A', updated: '09/18/2026' },
  { name: 'ReceiptX', category: 'Business, Tools', type: 'Website / Web App', status: 'Active', version: 'v1.9.3', started: 'N/A', deployed: 'N/A', updated: '09/20/2026' },
];

export const SKILLS = {
  programming: [
    ['HTML', 'https://developer.mozilla.org/en-US/docs/Web/HTML'],
    ['CSS', 'https://developer.mozilla.org/en-US/docs/Web/CSS'],
    ['JavaScript', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'],
    ['Python', 'https://www.python.org'],
    ['C#', 'https://learn.microsoft.com/en-us/dotnet/csharp/'],
    ['C', 'https://en.wikipedia.org/wiki/C_(programming_language)'],
    ['C++', 'https://isocpp.org'],
    ['React', 'https://react.dev'],
  ],
  tools: [
    ['Figma', 'https://www.figma.com'], ['Visual Studio', 'https://visualstudio.microsoft.com'],
    ['VS Code', 'https://code.visualstudio.com'], ['Claude AI', 'https://claude.ai'],
    ['GitHub', 'https://github.com'], ['Vercel', 'https://vercel.com'],
    ['Netlify', 'https://www.netlify.com'], ['Railway', 'https://railway.app'],
    ['Gemini', 'https://gemini.google.com'], ['MongoDB', 'https://www.mongodb.com'],
    ['Supabase', 'https://supabase.com'], ['GitHub Copilot', 'https://github.com/features/copilot'],
    ['MySQL', 'https://www.mysql.com'], ['PostgreSQL', 'https://www.postgresql.org'],
    ['Cloudflare', 'https://www.cloudflare.com'], ['Firebase', 'https://firebase.google.com'],
    ['Cloudinary', 'https://cloudinary.com'], ['Suno', 'https://suno.com'],
    ['Docker', 'https://www.docker.com'], ['Git', 'https://git-scm.com'],
  ],
  strengths: [
    ['Creativity', 'Turning simple ideas into advanced projects.'],
    ['Problem-Solving', 'Figuring things out through experimentation.'],
    ['Curiosity', 'Always exploring and learning new technologies.'],
  ],
  learn: [
    'My learning style is driven by curiosity and persistence. I learn best through hands-on experimentation — building projects, breaking them, and rebuilding until they work the way I intended. When something genuinely interests me, I stay with it until I can turn what I\'ve learned into something practical.',
    'I combine self-study with AI-assisted exploration. I use tools like ChatGPT, Claude, and Gemini as thinking partners — asking questions, generating examples, and reviewing my code. But I always verify, test, and rewrite in my own style, because understanding comes from doing.',
    'Formal coursework at Mindoro State University gives me structure — algorithms, databases, and programming fundamentals. Self-study gives me speed and range. Together, they keep me moving.',
  ],
  learnList: [
    'Build first, read second',
    'Break things intentionally to understand them',
    'Ask AI to explain, not to replace',
    'Ship small projects, learn from feedback',
    'Read other people\'s code every week',
  ],
};

export const CERTS = pics([
  ['v1790851174/AI_Power_User_Launchpad_Certificate.jpg', 'AI Power User Launchpad'],
  ['v1790851175/Find_Insights_with_AI_Certificate.jpg', 'Find Insights with AI'],
  ['v1790851176/Data_Science_Essentials_with_Python_Certificate.jpg', 'Data Science Essentials with Python'],
  ['v1790851176/Introduction_to_Modern_AI_Certificate.jpg', 'Introduction to Modern AI'],
]);

export const ACHIEVEMENTS = pics([
  ['v1790692518/Messenger_creation_F35F533B-F04C-45F1-B690-37A23002E63F.jpg', 'Achievement'],
  ['v1790692470/Messenger_creation_5F992C73-5D0F-4A8B-BBDD-9CE642D2F697.jpg', 'Achievement 2'],
]);

export const PHOTOS = pics([
  ['v1790689227/LivePhoto_1790477088349_MP.jpg', 'Moments — 03'],
  ['v1790689220/20260927_104326.jpg', 'Moments — 04'],
  ['v1790689218/20260929_141627.jpg', 'Moments — 05'],
  ['v1790689220/20260927_104208.jpg', 'Moments — 06'],
  ['v1790689219/LivePhoto_1790476474170_MP.jpg', 'Moments — 07'],
  ['v1790689220/20260927_103247.jpg', 'Moments — 08'],
  ['v1790689218/20260927_105111.jpg', 'Moments — 09'],
  ['v1790689217/20260927_105051.jpg', 'Moments — 10'],
  ['v1790689217/20260915_084029.jpg', 'Moments — 11'],
  ['v1790689217/20260915_084051.jpg', 'Moments — 12'],
  ['v1790689216/20260911_121428.jpg', 'Moments — 13'],
  ['v1790689217/20260926_120736.jpg', 'Moments — 14'],
  ['v1790689216/20260911_125359.jpg', 'Moments — 15'],
  ['v1790689217/20260927_104954.jpg', 'Moments — 17'],
  ['v1790689216/20260915_053749.jpg', 'Moments — 18'],
  ['v1790689216/20260911_110317.jpg', 'Moments — 19'],
  ['v1790692087/Messenger_creation_97341421-AA6A-4CA6-B905-0ECC86B5B742.jpg', 'Moments — 20'],
  ['v1790692087/20260911_125124.jpg', 'Moments — 21'],
  ['v1790747514/20260915_144411.jpg', 'Moments — 23'],
  ['v1790747514/20260915_142756.jpg', 'Moments — 24'],
  ['v1790747515/20260915_144417.jpg', 'Moments — 25'],
  ['v1790747515/20260915_150237.jpg', 'Moments — 26'],
  ['v1790747515/20260915_144440.jpg', 'Moments — 27'],
  ['v1790747516/20260915_150741.jpg', 'Moments — 28'],
]);

export const CONTACT = {
  intro: [
    'Whether you have a project idea, want to collaborate, or just want to talk about technology and innovation — I\'d love to hear from you. I\'m always open to meaningful conversations, new connections, and exciting opportunities.',
    'If you\'re a fellow developer, designer, or creative — reach out. If you\'re a recruiter or someone looking for a passionate, curious learner — I\'d be glad to connect. If you just want to share something interesting you\'ve found in tech, my inbox is open.',
  ],
  socials: [
    ['Email', 'custodiojessrell07@gmail.com', 'mailto:custodiojessrell07@gmail.com', 'https://cdn.simpleicons.org/gmail/EA4335'],
    ['Facebook', 'Jessrell Custodio', 'https://www.facebook.com/share/19NZJfifwE/', 'https://cdn.simpleicons.org/facebook/1877F2'],
    ['Instagram', '@jssrll01', 'https://www.instagram.com/', 'https://cdn.simpleicons.org/instagram/E4405F'],
    ['TikTok', '@shaomi3_', 'https://tiktok.com/@shaomi3_', 'https://cdn.simpleicons.org/tiktok/000000'],
    ['X (Twitter)', '@astrater07', 'https://x.com/astrater07', 'https://cdn.simpleicons.org/x/000000'],
  ],
};
