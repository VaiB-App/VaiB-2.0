import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
  Box
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const groupName = useInputValidation("");

  const [selectedMembers, setSelectedMembers] = useState([]);

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Please Select Atleast 3 Members");

    newGroup("Creating New Group...", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog onClose={closeHandler} open={isNewGroup} 
    fullScreen 
    PaperProps={{
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
      },
    }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '2rem',
          color: 'white'
        }}
      >
      <Stack sx={{
            padding: "2rem",
            width: "25rem",
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          }}>
        <DialogTitle >
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
          New Group
          </Typography>
        </DialogTitle>

        <TextField
          placeholder ="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
          InputProps={{
              
            sx: {
              color:'white',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#22c55e',
              },
              
            },
          }}
        />

        <Typography variant="body1"
        sx={{
          color: 'white',
          padding: '1.5rem'
        }}>Members</Typography>

        <Stack >
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          )}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            variant="contained"
            color= "error"
             size="large"
             sx={{
               background: 'linear-gradient(45deg, #22c55e, #3b82f6)',
               margin:'2rem'
             }}
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
            sx={{
              background: 'linear-gradient(45deg, #22c55e, #3b82f6)',
              margin:'2rem'
            }}
          >
            Create
          </Button>
        </Stack>
      </Stack>
      </Box>
    </Dialog>
  );
};

export default NewGroup;