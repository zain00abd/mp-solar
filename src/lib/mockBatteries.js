const DEYE = {
  _id: 'mock-company-deye',
  name: 'Deye',
  country: 'China',
  logo: 'https://www.deyeinverter.com/template/en/img/logo.png',
  color1: '#f97316',
  color2: 'rgba(30,30,60,0.9)',
};

const PYLONTECH = {
  _id: 'mock-company-pylontech',
  name: 'Pylontech',
  country: 'China',
  logo: 'https://www.pylontech.com.cn/images/logo.png',
  color1: '#6366f1',
  color2: 'rgba(25,25,55,0.9)',
};

const BYD = {
  _id: 'mock-company-byd',
  name: 'BYD Battery',
  country: 'China',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/BYD_Auto_Logo.svg/200px-BYD_Auto_Logo.svg.png',
  color1: '#14b8a6',
  color2: 'rgba(15,40,40,0.9)',
};

export const MOCK_BATTERIES = [
  {
    _id: 'mock-bat-001',
    name: 'Pylontech US5000 5kWh',
    description:
      'The Pylontech US5000 is a compact wall-mounted lithium LFP battery offering 5 kWh of usable storage. Ideal for residential solar systems, it can be stacked to expand capacity and integrates with most hybrid inverters.',
    image: '/Solar Energy.jpg',
    features: [
      'LiFePO4 chemistry — safe and stable',
      'Stackable modules for easy expansion',
      'Compatible with major hybrid inverters',
      '6000+ charge/discharge cycles',
      'Built-in BMS with full protection',
    ],
    models: ['US5000B', 'US5000C'],
    specs: [
      { label: 'Capacity', value: '5.12 kWh' },
      { label: 'Chemistry', value: 'LiFePO4' },
      { label: 'Voltage', value: '48 V' },
      { label: 'Cycles', value: '6000+' },
      { label: 'DoD', value: '95%' },
      { label: 'Warranty', value: '10 Years' },
    ],
    company: PYLONTECH,
    sortOrder: 1,
    createdAt: '2024-03-01',
  },
  {
    _id: 'mock-bat-002',
    name: 'Pylontech Force H2 10kWh',
    description:
      'The Force H2 is a high-voltage battery system designed for larger residential and small commercial installations, offering enhanced compatibility with high-voltage hybrid inverters and a scalable architecture.',
    image: '/Solar Energy.jpg',
    features: [
      'High-voltage 400 V architecture',
      'Modular and scalable design',
      'Wide inverter compatibility',
      'Active cell balancing',
      'Remote monitoring via Pylontech cloud',
    ],
    models: ['FC0500-40S', 'FC1000-40S'],
    specs: [
      { label: 'Capacity', value: '10 kWh' },
      { label: 'Chemistry', value: 'LiFePO4' },
      { label: 'Voltage', value: '400 V' },
      { label: 'Cycles', value: '6000+' },
      { label: 'DoD', value: '90%' },
      { label: 'Warranty', value: '10 Years' },
    ],
    company: PYLONTECH,
    sortOrder: 2,
    createdAt: '2024-03-02',
  },
  {
    _id: 'mock-bat-003',
    name: 'BYD Battery-Box Premium HVS 10.2',
    description:
      'The BYD Battery-Box Premium HVS 10.2 is a high-voltage lithium iron phosphate battery system for residential and light commercial use, offering exceptional cycle life and a scalable platform up to 66.2 kWh.',
    image: '/Solar Energy.jpg',
    features: [
      'Expandable up to 66.2 kWh',
      'High voltage (102.4 V base)',
      'Integrated BMS and protection',
      'IP55 rated — indoor and outdoor',
      'Compatible with leading hybrid inverters',
    ],
    models: ['HVS 5.1', 'HVS 7.7', 'HVS 10.2', 'HVS 12.8'],
    specs: [
      { label: 'Capacity', value: '10.24 kWh' },
      { label: 'Chemistry', value: 'LiFePO4' },
      { label: 'Voltage', value: '102.4 V' },
      { label: 'Cycles', value: '6000+' },
      { label: 'DoD', value: '100%' },
      { label: 'Warranty', value: '10 Years' },
    ],
    company: BYD,
    sortOrder: 1,
    createdAt: '2024-03-03',
  },
  {
    _id: 'mock-bat-004',
    name: 'BYD Battery-Box Premium LVS 16kWh',
    description:
      'The LVS series offers a low-voltage alternative for residential backup power, featuring ultra-compact 48 V modules that stack inside a single base unit and are compatible with most 48 V hybrid inverters.',
    image: '/Solar Energy.jpg',
    features: [
      'Ultra-compact stackable modules',
      'Simple 48 V plug-and-play setup',
      'Scalable from 4 kWh to 256 kWh',
      'IP55 protection rating',
      '10-year warranty with optional extension',
    ],
    models: ['LVS 4.0', 'LVS 8.0', 'LVS 12.0', 'LVS 16.0'],
    specs: [
      { label: 'Capacity', value: '16 kWh' },
      { label: 'Chemistry', value: 'LiFePO4' },
      { label: 'Voltage', value: '48 V' },
      { label: 'Cycles', value: '6000+' },
      { label: 'DoD', value: '100%' },
      { label: 'Warranty', value: '10 Years' },
    ],
    company: BYD,
    sortOrder: 2,
    createdAt: '2024-03-04',
  },
  {
    _id: 'mock-bat-005',
    name: 'Deye Wall Battery 5.12kWh',
    description:
      'Deye\'s compact wall-mounted battery is the perfect companion to a Deye hybrid inverter, offering 5.12 kWh of LiFePO4 storage in a sleek wall unit that is easy to install in any residential setting.',
    image: '/Solar Energy.jpg',
    features: [
      'Designed for Deye hybrid inverters',
      'Compact wall-mount form factor',
      'Built-in smart BMS',
      '6000 cycle life',
      'Plug-and-play installation',
    ],
    models: ['BOS-G Pro 5.12', 'BOS-G Pro 10.24'],
    specs: [
      { label: 'Capacity', value: '5.12 kWh' },
      { label: 'Chemistry', value: 'LiFePO4' },
      { label: 'Voltage', value: '48 V' },
      { label: 'Cycles', value: '6000' },
      { label: 'DoD', value: '95%' },
      { label: 'Warranty', value: '10 Years' },
    ],
    company: DEYE,
    sortOrder: 1,
    createdAt: '2024-03-05',
  },
  {
    _id: 'mock-bat-006',
    name: 'Deye C&I ESS 100kWh Cabinet',
    description:
      'The Deye C&I ESS cabinet is a liquid-cooled energy storage system for commercial and industrial applications, providing peak shaving, backup power, and demand response in a single outdoor-rated enclosure.',
    image: '/Solar Energy.jpg',
    features: [
      'Liquid cooling for extended lifespan',
      'Peak shaving and demand response',
      'Outdoor IP55 rated enclosure',
      'Integrated EMS controller',
      'Scalable to MWh range',
    ],
    models: ['ESS-100C', 'ESS-200C', 'ESS-250C'],
    specs: [
      { label: 'Capacity', value: '100 kWh' },
      { label: 'Chemistry', value: 'LiFePO4' },
      { label: 'Cooling', value: 'Liquid' },
      { label: 'Cycles', value: '6000+' },
      { label: 'Protection', value: 'IP55' },
      { label: 'Warranty', value: '10 Years' },
    ],
    company: DEYE,
    sortOrder: 2,
    createdAt: '2024-03-06',
  },
];

export function getMockBatteryById(id) {
  return MOCK_BATTERIES.find((p) => p._id === id) || null;
}
