import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md'
import { BiSolidCloudUpload } from 'react-icons/bi';
import { Stack, FormLabel, Typography } from '@mui/material';

import { BsImageFill } from "react-icons/bs";
import inputFileStackStyles from './styles';
import { getStorageMain } from '../../../services/firebase';
import { FontsData } from '../../../styles/palette';

function FileInput({
  htmlFor,
  label,
  file,
  type = '',
  direction,
  accept,
  required,
  onRemoveFile,
  onChange,
  height = '100px',
}) {
  const [fileTempUrl, setFileTempUrl] = useState('');
  const getStorageURL = async () => {
    if (typeof file === 'object' && type === 'company') {
      const res = await getStorageMain(file?.location);
      setFileTempUrl(res?.info);
    }
  };

  useEffect(() => {
    getStorageURL();
  }, [file]);

  return (
    <Stack spacing={1} direction={direction} sx={{ width: '100%' }}>
      <FormLabel htmlFor={htmlFor}>
        {`${label} `}
        {required && <span style={{ color: 'red' }}>*</span>}
        <Stack
          alignItems="center"
          justifyContent="center"
          direction="row"
          sx={{
            ...inputFileStackStyles,
            cursor: file ? 'default' : 'pointer',
            height,
          }}
        >
          {typeof file === 'string' && type === 'vacancy' && (
            <Stack alignItems="center" className="relative w-full" direction="row" spacing={1}>
              <img className="object-contain w-full h-full max-h-48" src={JSON.parse(file || {})?.url} alt="Cover" />
              <MdClose size={20} className="absolute top-0 right-0 cursor-pointer" onClick={onRemoveFile} />
            </Stack>
          )}
          {typeof file === 'string' && type === 'company' && (
            <Stack alignItems="center" className="relative w-full" direction="row" spacing={1}>
              <img className="object-contain w-full h-20 max-h-48" src={file} alt="Cover" />
              <MdClose size={20} className="absolute top-0 right-0 cursor-pointer" onClick={onRemoveFile} />
            </Stack>
          )}
          {file === null && <BiSolidCloudUpload size={38} />}
          {typeof file === 'object' && type === 'vacancy' && file && (
            <Stack alignItems="center" className="relative w-full h-full " direction="row" spacing={1}>
              <img className="object-contain w-full h-full max-h-48" src={URL?.createObjectURL(file)} alt="Cover" />
              <MdClose size={20} className="absolute top-0 right-0 cursor-pointer" onClick={onRemoveFile} />
            </Stack>
          )}
          {typeof file === 'object' && type === 'company' && file && (
            <Stack alignItems="center" className="relative w-full h-full " direction="row" spacing={1}>
              <img
                className="object-contain w-full h-full max-h-48"
                src={file?.location ? fileTempUrl : URL?.createObjectURL(file)}
                alt="Cover"
              />
              <MdClose size={20} className="absolute top-0 right-0 cursor-pointer" onClick={onRemoveFile} />
            </Stack>
          )}
          {type === 'event' && file && (
            <Stack alignItems="center" direction="row" spacing={1}>
              <BsImageFill size={26} />
              <Typography component="p" variant="p" sx={{ fontFamily: FontsData.circularStd, fontSize: '0.8rem' }}>
                {file?.name}
              </Typography>
              <MdClose size={20} style={{ cursor: 'pointer' }} onClick={onRemoveFile} />
            </Stack>
          )}
        </Stack>
      </FormLabel>
      <input id={htmlFor} name={htmlFor} type="file" accept={accept} onChange={onChange} style={{ display: 'none' }} />
    </Stack>
  );
}

FileInput.defaultProps = {
  direction: 'column',
  file: null,
  accept: 'image/*',
  required: true,
};

FileInput.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['row', 'column']),
  file: PropTypes.shape({
    name: PropTypes.string,
  }),
  accept: PropTypes.string,
  required: PropTypes.bool,
  onRemoveFile: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FileInput;
