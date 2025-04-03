// import React, {
//   Fragment,
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import AppLayout from "../components/layout/AppLayout";
// import { IconButton, Skeleton, Stack } from "@mui/material";
// import { grayColor, myColor, myColor2 } from '../constants/color';
// import {
//   AttachFile as AttachFileIcon,
//   Send as SendIcon,
// } from "@mui/icons-material";
// import { InputBox } from "../components/styles/StyledComponents";
// import FileMenu from "../components/dialogs/FileMenu";
// import MessageComponent from "../components/shared/MessageComponent";
// import { getSocket } from "../socket";
// import {
//   ALERT,
//   CHAT_JOINED,
//   CHAT_LEAVED,
//   NEW_MESSAGE,
//   START_TYPING,
//   STOP_TYPING,
// } from "../constants/events";
// import CallActions from '../components/CallActions'
// import CallModal from '../components/CallModal'
// import { WebRTCService } from '../../../server/services/webrtc'
// import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
// import { useErrors, useSocketEvents } from "../hooks/hook";
// import { useInfiniteScrollTop } from "6pp";
// import { useDispatch } from "react-redux";
// import { setIsFileMenu } from "../redux/reducers/misc";
// import { removeNewMessagesAlert } from "../redux/reducers/chat";
// import { TypingLoader } from "../components/layout/Loaders";
// import { useNavigate } from "react-router-dom";
// import background from "./Wallpaper.jpeg";
// import { color } from "framer-motion";

// const Chat = ({ chatId, user }) => {
//   const socket = getSocket();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const containerRef = useRef(null);
//   const bottomRef = useRef(null);
//   const webrtcService = useRef(null)

//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [page, setPage] = useState(1);
//   const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

//   const [IamTyping, setIamTyping] = useState(false);
//   const [userTyping, setUserTyping] = useState(false);
//   const typingTimeout = useRef(null);

//   // Call related states
//   const [isCallActive, setIsCallActive] = useState(false)
//   const [isVideoCall, setIsVideoCall] = useState(false)
//   const [localStream, setLocalStream] = useState(null)
//   const [remoteStream, setRemoteStream] = useState(null)


//   const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

//   const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

//   const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
//     containerRef,
//     oldMessagesChunk.data?.totalPages,
//     page,
//     setPage,
//     oldMessagesChunk.data?.messages
//   );

//   const errors = [
//     { isError: chatDetails.isError, error: chatDetails.error },
//     { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
//   ];

//   const members = chatDetails?.data?.chat?.members;

//   useEffect(() => {
//     webrtcService.current = new WebRTCService(socket)
    
//     return () => {
//       webrtcService.current?.cleanup()
//     }
//   }, [])

//   const handleVoiceCall = async () => {
//     try {
//       setIsVideoCall(false)
//       setIsCallActive(true)
//       const { localStream, offer } = await webrtcService.current.startCall(false)
//       setLocalStream(localStream)
//       socket.emit('call-user', { 
//         to: members.find(m => m._id !== user._id)?._id,
//         offer,
//         isVideo: false 
//       })
//     } catch (error) {
//       console.error('Failed to start voice call:', error)
//       setIsCallActive(false)
//     }
//   }

//   const handleVideoCall = async () => {
//     try {
//       setIsVideoCall(true)
//       setIsCallActive(true)
//       const { localStream, offer } = await webrtcService.current.startCall(true)
//       setLocalStream(localStream)
//       socket.emit('call-user', { 
//         to: members.find(m => m._id !== user._id)?._id,
//         offer,
//         isVideo: true
//       })
//     } catch (error) {
//       console.error('Failed to start video call:', error)
//       setIsCallActive(false)
//     }
//   }

//   const handleEndCall = () => {
//     webrtcService.current?.cleanup()
//     setIsCallActive(false)
//     setLocalStream(null)
//     setRemoteStream(null)
//     socket.emit('end-call', { 
//       to: members.find(m => m._id !== user._id)?._id 
//     })
//   }


//   const messageOnChange = (e) => {
//     setMessage(e.target.value);

//     if (!IamTyping) {
//       socket.emit(START_TYPING, { members, chatId });
//       setIamTyping(true);
//     }

//     if (typingTimeout.current) clearTimeout(typingTimeout.current);

//     typingTimeout.current = setTimeout(() => {
//       socket.emit(STOP_TYPING, { members, chatId });
//       setIamTyping(false);
//     }, [2000]);
    
