import React from 'react'
import Loader from '../Components/Loader'
import { useAxiosGet } from '../Hooks/HttpRequests'
import { Link } from 'react-router-dom'
import GeneralError from '../Components/GeneralError'

function ProductCard(props) {
    return (
        <div className="border mb-4 rounded flex flex-col overflow-hidden h-full justify-between">
            <Link to={`/products/${props.product.id}`}>
                <div
                    style={{
                        'backgroundImage': `url('${props.product.images[0].imageUrl}')`,
                    }}
                    className="w-full h-64 bg-blue bg-cover"
                >
                </div>
            </Link>
            <div className="p-3 grow">
                <h3 className="font-bold text-xl mb-3">
                    <Link to={`/products/${props.product.id}`}>
                        {props.product.name}
                    </Link>
                </h3>
                <div className="font-bold mb-3">
                    $ {props.product.price}
                </div>
                <div className="mb-3">
                    {props.product.description}
                </div>

            </div>
            <div className="p-3">
                <Link
                    to={`/products/${props.product.id}`}
                    className="bg-blue-500 text-white p-2 flex justify-center w-full"
                >
                    View
                </Link>
            </div>
        </div>
    )
}

function ProductList(props) {
    return (
        <div className="md:flex flex-wrap">
            {
                props.data.map((product) =>
                    <div key={product.id} className="flex-no-shrink w-full md:w-1/3 lg:w-1/4 md:p-3">
                        <ProductCard
                            product={product}
                        />
                    </div>
                )
            }
        </div>
    )
}

function Home() {
    const url = `https://5e9623dc5b19f10016b5e31f.mockapi.io/api/v1/products?page=1&limit=10`
    let products = useAxiosGet(url)
    return (
        <div className="container mx-auto">
            <h1 className="font-bold text-2xl mb-3">
                Best Sellers
            </h1>
            {products.error ?
                <GeneralError /> : products.loading ?
                    <Loader /> : products.data ?
                        <ProductList data={products.data} /> : <div />}

        </div>
    )
}

export default Home