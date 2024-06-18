import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Divider, MenuItem, Popover, Select } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'easymde/dist/easymde.min.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiImage } from 'react-icons/fi';
import { AiOutlineEdit, AiOutlineSearch, AiOutlineCloudUpload } from 'react-icons/ai';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import getArticles, { createArticle, deleteArticle, updateArticle } from 'services/articles';
import { isEmpty } from 'lodash';
import toast from 'react-hot-toast';
import ArticleNameModal from './ArticleNameModal';

function HelpDesk() {
  // const [version, setVersion] = useState(10);
  const [markdownContent, setMarkdownContent] = useState('');
  // const [showPreview, setShowPreview] = useState(false);

  const [newEditModal, setNewEditModal] = useState(false);

  const [articles, setArticles] = useState([]);

  const [currentArticle, setCurrentArticle] = useState(null);

  const [loading, setLoading] = useState(false);

  const [articlesFiltered, setArticlesFiltered] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const adminData = useSelector((state) => state?.admins?.me);

  const [isEdit, setIsEdit] = useState(false);

  const [dataPopover, setDataPopover] = React.useState({
    anchorEl: null,
    open: false,
    data: null,
  });

  const handleClose = () => {
    setDataPopover({
      ...dataPopover,
      open: false,
    });
  };

  const { mutate: mutateCreateArticle, isPending: creatingArticle } = useMutation({
    mutationFn: createArticle,
    onSuccess: (data) => {
      if (data.success) {
        setArticles([data?.article, ...articles]);
        setArticlesFiltered([data?.article, ...articles]);
        setCurrentArticle(data?.article);
        setMarkdownContent('');
        toast.success('Se ha creado el artículo');
      }
      setNewEditModal(false);
      setIsEdit(false);
    },
    onError: () => toast.error('Error en el servidor, favor de avisar al departamente de IT code: 501'),
  });

  const onCreateArticle = (articleName) => {
    if (articles?.find((article) => article?.title === articleName)) {
      toast.error('Ya existe un artículo con este nombre');
    } else {
      mutateCreateArticle({
        title: articleName,
        status: 'active',
        createdBy: adminData?.names || 'Intrare',
        target: 'candidates',
      });
    }
  };

  const { mutate: mutateUpdateArticle, isPending: updatingArticle } = useMutation({
    mutationFn: updateArticle,
    onSuccess: (data) => {
      if (data.success) {
        setArticles([
          ...articles?.map((article) => {
            if (article?.docID === currentArticle?.docID) {
              return { ...article, ...data?.article };
            }
            return article;
          }),
        ]);
        setArticlesFiltered([
          ...articles?.map((article) => {
            if (article?.docID === currentArticle?.docID) {
              return { ...article, ...data?.article };
            }
            return article;
          }),
        ]);
        setCurrentArticle({ ...currentArticle, ...data?.article });
        toast.success('Se ha actualizado el artículo');
      }

      setNewEditModal(false);
      return handleClose();
    },
    onError: () => {
      handleClose();
      return toast.error('Error en el servidor, favor de avisar al departamente de IT code: 501');
    },
  });

  const onUpdateArticle = async (articleTitle = '') => {
    const data = new FormData();
    const objFinal = {
      data: JSON.stringify({
        title: articleTitle === '' ? currentArticle?.title : articleTitle,
        status: currentArticle?.status,
        body: currentArticle?.body,
        updatedBy: adminData?.names || 'Intrare',
        articleID: currentArticle?.docID,
        fileName: currentArticle?.fileName,
        target: currentArticle?.target,
      }),
      coverNew: currentArticle?.coverNew,
    };
    Object.keys(objFinal)?.map((key) => {
      data.append(key, objFinal?.[key]);
      return 1;
    });

    return mutateUpdateArticle(data);
  };

  const { mutate: mutateDeleteArticle, isPending: deletingArticle } = useMutation({
    mutationFn: deleteArticle,
    // eslint-disable-next-line consistent-return
    onSuccess: (data) => {
      if (data.success) {
        setArticles(articles?.filter((article) => article?.docID !== currentArticle?.docID));
        setArticlesFiltered(articles?.filter((article) => article?.docID !== currentArticle?.docID));
        if (articles?.filter((article) => article?.docID !== currentArticle?.docID)?.length > 0) {
          setCurrentArticle(articles?.filter((article) => article?.docID !== currentArticle?.docID)[0]);
        }
        handleClose();
        return toast.success('Se ha eliminado el artículo');
      }
    },
    onError: () => toast.error('Error en el servidor, favor de avisar al departamente de IT code: 501'),
  });

  const onDeleteArticle = () => {
    const articleID = currentArticle?.docID;
    mutateDeleteArticle(articleID);
  };

  const onUploadFile = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    setCurrentArticle({
      ...currentArticle,
      coverNew: file,
      fileName: file?.name,
      cover: {
        url: URL.createObjectURL(file),
      },
    });
    setLoading(false);
  };

  useEffect(() => {
    if (searchValue !== '') {
      const filtered = articles?.filter((article) =>
        article?.title?.toLowerCase().includes(searchValue?.toLowerCase())
      );
      if (filtered?.length > 0) {
        setArticlesFiltered(filtered);
        setCurrentArticle(filtered[0]);
        setMarkdownContent(filtered[0]?.body);
      } else {
        toast.error('No hay artículos relacionados a tu búsqueda');
      }
    } else {
      setArticlesFiltered(articles);
    }
  }, [searchValue]);

  const {
    data: dataArticles,
    isLoading: loadingArticles,
    isRefetching: refetchingArticles,
    isError: errorArticles,
  } = useQuery({
    queryFn: () => getArticles(),
    queryKey: ['getArticles'],
  });

  const isGettingArticles =
    loadingArticles || refetchingArticles || deletingArticle || creatingArticle || updatingArticle;

  React.useEffect(() => {
    if (!isGettingArticles && !errorArticles && dataArticles && isEmpty(articles)) {
      setArticles(dataArticles?.articles);
      setArticlesFiltered(dataArticles?.articles);
      setCurrentArticle(dataArticles?.articles[0]);
      setMarkdownContent(dataArticles?.articles[0]?.body);
    }
  }, [dataArticles, isGettingArticles, errorArticles, articles]);

  return (
    <>
      <div>
        <div className="rounded-xl bg-white px-6 py-4 2xl:px-8">
          <h1 className="text-2xl font-medium">Artículos de Preguntas y Respuestas</h1>
          <div className="flex w-full items-center pt-8">
            <div className="relative w-[45%]">
              <input
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e?.target?.value);
                }}
                className="w-64 rounded-full border-0 bg-gray100 py-2.5 pl-10 pr-4 font-sans outline-none 2xl:w-80"
              />
              <AiOutlineSearch size={18} className="absolute left-4 top-2" />
            </div>
            <div className="flex w-full items-center justify-between gap-x-4">
              {currentArticle && (
                <>
                  <h2 className="text-2xl font-medium">{currentArticle?.title}</h2>
                  <div className="flex items-center justify-between gap-x-3">
                    {/* <Select className="h-10 px-4 bg-cream" value={version} onChange={(e) => setVersion(e.target.value)}> */}
                    {/*  <MenuItem value={10}>Ten</MenuItem> */}
                    {/*  <MenuItem value={20}>Twenty</MenuItem> */}
                    {/*  <MenuItem value={30}>Thirty</MenuItem> */}
                    {/* </Select> */}
                    <input accept="image/*" onChange={onUploadFile} id="coverBlog" className="hidden" type="file" />
                    {currentArticle?.fileName ? (
                      <div className="flex items-center gap-x-4">
                        <a
                          href={currentArticle?.cover?.url}
                          rel="noreferrer"
                          className="flex gap-x-2 text-black no-underline"
                          target="_blank"
                        >
                          <FiImage size={20} className="text-black" />
                          <p className="line-clamp-1 w-24 text-ellipsis font-sans text-sm">
                            {currentArticle?.fileName}
                          </p>
                        </a>
                        <label
                          htmlFor="coverBlog"
                          className="line-clamp-1 w-20 cursor-pointer gap-x-2 text-ellipsis pr-2 text-sm"
                          id="labelUpload"
                        >
                          <AiOutlineEdit size={16} /> Editar
                        </label>
                      </div>
                    ) : (
                      <label
                        htmlFor="coverBlog"
                        className="line-clamp-1 w-20 cursor-pointer gap-x-2 text-ellipsis pr-2 text-sm"
                        id="labelUpload"
                      >
                        <AiOutlineCloudUpload size={22} /> Portada
                      </label>
                    )}
                    <Select
                      className="h-10 w-32 bg-transparent"
                      value={currentArticle?.status || 'active'}
                      onChange={(e) => setCurrentArticle({ ...currentArticle, status: e.target.value })}
                    >
                      <MenuItem value="active">
                        <div className="flex items-center gap-x-4">
                          <div className="h-3 w-3 rounded-full bg-green" />
                          <p className="text-sm text-black">Activo</p>
                        </div>
                      </MenuItem>
                      <MenuItem value="inactive">
                        <div className="flex items-center gap-x-4">
                          <div className="h-3 w-3 rounded-full bg-red" />
                          <p className="text-sm text-black">Inactivo</p>
                        </div>
                      </MenuItem>
                    </Select>
                    <Select
                      className="h-10 w-32 bg-transparent"
                      value={currentArticle?.target || 'candidates'}
                      onChange={(e) => setCurrentArticle({ ...currentArticle, target: e.target.value })}
                    >
                      <MenuItem value="candidates">
                        <div className="flex items-center gap-x-4">
                          <p className="text-sm text-black">Candidatos</p>
                        </div>
                      </MenuItem>
                      <MenuItem value="companies">
                        <div className="flex items-center gap-x-4">
                          <p className="text-sm text-black">Empresas</p>
                        </div>
                      </MenuItem>
                    </Select>
                    {JSON.stringify(articles?.find((article) => article?.docID === currentArticle?.docID)) !==
                      JSON.stringify(currentArticle) && (
                      <button
                        onClick={() => onUpdateArticle()}
                        type="button"
                        className="cursor-pointer rounded-lg border-none bg-purple px-4 py-2 text-white outline-none"
                      >
                        Guardar
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <Divider className="py-2" />
          <div className="flex w-full">
            <div className="w-[36rem]">
              <div
                onClick={() => {
                  setIsEdit(false);
                  setNewEditModal(true);
                }}
                className="flex cursor-pointer items-center gap-x-5 border-[1px] border-l-0 border-t-0 border-solid border-[#0000001f] py-4"
              >
                <AiOutlineEdit size={21} />
                <p className="text-sm text-black">Crear nuevo documento</p>
              </div>
              {loading ? (
                <CircularProgress className="self-end justify-self-center text-purple" />
              ) : (
                <div className="flex h-[60vh] flex-col overflow-auto">
                  {articlesFiltered?.map((article) => (
                    <div
                      onClick={() => {
                        setCurrentArticle(article);
                        setMarkdownContent(article?.body);
                      }}
                      key={article?.docID}
                      className={`relative ${
                        currentArticle?.docID === article?.docID && 'bg-gray100'
                      } flex cursor-pointer items-center gap-x-7 border-[1px] border-l-0 border-t-0 border-solid border-[#0000001f] px-4 py-8`}
                    >
                      <div className="h-3 w-3 rounded-full bg-green" />
                      <p className="line-clamp-1 text-base text-black">{article?.title}</p>
                      <BsThreeDotsVertical
                        onClick={(event) => {
                          setDataPopover({
                            anchorEl: event.currentTarget,
                            open: true,
                            data: article?.title,
                          });
                        }}
                        size={21}
                        className="absolute right-4 top-8 cursor-pointer text-gray200"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full max-w-[60rem] px-4 py-4">
              {currentArticle && (
                <MarkdownEditor
                  key={`edit-${currentArticle?.docID}`}
                  enableScroll
                  className="md-secondary text-sm"
                  value={markdownContent}
                  onChange={(value) => {
                    setMarkdownContent(value);
                    setCurrentArticle({ ...currentArticle, body: value });
                  }}
                  visible
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Popover
        id={dataPopover?.data?.docID}
        open={dataPopover?.open}
        anchorEl={dataPopover?.anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            padding: '10px 0px',
          }}
        >
          <Button
            onClick={() => {
              handleClose();
              setNewEditModal(true);
              setIsEdit(true);
            }}
            style={{ width: '100%' }}
            variant="text"
          >
            Actualizar nombre
          </Button>
          <Button
            onClick={onDeleteArticle}
            variant="text"
            style={{ justifyContent: 'flex-start', color: 'red', width: '100%' }}
          >
            Eliminar
          </Button>
        </main>
      </Popover>
      <ArticleNameModal
        articleValue={dataPopover?.data || ''}
        edit={isEdit}
        onClose={() => {
          handleClose();
          setNewEditModal(false);
          setIsEdit(false);
        }}
        open={newEditModal}
        createArticle={onCreateArticle}
        updateArticle={onUpdateArticle}
        loading={loading}
      />
    </>
  );
}

export default HelpDesk;
