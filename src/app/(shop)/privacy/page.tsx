import { Title } from "@/components";



export default async function PrivacyPage( ) {

  return (
    <div className="h-[82vh]">
      <Title title="Privacidad y Legal"  className="mb-2" />
      <div className="flex flex-wrap gap-5 justify-center">
      <div className=" flex flex-col w-10/12 sm:w-8/12  ">
        <span className="font-bold text-xl -ml-10 ">Privacidad</span>
        <p><strong>DZ-Shop</strong> se compromete a proteger la privacidad de sus usuarios. La siguiente Política de Privacidad detalla cómo recopilamos, usamos, divulgamos y protegemos la información personal que obtengamos a través de nuestro sitio web.</p>
        <p>La información recopilada se utiliza exclusivamente para procesar y administrar los pedidos.</p>
        <p>No vendemos, intercambiamos ni transferimos información personal a terceros sin el consentimiento del usuario.</p>
        <p>Implementamos medidas de seguridad para proteger la información personal de nuestros usuarios.</p>

        <p>Utilizamos cookies para mejorar la experiencia del usuario. Todas las cookies son necesarias para el buen funcionamiento del sitio.</p>
        <p>Al utilizar nuestro sitio, los usuarios aceptan los términos y condiciones establecidos en esta Política de Privacidad y los Términos de Uso.</p>
        <p>Para preguntas o inquietudes sobre nuestra Política de Privacidad, comuníquese con nosotros a +54 3764103154</p>
      </div>
      


      </div>
    </div>
  );
}