//   };

//   const handleFileOpen = (e) => {
//     dispatch(setIsFileMenu(true));
//     setFileMenuAnchor(e.currentTarget);
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();

//     if (!message.trim()) return;

//     // Emitting the message to the server
//     socket.emit(NEW_MESSAGE, { chatId, members, message });
//     setMessage("");
//   };

  
//   // Add call-related socket event handlers
//   useEffect(() => {
//     socket.on('call-answer', async (data) => {
//       await webrtcService.current?.handleAnswer(data.answer)
//     })

//     socket.on('ice-candidate', async (data) => {
//       await webrtcService.current?.handleIceCandidate(data.candidate)
//     })

//     socket.on('call-ended', () => {
//       handleEndCall()
//     })

//     return () => {
//       socket.off('call-answer')
//       socket.off('ice-candidate')
//       socket.off('call-ended')
//     }
//   }, [])


//   useEffect(() => {
//     socket.emit(CHAT_JOINED, { userId: user._id, members });
//     dispatch(removeNewMessagesAlert(chatId));

//     return () => {
//       setMessages([]);
//       setMessage("");
//       setOldMessages([]);
//       setPage(1);
//       socket.emit(CHAT_LEAVED, { userId: user._id, members });
//     };
//   }, [chatId]);

//   useEffect(() => {
//     if (bottomRef.current)
//       bottomRef.current.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   useEffect(() => {
//     if (chatDetails.isError) return navigate("/");
//   }, [chatDetails.isError]);

//   const newMessagesListener = useCallback(
//     (data) => {
//       if (data.chatId !== chatId) return;

//       setMessages((prev) => [...prev, data.message]);
//     },
//     [chatId]
//   );

//   const startTypingListener = useCallback(
//     (data) => {
//       if (data.chatId !== chatId) return;

//       setUserTyping(true);
//     },
//     [chatId]
//   );

//   const stopTypingListener = useCallback(
//     (data) => {
//       if (data.chatId !== chatId) return;
//       setUserTyping(false);
//     },
//     [chatId]
//   );

//   const alertListener = useCallback(
//     (data) => {
//       if (data.chatId !== chatId) return;
//       const messageForAlert = {
//         content: data.message,
//         sender: {
//           _id: "djasdhajksdhasdsadasdas",
//           name: "Admin",
//         },
//         chat: chatId,
//         createdAt: new Date().toISOString(),
//       };

//       setMessages((prev) => [...prev, messageForAlert]);
//     },
//     [chatId]
//   );

//   const eventHandler = {
//     [ALERT]: alertListener,
//     [NEW_MESSAGE]: newMessagesListener,
//     [START_TYPING]: startTypingListener,
//     [STOP_TYPING]: stopTypingListener,
//   };

//   useSocketEvents(socket, eventHandler);

//   useErrors(errors);

//   const allMessages = [...oldMessages, ...messages];

//   return chatDetails.isLoading ? (
//     <Skeleton />
//   ) : (
//     <Fragment>
//       <Stack
//         ref={containerRef}
//         boxSizing={"border-box"}
//         padding={"1rem"}
//         spacing={"1rem"}
//         bgcolor={grayColor}
//         height={"92.3vh"}
//         sx={{
//           backgroundImage: `url(${background})`,
//           backgroundSize: "cover",
//           overflowX: "hidden",
//           overflowY: "auto",
//         }}
//       >
//         <CallActions 
//           onVoiceCall={handleVoiceCall}
//           onVideoCall={handleVideoCall}
//         />
//         <Stack
//           height="90%"
//           sx={{
//             overflowX: "hidden",
//             overflowY: "auto",
//           }}
//         >
//         {allMessages.map((i) => (
//           <MessageComponent key={i._id} message={i} user={user} />
//         ))}

//         {userTyping && <TypingLoader />}

//         <div ref={bottomRef} />
//         </Stack>
      

//       <form
//         style={{
//           height: "10%",
//         }}
//         onSubmit={submitHandler}
//       >
//         <Stack direction={"row"}
//        height={"100%"}
//       padding={"1rem"}
//       alignItems={"center"}
//       position={"relative"}
//       sx={{
//         backdropFilter: "blur(10px)",
//         backgroundColor: "rgba(255, 255, 255, 0.3)",
//         borderRadius: "50px",
//       }}
//       >
//           <IconButton
//             sx={{
//               position: "absolute",
//               left: "1.5rem",
//               rotate: "30deg",
//             }}
//             onClick={handleFileOpen}
//           >
//             <AttachFileIcon />
//           </IconButton>

