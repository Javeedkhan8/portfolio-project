import { formatTime } from '../utils/formatTime';

const Message = ({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2`}>
      <div 
        className={`inline-block max-w-xs p-3 rounded-lg ${isOwn ? 'bg-green-100 text-right' : 'bg-gray-200 text-left'}`}
      >
        <p className="text-sm">{message.text}</p>
        <small className="text-xs text-gray-500">{formatTime(message.createdAt)}</small>
      </div>
    </div>
  );
};

export default Message;
