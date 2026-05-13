const DEYE = {
  _id: 'mock-company-deye',
  name: 'Deye',
  country: 'China',
  logo: 'https://www.deyeinverter.com/template/en/img/logo.png',
  color1: '#f97316',
  color2: 'rgba(30,30,60,0.9)',
};

const JINKO = {
  _id: 'mock-company-jinko',
  name: 'Jinko Solar',
  country: 'China',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/JinkoSolar_logo.svg/200px-JinkoSolar_logo.svg.png',
  color1: '#3b82f6',
  color2: 'rgba(20,30,60,0.9)',
};

const LONGI = {
  _id: 'mock-company-longi',
  name: 'LONGi Solar',
  country: 'China',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/LONGi_logo.svg/200px-LONGi_logo.svg.png',
  color1: '#10b981',
  color2: 'rgba(20,50,40,0.9)',
};

export const MOCK_PANELS = [
  {
    _id: 'mock-panel-001',
    name: 'Jinko Tiger Neo N-Type 580W',
    description:
      'The Tiger Neo series uses advanced N-Type TOPCon cell technology for industry-leading efficiency and outstanding low-light performance, ideal for large-scale commercial and utility projects.',
    image: '/Solar Energy.jpg',
    features: [
      'N-Type TOPCon cell technology',
      'Bifacial design for rear-side yield',
      'Anti-LID / anti-LeTID technology',
      '30-year linear performance warranty',
      'Suitable for extreme climate conditions',
    ],
    models: ['JKM565N-72HL4-V', 'JKM575N-72HL4-V', 'JKM580N-72HL4-V'],
    specs: [
      { label: 'Rated Power', value: '580 W' },
      { label: 'Module Efficiency', value: '22.5%' },
      { label: 'Cell Type', value: 'N-Type TOPCon' },
      { label: 'Dimensions', value: '2278 × 1134 × 30 mm' },
      { label: 'Weight', value: '28.6 kg' },
      { label: 'Warranty', value: '30 Years' },
    ],
    company: JINKO,
    sortOrder: 1,
    createdAt: '2024-02-01',
  },
  {
    _id: 'mock-panel-002',
    name: 'Jinko Tiger Neo Bifacial 545W',
    description:
      'High-efficiency bifacial module from Jinko Solar with excellent energy generation on both sides of the panel, maximising yield in open-field and rooftop installations.',
    image: '/Solar Energy.jpg',
    features: [
      'Bifacial glass-glass design',
      'High power output in low light',
      'Excellent shading tolerance',
      '12-year product warranty',
      'IEC 61215 / IEC 61730 certified',
    ],
    models: ['JKM535N-54HL4R-V', 'JKM540N-54HL4R-V', 'JKM545N-54HL4R-V'],
    specs: [
      { label: 'Rated Power', value: '545 W' },
      { label: 'Module Efficiency', value: '21.9%' },
      { label: 'Cell Type', value: 'N-Type Bifacial' },
      { label: 'Dimensions', value: '2094 × 1134 × 30 mm' },
      { label: 'Weight', value: '26.4 kg' },
      { label: 'Warranty', value: '30 Years' },
    ],
    company: JINKO,
    sortOrder: 2,
    createdAt: '2024-02-02',
  },
  {
    _id: 'mock-panel-003',
    name: 'LONGi Hi-MO 6 Explorer 575W',
    description:
      'The Hi-MO 6 Explorer features LONGi\'s proprietary HPBC back-contact cell technology, delivering outstanding efficiency gains and an aesthetically superior all-black look for residential and commercial rooftops.',
    image: '/Solar Energy.jpg',
    features: [
      'HPBC back-contact cell technology',
      'All-black premium appearance',
      '25-year linear power warranty',
      'Enhanced salt mist and ammonia resistance',
      'Optimal performance in high-temperature climates',
    ],
    models: ['LR5-72HTH-570M', 'LR5-72HTH-575M', 'LR5-72HTH-580M'],
    specs: [
      { label: 'Rated Power', value: '575 W' },
      { label: 'Module Efficiency', value: '22.8%' },
      { label: 'Cell Type', value: 'HPBC Mono' },
      { label: 'Dimensions', value: '2278 × 1134 × 35 mm' },
      { label: 'Weight', value: '29.0 kg' },
      { label: 'Warranty', value: '25 Years' },
    ],
    company: LONGI,
    sortOrder: 1,
    createdAt: '2024-02-03',
  },
  {
    _id: 'mock-panel-004',
    name: 'LONGi Hi-MO X6 Regular 450W',
    description:
      'Hi-MO X6 Regular is the go-to choice for residential rooftops, combining LONGi\'s proven PERC technology with competitive pricing and a compact form factor that suits most mounting systems.',
    image: '/Solar Energy.jpg',
    features: [
      'PERC monocrystalline cell',
      'Excellent temperature coefficient',
      '25-year linear power warranty',
      'Lightweight at 21 kg',
      'Easy installation with standard rails',
    ],
    models: ['LR5-54HTH-440M', 'LR5-54HTH-445M', 'LR5-54HTH-450M'],
    specs: [
      { label: 'Rated Power', value: '450 W' },
      { label: 'Module Efficiency', value: '21.3%' },
      { label: 'Cell Type', value: 'Mono PERC' },
      { label: 'Dimensions', value: '1722 × 1134 × 30 mm' },
      { label: 'Weight', value: '21.0 kg' },
      { label: 'Warranty', value: '25 Years' },
    ],
    company: LONGI,
    sortOrder: 2,
    createdAt: '2024-02-04',
  },
  {
    _id: 'mock-panel-005',
    name: 'Deye 415W Mono PERC',
    description:
      'A reliable and cost-effective monocrystalline PERC module from Deye, designed for residential rooftop solar systems with consistent performance and durable build quality.',
    image: '/Solar Energy.jpg',
    features: [
      'Mono PERC cell technology',
      '12-year product warranty',
      '25-year linear power guarantee',
      'Anti-PID design',
      'Compatible with Deye hybrid inverter systems',
    ],
    models: ['SM415M-144', 'SM420M-144', 'SM425M-144'],
    specs: [
      { label: 'Rated Power', value: '415 W' },
      { label: 'Module Efficiency', value: '21.0%' },
      { label: 'Cell Type', value: 'Mono PERC' },
      { label: 'Dimensions', value: '1722 × 1134 × 30 mm' },
      { label: 'Weight', value: '20.5 kg' },
      { label: 'Warranty', value: '25 Years' },
    ],
    company: DEYE,
    sortOrder: 1,
    createdAt: '2024-02-05',
  },
  {
    _id: 'mock-panel-006',
    name: 'Deye 610W N-Type TOPCon',
    description:
      'High-capacity N-Type TOPCon panel from Deye, engineered for maximum power output in commercial and utility-scale solar projects with superior bifacial gains.',
    image: '/Solar Energy.jpg',
    features: [
      'N-Type TOPCon bifacial cell',
      'Low degradation rate (<0.4%/year)',
      '30-year linear power warranty',
      'Excellent low-irradiance performance',
      'Ideal for ground-mount projects',
    ],
    models: ['SM605NT-144', 'SM610NT-144', 'SM615NT-144'],
    specs: [
      { label: 'Rated Power', value: '610 W' },
      { label: 'Module Efficiency', value: '22.6%' },
      { label: 'Cell Type', value: 'N-Type TOPCon' },
      { label: 'Dimensions', value: '2278 × 1134 × 30 mm' },
      { label: 'Weight', value: '28.0 kg' },
      { label: 'Warranty', value: '30 Years' },
    ],
    company: DEYE,
    sortOrder: 2,
    createdAt: '2024-02-06',
  },
];

export function getMockPanelById(id) {
  return MOCK_PANELS.find((p) => p._id === id) || null;
}