//           <InputBox
//             placeholder="Type Message Here..."
//             value={message}
//             onChange={messageOnChange}
//             sx={{
//               backgroundColor: "rgba(255, 255, 255, 0.5)",
//             }} 
//           />

//           <IconButton
//             type="submit"
//             sx={{
//               // backgroundColor: "white",
//               color: "white",
//               marginLeft: "1rem",
//               padding: "0.5rem",
//               // "&:hover" :{
//               //   color: myColor
//               // },
//             }}
//             // sx={{
//             //   rotate: "-30deg",
//             //   bgcolor: orange,
//             //   color: "white",
//             //   marginLeft: "1rem",
//             //   padding: "0.5rem",
//             //   "&:hover": {
//             //     bgcolor: "error.dark",
//             //   },
//             // }}

//           >
//             <SendIcon />
//           </IconButton>
//         </Stack>
//       </form>
//       <CallModal
//           open={isCallActive}
//           onClose={handleEndCall}
//           localStream={localStream}
//           remoteStream={remoteStream}
//           isVideo={isVideoCall}
//         />
//       </Stack>
//       <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
//     </Fragment>
//   );
// };

// export default AppLayout()(Chat);





// import { Fragment, useCallback, useEffect, useRef, useState } from "react"
// import AppLayout from "../components/layout/AppLayout"
// import { IconButton, Skeleton, Stack } from "@mui/material"
// import { grayColor } from "../constants/color"
// import { AttachFile as AttachFileIcon, Send as SendIcon } from "@mui/icons-material"
// import { InputBox } from "../components/styles/StyledComponents"
// import FileMenu from "../components/dialogs/FileMenu"
// import MessageComponent from "../components/shared/MessageComponent"
// import InappropriateMessageDialog from "../components/dialogs/InappropriateMessageDialog"
// import { getSocket } from "../socket"
// import {
//   ALERT,
//   CHAT_JOINED,
//   CHAT_LEAVED,
//   NEW_MESSAGE,
//   START_TYPING,
//   STOP_TYPING,
//   INAPPROPRIATE_MESSAGE,
// } from "../constants/events"
// import CallActions from "../components/CallActions"
// import CallModal from "../components/CallModal"
// import { WebRTCService } from "../../../server/services/webrtc"
// import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api"
// import { useErrors, useSocketEvents } from "../hooks/hook"
// import { useInfiniteScrollTop } from "6pp"
// import { useDispatch } from "react-redux"
// import { setIsFileMenu } from "../redux/reducers/misc"
// import { removeNewMessagesAlert } from "../redux/reducers/chat"
// import { TypingLoader } from "../components/layout/Loaders"
// import { useNavigate } from "react-router-dom"
// import background from "./Wallpaper.jpeg"

// const Chat = ({ chatId, user }) => {
//   const socket = getSocket()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const containerRef = useRef(null)
//   const bottomRef = useRef(null)
//   const webrtcService = useRef(null)

//   const [message, setMessage] = useState("")
//   const [messages, setMessages] = useState([])
//   const [page, setPage] = useState(1)
//   const [fileMenuAnchor, setFileMenuAnchor] = useState(null)

//   const [IamTyping, setIamTyping] = useState(false)
//   const [userTyping, setUserTyping] = useState(false)
//   const typingTimeout = useRef(null)

//   // Call related states
//   const [isCallActive, setIsCallActive] = useState(false)
//   const [isVideoCall, setIsVideoCall] = useState(false)
//   const [localStream, setLocalStream] = useState(null)
//   const [remoteStream, setRemoteStream] = useState(null)

//   // Inappropriate message dialog state
//   const [inappropriateMessage, setInappropriateMessage] = useState(null)
//   const [dialogOpen, setDialogOpen] = useState(false)

//   const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId })

//   const oldMessagesChunk = useGetMessagesQuery({ chatId, page })

//   const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
//     containerRef,
//     oldMessagesChunk.data?.totalPages,
//     page,
//     setPage,
//     oldMessagesChunk.data?.messages,
//   )

//   const errors = [
//     { isError: chatDetails.isError, error: chatDetails.error },
//     { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
//   ]

//   const members = chatDetails?.data?.chat?.members

//   useEffect(() => {
//     webrtcService.current = new WebRTCService(socket)

