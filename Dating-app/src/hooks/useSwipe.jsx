import React, { useState } from 'react'

function useSwipe(users) {
    const [index,setIndex] = useState(0);

    const swipeRight = () => setIndex(index + 1);
    const swipeLeft = () => setIndex(index + 1);

  return {user: users[index],swipeRight,swipeLeft}
}

export default useSwipe