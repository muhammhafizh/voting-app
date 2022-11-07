function FormsSection() {
  return (
    <section id="contact">
        <div className="container mx-auto py-10 block">
            <h1 className="text-center font-bold text-lg uppercase">Let's keep in touch</h1>
            <form className="text-center my-5 space-y-4">
                <input placeholder="Name" className="border border-gray-300 bg-gray-200 text-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:text-black w-64 md:w-96 p-3" />
                <br />
                <input placeholder="Email" className="border border-gray-300 bg-gray-200 text-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:text-black w-64 md:w-96 p-3" />
                <br />
                <textarea rows="5" placeholder="Message" className="border border-gray-300 bg-gray-200 text-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:text-black w-64 md:w-96 p-3" />
            </form>
        </div>
    </section>
  )
}

export default FormsSection