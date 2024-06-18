import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const sideVariants = {
  open: { opacity: 1, x: '0', transition: { duration: 0.3, ease: 'easeOut' } },
  closed: { opacity: 0, x: '100%', transition: { duration: 0.3, ease: 'easeOut' } },
};

const Sidebar = ({ children, open, size, sizeAlt }) => {
  return (
    <main>
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: 300 }}
            exit={{ width: 0, transition: { delay: 0.7, duration: 0.3 } }}
          >
            <motion.div
              style={{ width: size !== undefined ? size : '564px', height: sizeAlt }}
              className="absolute right-0 top-0 z-[1] h-full bg-white text-white shadow-2xl"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              <motion.div style={{ height: '100%' }} variants={itemVariants}>
                {children}
              </motion.div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Sidebar;
