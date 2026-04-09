import { useForm } from "react-hook-form"
import type { ProductFormData } from "../../types"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../../services/category.service"
import { useEffect, useState } from "react"


type Props = {
    defaultValues?: ProductFormData
    onSubmit: (data: ProductFormData) => void
    text: string
}

export const ProductForm = ({ defaultValues, onSubmit, text }: Props) => {

    const [preview, setPreview] = useState("")

    const { register, reset, handleSubmit, setValue, formState: {errors} } = useForm<ProductFormData>({defaultValues})

    const { data } = useQuery({
        queryKey: ['categorias'],
        queryFn: getCategories
    })

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "productos_preset_tangomapp") // tu preset

        const res = await fetch("https://api.cloudinary.com/v1_1/dhpxh63m1/image/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json()

        // seteás la URL en el form
        setValue("imageUrl", data.secure_url)
        setPreview(data.secure_url)
    }

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues)
        }
    }, [defaultValues, reset])

    
    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-51">
            <form
                className="my-10 p-8 w-[60%] mx-auto shadow-lg bg-blue-100 space-y-3 rounded-2xl"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className="text-center text-2xl text-slate-500 font-bold"> {text} </h2>
                
                <label htmlFor="name">Nombre del Producto:</label>
                <input type="text" id='name' placeholder="Nombre del Producto"
                    className="my-2 bg-white p-2 border rounded-lg w-full"
                    {...register ("name", { required: true})}

                />
                {errors.name && <p className="text-red-400 font-semibold italic">El nombre es requerido</p>}

                <label htmlFor="price">Precio del Producto:</label>
                <input type="number" step='any' id='price' placeholder="Precio del Producto"
                    className="my-2 bg-white p-2 border rounded-lg w-full"
                    {...register ("price", { required: true, setValueAs: (v) => v === "" ? undefined : Number(v) })}

                />
                {errors.price && <p className="text-red-400 font-semibold italic">El precio es requerido</p>}

                <label htmlFor="imageUrl">Imagen del Producto:</label> 
                <input type="file" accept="image/*" id='imageUrl' placeholder="Imagen del Producto"
                    className="my-2 p-2 bg-white border rounded-lg w-full"
                    onChange={handleImageUpload}

                />
                {preview && (
                    <img src={preview} className="w-32 h-32 object-cover rounded" />
                )}
                {errors.imageUrl && <p className="text-red-400 font-semibold italic">La imagen es requerida</p>}

                <div className="grid md:grid-cols-2 gap-4 ">
                    <div className="flex flex-col">
                        <label htmlFor="category">Categoria del Producto:</label>

                        <select id="category" {...register("categoryId", { required: true,setValueAs: (v) => v === "" ? undefined : Number(v) })}
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
                            {...register("stock", { required: true, setValueAs: (v) => v === "" ? undefined : Number(v) })}
                        />
                        {errors.stock && <p className="text-red-400 font-semibold italic">El stock es requerido</p>}
                    </div>

                </div>
                
                <input type="submit" value={'Enviar'}
                    className=" bg-blue-800 py-1.5 px-3 rounded-3xl my-2 text-white font-semibold hover:cursor-pointer"    
                />

            </form>
        </div>
    )
}
