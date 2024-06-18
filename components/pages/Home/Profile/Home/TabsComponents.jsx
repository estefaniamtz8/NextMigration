import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loader } from 'redux/actions/loader_actions';
import { FontsData } from '../../../styles/palette';

function ViableCbx(args) {
  const { state, userID, funct } = args;
  // eslint-disable-next-line consistent-return
  const newState = () => {
    if (state === 'no') {
      return 'noViable';
    }

    return state;
  };

  const dispatch = useDispatch();

  async function handleChange(event) {
    dispatch(loader(true));
    const { value } = event.target;
    const sendable = {
      data: { viability: value, viabilityFromAdmin: true },
      userID,
      affectID: userID,
    };
    await funct(sendable);
    dispatch(loader(false));
  }

  return (
    <FormControl variant="standard" sx={{ fontFamily: FontsData.reg }}>
      <Select value={newState()} onChange={handleChange} variant="outlined">
        <MenuItem value="viable">
          <div className="flex w-28 items-center gap-4">
            <div className="h-2.5 w-2.5 rounded-full bg-green" />
            <p className="text-[15px] text-black">Viable</p>
          </div>
        </MenuItem>
        <MenuItem value="noViable">
          <div className="flex w-28 items-center gap-4">
            <div className="h-2.5 w-2.5 rounded-full bg-red" />
            <p className="text-[15px] text-black">No viable</p>
          </div>
        </MenuItem>
        <MenuItem value="inProcess">
          <div className="flex w-28 items-center gap-4">
            <div className="h-2.5 w-2.5 rounded-full bg-gray" />
            <p className="text-[15px] text-black">En proceso</p>
          </div>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default ViableCbx;
