import { formatTime } from '../utils/formatTime';

const Message = ({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2 px-2 sm:px-4`}>
      <div 
        className={`inline-block p-3 rounded-lg break-words ${
          isOwn
            ? 'bg-green-100 text-right'
            : 'bg-gray-200 text-left'
        } max-w-[80%] sm:max-w-xs`}
      >
        <p className="text-sm sm:text-base">{message.text}</p>
        <small className="text-xs text-gray-500 block mt-1">{formatTime(message.createdAt)}</small>
      </div>
    </div>
  );
};

export default Message;
