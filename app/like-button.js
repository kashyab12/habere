'use client'

import { useState } from 'react'

export default function LikeButton() {
    function handleClick() {
        setLikes(likes + 1)
    }
    const [likes, setLikes] = useState(0)
    return <button onClick={handleClick}>Like {likes}</button>
}