import React from 'react'
import { useParams } from 'react-router-dom'
import GeneralError from '../Components/GeneralError'
import Loader from '../Components/Loader'
import { useAxiosGet } from '../Hooks/HttpRequests'

function ProductDetail(props) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-3">
                {props.data.name}
            </h1>
            <div className='mb-3'>
                <img
                    src={props.data.images[0].imageUrl}
                    alt={props.data.name}
                />
            </div>
            <div className="font-bold text-xl">
                $ {props.data.price}
            </div>
            <div>
                {props.data.description}
            </div>
        </div>
    )
}
export default function Product() {
    const { id } = useParams()
    const url = `https://5e9623dc5b19f10016b5e31f.mockapi.io/api/v1/products/${id}`
    let product = useAxiosGet(url)

    return (
        <div className="container mx-auto">
            {product.error ?
                <GeneralError /> : product.loading ?
                    <Loader /> : product.data ?
                        <ProductDetail data={product.data} /> : <div />}
        </div>
    )
}