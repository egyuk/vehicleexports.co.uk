// Shared-container rates, shown as a "Shared Container" card in the costs
// section of the country pages (src/components/CountryCosts.astro), after the
// RoRo and private-container cards, and as a table on
// /car-shipping/shipping-rates.
//
// A different product from src/data/shipping-rates.ts. The car shares a
// container with other vehicles and is priced by vehicle type, from delivery to
// the UK depot it departs from through to arrival at the destination port.
// Destination charges are the importer's, as everywhere else on these pages.
//
// TWO FILES, TWO OWNERS:
//   * this file holds the words: ports, departure depot, row labels and notes.
//     Edit it by hand.
//   * shared-container-prices.json holds the figures and the validity date. It
//     is rewritten every month from a forwarder's card by a scheduled update
//     that runs outside this repo, so do not hand-edit it unless that update is
//     retired. The figures are selling prices, with any line surcharge and our
//     markup already included. The repo is public, so the forwarder's own rates
//     and the markup are deliberately not kept here.
//
// If a label here names a price the JSON does not have, the build fails rather
// than printing "£undefined".
//
// Hong Kong's page is markdown with its own rate table
// (src/content/countries/hong-kong-car-shipping.md). The monthly update
// rewrites its two shared-container figures too, matching on the row wording,
// so reword those rows only together with the update.

import data from './shared-container-prices.json';

type PriceKey = 'motorbike' | 'saloon' | 'suv' | 'suvLow' | 'suvHigh' | 'smallVan' | 'van' | 'vanLong';

interface Route {
  /** Arrival ports the rates cover. */
  ports: string[];
  /** UK depot the vehicle is delivered to. The container departs from there. */
  departsFrom: string;
  /** Which prices to show, in order, and how to label each. */
  rows: [PriceKey, string][];
  /** Anything specific to the route, such as ports quoted on request. */
  note?: string;
}

const SALOON = 'Saloon (up to 1.6m high, 5.2m long)';
const SUV = 'SUV / 4x4 (up to 2m high, 5.2m long)';
const CAR_ROWS: [PriceKey, string][] = [
  ['motorbike', 'Motorbike'],
  ['saloon', SALOON],
  ['suv', SUV],
  ['van', 'Van (up to 6m long)'],
];

const routes: Record<string, Route> = {
  Australia: {
    ports: ['Melbourne', 'Sydney', 'Fremantle', 'Adelaide', 'Brisbane'],
    departsFrom: 'Southampton',
    rows: CAR_ROWS,
  },
  'New Zealand': {
    ports: ['Auckland', 'Lyttelton', 'Tauranga'],
    departsFrom: 'Southampton',
    rows: CAR_ROWS,
    note: 'Wellington, Hamilton and Napier are quoted on request.',
  },
  // No country page uses this one (Hong Kong's page is markdown); it is here
  // for the table on the rates page.
  'Hong Kong': {
    ports: ['Hong Kong'],
    departsFrom: 'Grays, Essex',
    rows: [['saloon', SALOON], ['suv', SUV]],
  },
  Singapore: {
    ports: ['Singapore'],
    departsFrom: 'Grays, Essex',
    rows: [['saloon', SALOON], ['suv', SUV]],
  },
  // The card gives no size limits for South Africa, so none are claimed here.
  'South Africa': {
    ports: ['Cape Town', 'Durban'],
    departsFrom: 'Grays, Essex',
    rows: [['saloon', 'Saloon'], ['suv', 'SUV / 4x4']],
  },
  Cyprus: {
    ports: ['Limassol'],
    departsFrom: 'Grays, Essex',
    rows: [
      ['saloon', 'Saloon (up to 5.2m long)'],
      ['suvLow', 'SUV / 4x4 (under 1.68m high)'],
      ['suvHigh', 'SUV / 4x4 (over 1.68m high)'],
      ['smallVan', 'Small van or double-cab pickup'],
      ['van', 'Van (up to 6m long)'],
      ['vanLong', 'Van (over 6m long)'],
    ],
    note: 'Vans over 6m are confirmed at booking.',
  },
};

export interface SharedContainerCard {
  ports: string[];
  departsFrom: string;
  rates: { vehicle: string; price: string }[];
  /** How electric and hybrid vehicles are handled on this route. */
  evNote: string;
  note?: string;
  /** Last sailing date the current figures cover. */
  validTo: string;
}

const prices = data.prices as Record<string, Partial<Record<PriceKey, number>>>;
const evSurcharge = data.evSurcharge as Record<string, number | undefined>;
const gbp = (n: number) => `£${n.toLocaleString('en-GB')}`;

const priceOf = (country: string, key: PriceKey): string => {
  const n = prices[country]?.[key];
  if (typeof n !== 'number') throw new Error(`shared-container-prices.json has no "${key}" price for ${country}`);
  return gbp(n);
};

export const sharedContainerRates: Record<string, SharedContainerCard> = Object.fromEntries(
  Object.entries(routes).map(([country, route]) => {
    const ev = evSurcharge[country];
    return [
      country,
      {
        ports: route.ports,
        departsFrom: route.departsFrom,
        rates: route.rows.map(([key, vehicle]) => ({ vehicle, price: priceOf(country, key) })),
        evNote: ev
          ? `Electric and hybrid vehicles are accepted with a ${gbp(ev)} hazardous-cargo surcharge.`
          : 'Electric and hybrid vehicles are quoted case by case.',
        note: route.note,
        validTo: data.validTo,
      },
    ];
  }),
);

/**
 * One sentence for a country page's "How much does it cost" FAQ, or '' where
 * no shared-container rate covers the country. Kept here so the FAQ and the
 * card above it read the same figures.
 */
export const sharedContainerFaqLine = (country: string): string => {
  const route = routes[country];
  if (!route) return '';
  const keys = route.rows.map(([key]) => key);
  const suv = keys.includes('suv') ? priceOf(country, 'suv') : keys.includes('suvLow') ? `from ${priceOf(country, 'suvLow')}` : '';
  return `In a shared container departing ${route.departsFrom}, a saloon costs ${priceOf(country, 'saloon')}${suv ? ` and an SUV ${suv}` : ''} per vehicle.`;
};
