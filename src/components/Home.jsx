import Wave from 'react-wavify'
import voting from "../assets/voting.svg"

function HomeComponent() {
  return (
    <>
        <div className="container flex flex-col-reverse md:flex-row mb-12 absolute z-20" id='home'>
            <div className="container mx-auto my-10 md:mt-40 md:mb-30 w-80 md:w-96 md:pb-12">
                <span className="font-medium text-lg md:font-semibold md:text-xl">Voting is the expression of our commitment to ourselves, one another, this country, and this world</span>
                <div className="mt-5">
                  <span className="font-medium">- Sharon Salzberg</span>
                </div>
            </div>
            <img src={voting} className="md:w-1/4"/>
        </div>
        <Wave mask="url(#mask)" fill="#6991C7" style={{"transform" : "rotate(180deg)", "height": "500px"}}>
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop offset="0" stopColor="black" />
              <stop offset="0.25" stopColor="white" />
            </linearGradient>
            <mask id="mask">
              <rect x="0" y="0" width="2000" height="800" fill="url(#gradient)"  />
            </mask>
          </defs>
        </Wave>
    </>
  )
}

export default HomeComponent