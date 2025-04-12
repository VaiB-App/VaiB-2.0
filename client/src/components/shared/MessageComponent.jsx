// import { Box, Typography } from "@mui/material";
// import React, { memo } from "react";
// import { lightBlue } from "../../constants/color";
// import moment from "moment";
// import { fileFormat } from "../../lib/features";
// import RenderAttachment from "./RenderAttachement.jsx";
// import { motion } from "framer-motion";

// const MessageComponent = ({ message, user }) => {
//   const { sender, content, attachments = [], createdAt } = message;

//   const sameSender = sender?._id === user?._id;

//   const timeAgo = moment(createdAt).fromNow();

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: "-100%" }}
//       whileInView={{ opacity: 1, x: 0 }}
//       style={{
//         alignSelf: sameSender ? "flex-end" : "flex-start",
//         color: "white",
//         borderRadius: "5px",
//         padding:"0.5rem",
//         marginTop: "1rem",
//         width: "fit-content",
//         backdropFilter: "blur(1.5px)",
//       backgroundColor: "rgba(255, 255, 255, 0.3)",
      
//     }}
//     >
//       {!sameSender && (
//         <Typography color={lightBlue} fontWeight={"600"} variant="caption">
//           {sender.name}
//         </Typography>
//       )}

//       {content && <Typography>{content}</Typography>}

//       {attachments.length > 0 &&
//         attachments.map((attachment, index) => {
//           const url = attachment.url;
//           const file = fileFormat(url);

//           return (
//             <Box key={index}>
//               <a
//                 href={url}
//                 target="_blank"
//                 download
//                 style={{
//                   color: "black",
//                 }}
//               >
//                 {RenderAttachment(file, url)}
//               </a>
//             </Box>
//           );
//         })}

//       <Typography variant="caption" color={"text.secondary"}>
//         {timeAgo}
//       </Typography>
//     </motion.div>
//   );
// };

// export default memo(MessageComponent);






import React, { memo } from "react";
import { Avatar, Box, IconButton, Paper, Stack, Typography, Tooltip } from "@mui/material";
import { Reply as ReplyIcon } from "@mui/icons-material";
import { grayColor, lightBlue } from "../../constants/color";
import {  fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachement.jsx";
import { motion } from "framer-motion";
import moment from "moment";

const MessageComponent = ({ message, user, onReply }) => {
  const { sender, content, createdAt, replyTo, replyToMessage, attachments = [] } = message;
  const self = sender._id === user._id;

  const handleReply = () => {
    if (onReply) onReply(message);
  };

  const timeAgo = moment(createdAt).fromNow();

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: self ? "flex-end" : "flex-start",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          maxWidth: "70%",
        }}
      >
        {!self && (
          <Avatar
            sx={{
              width: "32px",
              height: "32px",
              mr: "10px",
              mt: "10px",
            }}
          >
            {sender.name[0]}
          </Avatar>
        )}
        <Paper
          sx={{
            p: 1.5,
            backgroundColor: self ? lightBlue : "white",
            borderRadius: "10px",
            borderTopRightRadius: self ? "0" : "10px",
            borderTopLeftRadius: !self ? "0" : "10px",
            mb: 1,
            position: "relative",
          }}
          elevation={1}
        >
          {!self && (
            <Typography variant="body2" color="primary" fontWeight={"600"}>
              {sender.name}
            </Typography>
          )}

          {/* Reply reference */}
          {replyTo && replyToMessage && (
            <Box
              sx={{
                p: 1,
                borderLeft: "4px solid",
                borderColor: self ? "rgba(255,255,255,0.5)" : "rgba(25,118,210,0.5)",
                backgroundColor: self ? "rgba(255,255,255,0.2)" : "rgba(25,118,210,0.1)",
                borderRadius: "4px",
                mb: 1,
                maxHeight: "80px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Typography variant="caption" color={self ? "white" : "primary"} fontWeight="600">
                {replyToMessage.sender.name === user.name ? "You" : replyToMessage.sender.name}
              </Typography>
              <Typography
                variant="body2"
                color={self ? "rgba(255,255,255,0.8)" : "text.secondary"}
                sx={{
                  wordBreak: "break-word",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {replyToMessage.content}
              </Typography>
            </Box>
          )}

          {content && (
            <Typography
              variant="body1"
              color={self ? "white" : "black"}
              sx={{
                wordBreak: "break-word",
              }}
            >
              {content}
            </Typography>
          )}

          {/* Attachments */}
          {attachments.length > 0 &&
            attachments.map((attachment, index) => {
              const url = attachment.url;
              const file = fileFormat(url);

              return (
                <Box key={index} sx={{ mt: 1 }}>
                  <a
                    href={url}
                    target="_blank"
                    download
                    style={{
                      color: "black",
                    }}
                  >
                    {RenderAttachment(file, url)}
                  </a>
                </Box>
              );
            })}

          <Typography
            variant="caption"
            color={self ? "rgba(255,255,255,0.8)" : lightBlue}
            sx={{
              display: "block",
              textAlign: "right",
              mt: 0.5,
            }}
          >
            {timeAgo}
          </Typography>

          {/* Reply button */}
          <Tooltip title="Reply">
            <IconButton
              size="small"
              onClick={handleReply}
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                [self ? "left" : "right"]: "-30px",
                color: "rgba(0,0,0,0.5)",
                backgroundColor: "rgba(255,255,255,0.7)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.9)",
                },
                width: "24px",
                height: "24px",
                opacity: 0,
                transition: "opacity 0.2s",
                ".MuiSvgIcon-root": {
                  fontSize: "14px",
                },
                "&.visible": {
                  opacity: 1,
                },
                
              }}
              className="reply-button"
            >
              <ReplyIcon />
            </IconButton>
          </Tooltip>
        </Paper>
      </Stack>
    </motion.div>
  );
};

export default memo(MessageComponent);