import instagram from "../assets/instagram.svg"
import linkedin from "../assets/linkedin.svg"
import WhatsApp from "../assets/Whatsapp.svg"

function FooterComponents() {
  return (
    <footer className="w-full p-10 bg-gray-400">
        <div className="container mx-auto block md:flex">
            <div className="md:flex mb-4 md:space-x-4">
                <span className="block text-white">About</span>
                <span className="block text-white">Policy</span>
                <span className="block text-white">Terms</span>
            </div>
            <div className="mx-auto mb-4 md:mb-0">
                <span className="text-white">Made with Tailwind</span>
            </div>
            <div className="flex space-x-4">
                <a>
                    <img src={instagram} className="w-5" />
                </a>
                <a>
                    <img src={linkedin} className="w-5" />
                </a>
                <a>
                    <img src={WhatsApp} className="w-5" />
                </a>
            </div>
        </div>
    </footer>
  )
}

export default FooterComponents