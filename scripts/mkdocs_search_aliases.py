"""Add derived English aliases to MkDocs search metadata.

The hook deliberately leaves Markdown and policy metadata untouched.  It only
adds aliases to ``page.meta["tags"]`` so Material for MkDocs can index common
English country, category, and education-level queries on this Chinese-first
site.

The module imports only the Python standard library.  ``aliases_for_src_uri``
and ``merge_tags`` are public pure functions so the path and de-duplication
rules can be tested without importing or constructing MkDocs objects.
"""

from __future__ import annotations

from collections.abc import Iterable, Mapping, MutableMapping
from pathlib import PurePosixPath
from typing import Any


CATEGORY_ALIASES: dict[str, tuple[str, ...]] = {
    "citizenship-by-investment": (
        "citizenship by investment",
        "investment citizenship",
        "CBI",
    ),
    "investment-permanent-residence": (
        "permanent residence by investment",
        "investor permanent residence",
        "investment PR",
    ),
    "investment-residence": (
        "residence by investment",
        "residency by investment",
        "investor residence",
        "golden visa",
    ),
    "entrepreneur-business-residence": (
        "entrepreneur residence",
        "business residence",
        "entrepreneur visa",
        "startup visa",
        "start-up visa",
    ),
    "study-student-residence": (
        "study",
        "student residence",
        "student visa",
        "study permit",
        "international student",
    ),
    "digital-nomad-remote-work": (
        "digital nomad",
        "digital nomad visa",
        "remote work",
        "remote worker visa",
    ),
    "visitor-financial-remote": (
        "visitor remote work",
        "remote work visitor",
        "financially independent visitor",
    ),
    "passive-income-retirement": (
        "passive income",
        "passive income visa",
        "retirement residence",
        "retirement visa",
        "retiree residence",
    ),
    "closed-paused-unverified": (
        "closed programs",
        "paused programs",
        "unverified programs",
        "archived programs",
    ),
}


COUNTRY_ALIASES: dict[str, tuple[str, ...]] = {
    "cabo-verde": ("Cape Verde",),
    "canada-quebec": ("Canada Quebec", "Quebec", "Québec"),
    "czech-republic": ("Czech Republic", "Czechia"),
    "hong-kong": ("Hong Kong", "HK", "HKSAR", "Hong Kong SAR"),
    "new-zealand": ("New Zealand", "NZ"),
    "north-macedonia": ("North Macedonia", "Macedonia"),
    "saint-kitts-and-nevis": ("Saint Kitts and Nevis", "St Kitts and Nevis"),
    "saint-lucia": ("Saint Lucia", "St Lucia"),
    "sao-tome-and-principe": (
        "Sao Tome and Principe",
        "São Tomé and Príncipe",
    ),
    "south-korea": ("South Korea", "Korea", "Republic of Korea", "ROK"),
    "turkey": ("Turkey", "Türkiye", "Turkiye"),
    "united-arab-emirates": ("United Arab Emirates", "UAE", "Emirates"),
    "united-kingdom": ("United Kingdom", "UK", "Britain", "Great Britain"),
    "united-states": (
        "United States",
        "United States of America",
        "USA",
        "US",
        "America",
    ),
}


STUDY_ROUTE_ALIASES: dict[str, tuple[str, ...]] = {
    "university": ("university", "higher education", "college"),
    "primary-secondary": (
        "primary school",
        "secondary school",
        "K-12",
        "K12",
        "school",
    ),
}


def _title_case_slug(slug: str) -> str:
    """Convert a lower-case directory slug into a readable English alias."""

    return " ".join(part.capitalize() for part in slug.split("-") if part)


def _src_parts(src_uri: object) -> tuple[str, ...]:
    """Return portable POSIX path parts for a MkDocs ``src_uri`` value."""

    if src_uri is None:
        return ()
    value = str(src_uri).strip().replace("\\", "/").lstrip("/")
    if not value:
        return ()
    return tuple(part for part in PurePosixPath(value).parts if part not in {"", "."})


def _dedupe(values: Iterable[Any]) -> list[Any]:
    """De-duplicate values while retaining the first spelling and order."""

    result: list[Any] = []
    seen: set[tuple[str, str]] = set()
    for value in values:
        if isinstance(value, str):
            key = ("str", value.strip().casefold())
        else:
            key = (type(value).__qualname__, repr(value))
        if key in seen:
            continue
        seen.add(key)
        result.append(value)
    return result


def aliases_for_src_uri(src_uri: object) -> tuple[str, ...]:
    """Derive search aliases for one Markdown source path.

    Category indexes receive category aliases.  Country indexes and route
    pages additionally receive a title-cased country slug plus curated common
    names or abbreviations.  Study route pages receive education-level terms.
    Non-Markdown files and pages outside the registered content categories do
    not receive aliases.
    """

    parts = _src_parts(src_uri)
    if not parts or not parts[-1].lower().endswith(".md"):
        return ()

    category_slug = parts[0]
    category_aliases = CATEGORY_ALIASES.get(category_slug)
    if category_aliases is None:
        return ()

    aliases: list[str] = [_title_case_slug(category_slug), *category_aliases]

    # category/README.md has no country segment.  Country indexes and content
    # leaves always have at least category/country/README.md.
    if len(parts) >= 3:
        country_slug = parts[1]
        aliases.append(_title_case_slug(country_slug))
        aliases.extend(COUNTRY_ALIASES.get(country_slug, ()))

    # Registered study leaves use category/country/route/README.md.
    if category_slug == "study-student-residence" and len(parts) >= 4:
        aliases.extend(STUDY_ROUTE_ALIASES.get(parts[2], ()))

    return tuple(_dedupe(aliases))


def merge_tags(existing_tags: object, aliases: Iterable[str]) -> list[Any]:
    """Return existing tags plus aliases, preserving values and order."""

    if existing_tags is None:
        current: list[Any] = []
    elif isinstance(existing_tags, str):
        current = [existing_tags]
    elif isinstance(existing_tags, (list, tuple, set, frozenset)):
        current = list(existing_tags)
    else:
        current = [existing_tags]
    return _dedupe([*current, *aliases])


def on_page_markdown(
    markdown: str,
    page: Any,
    config: Any = None,
    files: Any = None,
    **kwargs: Any,
) -> str:
    """MkDocs hook: add search aliases as tags and return Markdown unchanged."""

    del config, files, kwargs

    file_info = getattr(page, "file", None)
    aliases = aliases_for_src_uri(getattr(file_info, "src_uri", None))
    if not aliases:
        return markdown

    meta = getattr(page, "meta", None)
    if isinstance(meta, Mapping):
        search = meta.get("search")
        if isinstance(search, Mapping) and search.get("exclude"):
            return markdown

    if isinstance(meta, MutableMapping):
        mutable_meta = meta
    elif isinstance(meta, Mapping):
        mutable_meta = dict(meta)
        page.meta = mutable_meta
    else:
        mutable_meta = {}
        page.meta = mutable_meta

    mutable_meta["tags"] = merge_tags(mutable_meta.get("tags"), aliases)
    return markdown

