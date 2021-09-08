export default function Custom500() {

    const centered = {
        margin: "0",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    }

    return <h2 style={centered}>500 | Internal Server Error</h2>
}