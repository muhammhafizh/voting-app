import { useRef } from "react"
import { storage } from "../../firebase/Firebase"
import { getDownloadURL, uploadBytes, ref } from "firebase/storage"
import { useNavigate } from "react-router-dom"
import { INSERT_PASLON_DATA } from "../../apollo/Paslon"
import { useMutation } from "@apollo/client"
import { uuidv4 } from "@firebase/util"

function CandidatePage() {
  const [ insertPaslon ] = useMutation(INSERT_PASLON_DATA)
  const image = useRef(null)
  const nama_ketua = useRef()
  const nama_wakil = useRef()
  const visi = useRef()
  const misi = useRef()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (image === null) alert("anda belum memasukan gambar")
    // console.log(nama_ketua.current?.value.length < 1 ? "kosong" : nama_ketua.current?.value)

    const metadata  = {
      contentType : image.current?.files[0].type,
      firebaseStorageDownloadTokens: uuidv4() //In this line you are adding the access token
    };

    const inputImage = image.current?.files[0]
    const fileName = `images/${image.current?.files[0].name + uuidv4()}`
    const imageRef = ref(storage, fileName)

    
    await uploadBytes(imageRef, inputImage, metadata).then(() => {
      getDownloadURL(imageRef).then((url) => {
        insertPaslon({
          variables: {
            nama_ketua: nama_ketua.current?.value,
            nama_wakil: nama_wakil.current?.value,
            visi: visi.current?.value,
            misi: misi.current?.value,
            imageUrl: url,
            imageFileName: fileName
          }
        })
        navigate('/Admin')
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  }
  

  return (
    <>
      <div className="w-2/3 md:w-1/2 mt-0 md:mx-auto">
        <form>
            <div className="block mb-3 md:flex md:mb-9">
              <div className="mb-3 md:mb-0">
                <label className="uppercase text-gray-400 font-bold block">Nama Ketua</label>
                <input ref={nama_ketua} type="text" className="border border-gray-300 bg-gray-200 text-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:text-black px-3 py-2" />
              </div>
              <div className="md:ml-7">
                <label className="uppercase text-gray-400 font-bold block">Nama wakil</label>
                <input ref={nama_wakil} type="text" className="border border-gray-300 bg-gray-200 text-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:text-black px-3 py-2" />
              </div>
            </div>
            <div className="mb-3 md:mb-4">
              <label className="uppercase text-gray-400 font-bold block">Masukan foto</label>
              <input type="file" ref={image}/>
            </div> 
            <div className="mb-3 md:mb-8">
              <label className="uppercase text-gray-400 font-bold block">Masukan visi</label>
              <textarea ref={visi} className="border border-gray-300 focus:outline-none bg-gray-200 text-gray-400 focus:border-sky-500 md:w-60 focus:bg-white focus:text-black px-3 py-2" />
            </div> 
            <div className="mb-3 md:mb-4">
              <label className="uppercase text-gray-400 font-bold block">Masukan misi</label>
              <textarea ref={misi} className="border border-gray-300 focus:outline-none bg-gray-200 text-gray-400 focus:border-sky-500 px-3 py-2 md:w-60 focus:bg-white focus:text-black" />
            </div>   
            <button className="bg-violet-500 text-white px-3 py-2 hover:bg-violet-600" onClick={(e) => handleSubmit(e)}>
                Save changes
            </button>
        </form>
      </div>
    </>
  )
}

export default CandidatePage