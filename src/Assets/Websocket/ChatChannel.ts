// @ts-ignore
import { createConsumer } from "@rails/actioncable";

const url = process.env.REACT_APP_BE_ENDPOINT;
const token = localStorage.getItem('authToken')
const consumer = createConsumer(`${url}/cable`,
  {
    headers: { 'X-User-Id': token }
  }
);

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