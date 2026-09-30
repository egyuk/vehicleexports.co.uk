// Master list of individual destination countries, grouped by continent, with
// the ports we ship to in each. Used by:
//  - src/pages/car-shipping/index.astro  (Countries We Ship To, Export Destinations)
//  - src/components/Header.astro         ("Countries" mega menu)
//
// Countries and ports are a fixed list, NOT derived from the sailing schedule at
// build time: src/data/sailing-schedules.json is rebuilt every week from what
// the carriers currently publish, so anything derived from it appears and
// vanishes week to week. This list was seeded from the schedule on 2026-09-02
// (every destination country, every port seen, spellings tidied) plus the old
// site's list (Gambia, Mozambique, Zimbabwe, plus ports) and a few hub-served
// markets (Botswana, Uganda, Bangladesh, Sri Lanka, Cayman Islands). To find
// ports the schedule has since gained, run from the repo root:
//
//   node -e "const s=require('./src/data/sailing-schedules.json').sailings;const m={};for(const r of s){const i=r.destination.lastIndexOf(',');(m[r.destination.slice(i+1).trim()]??=new Set()).add(r.destination.slice(0,i).trim())}console.log(m)"
//
// and add what is missing below by hand.

export interface CountryLink {
  name: string;
  href: string;
  /** Ports we deliver to in this country, alphabetical (or the hub we route through). */
  ports: string[];
}

