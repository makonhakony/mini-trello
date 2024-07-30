import React from 'react';
import { useDrag } from 'react-dnd';

function Card({ id, title }) {
    const [, ref] = useDrag({
        type: 'CARD',
        item: { id },
      });

  return (
    <div ref={ref} className="card">
      {title}
    </div>
  );
}

export default Card;
