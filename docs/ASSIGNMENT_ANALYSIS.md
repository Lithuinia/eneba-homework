# Eneba Internship Assignment - Analysis

Source: `Eneba Internship Assignment.pdf` (extracted text saved as `assignment_extracted.txt`).

## Assignment summary

Build a marketplace web application in Eneba's style that matches eneba.com.

Required product areas:

1. **Store** - catalog of all marketplace products with filters (platform, region, price), sorting, and name search.
2. **Homepage** - landing page assembled from blocks (banner, best sellers, deals, etc.). Each block must come from its own backend service/database; the frontend must not hardcode block content.
3. **Search** - search from anywhere in the app; handle typos and partial names.
4. **Product page** - single product details plus offers from multiple sellers so buyers can compare.
5. **Checkout** - cart, simulated/test payment, digital key delivery.
6. **Authentication** - registration and sign-in; checkout and order history require auth.
7. **Eneba styling** - colors, typography, spacing, and components should follow Eneba.

Technical constraints from the PDF:

- Frontend: React (TypeScript preferred).
- Backend: PHP (or Go), REST or GraphQL.
- Database: any database; schema and scope are our decision.
- Deliverables: GitHub link(s), public deployed URL on a free-tier service, and full agent chat history in Markdown or a link.

## User decisions/clarifications so far

- Conversation log must be saved as a Markdown file and maintained from now on.
- Frontend must use TypeScript.
- Backend must use PHP and connect to a phpMyAdmin-managed database.
- Search must tolerate up to 2 typo characters.
- Accent/special-character variants (for example `s` vs `š`) must not count as typos; normalize them as the same letter.
- Checkout is simplified for now: no bank information fields; checkout passes through as a simulated payment.

## Key ambiguity to resolve before coding

- React + TypeScript versus plain TypeScript frontend.
- PHP runtime environment and database credentials.
- UI language (English, Lithuanian, or both).
- Scope beyond the PDF-required pages (wishlist, giveaway, reviews, profile completion, etc.).
- Seed catalog coverage and image strategy.