// Every menu country now has a page of its own and links straight to it (the
// last 81 were generated from _country-template.astro on 2026-09-03). The
// fallback below still stands for anything added to the menu later: a country
// with no entry here links to the sailing schedule pre-filtered to it, so a new
// menu entry can never 404 before its page is written.
const countryPages: Record<string, string> = {
  Angola: '/car-shipping/angola',
  Antigua: '/car-shipping/antigua',
  Argentina: '/car-shipping/argentina',
  Aruba: '/car-shipping/aruba',
  Australia: '/car-shipping/australia',
  Bahamas: '/car-shipping/bahamas',
  Bangladesh: '/car-shipping/bangladesh',
  Barbados: '/car-shipping/barbados',
  Benin: '/car-shipping/benin',
  Botswana: '/car-shipping/botswana',
  Brazil: '/car-shipping/brazil',
  Cameroon: '/car-shipping/cameroon',
  Canada: '/car-shipping/canada',
  'Cayman Islands': '/car-shipping/cayman-islands',
  Chile: '/car-shipping/chile',
  China: '/car-shipping/china',
  Colombia: '/car-shipping/colombia',
  Congo: '/car-shipping/congo',
  'Côte d\'Ivoire': '/car-shipping/cote-divoire',
  'Curaçao': '/car-shipping/curacao',
  Cyprus: '/car-shipping/cyprus',
  Dominica: '/car-shipping/dominica',
  'Dominican Republic': '/car-shipping/dominican-republic',
  Ecuador: '/car-shipping/ecuador',
  'Equatorial Guinea': '/car-shipping/equatorial-guinea',
  'French Guiana': '/car-shipping/french-guiana',
  'French Polynesia': '/car-shipping/french-polynesia',
  Gambia: '/car-shipping/gambia',
  Ghana: '/car-shipping/ghana',
  Greece: '/car-shipping/greece',
  Grenada: '/car-shipping/grenada',
  Guadeloupe: '/car-shipping/guadeloupe',
  Guernsey: '/car-shipping/guernsey',
  Guinea: '/car-shipping/guinea',
  Guyana: '/car-shipping/guyana',
  'Hong Kong': '/car-shipping/hong-kong-shipping',
  India: '/car-shipping/india',
  Indonesia: '/car-shipping/indonesia',
  Ireland: '/car-shipping/ireland',
  Italy: '/car-shipping/italy',
  Jamaica: '/car-shipping/jamaica',
  Japan: '/car-shipping/japan',
  Jersey: '/car-shipping/jersey',
  Jordan: '/car-shipping/jordan',
  Kenya: '/car-shipping/kenya',
  Madagascar: '/car-shipping/madagascar',
  Malaysia: '/car-shipping/malaysia',
  Malta: '/car-shipping/europe/malta',
  Martinique: '/car-shipping/martinique',
  Mauritania: '/car-shipping/mauritania',
  Mauritius: '/car-shipping/mauritius',
  Mexico: '/car-shipping/mexico',
  Morocco: '/car-shipping/morocco',
  Mozambique: '/car-shipping/mozambique',
  Namibia: '/car-shipping/namibia',
  'New Caledonia': '/car-shipping/new-caledonia',
  'New Zealand': '/car-shipping/new-zealand',
  Nigeria: '/car-shipping/nigeria',
  Oman: '/car-shipping/oman',
  Panama: '/car-shipping/panama',
  Peru: '/car-shipping/peru',
  'Puerto Rico': '/car-shipping/puerto-rico',
  'Réunion': '/car-shipping/reunion',
  'Saudi Arabia': '/car-shipping/saudi-arabia',
  Senegal: '/car-shipping/senegal',
  'Sierra Leone': '/car-shipping/sierra-leone',
  Singapore: '/car-shipping/singapore',
  'Sint Maarten': '/car-shipping/sint-maarten',
  'South Africa': '/car-shipping/south-africa',
  'South Korea': '/car-shipping/south-korea',
  Spain: '/car-shipping/spain',
  'Sri Lanka': '/car-shipping/sri-lanka',
  'St Kitts': '/car-shipping/st-kitts',
  'St Lucia': '/car-shipping/st-lucia',
  'St Vincent': '/car-shipping/st-vincent',
  Suriname: '/car-shipping/suriname',
  Sweden: '/car-shipping/sweden',
  Taiwan: '/car-shipping/taiwan',
  Tanzania: '/car-shipping/tanzania',
  Thailand: '/car-shipping/thailand',
  Togo: '/car-shipping/togo',
  'Trinidad and Tobago': '/car-shipping/trinidad-and-tobago',
  Turkey: '/car-shipping/turkey',
  Uganda: '/car-shipping/uganda',
  Uruguay: '/car-shipping/uruguay',
  USA: '/car-shipping/usa-america',
  Zimbabwe: '/car-shipping/zimbabwe',

  // Added 2026-09-04: eleven destinations this site did not previously cover.
  // All eleven are reached through a hub port rather than a direct UK sailing,
  // so each has a hubPorts entry below.
  // They went into continentNames on request, so they are in the Countries
  // mega menu with everything else. That menu renders on every page and lists
  // each country twice (desktop panel and mobile menu), so the eleven cost
  // about 5,300 internal links across the site — worth knowing if the list is
  // ever pruned back to the destinations that actually sell.
  Bermuda: '/car-shipping/bermuda',
  Brunei: '/car-shipping/brunei',
  Eswatini: '/car-shipping/eswatini',
  Fiji: '/car-shipping/fiji',
  Macau: '/car-shipping/macau',
  Malawi: '/car-shipping/malawi',
  Maldives: '/car-shipping/maldives',
  Pakistan: '/car-shipping/pakistan',
  Seychelles: '/car-shipping/seychelles',
  'St Helena': '/car-shipping/st-helena',
  Zambia: '/car-shipping/zambia',

  // Added 2026-09-30: Pacific destinations from a forwarder's coverage list
  // (South Pacific Agencies) that this site did not cover. None takes a direct
  // UK sailing, so each resolves through a hubPorts entry like the eleven above.
  Guam: '/car-shipping/guam',
  'Northern Mariana Islands': '/car-shipping/northern-mariana-islands',
  Micronesia: '/car-shipping/micronesia',
  'Marshall Islands': '/car-shipping/marshall-islands',
  Kiribati: '/car-shipping/kiribati',
  'Papua New Guinea': '/car-shipping/papua-new-guinea',
  'Solomon Islands': '/car-shipping/solomon-islands',
  Vanuatu: '/car-shipping/vanuatu',
  'Timor-Leste': '/car-shipping/timor-leste',
  Samoa: '/car-shipping/samoa',
  'American Samoa': '/car-shipping/american-samoa',
  Tonga: '/car-shipping/tonga',
  'Cook Islands': '/car-shipping/cook-islands',
  Tuvalu: '/car-shipping/tuvalu',
  'Wallis and Futuna': '/car-shipping/wallis-and-futuna',
};

// Where the schedule data names a country differently from the menu. Consulted
// by every lookup that filters sailings by country - the country pages' schedule
// tables and the derived transit facts as well as the link hrefs below. Without
// it the Trinidad and Tobago page found none of its 11 upcoming sailings, because
// the carriers file them under "Port of Spain, Trinidad".
export const scheduleNames: Record<string, string> = {
  'Trinidad and Tobago': 'Trinidad',
};

