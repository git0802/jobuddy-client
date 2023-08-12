import React from 'react'

const PricingCard = (props:{heading:string,price:string, image:string,features:string[], index:number}) => {
  return (
    <div className='max-w-md text-center border-2 shadow-xl rounded-md  p-4 mx-auto' key={props.index}>
        <p className='mt-4 text-lg font-semibold'>{props.heading}</p>
        <p className='text-5xl mt-6 font-semibold'>{props.price}</p>
        <p className='text-xs opacity-30 mt-6'>{props.price === 'Free' ? '' : 'per month'}</p>
        <img src={props.image} className='mx-auto my-4'/>
        <button className='bg-black px-4 py-4 rounded-md text-white text-base font-semibold mx-auto w-44 my-4'>Sign Up</button>
        <div className='flex flex-col gap-4 mt-4 mx-auto'>
        {
            props.features.map((feature,index) =>(
                <div className='flex mx-6' key={index}>
                        <img src="/tickPrice.svg" className='h-8 my-auto' />
                        <p className=' ml-3 text-left'>{feature}</p>
                    </div>
            ) )
        }
        </div>

    </div>
  )
}

export default PricingCard