export default function TEST() {

    // Funcíon para redireccionar a registro
        const router = useRouter();
    
        useEffect(() => {
            if (typeof window !== 'undefined') {
              console.log('Executing in the client');
            } else {
              console.log('Executing in the server');
            }
          }, []);
          
        const handleRedirect  = () => {
            router.push('/Registrar');
        }
    
        
    return (
        <div>
            <button onClick={handleRedirect} className='border-2 rounded-lg text-gray-700 border-gray-700 p-1'>
                Registrar Empleado.
            </button>
        </div>
    );
}