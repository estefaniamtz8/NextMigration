import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdClose, MdDone } from 'react-icons/md';
import Sidebar from '../Home/Profile/Home/Sidebar';
import useOnClickOutside from '../../../hook/useOnClickOutside';
import startup from '../../../assets/10-Project-Management1.png';
import enterprise from '../../../assets/1-User-Testing1.png';

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
function ModalChangePlan(args) {
  const { onClosed, openModal } = args;

  const [modalPlanTo, setModalPlanTo] = React.useState({
    open: false,
    plan: 'free',
  });

  const ChangeModalSidebarRef = React.useRef();
  useOnClickOutside(ChangeModalSidebarRef, () => {
    setModalPlanTo({
      open: false,
      plan: 'free',
    });
  });

  const [ats, setAts] = React.useState({
    workday: true,
    factors: true,
    teamtailor: true,
    cims: true,
    taleo: true,
    custom: true,
  });

  return (
    <div className="z-[3]">
      <main>
        <AnimatePresence>
          {openModal && (
            <motion.aside
              initial={{ width: 0 }}
              animate={{
                width: 300,
              }}
              exit={{
                width: 0,
                transition: { delay: 0.7, duration: 1 },
              }}
            >
              <motion.div
                style={{ width: '100%' }}
                className="absolute top-0 z-[2] h-full w-full"
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
                  <div className="z-40 flex w-full items-center justify-center gap-x-8 overflow-auto bg-gray100">
                    <div className="flex h-3/4 w-[22rem] flex-col justify-between rounded-2xl bg-white px-4">
                      <div className="relative">
                        <div className="flex flex-col items-center pt-6">
                          <img src={startup} className="h-40 w-52 object-contain" alt="StartUp" />
                          <h4 className="text-2xl font-medium">Startup</h4>
                        </div>
                        <p className="absolute bottom-8 right-14 text-xs text-purple">Current Plan</p>
                      </div>
                      <div className="flex w-full flex-col gap-y-2 px-4">
                        <div className="flex w-full justify-between">
                          <p className="text-base">Base Price</p>
                          <p className="text-base">Free</p>
                        </div>
                        <div className="flex w-full justify-between">
                          <p className="text-base">Included Vacancies</p>
                          <p className="text-base">0</p>
                        </div>
                        <p className="text-base">Intrare ATS</p>
                        <p className="text-base">ATS Access</p>
                        <p className="text-base">Basic Analytics</p>
                        <p className="text-base">Basic Support SLA</p>
                      </div>
                      <button
                        className="mb-6 w-full cursor-pointer self-end rounded-lg border-0 bg-purple py-3 text-white outline-0"
                        type="button"
                        onClick={() => {
                          setModalPlanTo({
                            open: true,
                            plan: 'free',
                          });
                        }}
                      >
                        Change plan
                      </button>
                    </div>
                    <div className="flex h-3/4 w-[22rem] flex-col justify-between rounded-2xl bg-white px-4">
                      <div className="relative">
                        <div className="flex flex-col items-center pt-6">
                          <img src={enterprise} className="h-40 w-52 object-contain" alt="Enterprise" />
                          <h4 className="text-center text-2xl font-medium">Enterprise</h4>
                        </div>
                        <p className="absolute bottom-8 right-10 text-xs text-purple">Current Plan</p>
                      </div>
                      <div className="flex w-full flex-col gap-y-2 px-4">
                        <div className="flex w-full justify-between">
                          <p className="text-base">Base Price</p>
                          <p className="text-base">$15,000</p>
                        </div>
                        <div className="flex w-full justify-between">
                          <p className="text-base">Included Vacancies</p>
                          <p className="text-base">0</p>
                        </div>
                        <p className="text-base">Intrare ATS</p>
                        <p className="text-base">ATS Access</p>
                        <div className="grid w-full grid-cols-2 gap-x-2 gap-y-1 px-2">
                          <p className="text-sm">
                            Workday <MdDone size={20} className="inline-flex text-green" />
                          </p>
                          <p className="text-sm">
                            iCIMS <MdDone size={20} className="inline-flex text-green" />
                          </p>
                          <p className="text-sm">
                            SuccessFactors <MdDone size={20} className="inline-flex text-green" />
                          </p>
                          <p className="text-sm">
                            Taleo <MdDone size={20} className="inline-flex text-green" />
                          </p>
                          <p className="text-sm">
                            Teamtailor <MdDone size={20} className="inline-flex text-green" />
                          </p>
                          <p className="text-sm">
                            Custom <MdDone size={20} className="inline-flex text-green" />
                          </p>
                        </div>
                        <p className="text-base">Advanced Analytics</p>
                        <p className="text-base">Dedicated Account Manager</p>
                      </div>
                      <button
                        onClick={() => {
                          setModalPlanTo({
                            open: true,
                            plan: 'enterprise',
                          });
                        }}
                        className="mb-6 w-full cursor-pointer self-end rounded-lg border-0 bg-purple py-3 text-white outline-0"
                        type="button"
                      >
                        Change plan
                      </button>
                    </div>
                    <Sidebar size="25%" open={modalPlanTo?.open || false}>
                      <div
                        ref={ChangeModalSidebarRef}
                        className="flex h-full flex-col items-center justify-around overflow-y-scroll rounded-2xl bg-white px-10 py-6 text-black"
                      >
                        {modalPlanTo?.plan === 'enterprise' ? (
                          <>
                            <img src={enterprise} className="h-30 w-52 self-center object-contain" alt="Enterprise" />
                            <div className="flex w-full flex-col gap-y-2">
                              <h4 className="self-start text-2xl font-medium">Enterprise Plan Breakdwon</h4>
                              <div className="h-[2px] w-full bg-gray100" />
                              <div className="grid w-full grid-cols-2 pt-2">
                                <div className="flex gap-x-4">
                                  <p className="text-base">Base Price</p>
                                  <select className="border-none bg-transparent font-sans text-sm outline-none">
                                    <option>Montly</option>
                                    <option>Year</option>
                                  </select>
                                </div>
                                <p className="justify-self-end text-base">$15,000</p>
                              </div>
                              <div className="grid w-full grid-cols-2 pb-2">
                                <div className="flex items-baseline gap-x-4">
                                  <p className="invisible h-7 text-base">Base Price</p>
                                  <select className="border-none bg-transparent font-sans text-sm outline-none">
                                    <option>Discount %</option>
                                    <option>No</option>
                                  </select>
                                </div>
                                <input
                                  min={0}
                                  max={100}
                                  type="number"
                                  className="h-7 w-12 justify-self-end rounded-md border-none bg-gray100 pl-1 font-sans text-base outline-none"
                                />
                              </div>
                              <div className="h-[2px] w-full bg-gray100" />
                              <div className="flex w-full justify-between py-1.5">
                                <p className="text-base">Included Vacancies</p>
                                <input
                                  min={0}
                                  max={100}
                                  type="number"
                                  className="w-12 justify-self-end rounded-md border-none bg-gray100 pl-1 font-sans text-base outline-none"
                                />
                              </div>
                              <div className="h-[2px] w-full bg-gray100" />
                              <div className="flex w-full justify-between py-1.5">
                                <div className="flex flex-col gap-y-1">
                                  <p className="text-base">Extra Vacancies</p>
                                  <p className="text-xs">Custom cost per extra vacancy needed</p>
                                </div>
                                <input
                                  min={0}
                                  max={100}
                                  type="number"
                                  className="h-7 w-14 justify-self-end rounded-md border-none bg-gray100 pl-1 font-sans text-base outline-none"
                                />
                              </div>
                              <div className="h-[2px] w-full bg-gray100" />
                              <p className="text-base">Intrare ATS</p>
                              <p className="text-base">ATS Access</p>
                              <div className="grid w-full grid-cols-2 gap-x-2 gap-y-1 px-2">
                                <p
                                  onClick={() => {
                                    setAts({ ...ats, workday: !ats?.workday });
                                  }}
                                  className="cursor-pointer text-sm"
                                >
                                  Workday
                                  {ats?.workday ? (
                                    <MdDone size={20} className="inline-flex text-green" />
                                  ) : (
                                    <MdClose size={20} className="inline-flex text-red" />
                                  )}
                                </p>
                                <p
                                  onClick={() => {
                                    setAts({ ...ats, cims: !ats?.cims });
                                  }}
                                  className="cursor-pointer text-sm"
                                >
                                  iCIMS
                                  {ats?.cims ? (
                                    <MdDone size={20} className="inline-flex text-green" />
                                  ) : (
                                    <MdClose size={20} className="inline-flex text-red" />
                                  )}
                                </p>
                                <p
                                  onClick={() => {
                                    setAts({ ...ats, factors: !ats?.factors });
                                  }}
                                  className="cursor-pointer text-sm"
                                >
                                  SuccessFactors
                                  {ats?.factors ? (
                                    <MdDone size={20} className="inline-flex text-green" />
                                  ) : (
                                    <MdClose size={20} className="inline-flex text-red" />
                                  )}
                                </p>
                                <p
                                  onClick={() => {
                                    setAts({ ...ats, taleo: !ats?.taleo });
                                  }}
                                  className="cursor-pointer text-sm"
                                >
                                  Taleo
                                  {ats?.taleo ? (
                                    <MdDone size={20} className="inline-flex text-green" />
                                  ) : (
                                    <MdClose size={20} className="inline-flex text-red" />
                                  )}
                                </p>
                                <p
                                  onClick={() => {
                                    setAts({ ...ats, teamtailor: !ats?.teamtailor });
                                  }}
                                  className="cursor-pointer text-sm"
                                >
                                  Teamtailor
                                  {ats?.teamtailor ? (
                                    <MdDone size={20} className="inline-flex text-green" />
                                  ) : (
                                    <MdClose size={20} className="inline-flex text-red" />
                                  )}
                                </p>
                                <p
                                  onClick={() => {
                                    setAts({ ...ats, custom: !ats?.custom });
                                  }}
                                  className="cursor-pointer text-sm"
                                >
                                  Custom
                                  {ats?.custom ? (
                                    <MdDone size={20} className="inline-flex text-green" />
                                  ) : (
                                    <MdClose size={20} className="inline-flex text-red" />
                                  )}
                                </p>
                              </div>
                              <div className="h-[2px] w-full bg-gray100" />
                              <p className="py-1.5 text-base">Advanced Analytics</p>
                              <div className="h-[2px] w-full bg-gray100" />
                              <p className="py-1.5 text-base">Dedicated Account Manager</p>
                              <div className="h-[2px] w-full bg-gray100" />
                              <div className="flex justify-between">
                                <p className="text-base">Subtotal</p>
                                <p className="text-base">$15,000</p>
                              </div>
                              <div className="flex justify-between">
                                <p className="text-base">IVA = 16%</p>
                                <p className="text-base">2,400</p>
                              </div>
                              <div className="flex justify-between">
                                <p className="text-xl">Total</p>
                                <p className="text-base">2,400</p>
                              </div>
                              <button
                                className="cursor-pointer rounded-lg border-none bg-purple py-2.5 text-white outline-none"
                                type="button"
                              >
                                Save & Invoice
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <img src={startup} className="h-40 w-52 object-contain" alt="StartUp" />
                            <div className="flex w-full flex-col gap-y-2 px-4">
                              <h4 className="text-2xl font-medium">Startup</h4>
                              <div className="h-[2px] w-full bg-gray100" />
                              <div className="flex w-full justify-between">
                                <p className="text-base">Base Price</p>
                                <p className="text-base">Free</p>
                              </div>
                              <div className="h-[2px] w-full bg-gray100" />
                              <div className="flex w-full justify-between">
                                <p className="text-base">Included Vacancies</p>
                                <p className="text-base">0</p>
                              </div>
                              <div className="h-[2px] w-full bg-gray100" />
                              <p className="text-base">Intrare ATS</p>
                              <div className="h-[2px] w-full bg-gray100" />
                              <p className="text-base">ATS Access</p>
                              <div className="h-[2px] w-full bg-gray100" />
                              <p className="text-base">Basic Analytics</p>
                              <div className="h-[2px] w-full bg-gray100" />
                              <p className="text-base">Basic Support SLA</p>
                              <div className="h-[2px] w-full bg-gray100" />
                              <div className="flex justify-between">
                                <p className="text-xl">Total</p>
                                <p className="text-base">Free</p>
                              </div>
                            </div>
                            <button
                              className="mb-6 w-full cursor-pointer self-end rounded-lg border-0 bg-purple py-3 text-white outline-0"
                              type="button"
                            >
                              Save & Invoice
                            </button>
                          </>
                        )}
                      </div>
                    </Sidebar>
                  </div>
                </motion.div>
              </motion.div>
            </motion.aside>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default ModalChangePlan;
