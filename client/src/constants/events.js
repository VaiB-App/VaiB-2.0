const ALERT = "ALERT";
const REFETCH_CHATS = "REFETCH_CHATS";

const NEW_ATTACHMENT = "NEW_ATTACHMENT";
const NEW_MESSAGE_ALERT = "NEW_MESSAGE_ALERT";

const NEW_REQUEST = "NEW_REQUEST";
const NEW_MESSAGE = "NEW_MESSAGE";

const START_TYPING = "START_TYPING";
const STOP_TYPING = "STOP_TYPING";

const CHAT_JOINED = "CHAT_JOINED";
const CHAT_LEAVED = "CHAT_LEAVED";

const ONLINE_USERS = "ONLINE_USERS";

// Add this new event to your existing events.js file:
 const INAPPROPRIATE_MESSAGE = "inappropriate-message"

 const MESSAGE_BLOCKED = "message-blocked"; // Add this new event

 export const SPAM_DETECTED = "spam-detected"
export const BLOCK_USER = "block-user"
export const USER_BLOCKED = "user-blocked";
export const REPLY_MESSAGE = "reply-message"
//export const MESSAGE_BLOCKED = "message-blocked"
//export const INAPPROPRIATE_MESSAGE = "inappropriate-message"

export const CALL_USER = "call-user"
export const INCOMING_CALL = "incoming-call"
export const CALL_ANSWERED = "call-answered"
export const CALL_REJECTED = "call-rejected"
export const ICE_CANDIDATE = "ice-candidate"
export const END_CALL = "end-call"

export {
  MESSAGE_BLOCKED,
  INAPPROPRIATE_MESSAGE,
  ALERT,
  REFETCH_CHATS,
  NEW_ATTACHMENT,
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
  CHAT_JOINED,
  CHAT_LEAVED,
  ONLINE_USERS,
};