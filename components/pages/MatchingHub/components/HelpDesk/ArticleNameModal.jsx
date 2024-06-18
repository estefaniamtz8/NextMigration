import React, { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import ModalLayout from '../../modals/Layout'; 

function ArticleNameModal({
  edit = false,
  open = false,
  onClose = () => {},
  createArticle = () => {},
  updateArticle = () => {},
  loading = false,
  articleValue,
}) {
  const [articleName, setArticleName] = useState(edit ? articleValue : '');

  useEffect(() => {
    setArticleName(edit ? articleValue : '');
  }, [open, articleValue, edit]);

  return (
    <ModalLayout
      actions={
        <Button
          onClick={() => {
            if (edit) {
              updateArticle(articleName);
            } else {
              createArticle(articleName);
            }
            setArticleName('');
          }}
          variant="contained"
          color="primary"
          type="submit"
          form="create-company-form"
          sx={{ maxWidth: 'max-content', height: '100%' }}
        >
          {edit ? 'Actualizar Artículo' : 'Crear Artículo'}
        </Button>
      }
      open={open}
      onClose={onClose}
      title={edit ? 'Actualizar Artículo' : 'Nuevo Artículo'}
    >
      <div className="flex flex-col gap-y-4 px-12 py-4">
        {loading ? (
          <CircularProgress className="self-center justify-self-center" color="inherit" />
        ) : (
          <>
            <label className="text-sm font-medium">Nombre del artículo</label>
            <input
              value={articleName}
              onChange={(e) => setArticleName(e.target.value)}
              type="text"
              className="w-full rounded-lg border-none bg-cream px-4 py-2 font-sans text-sm outline-none"
            />
          </>
        )}
      </div>
    </ModalLayout>
  );
}

ArticleNameModal.defaultProps = {
  edit: false,
  open: false,
  loading: false,
  articleValue: '',
  onClose: () => {},
  createArticle: () => {},
  updateArticle: () => {},
};

ArticleNameModal.propTypes = {
  edit: PropTypes.bool,
  open: PropTypes.bool,
  loading: PropTypes.bool,
  articleValue: PropTypes.string,
  onClose: PropTypes.func,
  createArticle: PropTypes.func,
  updateArticle: PropTypes.func,
};

export default ArticleNameModal;