//     return () => {
//       webrtcService.current?.cleanup()
//     }
//   }, [])

//   const handleVoiceCall = async () => {
//     try {
//       setIsVideoCall(false)
//       setIsCallActive(true)
//       const { localStream, offer } = await webrtcService.current.startCall(false)
//       setLocalStream(localStream)
//       socket.emit("call-user", {
//         to: members.find((m) => m._id !== user._id)?._id,
//         offer,
//         isVideo: false,
//       })
//     } catch (error) {
//       console.error("Failed to start voice call:", error)
//       setIsCallActive(false)
//     }
//   }

//   const handleVideoCall = async () => {
//     try {
//       setIsVideoCall(true)
//       setIsCallActive(true)
//       const { localStream, offer } = await webrtcService.current.startCall(true)
//       setLocalStream(localStream)
//       socket.emit("call-user", {
//         to: members.find((m) => m._id !== user._id)?._id,
//         offer,
//         isVideo: true,
//       })
//     } catch (error) {
//       console.error("Failed to start video call:", error)
//       setIsCallActive(false)
//     }
//   }

//   const handleEndCall = () => {
//     webrtcService.current?.cleanup()
//     setIsCallActive(false)
//     setLocalStream(null)
//     setRemoteStream(null)
//     socket.emit("end-call", {
//       to: members.find((m) => m._id !== user._id)?._id,
//     })
//   }

//   const messageOnChange = (e) => {
//     setMessage(e.target.value)

//     if (!IamTyping) {
//       socket.emit(START_TYPING, { members, chatId })
//       setIamTyping(true)
//     }

//     if (typingTimeout.current) clearTimeout(typingTimeout.current)

//     typingTimeout.current = setTimeout(() => {
//       socket.emit(STOP_TYPING, { members, chatId })
//       setIamTyping(false)
//     }, [2000])
//   }

//   const handleFileOpen = (e) => {
//     dispatch(setIsFileMenu(true))
//     setFileMenuAnchor(e.currentTarget)
//   }

//   const submitHandler = (e) => {
//     e.preventDefault()

//     if (!message.trim()) return

//     // Emitting the message to the server
//     socket.emit(NEW_MESSAGE, { chatId, members, message })
//     setMessage("")
//   }

//   const handleDialogClose = ({ blocked }) => {
//     setDialogOpen(false)
//     setInappropriateMessage(null)
//   }

//   // Add call-related socket event handlers
//   useEffect(() => {
//     socket.on("call-answer", async (data) => {
//       await webrtcService.current?.handleAnswer(data.answer)
//     })

//     socket.on("ice-candidate", async (data) => {
//       await webrtcService.current?.handleIceCandidate(data.candidate)
//     })

//     socket.on("call-ended", () => {
//       handleEndCall()
//     })

//     // Add inappropriate message detection listener
//     socket.on(INAPPROPRIATE_MESSAGE, (data) => {
//       if (data.chatId !== chatId) return

//       setInappropriateMessage({
//         content: data.message.content,
//         sender: data.message.sender,
//       })
//       setDialogOpen(true)
//     })

//     return () => {
//       socket.off("call-answer")
//       socket.off("ice-candidate")
//       socket.off("call-ended")
//       socket.off(INAPPROPRIATE_MESSAGE)
//     }
//   }, [chatId])

//   useEffect(() => {
//     socket.emit(CHAT_JOINED, { userId: user._id, members })
//     dispatch(removeNewMessagesAlert(chatId))

//     return () => {
//       setMessages([])
//       setMessage("")
//       setOldMessages([])
//       setPage(1)
//       socket.emit(CHAT_LEAVED, { userId: user._id, members })
//     }
//   }, [chatId])

//   useEffect(() => {
//     if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   useEffect(() => {
//     if (chatDetails.isError) return navigate("/")
//   }, [chatDetails.isError])

//   const newMessagesListener = useCallback(
//     (data) => {
//       if (data.chatId !== chatId) return
//       setMessages((prev) => [...prev, data.message])
//     },
//     [chatId],
//   )

//   const startTypingListener = useCallback(
//     (data) => {
//       if (data.chatId !== chatId) return
//       setUserTyping(true)
//     },
//     [chatId],
//   )

//   const stopTypingListener = useCallback(
//     (data) => {
//       if (data.chatId !== chatId) return
//       setUserTyping(false)
//     },
//     [chatId],
//   )

