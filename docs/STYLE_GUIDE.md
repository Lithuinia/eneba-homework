# Intus Style Guide - Extracted from Examples

This guide is inferred from the saved HTML and CSS in `examples/`.

## Core palette

| Token | Value | Usage |
| --- | --- | --- |
| Primary purple | `#4618AC` | Header, page background |
| Deep purple | `#351183` | Dark surfaces |
| Footer/darkest purple | `#1F0A4D` | Product cards, header border |
| Hover purple | `#5825CC` | Hover states |
| Accent yellow | `#FAD318` | Primary CTA, highlights |
| Success green | `#23C299` | Discounts, positive values |
| Pale green border | `#63E3C2` | Featured card border |
| Muted lavender | `#B3AAC9` | Secondary text |
| Light lavender | `#C5B1F1` | Focus/hover light accents |
| Pink | `#E76A8C` | Sale/negative accents |
| Orange | `#F0A613` | Warning/promo accents |
| Red | `#D32252` | Errors/danger |
| Light surface | `#F4F4F6` | Light panels |
| White | `#FFFFFF` | Text on purple |

## Typography

- Primary font: `metropolis`, fallback `Arial, Helvetica, sans-serif`.
- Monospace font: `metropolis-monospace`.
- Base body size: `1.6rem`, line-height `1.5` (root font size is 10px in the reference CSS).
- Headings and buttons use heavy weights (`700`/`800`).
- Product cards use compact `1.2rem` text.

## Layout

- Page content max width: `1200px`, plus `20px` horizontal padding.
- Header:
  - Sticky at top.
  - Background `#4618AC`.
  - Bottom border `1px solid #1F0A4D`.
  - Height approximately `55px`.
  - Logo width `155px` desktop and `100px` compact/mobile.
  - Search field max width around `550px`.
  - Search placeholder: "Search games, add-ons and more".
- Homepage:
  - Hero/banner area above the main content.
  - Category sidebar/card grid.
  - Content sections use `display:grid` with 5-column product rows on desktop.
  - Product grid gap `20px`, reduced to `15px` on smaller screens.
- Product cards:
  - Dark card background `#1F0A4D`.
  - Cover image with 140% aspect ratio.
  - Discount/region/platform badges.
  - Two-line product title clamp.
  - Price block, add-to-cart button, and wishlist button.
  - Hover reveals action area.
- Product page:
  - Breadcrumb row.
  - Main product cover and buy box.
  - Seller offer list with price comparison.
  - Trust/payment badges.
  - Tabs: description, activation guide.
  - Related products.
- Buttons:
  - Primary CTA: yellow background with dark text.
  - Secondary/outline: transparent with white border; hover border yellow.
  - Buttons are bold, square/slightly rounded, and compact.

## Header contents observed

- Intus logo.
- Main navigation: Categories, Cheap games, Software, E-gift cards, Intus top-ups, Giveaway, TGA '26, GTA 6.
- Search input with clear button.
- Locale/currency selector (example: Lithuanian / EUR).
- Wishlist link.
- Cart button.
- Sign-in link or user menu.
- Mobile menu button.

## Footer contents observed

- About Intus, contact, careers, trust and transparency, engineering.
- Buying help, collections, loyalty, discounts, FAQ, activation, refunds.
- News, giveaways, partner program, sell on Intus, advertise.
- Social links: Facebook, X, Instagram, Discord, Reddit, Trustpilot.
- Legal links: terms, privacy, cookie settings.
- Payment method icons.
- Newsletter subscription.

## Notes

- The reference pages are localized to Lithuanian and priced in EUR.
- Content is data-driven in the reference; our homepage blocks must also be backend-driven.
