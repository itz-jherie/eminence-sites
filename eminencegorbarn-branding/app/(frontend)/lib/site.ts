// ─── Per-site configuration ────────────────────────────────────────────────
// Each Eminence site is a clone of the same codebase pointed at the same
// Sanity project. ONLY this file (plus package.json name/port) differs
// between sites. Everything else filters through these values.
//
// Sites:
//   motion   → Motion only            (eminencegorbarn-motion)
//   branding → Branding only          (eminencegorbarn-branding)
//   product  → Product only           (eminencegorbarn-product)
//   combined → Motion + Branding      (eminencegorbarn-motion-branding)

export type SiteKey = 'motion' | 'branding' | 'product' | 'combined';

export const SITE_KEY: SiteKey = 'branding';

export const SITE_NAME = 'Eminence Gorbarn — Branding';

export const SITE_SHORT_NAME = 'Eminence Branding';

export const SITE_DEFAULT_TITLE = 'Eminence Gorbarn — Branding & Graphics Portfolio';

export const SITE_DEFAULT_DESC =
  'Branding and graphics portfolio by Eminence Gorbarn — visual identities, brand systems and graphic design.';

// Sanity categories this site serves
export const SITE_CATEGORIES: string[] = ['Branding', 'Graphics'];

// Fixed Sanity settings doc holding this site's homepage picks
// (IDs: site-motion, site-branding, site-product, site-combined)
export const SITE_SETTINGS_ID = 'site-branding';

// Visibility toggle field on project docs for this site.
// Clients "block" projects per site by unchecking it in the Studio.
// Filter uses `!= false` so older docs without the field stay visible.
export const SITE_VISIBILITY_FIELD = 'showOnBrandingSite';

export const SITE_VISIBILITY_FILTER = `${SITE_VISIBILITY_FIELD} != false`;

export const SITE_CATEGORY_FILTER = `category in [${SITE_CATEGORIES.map((c) => `"${c}"`).join(', ')}]`;
