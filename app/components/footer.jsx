export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Enlaces del footer */}
            <ul className="space-x-4">
              <li><a href="/about" className="hover:text-gray-400">Sobre Nosotros</a></li>
              <li><a href="/contact" className="hover:text-gray-400">Contacto</a></li>
              <li><a href="/privacy" className="hover:text-gray-400">Política de Privacidad</a></li>
            </ul>
            
            {/* Copyright */}
            <p className="text-sm">© 2025 Mi Sitio Web. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    );
  }
  