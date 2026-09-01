## What changed

## Competent authority or legal source

## Effective date and verification date

## Integrity checklist

- [ ] No affiliate, referral, sales, or promotional links
- [ ] No personal application information
- [ ] Old and new rules are clearly distinguished
- [ ] Verification dates changed only for pages fully reviewed against current sources
- [ ] `node scripts/validate-repo.mjs` passes
- [ ] `node scripts/audit-freshness.mjs --check-public-status` passes
- [ ] `node scripts/generate-site-config.mjs --check` passes
- [ ] `node scripts/run-mkdocs.mjs build --strict --site-dir .site` passes when site content or configuration changed
