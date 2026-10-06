import { systemSchema } from '@/src/interface';
import { parseContent } from '@/src/interface/content';

/**
 * The kinds of system the studio builds, from the operational software common in
 * this market: POS, payroll, inventory, clinic, courier, microfinance.
 *
 * **These are shapes of build, not products.** FathomXO does custom work, so the
 * copy says "we build" rather than naming a version anyone could buy. That
 * distinction matters: a page listing sixteen products implies sixteen shipping
 * codebases with roadmaps and support tiers, which would be a claim nobody could
 * back. A page listing sixteen problem shapes says what the team has the range
 * to take on, which is both true and the actual question a buyer is asking.
 *
 * `serviceSlug` ties each one back to the line it is quoted under, so the
 * pricing tabs and this grid cannot drift apart.
 */
export const systems = parseContent(
  systemSchema,
  [
    {
      name: 'Business ERP',
      summary: 'One view over operations, stock, staff and money.',
      serviceSlug: 'website-app',
      order: 0,
    },
    {
      name: 'Accounting',
      summary: 'Ledgers, vouchers and statements that reconcile.',
      serviceSlug: 'website-app',
      order: 1,
    },
    {
      name: 'Point of sale',
      summary: 'Fast billing at the counter, stock syncing behind it.',
      serviceSlug: 'website-app',
      order: 2,
    },
    {
      name: 'Inventory and distribution',
      summary: 'Stock across locations, with real-time movement.',
      serviceSlug: 'website-app',
      order: 3,
    },
    {
      name: 'Manufacturing',
      summary: 'Production runs, materials and workflow on one board.',
      serviceSlug: 'website-app',
      order: 4,
    },
    {
      name: 'HR and payroll',
      summary: 'Attendance, salary and employee records without spreadsheets.',
      serviceSlug: 'website-app',
      order: 5,
    },
    {
      name: 'CRM and billing',
      summary: 'Customers, billing cycles and the conversation history.',
      serviceSlug: 'website-app',
      order: 6,
    },
    {
      name: 'Hospital and clinic',
      summary: 'Patients, appointments, reports and the front desk.',
      serviceSlug: 'website-app',
      order: 7,
    },
    {
      name: 'Education',
      summary: 'Students, staff, fees and results in one place.',
      serviceSlug: 'website-app',
      order: 8,
    },
    {
      name: 'Microfinance',
      summary: 'Loans, savings and member management with an audit trail.',
      serviceSlug: 'website-app',
      order: 9,
    },
    {
      name: 'Jewellery retail',
      summary: 'Weight-based pricing, making charges, stock by karat.',
      serviceSlug: 'e-commerce',
      order: 10,
    },
    {
      name: 'Garments and RMG',
      summary: 'Orders, lines, production and inventory for a factory floor.',
      serviceSlug: 'website-app',
      order: 11,
    },
    {
      name: 'Courier and logistics',
      summary: 'Parcels, riders and delivery status end to end.',
      serviceSlug: 'website-app',
      order: 12,
    },
    {
      name: 'Fleet and vehicles',
      summary: 'Vehicle tracking, servicing and running costs.',
      serviceSlug: 'website-app',
      order: 13,
    },
    {
      name: 'Queue and token',
      summary: 'Counter queues that move without anyone shouting a number.',
      serviceSlug: 'website-app',
      order: 14,
    },
    {
      name: 'Trading and wholesale',
      summary: 'Buy, sell, credit and the margin on every line.',
      serviceSlug: 'e-commerce',
      order: 15,
    },
  ],
  'systems.ts'
);
