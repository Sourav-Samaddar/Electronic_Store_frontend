import Container from "react-bootstrap/esm/Container";
import Footer from "./Footer";
import Button from "react-bootstrap/esm/Button";
import { NavLink } from "react-router-dom";
import defaultBanner from "../assets/images/banner/b2.jpg"

const Base = ({
    title="This is Title", 
    description="This is description about electronic store" ,
    buttonEnabled=false,
    buttonText="Shop Now",
    buttonType="primary",
    buttonLink="/services",
    HeroImage=defaultBanner,
    children}) => {

    let styledContainer = {
        height:"250px",
        backgroundImage:`url(${HeroImage}`
    }    

    return (
        <div>
            
            <Container fluid className="bg-dark p-3 text-white 
            text-center d-flex justify-content-center align-items-center" 
            style={styledContainer}>
                <div>
                    <h3 className="text-center">{title}</h3>
                    <p className="text-center fs-3">{description}</p>
                    {
                        buttonEnabled && 
                        <Button as={NavLink} to={buttonLink} variant={buttonType}>
                            {buttonText}
                        </Button>
                    }
                </div>
            </Container>

            {children}

            <Footer />
        </div>
    )
}
export default Base;