// @ts-ignore
import { createConsumer } from "@rails/actioncable";
import message from "Assets/Types/MessageType";
import { useDispatch } from "react-redux";

const url = process.env.REACT_APP_BE_ENDPOINT;
const token = localStorage.getItem('authToken')
let res = token?.split(' ').pop()
const consumer = createConsumer(`${url}/cable?token=${res}`);

const connectToChat = (group: string, messageRecieved: (message: message) => void) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  // Create a subscription to the ChatChannel
  consumer.subscriptions.create(
    { channel: "ChatChannel", group_id: group },
    {
      received(data: any) {
        messageRecieved(data.message)
      }
    }
  );
};

export default connectToChat;