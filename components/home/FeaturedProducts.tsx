"use client";

import Image from "next/image";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";

import { featuredProducts } from "@/data/products";

export default function FeaturedProducts(){

return(

<section className="py-24 bg-white">

<Container>

<SectionTitle

subtitle="Products"

title="Featured Components"

/>

<div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

{featuredProducts.map(product=>(

<div
key={product.id}
className="overflow-hidden rounded-2xl bg-white shadow-xl transition hover:-translate-y-2 hover:shadow-2xl"
>

<div className="relative h-64 w-full">
<Image
src={product.image}
alt={product.name}
fill
sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
className="object-cover"
/>
</div>

<div className="p-6">

<h3 className="text-2xl font-bold">

{product.name}

</h3>

<div className="mt-5 space-y-2 text-gray-600">

<p><strong>Material:</strong> {product.material}</p>

<p><strong>Process:</strong> {product.process}</p>

<p><strong>Finish:</strong> {product.finish}</p>

<p><strong>Industry:</strong> {product.industry}</p>

</div>

<div className="mt-6">

<Button href="/upload">

Request Similar Part

</Button>

</div>

</div>

</div>

))}

</div>

</Container>

</section>

)

}