# **SSG, ISR, SSR, Hydration, Fallbacks, Revalidation**

# 📚 Next.js Rendering Methods — Revision Notes

## 1️⃣ **Rendering Methods Overview**

| Method | Data Fetching Function | When Runs | Page Generation | Use Case |
| --- | --- | --- | --- | --- |
| **SSG (Static Site Generation)** | `getStaticProps` (+ `getStaticPaths` for dynamic routes) | **Build time** | HTML generated once during build | Content that rarely changes |
| **ISR (Incremental Static Regeneration)** | `getStaticProps` with `revalidate` | Build time + after revalidate interval | Rebuilds page in background after interval | Content that changes occasionally |
| **SSR (Server-Side Rendering)** | `getServerSideProps` | Every request | HTML generated fresh each request | Content that changes constantly or needs request-specific data |
| **CSR (Client-Side Rendering)** | Standard React code using `useEffect` | Browser | HTML skeleton + JS fetches data in browser | Highly interactive pages, dashboards, non-SEO content |

---

## 2️⃣ **Special Functions**

### **`getStaticPaths()`**

- **Used in:** Dynamic routes for SSG/ISR.
- **Purpose:** Tell Next.js which paths to pre-build.
- **Return format:**

```jsx
return {
  paths: [ { params: { id: '1' } }, { params: { id: '2' } } ],
  fallback: false | true | 'blocking'
}

```

- **Fallback modes:**
    - **false:** Only listed paths exist; others → 404.
    - **true:** Unlisted paths are generated in background on first visit; user sees fallback content first.
    - **'blocking':** Unlisted paths are generated on first visit **before** sending response (no loading state).

---

### **`getStaticProps(context)`**

- **When runs:** At build time (SSG), and again for ISR after revalidation.
- **Purpose:** Fetch data needed to render page.
- **Must return:**

```jsx
return {
  props: { ... },
  revalidate: N // optional, for ISR
}

```

---

### **`getServerSideProps(context)`**

- **When runs:** On every request.
- **Purpose:** Fetch fresh data for each request.
- **Must return:**

```jsx
return {
  props: { ... }
}

```

---

## 3️⃣ **SSG Example Flow**

```jsx
// pages/ssg/[id].js
export async function getStaticPaths() { /* get all IDs */ }
export async function getStaticProps({ params }) { /* fetch post */ }

```

**Flow:**

1. **Build time**:
    - `getStaticPaths()` runs → collects IDs.
    - `getStaticProps()` runs for each path → generates HTML.
2. **Request time**:
    - HTML served from disk instantly.
3. **Hydration**:
    - React JS bundle is downloaded.
    - Component code re-runs in browser to attach event listeners & interactivity.
    - Any dynamic values inside component (like `new Date()`) will re-run on hydration, possibly differing from pre-rendered HTML.

---

## 4️⃣ **ISR Example Flow**

```jsx
// pages/isr/[id].js
export async function getStaticProps() {
  return {
    props: { ... },
    revalidate: 10
  }
}

```

**Flow:**

1. Works like SSG initially.
2. After `revalidate` seconds, **on the next visit**, Next.js regenerates the page in the background.
3. Users during regeneration see the old version; next users get the new one.
4. If **no one visits**, regeneration does **not** happen automatically.

---

## 5️⃣ **SSR Example Flow**

```jsx
// pages/ssr/[id].js
export async function getServerSideProps({ params }) {
  // fetch data from API or DB
  return { props: { post } };
}

```

**Flow:**

1. **On every request**, server runs `getServerSideProps`.
2. Fresh HTML is rendered with fetched data.
3. Sent to browser → hydrated like any React app.
4. Always fresh, but slower than SSG/ISR because rendering happens per request.

---

## 6️⃣ **Hydration — Key Points**

- Happens **after HTML is served**.
- React’s JS bundle is downloaded, component code re-runs in browser to attach event listeners.
- HTML from server and React-rendered HTML must match; otherwise, you'll get a hydration warning.
- Example:

```jsx
export default function Page() {
  return <p>{new Date().toString()}</p>;
}

```

- **Build-time render**: Fixed timestamp in HTML.
- **Browser hydration**: Runs `new Date()` again — timestamp may differ.

---

## 7️⃣ **Fallback Behaviors Recap**

- **false** → Only build-time paths exist, others 404.
- **true** → Non-prebuilt pages generate in background; user sees fallback UI first.
- **blocking** → Non-prebuilt pages generated before response; no fallback UI.

---

## 8️⃣ **When to Choose Which**

| Scenario | Recommended Method |
| --- | --- |
| Rarely changing marketing page | **SSG** |
| Blog with occasional updates | **ISR** |
| Stock prices, news feed | **SSR** |
| User-specific dashboard | **SSR** or **CSR** |
| Highly interactive app with little SEO need | **CSR** |

---

If you want, I can turn this into a **color-coded diagram + timeline chart** so you visually see how **SSG, ISR, SSR** differ in execution. That will make the revision even quicker.