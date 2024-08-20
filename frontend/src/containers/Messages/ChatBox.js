import React, { useEffect, useState, useRef } from "react";
import { getToken } from "../../services/LocalStorageService";
import axios from "axios";
import { FaPaperPlane, FaPaperclip } from "react-icons/fa";
import "./style.css";

const ChatBox = ({ selectedAccount, senderId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const socketRef = useRef(null);
  const messageIds = useRef(new Set());
  const messagesEndRef = useRef(null);
  const [file, setFile] = useState(null);
  useEffect(() => {
    if (selectedAccount && senderId) {
      const { access_token } = getToken();
      console.log("Creating chat session...");

      axios
        .post(
          "http://localhost:8000/api/chat/create-session/",
          {
            sender_id: senderId,
            receiver_id: selectedAccount.id,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then(async (response) => {
          const newSessionId = response.data.session_id;
          console.log("New session ID:", newSessionId);
          setSessionId(newSessionId);

          try {
            const { data } = await axios.get(
              "http://localhost:8000/api/chat/messages/",
              {
                params: { session_id: newSessionId },
                headers: { Authorization: `Bearer ${access_token}` },
              }
            );
            console.log("Fetched messages:", data.results);
            setMessages(data.results || []);
            const ids = new Set(data.results.map((msg) => msg.id));
            messageIds.current = ids;
          } catch (error) {
            console.error("Error fetching messages", error);
          }

          if (socketRef.current) {
            socketRef.current.close();
          }

          const socket = new WebSocket(
            `ws://localhost:8000/ws/chat/${newSessionId}/`
          );
          socketRef.current = socket;

          socket.onopen = () => console.log("WebSocket connected");

          socket.onmessage = (event) => {
            try {
              const newMessage = JSON.parse(event.data);
              console.log("Received WebSocket message:", newMessage);

              if (!messageIds.current.has(newMessage.id)) {
                messageIds.current.add(newMessage.id);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
              }
            } catch (error) {
              console.error("Error parsing WebSocket message", error);
            }
          };

          socket.onerror = (error) => console.error("WebSocket error:", error);
          socket.onclose = () => console.log("WebSocket disconnected");
        })
        .catch((error) => console.error("Error creating chat session", error));

      return () => {
        if (socketRef.current) {
          socketRef.current.close();
        }
      };
    }
  }, [selectedAccount, senderId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected file:", selectedFile);

    if (selectedFile && selectedFile.size <= 20 * 1024 * 1024) {
      // 20MB limit
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = {
          data: reader.result,
          name: selectedFile.name,
          type: selectedFile.type,
        };
        setFile(fileData);
        console.log("File ready for sending:", fileData);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert("File size exceeds 20MB or invalid file type.");
    }
  };

  const handleMessageSend = () => {
    if (
      (message.trim() || file) &&
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      const messagePayload = {
        id: Date.now(),
        message,
        session_id: sessionId,
        sender: {
          id: senderId,
          username:  "None",
        },
        receiver: {
          id: selectedAccount.id || null,
          username:"Unknown",
        },
        file, // Include the file in the message payload
      };

      socketRef.current.send(JSON.stringify(messagePayload));
      console.log("Sent WebSocket message:", messagePayload);

      setMessages((prevMessages) => [...prevMessages, messagePayload]);
      messageIds.current.add(messagePayload.id);

      setMessage("");
      setFile(null); // Clear the file input after sending
    } else {
      console.log("Message or file is empty or WebSocket is not open");
    }
  };

  const renderMessageContent = (msg) => (
    <div key={msg.id}>
      {msg.file && (
        <div className="mb-2">
          {typeof msg.file === "string" ? (
            <div>
              {msg.file.endsWith(".jpg") ||
              msg.file.endsWith(".jpeg") ||
              msg.file.endsWith(".png") ? (
                <img
                  src={msg.file}
                  alt="Sent file"
                  className="max-w-full h-auto rounded-lg"
                />
              ) : msg.file.endsWith(".mp4") ? (
                <video controls className="max-w-full h-auto rounded-lg">
                  <source src={msg.file} type={`video/mp4`} />
                </video>
              ) : msg.file.endsWith(".pdf") ? (
                <a
                  href={msg.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View PDF
                </a>
              ) : msg.file.endsWith(".docx") ? (
                <a
                  href={msg.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Document
                </a>
              ) : (
                <p className="text-red-500">Unsupported file type</p>
              )}
            </div>
          ) : (
            <div>
              {msg.file.type.startsWith("image/") && (
                <img
                  src={msg.file.data}
                  alt={msg.file.name}
                  className="max-w-full h-auto rounded-lg"
                />
              )}
              {msg.file.type.startsWith("video/") && (
                <video controls className="max-w-full h-auto rounded-lg">
                  <source src={msg.file.data} type={msg.file.type} />
                </video>
              )}
              {msg.file.type === "application/pdf" && (
                <a
                  href={msg.file.data}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {msg.file.name}
                </a>
              )}
              {msg.file.type ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
                <a
                  href={msg.file.data}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {msg.file.name}
                </a>
              )}
              {!msg.file.type.startsWith("image/") &&
                !msg.file.type.startsWith("video/") &&
                ![
                  "application/pdf",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ].includes(msg.file.type) && (
                  <p className="text-red-500">Unsupported file type</p>
                )}
            </div>
          )}
        </div>
      )}
      {msg.message && <div className="text-message mt-2">{msg.message}</div>}
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 chat-scrollbar">
        {messages.length > 0 ? (
          messages.map((msg, index) => {
            const isSender = msg.sender && msg.sender.id === senderId;
            return (
              <div
                key={index}
                className={`mb-2 flex ${
                  isSender ? "justify-end" : "justify-start"
                } animate-fadeIn`}
              >
                <div
                  className={`w-80 p-2 rounded-lg text-sm ${
                    isSender
                      ? "bg-red-500 text-white"
                      : "bg-blue-500 text-white"
                  } shadow-lg transform transition-transform duration-300 hover:scale-105`}
                >
                  <div className="font-bold">
                    {isSender
                      ? "You"
                      : (msg.sender && msg.sender.username) || "Unknown"}
                  </div>
                  {renderMessageContent(msg)}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-500">No messages yet</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t bg-white flex items-center flex-wrap md:flex-nowrap">
        <button
          onClick={() => document.getElementById("fileInput").click()}
          className="mr-2 p-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-transform transform hover:scale-110"
        >
          <FaPaperclip size={20} />
        </button>
        <input
          id="fileInput"
          type="file"
          accept="image/png,image/jpeg,image/jpg,video/mp4,audio/*,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={handleFileChange}
        />
        {file && (
          <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg overflow-hidden">
            {file.type.startsWith("image/") && (
              <img
                src={file.data}
                alt={file.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
            )}
            {file.type.startsWith("video/") && (
              <video className="w-16 h-16 object-cover" controls>
                <source src={file.data} type={file.type} />
              </video>
            )}
            {file.type === "application/pdf" && (
              <div className="w-10 h-16 flex items-center justify-center bg-gray-200 rounded-lg">
                <a
                  href={file.data}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  PDF
                </a>
              </div>
            )}
            {file.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
              <div className="w-10 h-16 flex items-center justify-center bg-gray-200 rounded-lg">
                <a
                  href={file.data}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Doc
                </a>
              </div>
            )}
            <button onClick={() => setFile(null)} className="text-red-500">
              &times;
            </button>
          </div>
        )}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          className="flex-1 p-2 border rounded-lg mr-2"
        />
        <button
          onClick={handleMessageSend}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          <FaPaperPlane size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
