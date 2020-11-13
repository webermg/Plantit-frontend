import React from 'react';

export default function Comment(data) {
    return (
        <div>
            <h4>From: {data.user}</h4>

            <p>{data.comment}</p>
        </div>

    )
}