import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Footer from "../../components/Footer";

const UserHome = () =>{
    const userContext = useContext(UserContext);
    return (
        <>
        <div>
            {JSON.stringify(userContext)}
            Name is :{userContext?.userData?.user?.name}
            Is login:{userContext?.isLogin + ""}
            <p>This is user home</p>
            {/* <Card>
                <ResponsiveDrawer />
            </Card> */}
        </div>
        <Footer />
        </>
    )
}
export default UserHome;