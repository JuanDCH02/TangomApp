

export const WhereAre = () => {
    return (
    <>

        <h2 className="flex flex-col text-3xl font-black text-center my-6 text-shadow-lg/20">
            Estamos ubicados en MÉXICO 781, CABA, Argentina.
            <span className="text-xl text-center font-bold text-blue-600">entre piedras y chacabuco.</span>
        </h2>

        <p className="text-center mb-8">
            Puedes encontrarnos de Lunes a Viernes de 8:00 a 12:00 
        </p>
        
        
        <section className="flex justify-center my-10 rounded-md">
            
            <iframe
                
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.571697270299!2d-58.37973632350988!3d-34.61499045809493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccad5e0d5791d%3A0xb75861a90a868eb!2sTangoma!5e0!3m2!1ses!2sar!4v1774379156244!5m2!1ses!2sar"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
            
        </section>
      
      
    </>
    )
}
