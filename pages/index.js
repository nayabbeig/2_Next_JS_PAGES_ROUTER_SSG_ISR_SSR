// pages/index.js
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Blog demo — Rendering Methods</h1>
      <ul>
        <li><Link href="/ssg/1">SSG page (pages/ssg/[id].js)</Link></li>
        <li><Link href="/isr/1">ISR page (pages/isr/[id].js revalidate:10)</Link></li>
        <li><Link href="/ssr/1">SSR page (pages/ssr/[id].js)</Link></li>
        <li><Link href="/csr">CSR page (pages/csr.js)</Link></li>
        <li><Link href="/app">App Router examples (app/)</Link></li>
      </ul>
    </div>
  );
}
