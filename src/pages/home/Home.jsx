import FooterComponents from "../../components/Footer"
import FormsSection from "../../components/Forms"
import HomeComponent from "../../components/Home"
import MissionSection from "../../components/Mission"
import NavbarHome from "../../components/Navbar"

function HomePageWebsite() {
  return (
    <>
        <NavbarHome />
        <HomeComponent />
        <MissionSection />
        <FormsSection />
        <FooterComponents />
    </>
  )
}

export default HomePageWebsite