//   const alertListener = useCallback(
//     (data) => {
//       if (data.chatId !== chatId) return
//       const messageForAlert = {
//         content: data.message,
//         sender: {
//           _id: "djasdhajksdhasdsadasdas",
//           name: "Admin",
//         },
//         chat: chatId,
//         createdAt: new Date().toISOString(),
//       }

//       setMessages((prev) => [...prev, messageForAlert])
//     },
//     [chatId],
//   )

//   const eventHandler = {
//     [ALERT]: alertListener,
//     [NEW_MESSAGE]: newMessagesListener,
//     [START_TYPING]: startTypingListener,
//     [STOP_TYPING]: stopTypingListener,
//   }

//   useSocketEvents(socket, eventHandler)

//   useErrors(errors)

//   const allMessages = [...oldMessages, ...messages]

//   return chatDetails.isLoading ? (
//     <Skeleton />
//   ) : (
//     <Fragment>
//       <Stack
//         ref={containerRef}
//         boxSizing={"border-box"}
//         padding={"1rem"}
//         spacing={"1rem"}
//         bgcolor={grayColor}
//         height={"92.3vh"}
//         sx={{
//           backgroundImage: `url(${background})`,
//           backgroundSize: "cover",
//           overflowX: "hidden",
//           overflowY: "auto",
//         }}
//       >
//         <CallActions onVoiceCall={handleVoiceCall} onVideoCall={handleVideoCall} />
//         <Stack
//           height="90%"
//           sx={{
//             overflowX: "hidden",
//             overflowY: "auto",
//           }}
//         >
//           {allMessages.map((i) => (
//             <MessageComponent key={i._id} message={i} user={user} />
//           ))}

//           {userTyping && <TypingLoader color="white" />}

//           <div ref={bottomRef} />
//         </Stack>

//         <form
//           style={{
//             height: "10%",
//           }}
//           onSubmit={submitHandler}
//         >
//           <Stack
//             direction={"row"}
//             height={"100%"}
//             padding={"1rem"}
//             alignItems={"center"}
//             position={"relative"}
//             sx={{
//               backdropFilter: "blur(10px)",
//               backgroundColor: "rgba(255, 255, 255, 0.3)",
//               borderRadius: "50px",
//             }}
//           >
//             <IconButton
//               sx={{
//                 position: "absolute",
//                 left: "1.5rem",
//                 rotate: "30deg",
//               }}
//               onClick={handleFileOpen}
//             >
//               <AttachFileIcon />
//             </IconButton>

//             <InputBox
//               placeholder="Type Message Here..."
//               value={message}
//               onChange={messageOnChange}
//               sx={{
//                 backgroundColor: "rgba(255, 255, 255, 0.5)",
//               }}
//             />

//             <IconButton
//               type="submit"
//               sx={{
//                 color: "white",
//                 marginLeft: "1rem",
//                 padding: "0.5rem",
//               }}
//             >
//               <SendIcon />
//             </IconButton>
//           </Stack>
//         </form>
//         <CallModal
//           open={isCallActive}
//           onClose={handleEndCall}
//           localStream={localStream}
//           remoteStream={remoteStream}
//           isVideo={isVideoCall}
//         />
//       </Stack>
//       <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />

//       {/* Inappropriate Message Dialog */}
//       {inappropriateMessage && (
//         <InappropriateMessageDialog
//           open={dialogOpen}
//           onClose={handleDialogClose}
//           message={inappropriateMessage.content}
//           sender={inappropriateMessage.sender}
//         />
//       )}
//     </Fragment>
//   )
// }

// export default AppLayout()(Chat)





import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor, myColor, myColor2 } from '../constants/color';
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import InappropriateMessageDialog from "../components/dialogs/InappropriateMessageDialog";
import { getSocket } from "../socket";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
  INAPPROPRIATE_MESSAGE,
  MESSAGE_BLOCKED
} from "../constants/events";
import CallActions from '../components/CallActions'
import CallModal from '../components/CallModal'
import { WebRTCService } from '../../../server/services/webrtc'
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { TypingLoader } from "../components/layout/Loaders";
import { useNavigate } from "react-router-dom";
import background from "./Wallpaper.jpeg";
import BlockedMessageAlert from "../components/dialogs/BlockedMessageAlert";

