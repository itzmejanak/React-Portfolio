# Full website transformation: resume data, live backend, animated pages, admin

## Goal
Every page matches the new cinematic home page and moves the same way. All content comes from your RevDB backend, updated from your resume. Nothing is hard-coded. The contact form saves to your backend, and a private admin area lets you review the messages.

## 1. Update your backend from your resume (one-time sync)
Write your resume into the existing `portfolio` database with RevDB's bulk-replace endpoint (PUT /api/collections/[name]). I'll save a backup of every collection first so nothing is lost.
- **profile** (new): name, headline, bio, phone, email, location, education (BSc (Hons) Computing, Informatics College Pokhara, expected Jun 2026), portfolio/GitHub/LinkedIn links.
- **experience** (new): Everest Technologies (Full-Stack Developer, Jan 2026 – present) and Devalaya Infosys (Full Stack Engineer, Jan 2025 – present), each with its bullet points.
- **projects** (replace): DNSHero, Katha, RevArt Suite, RevReels & RevVid, RevChatBot, IpoMitra, ChargeGhar, RevTemp Suite, AITextTuner, Music Player and Calculator Pro, each with its category, tech stack, description and links.
- **skills** (replace): the resume's groups (Languages, Frontend, Backend, Mobile, Desktop, Database, IoT & Cloud, AI).
- **achievements** (update): 15+ apps shipped, 10+ public repositories, 2 companies, plus the other resume achievements.
- **hero overlay text** (new `heroCopy`): the lines shown during the scroll animation, so you can edit them from the admin panel.
- Unchanged: services, clients/testimonials, whyChooseMe, socialHandles, footer, appData, pdfData.

## 2. Make the site fully backend-driven
- Remove the bundled local JSON copy and every hard-coded text: hero lines, bio, nav labels and footer come from the backend.
- The backend key moves off the browser. The site reads data through its own server, which adds the key.
- Clean loading skeletons and a friendly error state, instead of silently showing old data.

## 3. Consistent animation across every page
One shared motion system, same as the home page:
- Section reveals: headings slide up, cards appear one after another, and the ember line under headings draws in as you scroll.
- A scroll progress bar at the top of every page, and a slight tilt on cards when you hover.
- New pages: **/experience** (animated timeline) and **/projects/$slug** (project detail pages).
- /apps and /e-books get a cinematic banner with scroll-driven parallax, animated filter chips and staggered grids.
- Pages cross-fade when you navigate.

## 4. Contact form saved to your backend
- The form sends name, email, subject and message to a new `messages` collection in a new `admin` database on RevDB, through the site's server. It checks every field and includes spam protection (a hidden trap field and a rate limit).
- Success and error messages shown right in the form.

## 5. Admin area (link in the footer)
- A small "Admin" link in the footer opens /admin/login.
- Admin accounts are stored in an `admins` collection in the new `admin` database. Passwords are securely hashed, never stored in plain text.
- On first run, an /admin/setup page lets you create the first admin. It locks itself once an admin exists.
- After you sign in, you get a secure login cookie (8-hour session). Then:
  - **/admin/messages**: inbox list with read/unread status, search, message details, mark as read and delete.
  - **/admin/content**: a simple viewer showing each portfolio collection, so you can check the data.
- Every admin page and action checks your login on the server.

## Technical details
- New server functions in `src/lib/revdb.functions.ts` (read collections, submit message, admin auth, message management) plus `src/lib/revdb.server.ts` for the fetch helper.
- The RevDB key becomes the `REVDB_API_KEY` secret (the value you gave), and a generated `ADMIN_SESSION_SECRET` signs the login cookie.
- Passwords are hashed with PBKDF2 (Web Crypto).
- The admin pages sit under an `/admin` layout, with a server-side check in `beforeLoad` plus a check in each server function.
- One reusable `Reveal` / `Stagger` animation wrapper (built with motion) is used by every section, so the motion is consistent.
- The one-time resume sync is a script run from the sandbox, with the pre-sync backup saved to /tmp and your Files.
- Collections that RevDB's bulk endpoint can't create get created with POST /api/collections first.

## Note
The API key was shared in chat. You may want to rotate it on RevDB after launch; the site then only needs the secret updated.
