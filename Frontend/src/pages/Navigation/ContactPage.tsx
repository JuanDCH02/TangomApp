import { toast } from "sonner";
import { MdMarkEmailRead, MdEmail } from "react-icons/md";

export const ContactPage = () => {

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget;
        const data = new FormData(form)

        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
            form.reset();
            toast.success('Consulta Enviada', {
            description:'Nos pondremos en contacto contigo',
            icon:<MdMarkEmailRead className='text-lg text-green-700' />
        });
        } else {
            toast.error('Error en la Consulta ', {
            description:'Intentalo nuevamente',
            icon:<MdEmail className='text-lg text-red-700' />
        });
        }
    }


    return (
        <div className="flex flex-col items-center justify-center my-8">
            

            <h2 className="flex flex-col text-3xl font-black text-center my-6 text-shadow-lg/20">
                Puedes ponerte en contacto con nostros con el siguiente formulario:
                <span className="text-xl text-center font-bold text-blue-600">no dudes en consultar.</span>

            </h2>

            <form onSubmit={handleSubmit} action="https://formspree.io/f/xdkekwyy" method="POST"
                className=" space-y-2 w-1/2 border border-slate-500 rounded-xl shadow-2xl p-5"
            >
                <label htmlFor="name" className="text-lg font-semibold "
                    >Nombre / Empresa:
                </label>
                <input type="text" name="name" placeholder="Julio Morbelli / Tangoma srl" id="name" required
                    className="p-2.5 border rounded w-full focus:outline-blue-500"
                />
                
                <label htmlFor="email" className="text-lg font-semibold mb-1"
                    >Correo Electrónico:
                </label>
                <input 
                    type="email" name="email" required placeholder="ejemplo@correo.com" id="email" 
                    className="p-2.5 border rounded w-full focus:outline-blue-500"
                />

                <label htmlFor="message" className="text-lg font-semibold "
                    >Mensaje:
                </label>
                <textarea id="message" name="message" placeholder="Escribe tu consulta aquí" required
                    className="p-3.5 border rounded w-full focus:outline-blue-500"
                ></textarea>

                <button type="submit" 
                className="p-2.5 text-blue-700 font-bold rounded hover:cursor-pointer hover:bg-blue-700 hover:text-white transition-all "
                    >Enviar consulta
                </button>
            </form>

        </div>
    )
}
