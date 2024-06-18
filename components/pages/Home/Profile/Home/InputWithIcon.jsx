import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';

const InputWithIcon = ({ onChange, value, name }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleInput = () => {
    setIsExpanded(!isExpanded);
  };

  const inputVariants = {
    visible: { opacity: 1, width: '100%', transition: { duration: 0.3 } },
    hidden: { opacity: 0, width: '0' },
  };

  const iconVariants = {
    hidden: { rotate: 0 },
  };

  return (
    <div className="absolute flex h-[1.75rem] items-center justify-center rounded-2xl bg-white p-1 px-2 shadow-lg">
      <motion.div onClick={toggleInput} animate={isExpanded ? 'visible' : 'hidden'} variants={iconVariants}>
        <AiOutlineSearch size={18} className="cursor-pointer text-[#e0e0e0]" />
      </motion.div>
      <motion.input
        className="bg-transparent border-0 outline-none"
        type="text"
        placeholder="Buscar por palabra clave"
        animate={isExpanded ? 'visible' : 'hidden'}
        variants={inputVariants}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputWithIcon;
