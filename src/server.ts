import app from "./index";

const PORT = process.env.PORT || 5050

const startServer =
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

export default startServer