// Landlocked destinations and the ports vehicles are landed at for them, as
// "Country, Port" (the schedule page's destination filter values) so the
// schedule page can point its empty state at those sailings. Usual port first.
export const hubPorts: Record<string, string[]> = {
  Botswana: ['Namibia, Walvis Bay', 'South Africa, Durban'],
  Uganda: ['Kenya, Mombasa', 'Tanzania, Dar es Salaam'],
  Zimbabwe: ['South Africa, Durban', 'Mozambique, Beira'],

  // Not all landlocked. Islands and small markets that no vessel calls at
  // direct from the UK route through a larger port the same way, so they
  // resolve here too: it is what gives them a transit band, load ports,
  // carriers and an indicative rate instead of an empty page.
  Bermuda: ['USA, Baltimore', 'USA, New York'],
  Brunei: ['Singapore, Singapore'],
  Eswatini: ['South Africa, Durban'],
  Fiji: ['New Zealand, Auckland'],
  Macau: ['Hong Kong, Hong Kong'],
  Malawi: ['Mozambique, Beira', 'Tanzania, Dar es Salaam'],
  Maldives: ['Sri Lanka, Colombo'],
  Pakistan: ['Sri Lanka, Colombo'],
  Seychelles: ['Mauritius, Port Louis', 'Kenya, Mombasa'],
  'St Helena': ['South Africa, Cape Town'],
  Zambia: ['Tanzania, Dar es Salaam', 'South Africa, Durban'],

  // The Pacific islands added 2026-09-30, via the hub their feeder services run from.
  Guam: ['USA, Long Beach', 'South Korea, Busan'],
  'Northern Mariana Islands': ['USA, Long Beach', 'South Korea, Busan'],
  Micronesia: ['South Korea, Busan', 'USA, Long Beach'],
  'Marshall Islands': ['South Korea, Busan', 'USA, Long Beach'],
  Kiribati: ['South Korea, Busan', 'New Zealand, Auckland'],
  'Papua New Guinea': ['Australia, Brisbane', 'Singapore, Singapore'],
  'Solomon Islands': ['Australia, Brisbane', 'Singapore, Singapore'],
  Vanuatu: ['Australia, Brisbane', 'New Zealand, Auckland'],
  'Timor-Leste': ['Singapore, Singapore'],
  Samoa: ['New Zealand, Auckland'],
  'American Samoa': ['New Zealand, Auckland', 'USA, Long Beach'],
  Tonga: ['New Zealand, Auckland'],
  'Cook Islands': ['New Zealand, Auckland'],
  Tuvalu: ['New Zealand, Auckland', 'Australia, Brisbane'],
  'Wallis and Futuna': ['New Zealand, Auckland', 'New Caledonia, Noumea'],
};
const via = (name: string) => 'via ' + hubPorts[name].map(h => h.split(', ')[1]).join(' or ');

