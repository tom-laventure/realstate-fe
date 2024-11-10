
import { createConsumer } from "@rails/actioncable"

const url = process.env.BE_URL

const consumer = createConsumer(`${url}/cable`)

export default consumer