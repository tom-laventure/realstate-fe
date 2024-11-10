// @ts-ignore
import { createConsumer } from "@rails/actioncable";

const url = process.env.REACT_APP_BE_ENDPOINT;
const token = localStorage.getItem('authToken')
let res = token?.split(' ').pop()
const consumer = createConsumer(`${url}/cable?token=${res}`);

const connectToChat = (group: string) => {
  // Create a subscription to the ChatChannel
  consumer.subscriptions.create(
    { channel: "ChatChannel", group_id: group },
    {
      received(data: any) {
        console.log(data); // Handle received messages
      }
    }
  );
};

export default connectToChat;