// Hong Kong and Singapore are city states, so the port is the country and is
// left out. The landlocked countries show the hub port they are reached via
// (Zimbabwe's entry keeps its inherited delivery points).
const countryPorts: Record<string, string[]> = {
  // The Pacific islands added 2026-09-30 show the port the car finally lands
  // at, since the hub is already named on each page.
  Guam: ['Apra Harbor'],
  'Northern Mariana Islands': ['Saipan'],
  Micronesia: ['Pohnpei', 'Chuuk', 'Yap', 'Kosrae'],
  'Marshall Islands': ['Majuro', 'Ebeye'],
  Kiribati: ['Betio'],
  'Papua New Guinea': ['Lae', 'Port Moresby'],
  'Solomon Islands': ['Honiara'],
  Vanuatu: ['Port Vila', 'Luganville'],
  'Timor-Leste': ['Tibar Bay'],
  Samoa: ['Apia'],
  'American Samoa': ['Pago Pago'],
  Tonga: ["Nuku'alofa"],
  'Cook Islands': ['Avatiu'],
  Tuvalu: ['Funafuti'],
  'Wallis and Futuna': ['Mata-Utu'],
  Bermuda: ['Hamilton'],
  Brunei: ['Muara'],
  Eswatini: ['Matsapa', 'Manzini'],
  Fiji: ['Suva', 'Lautoka'],
  Macau: ['Macau'],
  Malawi: ['Blantyre', 'Lilongwe'],
  Maldives: ['Malé'],
  Pakistan: ['Karachi'],
  Seychelles: ['Victoria'],
  'St Helena': ['Jamestown'],
  Zambia: ['Lusaka', 'Kazungula'],
  Angola: ['Luanda'],
  Antigua: ["St John's"],
  Argentina: ['Zárate'],
  Aruba: ['Oranjestad'],
  Australia: ['Brisbane', 'Fremantle', 'Melbourne', 'Port Kembla (Sydney)'],
  Bahamas: ['Nassau'],
  Bangladesh: ['Chittagong'],
  Barbados: ['Bridgetown'],
  Benin: ['Cotonou'],
  Botswana: [via('Botswana')],
  Brazil: ['Paranaguá', 'Rio de Janeiro', 'Santos', 'Vitória'],
  Cameroon: ['Douala'],
  Canada: ['Halifax', 'Vancouver'],
  'Cayman Islands': ['George Town'],
  Chile: ['San Antonio'],
  China: ['Shanghai', 'Xingang (Tianjin)', 'Xinsha (Guangzhou)', 'Yantai'],
  Colombia: ['Cartagena', 'Santa Marta', 'Turbo'],
  Congo: ['Pointe-Noire'],
  "Côte d'Ivoire": ['Abidjan'],
  Curaçao: ['Willemstad'],
  Cyprus: ['Limassol'],
  Dominica: ['Roseau'],
  'Dominican Republic': ['Manzanillo', 'Santo Domingo'],
  Ecuador: ['Manta'],
  'Equatorial Guinea': ['Bata', 'Malabo'],
  'French Guiana': ['Dégrad des Cannes'],
  'French Polynesia': ['Papeete'],
  Gambia: ['Banjul'],
  Ghana: ['Takoradi', 'Tema'],
  Greece: ['Piraeus'],
  Grenada: ["St George's"],
  Guadeloupe: ['Pointe-à-Pitre'],
  Guernsey: ['St Peter Port'],
  Guinea: ['Conakry'],
  Guyana: ['Georgetown'],
  'Hong Kong': [],
  India: ['Ennore', 'Mumbai', 'Pipavav'],
  Indonesia: ['Jakarta (Tanjung Priok)'],
  Ireland: ['Dublin', 'Rosslare'],
  Italy: ['Livorno'],
  Jamaica: ['Kingston'],
  Japan: ['Hitachi', 'Kobe', 'Nagoya', 'Tomakomai', 'Toyohashi', 'Yokohama'],
  Jersey: ['St Helier'],
  Jordan: ['Aqaba'],
  Kenya: ['Mombasa'],
  Madagascar: ['Tamatave'],
  Malaysia: ['Port Klang'],
  Malta: ['Valletta'],
  Martinique: ['Fort-de-France'],
  Mauritania: ['Nouakchott'],
  Mauritius: ['Port Louis'],
  Mexico: ['Altamira', 'Lázaro Cárdenas', 'Manzanillo', 'Veracruz'],
  Morocco: ['Casablanca', 'Tangier'],
  Mozambique: ['Beira', 'Maputo'],
  Namibia: ['Walvis Bay'],
  'New Caledonia': ['Nouméa'],
  'New Zealand': ['Auckland', 'Lyttelton', 'Nelson', 'Wellington'],
  Nigeria: ['Lagos (Apapa, Tin Can Island)'],
  Oman: ['Muscat (Port Sultan Qaboos)'],
  Panama: ['Manzanillo'],
  Peru: ['Callao', 'Pisco'],
  'Puerto Rico': ['San Juan'],
  Réunion: ['Port Réunion'],
  'Saudi Arabia': ['Jeddah'],
  Senegal: ['Dakar'],
  'Sierra Leone': ['Freetown'],
  Singapore: [],
  'Sint Maarten': ['Philipsburg'],
  'South Africa': ['Cape Town', 'Durban', 'East London', 'Port Elizabeth'],
  'South Korea': ['Kunsan', 'Masan', 'Pyeongtaek'],
  Spain: ['Pasajes', 'Sagunto', 'Santander', 'Vigo'],
  'Sri Lanka': ['Colombo'],
  'St Kitts': ['Basseterre'],
  'St Lucia': ['Castries'],
  'St Vincent': ['Kingstown'],
  Suriname: ['Paramaribo'],
  Sweden: ['Wallhamn'],
  Taiwan: ['Keelung', 'Taichung'],
  Tanzania: ['Dar es Salaam'],
  Thailand: ['Laem Chabang'],
  Togo: ['Lomé'],
  'Trinidad and Tobago': ['Port of Spain'],
  Turkey: ['Derince', 'Yarimca'],
  Uganda: [via('Uganda')],
  Uruguay: ['Montevideo'],
  USA: [
    'Baltimore', 'Benicia', 'Brunswick', 'Charleston', 'Davisville', 'Galveston', 'Jacksonville',
    'Long Beach', 'New York', 'Norfolk', 'Port Hueneme', 'San Diego', 'Tacoma',
  ],
  Zimbabwe: [`${via('Zimbabwe')} (Beitbridge, Plumtree, Harare)`],
};

