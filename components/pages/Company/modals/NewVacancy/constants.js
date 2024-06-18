import React from 'react';
import { PiTextAaBold } from 'react-icons/pi';
import { BsFingerprint } from 'react-icons/bs';
import { BiPaste } from 'react-icons/bi';

const steps = [
  { label: 'Vacante', key: 'vacancy', icon: <PiTextAaBold size={25} /> },
  { label: 'Extras', key: 'extras', icon: <BiPaste size={25} /> },
  { label: 'Documentos Y Sellos', key: 'documents', icon: <BsFingerprint size={25} /> }
];

export const nextSteps = {
  vacancy: {
    next: 'extras',
    form: 'vacancy-form',
  },
  extras: {
    next: 'documents',
    form: 'extras-form',
  },
  documents: {
    next: null,
    form: '',
  },
};

export default steps;
