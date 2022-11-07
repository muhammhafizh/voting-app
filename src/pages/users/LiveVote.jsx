import { SUBSCRIBE_PASLON } from "../../apollo/Paslon"
import { useSubscription } from "@apollo/client"
import NavbarUserPage from "../../components/NavbarUser";

function LiveVotePage() {
    const { data, loading } = useSubscription(SUBSCRIBE_PASLON)

    if (loading) {
        return <h1 className="text-orange-400">Please Wait</h1>
      }
    
      if (data?.mini_project_paslon.length === 0) {
        return <h1 className="text-red-400">Maaf Kandidat tidak tersedia</h1>
      }

  return (
    <>
        <NavbarUserPage />
        <div className="block md:flex w-full">
        {data?.mini_project_paslon.map((paslon) => {
          return (
            <div key={paslon.id}>
              <div className="flex mb-10 mb-md:0 md:mr-10 m-10">
                <div className="rounded-lg shadow-xl bg-white max-w-sm" key={paslon.id}>
                  <img className="rounded-t-lg" src={paslon.imageUrl} alt={`${paslon.nama_ketua} dan ${paslon.nama_wakil}`} />
                  <div className="p-6" key={paslon.id}>
                    <div className="block mt-3">
                        <span className="uppercase text-gray-500 font-bold">
                        total voting <span className="ml-2">{paslon.total_voted}</span> <br />
                        </span>
                        
                        <span className="py-1 uppercase text-gray-500 font-bold">
                            {paslon.nama_ketua} & {paslon.nama_wakil}
                        </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default LiveVotePage