import React from 'react'

function ChatBubble({message, isSender}) {
  return (
    <div className={`p-3 rounded-lg ${isSender ? "bg-blue-500 text-white ml-auto" : "bg-gray-300"}`}>
      {message}
    </div>
  )
}

export default ChatBubble