import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { UPDATE_PASLON } from "../../apollo/Paslon";
import { useMutation } from "@apollo/client"
import swal from "sweetalert";

function UpdateCandidatePage() {
    const [ updatePaslon ] = useMutation(UPDATE_PASLON)
    const location = useLocation()
    const navigate = useNavigate()
    const { id, visi, misi, ketua, wakil } = location.state 
    const baseData = {
      newKetua: ketua,
      newWakil: wakil,
      newVisi: visi,
      newMisi: misi
    }

    const [newData, setNewData] = useState(baseData);

    const handleChange = (e) => {
      const name = e.target.name
      const value = e.target.value

      setNewData({
        ...newData,
        [name]: value
      })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await updatePaslon({
          variables: {
            id: id,
            nama_ketua: newData.newKetua,
            nama_wakil: newData.newWakil,
            visi: newData.newVisi,
            misi: newData.newMisi
          }
        })

        swal("Success", "Data kandidat berhasil di update", "success");
        navigate('/Admin')
    }


    return (
        <>
      <div className="w-2/3 md:w-1/2 h-full mt-0 md:mx-auto">
        <form>
            <div className="block mb-3 md:flex md:mb-9">
              <div className="mb-8 md:mb-0">
                <label className="uppercase text-gray-400 font-bold mb-2 block">Nama Ketua</label>
                <input value={newData.newKetua} name="newKetua" onChange={handleChange} type="text" className="border border-gray-300 bg-gray-200 text-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:text-black px-3 py-2" />
              </div>
              <div className="md:ml-7">
                <label className="uppercase text-gray-400 font-bold mb-2 block">Nama wakil</label>
                <input value={newData.newWakil} name="newWakil" onChange={handleChange} type="text" className="border border-gray-300 bg-gray-200 text-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:text-black px-3 py-2" />
              </div>
            </div>
            <div className="mb-3 md:mb-8">
              <label className="uppercase text-gray-400 font-bold mb-2 block">Masukan visi</label>
              <textarea value={newData.newVisi} name="newVisi" onChange={handleChange} className="border border-gray-300 focus:outline-none bg-gray-200 text-gray-400 focus:border-sky-500 focus:bg-white focus:text-black px-3 py-2" rows="3" cols="35" />
            </div> 
            <div className="mb-3 md:mb-4">
              <label className="uppercase text-gray-400 font-bold mb-2 block">Masukan misi</label>
              <textarea value={newData.newMisi} name="newMisi" onChange={handleChange} className="border border-gray-300 focus:outline-none bg-gray-200 text-gray-400 focus:border-sky-500 px-3 py-2 focus:bg-white focus:text-black" rows="3" cols="35" />
            </div>   
            <button className="bg-violet-500 text-white px-3 py-2 hover:bg-violet-600" onClick={(e) => handleSubmit(e)}>
                Save changes
            </button>
        </form>
      </div>
    </>
    )
}

export default UpdateCandidatePage