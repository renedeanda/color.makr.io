// Popular brand colors database

export const brandColors = [
  {
    brand: 'Facebook',
    colors: ['#1877F2', '#4267B2'],
    category: 'Social Media'
  },
  {
    brand: 'Twitter',
    colors: ['#1DA1F2'],
    category: 'Social Media'
  },
  {
    brand: 'Instagram',
    colors: ['#E4405F', '#F77737', '#FCAF45'],
    category: 'Social Media'
  },
  {
    brand: 'LinkedIn',
    colors: ['#0A66C2', '#313335'],
    category: 'Social Media'
  },
  {
    brand: 'YouTube',
    colors: ['#FF0000', '#282828'],
    category: 'Social Media'
  },
  {
    brand: 'TikTok',
    colors: ['#000000', '#FE2C55', '#25F4EE'],
    category: 'Social Media'
  },
  {
    brand: 'Pinterest',
    colors: ['#E60023'],
    category: 'Social Media'
  },
  {
    brand: 'Snapchat',
    colors: ['#FFFC00'],
    category: 'Social Media'
  },
  {
    brand: 'Reddit',
    colors: ['#FF4500', '#FF5700'],
    category: 'Social Media'
  },
  {
    brand: 'WhatsApp',
    colors: ['#25D366', '#128C7E'],
    category: 'Social Media'
  },
  {
    brand: 'Discord',
    colors: ['#5865F2', '#7289DA'],
    category: 'Social Media'
  },
  {
    brand: 'Telegram',
    colors: ['#0088CC', '#26A5E4'],
    category: 'Social Media'
  },
  {
    brand: 'Slack',
    colors: ['#4A154B', '#36C5F0', '#2EB67D', '#ECB22E', '#E01E5A'],
    category: 'Productivity'
  },
  {
    brand: 'Notion',
    colors: ['#000000', '#FFFFFF'],
    category: 'Productivity'
  },
  {
    brand: 'Asana',
    colors: ['#F06A6A', '#FCB400', '#7F8A93'],
    category: 'Productivity'
  },
  {
    brand: 'Trello',
    colors: ['#0079BF', '#00C2E0'],
    category: 'Productivity'
  },
  {
    brand: 'Monday.com',
    colors: ['#FF3D57', '#FFCB00', '#00D647'],
    category: 'Productivity'
  },
  {
    brand: 'Apple',
    colors: ['#000000', '#555555', '#A6B1B7'],
    category: 'Technology'
  },
  {
    brand: 'Google',
    colors: ['#4285F4', '#EA4335', '#FBBC04', '#34A853'],
    category: 'Technology'
  },
  {
    brand: 'Microsoft',
    colors: ['#F25022', '#7FBA00', '#00A4EF', '#FFB900'],
    category: 'Technology'
  },
  {
    brand: 'Amazon',
    colors: ['#FF9900', '#146EB4'],
    category: 'E-commerce'
  },
  {
    brand: 'Spotify',
    colors: ['#1DB954', '#191414'],
    category: 'Entertainment'
  },
  {
    brand: 'Netflix',
    colors: ['#E50914', '#000000'],
    category: 'Entertainment'
  },
  {
    brand: 'Twitch',
    colors: ['#9146FF', '#772CE8'],
    category: 'Entertainment'
  },
  {
    brand: 'GitHub',
    colors: ['#181717', '#FFFFFF'],
    category: 'Developer Tools'
  },
  {
    brand: 'GitLab',
    colors: ['#FC6D26', '#E24329'],
    category: 'Developer Tools'
  },
  {
    brand: 'Visual Studio Code',
    colors: ['#007ACC', '#23A9F2'],
    category: 'Developer Tools'
  },
  {
    brand: 'Figma',
    colors: ['#F24E1E', '#FF7262', '#A259FF', '#1ABCFE', '#0ACF83'],
    category: 'Design Tools'
  },
  {
    brand: 'Adobe',
    colors: ['#FF0000', '#ED1C24'],
    category: 'Design Tools'
  },
  {
    brand: 'Canva',
    colors: ['#00C4CC', '#7D2AE7'],
    category: 'Design Tools'
  },
  {
    brand: 'Dropbox',
    colors: ['#0061FF'],
    category: 'Cloud Storage'
  },
  {
    brand: 'Airbnb',
    colors: ['#FF5A5F', '#00A699'],
    category: 'Travel'
  },
  {
    brand: 'Uber',
    colors: ['#000000', '#FFFFFF'],
    category: 'Transportation'
  },
  {
    brand: 'Lyft',
    colors: ['#FF00BF', '#352384'],
    category: 'Transportation'
  },
  {
    brand: 'Shopify',
    colors: ['#96BF48', '#5E8E3E'],
    category: 'E-commerce'
  },
  {
    brand: 'Stripe',
    colors: ['#635BFF', '#0A2540'],
    category: 'FinTech'
  },
  {
    brand: 'PayPal',
    colors: ['#00457C', '#0070BA', '#009CDE'],
    category: 'FinTech'
  },
  {
    brand: 'Coca-Cola',
    colors: ['#F40009', '#FFFFFF'],
    category: 'Food & Beverage'
  },
  {
    brand: 'Pepsi',
    colors: ['#004B93', '#E32934'],
    category: 'Food & Beverage'
  },
  {
    brand: 'Starbucks',
    colors: ['#00704A', '#FFFFFF'],
    category: 'Food & Beverage'
  },
  {
    brand: 'McDonald\'s',
    colors: ['#FFC72C', '#DA291C'],
    category: 'Food & Beverage'
  },
  {
    brand: 'Nike',
    colors: ['#000000', '#FFFFFF'],
    category: 'Sports & Fashion'
  },
  {
    brand: 'Adidas',
    colors: ['#000000', '#FFFFFF'],
    category: 'Sports & Fashion'
  },
  {
    brand: 'BMW',
    colors: ['#1C69D4', '#FFFFFF'],
    category: 'Automotive'
  },
  {
    brand: 'Tesla',
    colors: ['#E82127', '#000000'],
    category: 'Automotive'
  }
];

export const getBrandsByCategory = (category) => {
  return brandColors.filter(b => b.category === category);
};

export const getCategories = () => {
  return [...new Set(brandColors.map(b => b.category))].sort();
};

export const searchBrands = (query) => {
  const q = query.toLowerCase();
  return brandColors.filter(b => b.brand.toLowerCase().includes(q));
};
