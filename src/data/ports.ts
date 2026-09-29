// Destination port guides: one page per port at /car-shipping/ports/<slug>,
// linked from each country page's "Destination Ports" list.
//
// The port facts live in ports.json. They were researched from port authority,
// terminal operator and trade press sources in September 2026, and each entry
// keeps the URLs it was taken from in `sources`, for checking (they are not
// shown on the page). Like the country pages, these stop short of destination
// import rules: location, facilities, operators, vehicle handling and
// hinterland only.
//
// Country pages get their port names from the weekly sailing schedule, which
// spells the same port several ways ("Port Kelang", "Lome", "Jakarta/T.Priok"),
// so links are resolved through `aliases` rather than by exact name. A name that
// matches nothing (an inland delivery point such as Lusaka) simply stays plain
// text, so a new schedule spelling can never produce a broken link.

import portData from './ports.json';
import schedules from './sailing-schedules.json';
import { scheduleNames } from './destinations';

export interface PortFact {
  label: string;
  value: string;
}

export interface Port {
  slug: string;
  name: string;
  fullName: string;
  country: string;
  aliases: string[];
  locode: string | null;
  location: string;
  summary: string;
  vehicleHandling: string;
  hinterland: string | null;
  facts: PortFact[];
  sources: string[];
}

export const ports: Port[] = (portData as Port[])
  .slice()
  .sort((a, b) => a.country.localeCompare(b.country) || a.name.localeCompare(b.name));

/** "Pointe-à-Pitre" -> "pointeapitre", so accents, spaces and dots never block a match. */
const norm = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');

const keysOf = (p: Port) => new Set([p.name, p.fullName, ...p.aliases].map(norm));

/**
 * The port guide a displayed port name refers to, or undefined. `country` is
 * the page it appears on: a same-country match wins, which is what separates
 * the Manzanillos of Mexico, Panama and the Dominican Republic. Hub-served
 * countries list a neighbour's port (Botswana shows Walvis Bay), so failing a
 * same-country match, a name that is unique across all ports still resolves.
 */
export function portFor(name: string, country?: string): Port | undefined {
  const n = norm(name);
  if (!n) return undefined;
  const hits = ports.filter(p => keysOf(p).has(n));
  const local = country ? hits.filter(p => p.country === country) : [];
  if (local.length) return local[0];
  return hits.length === 1 ? hits[0] : undefined;
}

export const portHref = (p: Port) => `/car-shipping/ports/${p.slug}`;

/** Convenience for templates: the href, or undefined to render plain text. */
export const portLinkFor = (name: string, country?: string) => {
  const p = portFor(name, country);
  return p ? portHref(p) : undefined;
};

/** Upcoming schedule rows whose discharge port is this port. */
export function sailingsFor(port: Port): any[] {
  const today = new Date().toISOString().slice(0, 10);
  const keys = keysOf(port);
  const countries = new Set(
    [port.country, scheduleNames[port.country] ?? port.country].map(c => c.toLowerCase()),
  );
  return (schedules.sailings as any[])
    .filter(s => {
      if (!s.ets || s.ets < today) return false;
      const i = s.destination.lastIndexOf(',');
      if (i === -1) return false;
      return (
        countries.has(s.destination.slice(i + 1).trim().toLowerCase()) &&
        keys.has(norm(s.destination.slice(0, i)))
      );
    })
    .sort((a, b) => a.ets.localeCompare(b.ets));
}
