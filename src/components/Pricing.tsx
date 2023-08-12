import React from 'react'
import PricingCard from './PricingCard'

const PricingData:{heading:string,price:string, image:string,features:string[]}[] = [
    {
        heading: "Basic Looper",
        price: "Free",
        image: "/free.svg",
        features: ["up to 1 job title search (loop) per month","up to 10 applications or emails per month", "3 job boards","low priority applications"]
    },
    {
        heading: "Standard Looper",
        price: "₹149.99",
        image: "/standardPrice.svg",
        features: ["up to 20 job title searches in parallel (loops) per month","up to 100 applications or emails per month","20 job boards","medium priority applications","search for remote jobs anywhere in the world","custom email address"]
    },
]

const Pricing = () => {
  return (
    <div className='text-center my-28 px-4' id='pricing'>
        <h3 className='text-5xl font-bold'>Plans Made For You.</h3>
        <p className='max-w-lg mx-auto mt-8 text-xl'>Our vision is simple. To help you find a job super fast. Help us make it happen. 🚀</p>
        <div className='max-w-4xl grid grid-cols-1 md:grid-cols-2 mx-auto gap-4 mt-8' >
            {
                PricingData.map((card,index)=> (
                    <PricingCard heading={card.heading} price={card.price} image={card.image} features={card.features} index={index}/>
                ))
            }
        </div>
    </div>
  )
}

export default Pricing