const Chat = ({ chatId, user }) => {
  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const webrtcService = useRef(null)

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  // Call related states
  const [isCallActive, setIsCallActive] = useState(false)
  const [isVideoCall, setIsVideoCall] = useState(false)
  const [localStream, setLocalStream] = useState(null)
  const [remoteStream, setRemoteStream] = useState(null)

  // Inappropriate message dialog state
  const [inappropriateMessage, setInappropriateMessage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [blockedMessageAlert, setBlockedMessageAlert] = useState(false);
  const [blockedMessage, setBlockedMessage] = useState("");

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;

  useEffect(() => {
    webrtcService.current = new WebRTCService(socket)
    
    return () => {
      webrtcService.current?.cleanup()
    }
  }, [socket])

  const handleVoiceCall = async () => {
    try {
      setIsVideoCall(false)
      setIsCallActive(true)
      const { localStream, offer } = await webrtcService.current.startCall(false)
      setLocalStream(localStream)
      socket.emit('call-user', { 
        to: members.find(m => m._id !== user._id)?._id,
        offer,
        isVideo: false 
      })
    } catch (error) {
      console.error('Failed to start voice call:', error)
      setIsCallActive(false)
    }
  }

  const handleVideoCall = async () => {
    try {
      setIsVideoCall(true)
      setIsCallActive(true)
      const { localStream, offer } = await webrtcService.current.startCall(true)
      setLocalStream(localStream)
      socket.emit('call-user', { 
        to: members.find(m => m._id !== user._id)?._id,
        offer,
        isVideo: true
      })
    } catch (error) {
      console.error('Failed to start video call:', error)
      setIsCallActive(false)
    }
  }

  const handleEndCall = () => {
    webrtcService.current?.cleanup()
    setIsCallActive(false)
    setLocalStream(null)
    setRemoteStream(null)
    socket.emit('end-call', { 
      to: members.find(m => m._id !== user._id)?._id 
    })
  }

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000]);
  };

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const handleDialogClose = ({ blocked }) => {
    setDialogOpen(false);
    setInappropriateMessage(null);
  };

  const handleBlockedAlertClose = () => {
    setBlockedMessageAlert(false);
  };
  
  // Add call-related socket event handlers
  useEffect(() => {
    socket.on('call-answer', async (data) => {
      await webrtcService.current?.handleAnswer(data.answer)
    })

    socket.on('ice-candidate', async (data) => {
      await webrtcService.current?.handleIceCandidate(data.candidate)
    })

    socket.on('call-ended', () => {
      handleEndCall()
    })

    // Add inappropriate message detection listener
    socket.on(INAPPROPRIATE_MESSAGE, (data) => {
      if (data.chatId !== chatId) return;
      
      setInappropriateMessage({
        content: data.message.content,
        sender: data.message.sender
      });
      setDialogOpen(true);
    });

    // Add blocked message listener
    socket.on(MESSAGE_BLOCKED, (data) => {
      setBlockedMessage(data.message);
      setBlockedMessageAlert(true);
    });

    return () => {
      socket.off('call-answer')
      socket.off('ice-candidate')
      socket.off('call-ended')
      socket.off(INAPPROPRIATE_MESSAGE)
      socket.off(MESSAGE_BLOCKED);
    }
  }, [chatId, socket, handleEndCall]);

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "djasdhajksdhasdsadasdas",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandler);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"92.3vh"}
        sx={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <CallActions 
          onVoiceCall={handleVoiceCall}
          onVideoCall={handleVideoCall}
        />
        <Stack
          height="90%"
          sx={{
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}

        {userTyping && <TypingLoader color="white" />}

        <div ref={bottomRef} />
        </Stack>
      
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack direction={"row"}
       height={"100%"}
      padding={"1rem"}
      alignItems={"center"}
      position={"relative"}
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderRadius: "50px",
      }}
      >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={messageOnChange}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }} 
          />

          <IconButton
            type="submit"
            sx={{
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <CallModal
          open={isCallActive}
          onClose={handleEndCall}
          localStream={localStream}
          remoteStream={remoteStream}
          isVideo={isVideoCall}
        />
      </Stack>
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
      
      {/* Inappropriate Message Dialog */}
      {inappropriateMessage && (
        <InappropriateMessageDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          message={inappropriateMessage.content}
          sender={inappropriateMessage.sender}
        />
      )}
      <BlockedMessageAlert
        open={blockedMessageAlert}
        message={blockedMessage}
        onClose={handleBlockedAlertClose}
      />
    </Fragment>
  );
};

export default AppLayout()(Chat);


