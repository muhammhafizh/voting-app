function MissionSection() {
  return (
    <>
        <section className="container mx-auto py-10" id="mission">
            <h1 className="uppercase font-bold text-center text-lg md:text-xl">our mission</h1>
            <div className="block space-y-4 mt-10">
                <div className="mx-auto w-80 hover:bg-white hover:drop-shadow-2xl p-4 rounded md:ml-96">
                    <span className="font-bold text-lg">Security</span>
                    <p>Your data is secured with us, so you can vote the candidate safe</p>
                </div>
                <div className="mx-auto w-80 hover:bg-white hover:drop-shadow-2xl p-4 rounded md:mr-96">
                    <span className="font-bold text-lg">Simplicity</span>
                    <p>You can vote from anywhere without wasting a lot of energy</p>
                </div>
                <div className="mx-auto w-80 hover:bg-white hover:drop-shadow-2xl p-4 rounded">
                    <span className="font-bold text-lg">Quality</span>
                    <p>Our website has very good quality, you don't have to doubt it</p>
                </div>
            </div>
        </section>
    </>
  )
}

export default MissionSection