import { useLocation } from "react-router-dom"
import NavbarUserPage from "../../components/NavbarUser";

function VisiMisiPage() {
    const location = useLocation()
    const { image, visi, misi, ketua, wakil } = location.state

  return (
    <>
        <NavbarUserPage />
        <div className="flex justify-center mt-36">
          <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
            <img className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src={image} alt="" />
            <div className="p-6 flex flex-col justify-start">
              <h5 className="text-gray-900 text-xl font-medium mb-2">{ketua} & {wakil}</h5>
              <span>Visi:</span>
              <p className="text-gray-700 text-base mb-4">
                {visi}
              </p>
              <span>Misi:</span>
              <p className="text-gray-700 text-base">
                {misi}
              </p>
            </div>
          </div>
        </div>
    </>
  )
}

export default VisiMisiPage