import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
  Box
} from "@mui/material";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducers/misc";

const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    await acceptRequest("Accepting...", { requestId: _id, accept });
  };

  const closeHandler = () => dispatch(setIsNotification(false));

  useErrors([{ error, isError }]);

  return (
    <Dialog 
      open={isNotification} 
      onClose={closeHandler}
      onClick={closeHandler}
      fullScreen 
      PaperProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
        },
        
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '2rem',
        }}
        
      >
        <Stack
          sx={{
            padding: "2rem",
            width: "40rem",
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          }}
        >  
          <DialogTitle>
            <Typography 
              variant="h4" 
              align="center" 
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #22c55e, #3b82f6)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                marginBottom: '1rem',
              }}
            >
              Notifications
            </Typography>
          </DialogTitle>

          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              {data?.allRequests.length > 0 ? (
                data?.allRequests?.map(({ sender, _id }) => (
                  <NotificationItem
                    sender={sender}
                    _id={_id}
                    handler={friendRequestHandler}
                    key={_id}
                  />
                ))
              ) : (
                <Typography textAlign={"center"}
                sx={{
                  color: 'white'
                }}>0 notifications</Typography>
              )}
            </>
          )}
        </Stack>
      </Box>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            color: 'white'
          }}
        >
          {`${name} sent you a friend request.`}
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button 
            onClick={() => handler({ _id, accept: true })}
            sx={{
              background: 'linear-gradient(45deg, #22c55e, #3b82f6)',
              marginLeft: '2rem',
              color: 'white'
            }}
          >
            Accept
          </Button>
          <Button 
            color="error" 
            onClick={() => handler({ _id, accept: false })}
            sx={{
              background: 'linear-gradient(45deg, #22c55e, #3b82f6)',
              marginLeft: '2rem',
              color: 'white'
            }}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;