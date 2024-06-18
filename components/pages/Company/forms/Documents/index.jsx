import React from 'react';
import PropTypes from 'prop-types';
import Constants from 'utils/constants/newVacancy.json';
import { Stack, Typography, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { IoIosArrowBack } from 'react-icons/io';

import palette from 'styles/palette';
import InputWithLabel from 'components/Elements/InputWithLabel';
import { useVacancyData, useVacancyActions } from 'store';

function Documents(props) {
  const { returnHandleChange, onSubmit } = props;

  const { setDocuments } = useVacancyActions();
  const { documents } = useVacancyData();

  const onChange = (e) => {
    const { name, value } = e.target;
    setDocuments({
      ...documents,
      [name]: value,
    });
  };

  const onChangeDocs = (e, doc, index) => {
    e.preventDefault();

    const updatedDocs = documents.docs ? [...documents.docs] : [];
    if (updatedDocs[index]) {
      updatedDocs[index] = { value: doc, mandatory: e.target.value };
    } else {
      updatedDocs.push({ value: doc, mandatory: e.target.value });
    }
    setDocuments({
      ...documents,
      docs: updatedDocs,
    });
  };

  const onBeforeSubmit = (e) => {
    e.preventDefault();
    return onSubmit();
  };

  return (
    <form id="documents-form" onSubmit={onBeforeSubmit}>
      <Stack spacing={2} direction="column" sx={{ padding: '2rem 0', maxWidth: '75%' }}>
        <button
          className="bottom-0 right-[10px] flex cursor-pointer items-center border-none bg-transparent pb-2 text-start font-sans tracking-wider"
          type="button"
          onClick={returnHandleChange}
        >
          <IoIosArrowBack className="w-[24px] pr-[10px] text-black" id="getBack" /> Regresar
        </button>
        <Typography component="h3" color={palette.purple300}>
          Documentos requeridos para match
        </Typography>

        <Stack spacing={1} sx={{ width: '100%' }}>
          {Constants.general.documentsOptions
            ?.filter((doc) => doc?.label !== 'RFC')
            ?.map((doc, index) => (
              <Stack
                key={doc.value}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  borderRadius: '100px',
                  padding: '0.4rem 0.9rem',
                  background: palette.gray200,
                }}
              >
                <Typography component="p" sx={{ color: palette.blackText, fontSize: '0.8rem' }}>
                  {doc.label}
                </Typography>
                <RadioGroup
                  row
                  aria-labelledby={doc.value}
                  name={doc.value}
                  sx={{ marginLeft: 'auto !important' }}
                  onChange={(e) => onChangeDocs(e, doc.value, index)}
                  value={documents?.docs?.find((d) => d.value === doc.value)?.mandatory || ''}
                >
                  <FormControlLabel
                    value="yes"
                    control={
                      <Radio
                        sx={{
                          color: '#fff',
                          '&.Mui-checked': {
                            color: palette.purple300,
                          },
                        }}
                      />
                    }
                    label="Si"
                  />
                  <FormControlLabel
                    value="no"
                    control={
                      <Radio
                        variant="outlined"
                        sx={{
                          color: '#fff',
                          '&.Mui-checked': {
                            color: palette.purple300,
                          },
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </Stack>
            ))}
        </Stack>

        <Typography component="h3" color={palette.purple300} sx={{ paddingTop: '2rem' }}>
          Nota, esta empresa usa Workday para Administrar sus vacantes, por ende se requiere de un responsable:
        </Typography>

        <InputWithLabel
          htmlFor="responsible"
          label="Correo(s) del responsable"
          id="responsible"
          name="responsible"
          placeholder="Escribe los correos electrónicos separados por coma (,)"
          value={documents?.responsible || ''}
          onChange={onChange}
          variant="outlined"
          color="secondary"
          size="small"
          autoComplete="off"
          required
        />
      </Stack>
    </form>
  );
}

Documents.propTypes = {
  returnHandleChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Documents;
