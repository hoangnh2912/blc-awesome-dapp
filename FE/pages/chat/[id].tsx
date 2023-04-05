import { Flex, Heading, HStack, Stack } from "@chakra-ui/layout";
// import { Avatar } from "@chakra-ui/avatar";
import { useRouter } from "next/router";

import ChatSidebar from "../../components/sidebar-chat";
import { Input, Text, Avatar } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/form-control";
import { Button, IconButton } from "@chakra-ui/button";
import Head from "next/head";
import React, { ReactNode, useEffect, useState, memo, useRef } from "react";
import { useStoreActions, useStoreState } from "../../services/redux/hook";
import ApiServices from "../../services/api";
import {
  GetChatUserOutput,
  GetMessageOutput,
  GetRoomInfo,
} from "../../services/api/types";
import { CONSTANT } from "../../constants/chat-constant";
import InfiniteScroll from "react-infinite-scroller";
import { AiOutlineSend } from "react-icons/ai";

const Topbar = ({ avatar, username }: { avatar: string; username: string }) => {
  return (
    <Flex bg={"gray.100"} h="81px" w={"100%"} align="center" p={5}>
      <Avatar
        src={userAvatarGetter({ avatar })}
        marginEnd={3}
        // loading="lazy"
        ignoreFallback={true}
      />

      <Heading size={"md"}>{username}</Heading>
    </Flex>
  );
};

const userAvatarGetter = ({ avatar }: { avatar: string }) => {
  const avatarURL = CONSTANT.API_PREFIX + avatar;

  return avatarURL;
};

const Bottombar = ({
  id,
  messageList,
  setMessageList,
}: {
  id: string;
  messageList: GetMessageOutput[] | undefined;
  setMessageList: React.Dispatch<
    React.SetStateAction<GetMessageOutput[] | undefined>
  >;
}) => {
  const ref = useRef(null) as any;

  const clearInput = () => {
    ref.current.value = "";
  };
  const [input, setInput] = useState("");
  const [sending, setSending] = useState<boolean>();
  useEffect(() => {
    setSending(false);
  }, []);

  const sendMessage = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (input && !sending) {
      setSending(true);
      clearInput();
      const message_data = input;
      setInput("");
      const newMessage = await ApiServices.privateMessage.sendMessage({
        message_data,
        room_id: id,
      });

      if (messageList) {
        setMessageList([newMessage.data.data, ...messageList]);
      }
      setSending(false);
    }
  };

  return (
    <FormControl px={3} pb={3} onSubmit={sendMessage} as="form">
      <HStack>
        <Input
          ref={ref}
          id="message-text"
          placeholder="Type a message..."
          autoComplete="off"
          onChange={(e) => setInput(e.target.value)}
          width="95%"
        />
        <Button type="submit" colorScheme={"telegram"} m={1} mb={2} width="16">
          <AiOutlineSend />
        </Button>
      </HStack>
    </FormControl>
  );
};

const MessageFromOther = ({ message }: { message: string }) => {
  const color = "green.100";

  return (
    <Flex
      bg={color}
      minWidth={"100px"}
      borderRadius="lg"
      w="fit-content"
      p={3}
      m={1}
    >
      <Text>{message}</Text>
    </Flex>
  );
};
const MessageFromUser = ({ message }: { message: string }) => {
  const color = "blue.100";
  const align = "flex-end";

  return (
    <Flex
      bg={color}
      minWidth={"100px"}
      borderRadius="lg"
      w="fit-content"
      p={3}
      m={1}
      alignSelf={align}
    >
      <Text>{message}</Text>
    </Flex>
  );
};

const GetMessageOfRoom = ({
  userStateData,
  messageList,
}: {
  userStateData: GetChatUserOutput | undefined;
  messageList: GetMessageOutput[] | undefined;
}) => {
  if (userStateData && messageList) {
    return (
      <>
        <div id="top"></div>
        {messageList
          .slice(0)
          .reverse()
          .map((message) => {
            if (
              message.sender_user.wallet_address == userStateData.wallet_address
            ) {
              return (
                <MessageFromUser
                  key={Math.random()}
                  message={message.message_data}
                />
              );
            }
            return (
              <MessageFromOther
                key={Math.random()}
                message={message.message_data}
              />
            );
          })}
        <div id="bottom"></div>
      </>
    );
  }

  return <></>;
};

const detail = () => {
  const userStateData = useStoreState((state) => state.chatUser.data);
  const router = useRouter();
  const { id } = router.query;

  const [messageList, setMessageList] = useState<GetMessageOutput[]>();

  const [room, setRoom] = useState<GetRoomInfo>();

  const getRoom = async () => {
    try {
      if (id) {
        const room = await ApiServices.roomChat.getRoomInfo(id.toString());

        setRoom(room.data.data);
      }
    } catch (error) {}
  };

  const getMessage = async () => {
    try {
      if (id) {
        const message = await ApiServices.privateMessage.getMessage(
          id.toString(),
          0
        );
        setMessageList(message.data.data.messages);
      }
    } catch (error) {}
  };
  const fetchMoreData = async () => {
    try {
      if (id) {
        const newMessage = await ApiServices.privateMessage.getMessage(
          id.toString(),
          1
        );
      }
      return;
    } catch (error) {}
  };

  useEffect(() => {
    getMessage();
    getRoom();
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("message-text")?.focus();

      document.getElementById("bottom")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 1000);
  }, [messageList]);

  return (
    <Flex h="100vh">
      <Head>
        <title>Decentralized Chat</title>
        <meta
          name="description"
          content="Communicating with your own Web3 Account"
        />
        <link
          rel="icon"
          href="https://cdn.iconscout.com/icon/free/png-512/chat-1438147-1213937.png?f=avif&w=256"
        />
      </Head>
      <ChatSidebar />
      <Flex flex={1} direction="column">
        <Topbar
          key={id?.toString()}
          avatar={room?.avatar || ""}
          username={room?.name || "Chat user"}
        />
        {}

        <Flex
          flex={1}
          direction="column"
          // pt={0}
          pb={0}
          mx={5}
          // mb={0}
          overflowX="scroll"
          sx={{
            "&::-webkit-scrollbar": {
              width: "1px",
            },
          }}
        >
          {/* <InfiniteScroll
            key={Math.random()}
            pageStart={0}
            loadMore={fetchMoreData}
            hasMore={true || false}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
            isReverse={true}

          >
          </InfiniteScroll> */}
          <GetMessageOfRoom
            key={`MessageOfRoom_${id}`}
            messageList={messageList}
            userStateData={userStateData}
          />
        </Flex>
        <Bottombar
          key={`bottom ${id?.toString() || ""}`}
          id={id?.toString() || ""}
          messageList={messageList}
          setMessageList={setMessageList}
        />
      </Flex>
    </Flex>
  );
};
export default detail;
