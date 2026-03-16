import { useForm } from "react-hook-form"
import type { CreateProductInput } from "../../types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createProduct } from "../../services/product.service"
import { getCategories } from "../../services/category.service"

export const AddProductForm = () => {

    const { register, reset, handleSubmit, formState: {errors} } = useForm<CreateProductInput>()


    const { data } = useQuery({
        queryKey: ['categorias'],
        queryFn: getCategories
    })

    const { mutate } = useMutation({
        mutationFn: createProduct,
        onError(error){
            console.log(error)
        },
        onSuccess(data){
            reset()
            console.log(data)
        }

    })

    const onSubmit = (data : CreateProductInput) => {
        mutate(data)
        console.log(data)
    }

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-51">
            <form
                className="my-10 p-8 w-[60%] mx-auto shadow-lg bg-blue-100 space-y-3 rounded-2xl"
                onSubmit={handleSubmit(onSubmit)}
            >

                <label htmlFor="name">Nombre del Producto:</label>
                <input type="text" id='name' placeholder="Nombre del Producto"
                    className="my-2 bg-white p-2 border rounded-lg w-full"
                    {...register ("name", { required: true })}

                />
                {errors.name && <p className="text-red-400 font-semibold italic">El nombre es requerido</p>}

                <label htmlFor="price">Precio del Producto:</label>
                <input type="number" id='price' placeholder="Precio del Producto"
                    className="my-2 bg-white p-2 border rounded-lg w-full"
                    {...register ("price", { required: true, valueAsNumber: true })}

                />
                {errors.price && <p className="text-red-400 font-semibold italic">El precio es requerido</p>}

                <label htmlFor="imageUrl">Imagen del Producto:</label>
                <input type="text" id='imageUrl' placeholder="Imagen del Producto"
                    className="my-2 p-2 bg-white border rounded-lg w-full"
                    {...register ("imageUrl", { required: true })}

                />
                {errors.imageUrl && <p className="text-red-400 font-semibold italic">La imagen es requerida</p>}

                <div className="grid md:grid-cols-2 gap-4 ">
                    <div className="flex flex-col">
                        <label htmlFor="category">Categoria del Producto:</label>

                        <select id="category" {...register("categoryId", { required: true,valueAsNumber: true })}
                        className="bg-white border p-2 rounded my-2">
                            {data?.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        
                        <label htmlFor="stock">Stock del Producto:</label>

                        <input type="number" id='stock' placeholder="Stock del Producto"
                            className="my-2 p-2 bg-white border rounded-lg w-full"
                            {...register("stock", { required: true, valueAsNumber: true })}
                        />
                        {errors.stock && <p className="text-red-400 font-semibold italic">El stock es requerido</p>}
                    </div>

                </div>
                
                <input type="submit" value={'Crear'}
                    className=" bg-blue-800 py-1.5 px-3 rounded-3xl my-2 text-white font-semibold hover:cursor-pointer"    
                />

            </form>
        </div>
    )
}
