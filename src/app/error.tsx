'use client'

import Link from "next/link";

export default function ErrorPage({ error }: { error: Error }) {
  console.error(error);

  return (
    <div>Che flaco algo salio mal, fijate de volver al inicio. <Link href='/'>Toca aca perro</Link>.</div>
  );
}