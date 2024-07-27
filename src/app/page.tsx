import api from "@/api"
import Link from "next/link"

export default async function HomePage() {
  const restaurantsData = await api.list()

  const restaurants = restaurantsData.map((restaurant) => {
    return (
      <article key={restaurant.id}>
        <Link href={`/${restaurant.id}`} key={restaurant.id}>
          <img
            alt={restaurant.name}
            className="mb-3 h-[300px] w-full object-cover"
            src={restaurant.image}
          />
          <h2 className="inline-flex gap-2 mr-2 text-lg font-bold">{restaurant.name}</h2>
        </Link>
        <small className="inline-flex gap-1 font-bold">
          <span>⭐</span>
          <span>{restaurant.score}</span>
          <span className="font-normal opacity-75">({restaurant.ratings})</span>
        </small>
        <p className="opacity-90">{restaurant.description}</p>
      </article>
    )
  })

  return (
    <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      {restaurants}
    </section>
  )
}
