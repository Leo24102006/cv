import Link from "next/link";

export default function NotFound() {
  return (
    <main className="conteneur introuvable">
      <h1>Page introuvable</h1>
      <p>
        <Link href="/">Retour au CV</Link>
      </p>
    </main>
  );
}
