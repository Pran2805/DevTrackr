import app from "./app.ts";
import { connectDB } from "./db/index.ts";
import ENV from "./utils/env.ts";


function main() {
    app.listen(ENV.port, () => {
        connectDB();
        console.log(`Server running on port : ${ENV.port}`)
    })
}

main();