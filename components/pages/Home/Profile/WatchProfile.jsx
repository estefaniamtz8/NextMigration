import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import HubPagination from './Home/Pagination/HubPagination';

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const sideVariants = {
  open: { opacity: 1, x: '0', transition: { duration: 0.3, ease: 'easeOut' } },
  closed: { opacity: 0, x: '100%', transition: { duration: 1 } },
};

const WatchProfile = ({ onClosed, openModalCandidate, pagesInfo }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="z-[3]">
      <main>
        <AnimatePresence>
          {openModalCandidate && (
            <motion.aside
              initial={{ width: 0 }}
              animate={{ width: 300 }}
              exit={{ width: 0, transition: { delay: 0.7, duration: 1 } }}
            >
              <motion.div
                style={{ width: '100%' }}
                className="absolute z-[2] h-full w-full"
                initial="closed"
                animate="open"
                exit="closed"
                variants={sideVariants}
              >
                <motion.div
                  className="flex h-full text-black max-[768px]:flex-col max-[768px]:overflow-auto"
                  variants={itemVariants}
                >
                  <div
                    onClick={onClosed}
                    className="flex w-[117px] items-center justify-center bg-[#23232399] max-[768px]:w-full"
                  >
                    <MdClose size="48" cursor="pointer" color="white" />
                  </div>
                  <HubPagination
                    showDetails={showDetails}
                    setShowDetails={setShowDetails}
                    openModalCandidate={openModalCandidate}
                    pagesInfo={pagesInfo}
                  />
                </motion.div>
              </motion.div>
            </motion.aside>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default WatchProfile;
