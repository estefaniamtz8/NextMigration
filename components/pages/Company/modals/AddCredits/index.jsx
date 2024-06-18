import React from 'react';
import { Modal, Box } from '@mui/material';
import { MdClose } from 'react-icons/md';
import Input from '@mui/material/Input';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { fetchDataPostAsync } from 'services/axios/fetchs';
import toast from 'react-hot-toast';

const baseCreditPrice = 200;

const getTotals = (amount) => {
  const subtotal = amount.credits * baseCreditPrice;
  const taxes = subtotal * 0.16;
  const total = subtotal + taxes;

  return { credits: amount.credits, subtotal, taxes, total };
};

const AddCreditsModal = ({ openCreditsModal, setCreditsModal, setAllDataCompany, company }) => {
  const [count, setCount] = React.useState(0);
  const [amount, setAmount] = React.useState({ credits: 0, total: 0, subtotal: 0, taxes: 0 });
  const handleIncrement = (e) => {
    e.preventDefault();

    setCount(count + 1);
    setAmount(() => getTotals({ ...amount, credits: amount.credits + 1 }));
  };

  const handleDecrement = (e) => {
    e.preventDefault();

    if (count > 0) {
      setCount(count - 1);
      setAmount(() => getTotals({ ...amount, credits: amount.credits - 1 }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      companyID: company?.companyID,
      typeTransaction: 'credited',
      purchaseCredits: count,
    };
    try {
      const req = await fetchDataPostAsync('/ats/company/transaction', requestData);
      setAllDataCompany(() => ({ ...company, credits: req?.data?.balance }));
      toast.success('Se abonaron créditos correctamente');
    } catch (error) {
      console.log(error);
      toast.error('Error al abonar créditos');
    }
    setCreditsModal(false);
    setCount(0);
  };
  function removeZeros(inputValue) {
    return inputValue.replace(/^0+/, '');
  }

  const onChangeInput = (e) => {
    const inputValue = e.target.value;
    const cleanValue = removeZeros(inputValue);
    const numericValue = parseInt(cleanValue, 10);
    if (inputValue === '' || !Number.isNaN(numericValue)) {
      const credits = inputValue === '' ? 0 : numericValue;
      setCount(credits);
      setAmount(() => getTotals({ ...amount, credits }));
    }
  };
  return (
    <Modal className="flex w-full items-center justify-center outline-none" open={openCreditsModal}>
      <Box className="h-80 w-[35rem] rounded-lg bg-white">
        <Box className="relative flex h-20 w-full items-center justify-between bg-gray100 px-8 py-4">
          <h1 className="text-purple">Abonar créditos</h1>
          <MdClose
            cursor="pointer"
            onClick={() => {
              setCreditsModal(false);
              setCount(0);
            }}
            size={25}
          />
        </Box>
        <Box className="flex h-[73%] items-center justify-center">
          <form className="flex flex-col gap-3">
            <label className="text-sm" htmlFor="credits">
              Créditos a abonar
            </label>
            <div className="flex h-9 w-48 items-center justify-between gap-2 rounded-lg p-2">
              <button type="button" className="border-none bg-transparent" onClick={handleDecrement}>
                <RemoveIcon fontSize="medium" />
              </button>
              <Input
                onChange={onChangeInput}
                className="w-fit text-center text-sm outline-none"
                type="text"
                id="credits"
                value={count === 0 ? '0' : count}
                variant="outlined"
                color="secondary"
                size="small"
              />
              <button type="button" className="border-none bg-transparent" onClick={handleIncrement}>
                <AddIcon fontSize="medium" />
              </button>
            </div>
            <p className="text-sm font-medium">
              {count === 0
                ? `Un crédito cuesta ${baseCreditPrice.toLocaleString('es-MX', {
                    style: 'currency',
                    currency: 'MXN',
                  })} + IVA`
                : `${Number(Number(count) * baseCreditPrice).toLocaleString('es-MX', {
                    style: 'currency',
                    currency: 'MXN',
                  })} + IVA`}
            </p>
          </form>
        </Box>
        <Box className="flex h-20 w-full items-center justify-center bg-gray100 pb-6 pt-6">
          <button
            disabled={count === 0}
            onClick={handleSubmit}
            className="w-max cursor-pointer rounded-lg border-none bg-purple px-16 py-3 text-white disabled:cursor-not-allowed disabled:bg-purple/50"
            type="button"
          >
            Abonar
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddCreditsModal;
