export const DISTRICT_PRESETS = [
  { name: 'Nashik', state: 'Maharashtra', lat: 20.0059, lon: 73.7898, soilTexture: 'Clay Loam', soilPh: 6.8, primaryCrop: 'Grapes / Tomato' },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lon: 73.8567, soilTexture: 'Silty Clay', soilPh: 7.2, primaryCrop: 'Sugarcane / Maize' },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lon: 79.0882, soilTexture: 'Black Cotton Soil', soilPh: 7.8, primaryCrop: 'Cotton / Citrus' },
  { name: 'Jalgaon', state: 'Maharashtra', lat: 21.0077, lon: 75.5626, soilTexture: 'Sandy Clay', soilPh: 7.0, primaryCrop: 'Banana / Cotton' },
  { name: 'Satara', state: 'Maharashtra', lat: 17.6805, lon: 74.0183, soilTexture: 'Loamy Soil', soilPh: 6.5, primaryCrop: 'Strawberry / Soybean' }
];

export const SAMPLE_CROP_DISEASES = [
  {
    id: 'tomato-late-blight',
    crop: 'Tomato',
    disease: 'Late Blight (Phytophthora infestans)',
    dataset: 'CCMT Dataset',
    confidence: 94.8,
    dsi: 32.5,
    etlExceeded: true,
    symptoms: 'Water-soaked irregular lesions on leaves with white fungal growth underneath during high humidity.',
    ipmBioControl: 'Apply Trichoderma viride bio-fungicide (5g/L) or 5% Neem Seed Kernel Extract (NSKE). Ensure wide crop spacing.',
    chemicalControl: 'Mancozeb 75% WP @ 2g/L or Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L.',
    shapDrivers: [
      { driver: '14-Day RH Avg (>84%)', impact: '+38%', positive: true },
      { driver: 'Night Temp Range (18-22°C)', impact: '+26%', positive: true },
      { driver: '3-Day Rainfall Accumulation', impact: '+18%', positive: true },
      { driver: 'Soil pH Neutral (6.8)', impact: '-8%', positive: false }
    ],
    vernacular: {
      marathi: 'टॉमेटोवरील उशिरा येणारा करपा (Late Blight) रोगाची लागण ३२.५% आहे. पुढील ४८ तासांत पावसाची शक्यता नसल्यास बुरशीनाशकाची फवारणी करावी. पाऊस असल्यास फवारणी थांबवावी.',
      hindi: 'टमाटर में पछेती झुलसा (Late Blight) का प्रभाव 32.5% पाया गया है। यदि अगले 48 घंटों में बारिश की संभावना नहीं है, तो उचित जैविक या रासायनिक कवकनाशी का छिड़काव करें।',
      english: 'Tomato Late Blight detected with 32.5% Disease Severity Index. If no rain is forecast in next 48 hours, proceed with bio-fungicide spray.'
    }
  },
  {
    id: 'maize-fall-armyworm',
    crop: 'Maize',
    disease: 'Fall Armyworm (Spodoptera frugiperda)',
    dataset: 'IP102 Pest Dataset',
    confidence: 91.2,
    dsi: 24.1,
    etlExceeded: true,
    symptoms: 'Pin-hole damage and large ragged holes on leaves with heavy frass in the central whorl.',
    ipmBioControl: 'Install Pheromone traps @ 5/acre. Release Metarhizium anisopliae formulation @ 5g/L or NPV virus.',
    chemicalControl: 'Emamectin benzoate 5% SG @ 0.4g/L directly into the whorl.',
    shapDrivers: [
      { driver: 'Max Temp Trend (31-34°C)', impact: '+32%', positive: true },
      { driver: 'Dry Spell Following Rain', impact: '+29%', positive: true },
      { driver: 'Crop Stage (Vegetative Whorl)', impact: '+22%', positive: true },
      { driver: 'Soil Clay Content', impact: '-5%', positive: false }
    ],
    vernacular: {
      marathi: 'मक्यावर लष्करी अळीचा (Fall Armyworm) प्रादुर्भाव दिसून येत आहे. पिकाच्या पोंग्यात मेटारायझियम बुरशी किंवा निंबोळी अर्क ५% टाकावा.',
      hindi: 'मक्के में फॉल आर्मीवर्म का प्रकोप देखा गया है। पोंगली में मेटाराइजियम या नीम के अर्क का प्रयोग करें।',
      english: 'Maize Fall Armyworm infestation detected above Economic Threshold Level. Apply Metarhizium anisopliae or NSKE into leaf whorls.'
    }
  }
];

export const MAHARASHTRA_HEATMAP_DATA = [
  { id: 1, district: 'Nashik', lat: 20.0059, lon: 73.7898, riskLevel: 'High', score: 86, activeDisease: 'Late Blight / Downy Mildew', affectedAreaHa: 1420, cases: 342 },
  { id: 2, district: 'Jalgaon', lat: 21.0077, lon: 75.5626, riskLevel: 'Critical', score: 92, activeDisease: 'Cotton Aphids & Fusarium', affectedAreaHa: 2890, cases: 580 },
  { id: 3, district: 'Nagpur', lat: 21.1458, lon: 79.0882, riskLevel: 'Moderate', score: 58, activeDisease: 'Citrus Canker / Pink Bollworm', affectedAreaHa: 890, cases: 145 },
  { id: 4, district: 'Pune', lat: 18.5204, lon: 73.8567, riskLevel: 'Low', score: 28, activeDisease: 'Sugarcane Rust', affectedAreaHa: 310, cases: 48 },
  { id: 5, district: 'Satara', lat: 17.6805, lon: 74.0183, riskLevel: 'Moderate', score: 62, activeDisease: 'Soybean Rust', affectedAreaHa: 750, cases: 190 }
];