import {Box} from "@chakra-ui/react";
import backgroundImage from "./5630939.jpg"; // Replace with the relative path to your image
import "./Header.css";

export function App_BackGround({children}) {
    return (
        <Box
            className="App-background"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "fixed",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                zIndex: -1,
            }}
        >
            {children}
        </Box>
    );
}