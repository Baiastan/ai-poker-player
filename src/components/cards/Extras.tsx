import React, { FC } from 'react';

interface ExtrasProps {
  joker?: string;
  cover?: string;
}

const Extras: FC<ExtrasProps> = ({ joker, cover }) => {
  return joker ? (
    <div className={`card ${joker}`}></div>
  ) : (
    <div className={`card ${cover}`}></div>
  );
};

export default Extras;
