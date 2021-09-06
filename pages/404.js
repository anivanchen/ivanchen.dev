export default function Custom404() {

    const centered = {
        margin: "0",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    }

    return <h2 style={centered}>404 | Page Not Found</h2>
}