// Africa is split the way the carriers' services are: the Atlantic seaboard
// from Morocco round to Angola, and the Indian Ocean side plus the south.
// (One "Africa" group of 26 made the desktop menu panel too tall.)
const continentNames: Record<string, string[]> = {
  'West Africa': [
    'Angola', 'Benin', 'Cameroon', 'Congo', "Côte d'Ivoire", 'Equatorial Guinea', 'Gambia',
    'Ghana', 'Guinea', 'Mauritania', 'Morocco', 'Nigeria', 'Senegal', 'Sierra Leone', 'Togo',
  ],
  'East & Southern Africa': [
    'Botswana', 'Eswatini', 'Kenya', 'Madagascar', 'Malawi', 'Mauritius', 'Mozambique',
    'Namibia', 'Réunion', 'Seychelles', 'South Africa', 'St Helena', 'Tanzania', 'Uganda',
    'Zambia', 'Zimbabwe',
  ],
  Asia: [
    'Bangladesh', 'Brunei', 'China', 'Hong Kong', 'India', 'Indonesia', 'Japan', 'Macau',
    'Malaysia', 'Maldives', 'Pakistan', 'Singapore', 'South Korea', 'Sri Lanka', 'Taiwan',
    'Thailand', 'Timor-Leste',
  ],
  Caribbean: [
    'Antigua', 'Aruba', 'Bahamas', 'Barbados', 'Bermuda', 'Cayman Islands', 'Curaçao', 'Dominica',
    'Dominican Republic', 'Grenada', 'Guadeloupe', 'Jamaica', 'Martinique', 'Puerto Rico',
    'Sint Maarten', 'St Kitts', 'St Lucia', 'St Vincent', 'Trinidad and Tobago',
  ],
  Europe: ['Cyprus', 'Greece', 'Guernsey', 'Ireland', 'Italy', 'Jersey', 'Malta', 'Spain', 'Sweden'],
  'Middle East': ['Jordan', 'Oman', 'Saudi Arabia', 'Turkey'],
  'North America': ['Canada', 'Mexico', 'USA'],
  // Split in two when the Pacific islands arrived (2026-09-30): one Oceania
  // group of 19 made the desktop panel's tallest column 28 rows, against 22
  // before; two groups pack to 26.
  Oceania: [
    'Australia', 'Fiji', 'French Polynesia', 'New Caledonia', 'New Zealand',
    'Papua New Guinea', 'Solomon Islands', 'Vanuatu',
  ],
  'Pacific Islands': [
    'American Samoa', 'Cook Islands', 'Guam', 'Kiribati', 'Marshall Islands', 'Micronesia',
    'Northern Mariana Islands', 'Samoa', 'Tonga', 'Tuvalu', 'Wallis and Futuna',
  ],
  'South & Central America': [
    'Argentina', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'French Guiana', 'Guyana', 'Panama',
    'Peru', 'Suriname', 'Uruguay',
  ],
};

// The region guide behind each menu heading, where one exists. North America,
// Oceania and South & Central America have no guide written yet, so their
// headings stay plain text - a heading that looks clickable and is not, or
// links nowhere, is worse than one that plainly is not a link.
export const continentPages: Record<string, string> = {
  'West Africa': '/car-shipping/africa',
  'East & Southern Africa': '/car-shipping/africa',
  Asia: '/car-shipping/car-export-to-asia',
  Caribbean: '/car-shipping/caribbean',
  Europe: '/car-shipping/europe',
  'Middle East': '/car-shipping/middle-east',
};

const hrefFor = (name: string) =>
  countryPages[name] ?? `/uk-car-sailing-schedule?country=${encodeURIComponent(scheduleNames[name] ?? name)}`;

export const continentCountries: Record<string, CountryLink[]> = Object.fromEntries(
  Object.entries(continentNames).map(([continent, names]) => [
    continent,
    names.map(name => ({ name, href: hrefFor(name), ports: countryPorts[name] ?? [] })),
  ]),
);

