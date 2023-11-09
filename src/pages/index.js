import Button from "react-bootstrap/esm/Button";
import Base from "../components/Base";
import { toast } from "react-toastify";
import axios from "axios"

function Index() {

    function showMessage(){
        toast.success("It is success");
    }

    const getDataFromServer = () =>{
        toast.info("Getting data from server");
        axios.get("http://localhost:9090/test")
        .then(data => {
            console.log(data)
            toast.success("Data received successfully");
        })
        .catch(err => {
            toast.error("Cannot get data");
        })
    }

    return (
        <Base title="Shop what you need" 
        description="Welcome to Trending Store" 
        buttonEnabled={true} buttonText="Lets Shop" buttonType="success">
            <h1>Working on home page</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum laboriosam maxime numquam eaque eum, beatae dolorem suscipit odit delectus ex. Ipsa magnam quod optio rerum veritatis ex cum facere maxime modi quos accusantium tempora corporis error assumenda, ea ullam voluptates esse explicabo reprehenderit voluptatum cupiditate soluta. Dolores assumenda placeat nihil.</p>
            <Button variant="success" onClick={showMessage}>Test Toast</Button>
            <Button variant="primary" onClick={getDataFromServer}>Server Data</Button>
        </Base>
    )
}

export default Index;