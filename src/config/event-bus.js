import { ref } from 'vue';

export default function useEventBus() {
  const message = ref('');

  function sendMessage(newMessage) {
    message.value = newMessage;
  }

  return {
    message,
    sendMessage,
  };
}