import React, { useState, useRef, useEffect } from 'react';
import { fetchDataPostAsync } from 'services/axios/fetchs';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import palette from 'styles/palette';
import { getStorageMain, putFile, addDocumentMain } from 'services/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { Viewer as ViewerPDF, Worker } from '@react-pdf-viewer/core';
import { CircularProgress } from '@mui/material';
import { BiErrorCircle } from 'react-icons/bi';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { BsEyeFill, BsFillCircleFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { HiOutlineUpload } from 'react-icons/hi';
import { IoMdSend } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';
import { ImArrowUp } from 'react-icons/im';
import { MdClose } from 'react-icons/md';
import toast from 'react-hot-toast';
import CommonButton from '../CommonButton';
import Sidebar from './Sidebar';
import { loader } from '../../../../../redux/actions/loader_actions';
import { setUserLocalRedux } from '../../../../../redux/actions/users_actions';
import useOnClickOutside from '../../../../../hook/useOnClickOutside';
import { Version } from '../../../../../utils/environment';

const workerUrl = 'https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js';

const Documents = () => {
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const {
    users: { user: data },
  } = useSelector((rdx) => rdx);
  const dispatch = useDispatch();
  const [showDoc, setShowDoc] = useState({
    label: '',
    show: false,
    upload: false,
    status: '',
    url: '',
  });
  const userState = useSelector((state) => state?.admins?.me);

  const docs = [
    {
      label: 'Documento migratorio',
      status: '',
      key: 'hasDocuments',
    },
    {
      label: 'RFC',
      status: '',
      key: 'rfc',
    },
    {
      label: 'Número de seguro social',
      status: '',
      key: 'nss',
    },
    {
      label: 'CURP',
      status: '',
      key: 'curp',
    },
    {
      label: 'Acta de nacimiento',
      status: '',
      key: 'acta',
    },
    {
      label: 'Certificado de educación',
      status: '',
      key: 'gradeCertification',
    },
    {
      label: 'Antecedentes penales',
      status: '',
      key: 'criminalRecord',
    },
    {
      label: 'Pasaporte válido',
      status: '',
      key: 'passport',
    },
    //
    {
      label: 'Licencia de conducir',
      status: '',
      key: 'licence',
    },
    {
      label: 'CV Intrare',
      status: '',
      key: '',
    },
    {
      label: 'CV',
      status: '',
      key: 'cv',
    },
  ];
  const prevDocsRef = useRef(docs);

  const [allDocuments, setDocs] = useState(docs);

  const [editDocText, setEditDocText] = useState({
    show: false,
    value: '',
  });

  const drop = React.useRef(null);

  const [dragging, setDragging] = React.useState(false);

  useEffect(() => {
    try {
      const documentsObtained = data?.documents;
      const documents = Object?.entries(documentsObtained || {}).map(([key, value]) => ({ key, ...value }));
      const updatedDocs = allDocuments.map((doc) => {
        const matchingDoc = documents.find((d) => d.key === doc.key);
        if (matchingDoc) {
          return { ...doc, status: matchingDoc?.status, url: matchingDoc?.url || '' };
        }
        return doc;
      });

      // Solo actualizar el estado si los documentos han cambiado
      if (JSON.stringify(updatedDocs) !== JSON.stringify(prevDocsRef.current)) {
        setDocs(updatedDocs);
        prevDocsRef.current = updatedDocs;
      }
    } catch (error) {
      toast.error('Error en la actualización');
      // NotificationManager.error('Error en la actualización', 'code: 500');
    }
  }, [data]);
  const statuses = {
    HELP: 'necesito ayuda',
    NO: 'no',
    DONE: 'si',
    REJECTED: 'rejected',
  };
  const [file, setFile] = useState(null);

  const onUpload = async (files, docID) => {
    try {
      const file = files[0];
      const size = files[0]?.size;
      const name = `${uuid()}.pdf`;
      const nameFile = `files/${docID}/documents/${name}`;
      await putFile(file, nameFile);
      const { info } = await getStorageMain(nameFile);
      return {
        url: info,
        nameFile,
        name,
        size,
      };
    } catch (e) {
      toast.error('Error al momento de subir la imagen');
      return null;
    }
  };
  const onSubmit = async () => {
    if (file) {
      try {
        dispatch(loader(true));
        const id = uuid();
        const dataDocument = await onUpload(file, id);
        if (dataDocument) {
          const { name, nameFile, size, url } = dataDocument;
          // console.log('dataDocument', dataDocument)
          const sendable = {
            name,
            nameFile,
            locationFile: nameFile,
            size,
            url,
            docID: data?.docID || data?.uidAuthFacebook,
            documentName: showDoc?.key,
            ext: 'pdf',
            status: 'si',
          };

          const response = await fetchDataPostAsync('/aperture/update-document-profile', sendable);
          if (response?.success) {
            // console.log(sendable);
            dispatch(
              setUserLocalRedux({
                ...data,
                documents: {
                  ...data?.documents,
                  [showDoc?.key]: sendable,
                },
              })
            );
            setShowDoc({
              ...showDoc,
              upload: false,
            });
            setFile(null);
            toast.success('Se ha subido correctamente');
            dispatch(loader(false));
          }
        }
      } catch (error) {
        toast.error('Ha habido un error subiendo el documento');
      }
    } else {
      toast.error('Ha habido un error subiendo el documento');
    }
  };
  const onSubmitTextDoc = async () => {
    try {
      dispatch(loader(true));
      // console.log('dataDocument', dataDocument)
      const sendable = {
        url: editDocText?.value,
        userID: data?.docID || data?.uidAuthFacebook,
        documentName: showDoc?.key,
        ext: ' ',
        status: 'si',
        name: ' ',
        details: ' ',
        size: ' ',
        onlyDetails: false,
        locationFile: ' ',
        affectID: data?.docID,
      };
      const response = await fetchDataPostAsync('/user/update-document', sendable);
      if (response?.success) {
        // console.log(sendable);
        dispatch(
          setUserLocalRedux({
            ...data,
            documents: {
              ...data?.documents,
              [showDoc?.key]: sendable,
            },
          })
        );
        setShowDoc({
          ...showDoc,
          show: false,
          upload: false,
        });
        setEditDocText({
          show: false,
          value: '',
        });
        setFile(null);
        toast.success('Se ha actualizado correctamente');
        dispatch(loader(false));
      }
    } catch (error) {
      toast.error('Ha habido un error subiendo el documento');
    }
  };
  const onRejectDocument = async () => {
    try {
      dispatch(loader(true));
      const sendable = {
        status: 'rejected',
        affectID: data?.docID || data?.uidAuthFacebook,
        documentName: showDoc?.key,
        admin: userState,
        version: Version,
        user: {
          phone: data?.phone || '',
          codePhone: data?.codePhone || '',
          email: data?.email || '',
          names: data?.names || 'Candidato',
        },
      };
      const response = await fetchDataPostAsync('/user/update-document-status', sendable);
      if (response?.success) {
        dispatch(
          setUserLocalRedux({
            ...data,
            documents: {
              ...data?.documents,
              [showDoc?.key]: sendable,
            },
          })
        );
        setShowDoc({
          ...showDoc,
          show: false,
          upload: false,
        });
        setEditDocText({
          show: false,
          value: '',
        });
        setFile(null);
        toast.success('Se ha actualizado correctamente');
        dispatch(loader(false));
      }
      dispatch(loader(false));
    } catch (error) {
      toast.error('Ha habido un error al rechazar el documento');
    }
  };

  const sendNotificationForDocuments = async (docLabel) => {
    try {
      await addDocumentMain(`users/${data?.docID || data?.uidAuthFacebook}/notification`, {
        createAt: dayjs().valueOf(),
        type: 'request',
        message: `Se solicita el documento ${docLabel}`,
        userAction: {
          email: data?.email,
          name: data?.displayName || 'Admin',
          photo: data?.photoURL || '',
          userID: data?.uid || data?.uidAuthFacebook,
        },
      });

      // console.log({
      //   data: {
      //     fromW: 'a2a08627-8787-485b-9836-af27e10bd74b',
      //     namespace: 'd84dd28f_2daa_46f7_b956_cbb69dfcf1bf',
      //     to: data?.codePhone ? `+${data?.codePhone || ''}${data?.phone || ''}` : data?.phone,
      //     data: [
      //       {
      //         default: data?.names || 'Candidato',
      //       },
      //       {
      //         default: docLabel || 'Documentos extras',
      //       },
      //       {
      //         default: 'https://candidates.intrare.mx/documents',
      //       },
      //     ],
      //     templateName: 'request_document',
      //     code: 'es',
      //   },
      // });
      await fetchDataPostAsync('/user/send-whatsapp', {
        data: {
          fromW: 'a2a08627-8787-485b-9836-af27e10bd74b',
          namespace: 'd84dd28f_2daa_46f7_b956_cbb69dfcf1bf',
          to: data?.codePhone ? `+${data?.codePhone || ''}${data?.phone || ''}` : data?.phone,
          data: [
            {
              default: data?.names || 'Candidato',
            },
            {
              default: docLabel || 'Documentos extras',
            },
            {
              default: 'https://candidates.intrare.mx/documents',
            },
          ],
          templateName: 'request_document',
          code: 'es',
          channelId: '389bc40c-14a5-4a07-8d9b-6dbb728d0b1a',
        },
      });
      toast.success('Se mando la solicitud de manera exitosa');
    } catch (e) {
      toast.error('Error al mandar notificación para el usuario.');
    }
  };
  const renderError = (error) => {
    let message = '';
    console.log(error);
    switch (error.name) {
      case 'InvalidPDFException':
        message = 'El archivo es invalido o esta corrupto.';
        break;
      case 'n':
        message = 'El archivo es invalido o esta corrupto.';
        break;
      case 'MissingPDFException':
        message = 'No hay documento';
        break;
      case 'UnexpectedResponseException':
        message = 'El servidor no responde';
        break;
      default:
        message = 'No se encontró en documento';
        break;
    }
    return (
      <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center">
        <BiErrorCircle size={80} className="text-purple" />
        <p className="mt-[40px] text-base text-purple">Error, algo salió mal.</p>
        <p className="mt-[40px] text-base text-purple">{message}</p>
      </div>
    );
  };

  function addTarget(index) {
    setTimeout(() => {
      try {
        const doc = document.getElementById(`cv-file-id-${index}`);
        if (doc) {
          const atags = doc.getElementsByTagName('a') || [];
          const tagsLength = atags.length;
          for (let item = 0; item < tagsLength; item += 1) {
            atags[item].target = '_blank';
          }
        }
      } catch (error) {
        console.error(error);
      }
    }, 500);
  }

  const onViewDocument = (documentData) => {
    const validUrl =
      /[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/;
    if (validUrl.test(documentData?.url)) {
      return (
        <Worker workerUrl={workerUrl}>
          {/* {console.log(defaultLayoutPluginInstance)} */}
          <ViewerPDF
            fileUrl={documentData?.url}
            // plugins={[defaultLayoutPluginInstance]}
            renderError={(error) => renderError(error)}
            initialPage={0}
            renderLoader={(percentages) => (
              <div className="flex flex-col items-center justify-center">
                <CircularProgress size={80} className="text-purple300" />
                <p>Cargando PDF {`${Math.round(percentages)}%`}</p>
              </div>
            )}
            onDocumentLoad={() => addTarget(documentData?.label)}
          />
        </Worker>
      );
    }
    return editDocText?.show ? (
      <div className="-mx-10 flex w-full flex-col gap-y-4">
        <div className="relative flex w-full gap-2 rounded-lg bg-cream py-1.5 pl-4 pr-8">
          <input
            onChange={(e) => setEditDocText({ ...editDocText, value: e.target.value })}
            value={editDocText?.value || ''}
            type="text"
            className="w-full border-0 bg-transparent py-0.5 pr-6 font-sans text-base outline-none"
          />
          <MdClose
            onClick={() => {
              setEditDocText({
                show: false,
                value: '',
              });
            }}
            size={18}
            className="absolute right-2 top-3 cursor-pointer text-black"
          />
        </div>
        <button
          onClick={onSubmitTextDoc}
          className="w-max cursor-pointer rounded-lg border-0 bg-purple px-12 py-2 text-sm text-white"
          type="button"
        >
          Actualizar
        </button>
      </div>
    ) : (
      <div className="relative -mx-10 flex h-9 w-full gap-2 rounded-lg bg-cream py-1.5 pl-4 pr-8">
        <p className="text-base text-black"> {documentData?.url} </p>
        <AiOutlineEdit
          onClick={() =>
            setEditDocText({
              show: true,
              value: showDoc?.url,
            })
          }
          size={18}
          className="absolute right-2 top-2 cursor-pointer text-black"
        />
      </div>
    );
  };

  const DocSidebarRef = React.useRef();
  useOnClickOutside(DocSidebarRef, () => {
    setShowDoc({
      ...showDoc,
      show: false,
    });
    setEditDocText({
      show: false,
      value: '',
    });
  });

  const UploadDocSidebarRef = React.useRef();
  useOnClickOutside(UploadDocSidebarRef, () => {
    setShowDoc({
      ...showDoc,
      upload: false,
    });
    setEditDocText({
      show: false,
      value: '',
    });
  });

  const handleDragOver = (e) => {
    setDragging(true);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    if (files && files.length) {
      setFile(files);
    }
    setDragging(false);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-6 rounded-lg bg-cream p-6 lg:w-2/3 xl:w-1/2 2xl:w-1/3">
        {allDocuments?.map((doc) => {
          let color = '#cdcdcd';
          if (doc?.status === statuses.HELP) {
            color = 'pink';
          } else if (doc?.status === statuses.DONE) {
            color = '#68E1A9';
          } else if (doc?.status === statuses.REJECTED) {
            color = '#F51C1C';
          }
          return (
            <div className="flex items-center justify-between" key={doc?.label}>
              <div className="flex items-center gap-4">
                <BsFillCircleFill size={13} color={color} />
                <p className="text-sm font-medium">{doc.label}</p>
              </div>
              <div className="flex items-center gap-5">
                {doc?.status === statuses?.DONE && (
                  <>
                    {doc?.key !== 'rfc' && doc?.key !== 'nss' && doc?.key !== 'curp' && (
                      <HiOutlineUpload
                        size={18}
                        color="#707070"
                        cursor="pointer"
                        onClick={() => {
                          const url = doc?.url;
                          window.open(url, '_blank');
                        }}
                      />
                    )}
                    {showDoc?.show && showDoc?.key === doc.key && (
                      <BsFillEyeSlashFill
                        sx={{ color: '#707070' }}
                        onClick={() =>
                          setShowDoc({
                            ...showDoc,
                            label: doc.label,
                            show: false,
                            status: doc.status,
                            url: doc.url,
                            key: doc.key,
                          })
                        }
                        size={18}
                        color="#707070"
                        cursor="pointer"
                      />
                    )}
                    {((!showDoc?.show && showDoc?.key === doc.key) || showDoc?.key !== doc.key) && (
                      <BsEyeFill
                        sx={{ color: '#707070' }}
                        onClick={() => {
                          setShowDoc({
                            ...showDoc,
                            label: doc.label,
                            show: true,
                            status: doc.status,
                            url: doc.url,
                            key: doc.key,
                          });
                          setEditDocText({
                            show: false,
                            value: '',
                          });
                        }}
                        size={18}
                        color="#707070"
                        cursor="pointer"
                      />
                    )}
                  </>
                )}
                {doc?.status === statuses?.REJECTED && (
                  <>
                    {doc?.key !== 'rfc' && doc?.key !== 'nss' && doc?.key !== 'curp' && (
                      <HiOutlineUpload
                        size={18}
                        color="#707070"
                        cursor="pointer"
                        onClick={() => {
                          const url = doc?.url;
                          window.open(url, '_blank');
                        }}
                      />
                    )}
                    {showDoc?.show && showDoc?.key === doc.key && (
                      <BsFillEyeSlashFill
                        sx={{ color: '#707070' }}
                        onClick={() =>
                          setShowDoc({
                            ...showDoc,
                            label: doc.label,
                            show: false,
                            status: doc.status,
                            url: doc.url,
                            key: doc.key,
                          })
                        }
                        size={18}
                        color="#707070"
                        cursor="pointer"
                      />
                    )}
                    {((!showDoc?.show && showDoc?.key === doc.key) || showDoc?.key !== doc.key) && (
                      <BsEyeFill
                        sx={{ color: '#707070' }}
                        onClick={() => {
                          setShowDoc({
                            ...showDoc,
                            label: doc.label,
                            show: true,
                            status: doc.status,
                            url: doc.url,
                            key: doc.key,
                          });
                          setEditDocText({
                            show: false,
                            value: '',
                          });
                        }}
                        size={18}
                        color="#707070"
                        cursor="pointer"
                      />
                    )}
                  </>
                )}
                {doc?.status !== statuses?.REJECTED && doc?.status !== statuses?.DONE && (
                  <>
                    {showDoc?.upload && showDoc?.key === doc.key && (
                      <MdClose
                        onClick={() =>
                          setShowDoc({
                            ...showDoc,
                            label: doc.label,
                            upload: false,
                            status: doc.status,
                            url: doc.url,
                            key: doc.key,
                          })
                        }
                        size={18}
                        color="#707070"
                        cursor="pointer"
                      />
                    )}
                    {((!showDoc?.upload && showDoc?.key === doc.key) || showDoc?.key !== doc.key) && (
                      <HiOutlineUpload
                        sx={{ color: '#707070' }}
                        onClick={() =>
                          setShowDoc({
                            ...showDoc,
                            label: doc.label,
                            upload: true,
                            status: doc.status,
                            url: doc.url,
                            key: doc.key,
                          })
                        }
                        size={18}
                        color="#707070"
                        cursor="pointer"
                      />
                    )}
                  </>
                )}
                <IoMdSend
                  onClick={() => sendNotificationForDocuments(doc?.label)}
                  size={18}
                  color="#707070"
                  cursor="pointer"
                />
              </div>
            </div>
          );
        })}
      </div>
      {showDoc.status === statuses.DONE || showDoc?.status === statuses.REJECTED ? (
        <Sidebar size="31.5%" open={showDoc.show === true}>
          <div ref={DocSidebarRef} className="flex flex-col gap-8 px-10 py-6">
            <CommonButton
              onClick={() => {
                setShowDoc({ ...showDoc, show: false });
                setEditDocText({
                  show: false,
                  value: '',
                });
              }}
              width="7rem"
              text="Cerrar"
            />
            <div>
              <h3 className="text-lg font-medium text-purple300">{showDoc.label}</h3>
            </div>
            <div className="flex items-center justify-center">
              {(showDoc?.url?.includes('pdf') ||
                (!showDoc?.url?.includes('jpeg') && !showDoc?.url?.includes('jpg'))) && (
                <figure className="mx-10 w-full 2xl:h-[65vh]">
                  {/* <img src={showDoc?.url} alt={showDoc.label} /> */}
                  {onViewDocument(showDoc)}
                </figure>
              )}
              {(showDoc?.url?.includes('jpeg') || showDoc?.url?.includes('jpg')) && (
                <figure className="mx-10 w-full 2xl:h-[65vh]">
                  <img className="w-full" src={showDoc?.url} alt={showDoc.label} />
                </figure>
              )}
            </div>
            {showDoc.status === statuses.DONE && (
              <button
                onClick={onRejectDocument}
                className="w-max cursor-pointer self-center border-0 bg-transparent text-purple300"
                type="button"
              >
                Rechazar y notificar
              </button>
            )}
            {showDoc.status === statuses.REJECTED && (
              <p className="w-maxr self-center border-0 bg-transparent text-sm text-purple300">Rechazado</p>
            )}
          </div>
        </Sidebar>
      ) : (
        <Sidebar size="28%" open={showDoc.upload === true}>
          <div ref={UploadDocSidebarRef} className="flex flex-col gap-8 px-10 py-6">
            <CommonButton
              onClick={() => {
                setShowDoc({ ...showDoc, upload: false });
                setEditDocText({
                  show: false,
                  value: '',
                });
                setFile(null);
              }}
              width="7rem"
              text="Cerrar"
            />
            <div>
              <h3 className="text-lg font-medium text-purple300" style={{ color: palette.purple300 }}>
                {showDoc.label}
              </h3>
              <p className="font-founders text-sm text-black">Pendiente de subir</p>
            </div>
            {showDoc?.label === 'RFC' || showDoc?.label === 'Número de seguro social' || showDoc?.label === 'CURP' ? (
              <div className="relative flex w-full gap-2 rounded-lg bg-cream py-1.5 pl-4 pr-8">
                <input
                  onChange={(e) => setEditDocText({ ...editDocText, value: e.target.value })}
                  value={editDocText?.value || ''}
                  type="text"
                  className="w-full border-0 bg-transparent py-0.5 pr-6 font-sans text-base outline-none"
                />
              </div>
            ) : (
              <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                ref={drop}
                className="relative flex h-[200px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray100"
              >
                <div className="absolute cursor-pointer">
                  {file === null ? (
                    <div className="flex items-center gap-2">
                      {dragging ? (
                        <>
                          <ImArrowUp size={30} color={palette.purple300} />
                          <span className="text-sm text-purple300">Suelta archivo</span>
                        </>
                      ) : (
                        <>
                          <ImArrowUp size={30} color={palette.purple300} />
                          <span className="text-sm text-purple300">Subir archivo</span>
                        </>
                      )}
                    </div>
                  ) : (
                    <span className="text-center text-sm text-black">{file[0]?.name}</span>
                  )}
                </div>
                <input
                  onChange={({ target }) => setFile(target?.files?.length ? target?.files : null)}
                  className="h-full w-auto cursor-pointer text-purple300 opacity-0"
                  type="file"
                  accept="application/pdf"
                />
              </div>
            )}
            <CommonButton
              onClick={() => {
                if (
                  showDoc?.label === 'RFC' ||
                  showDoc?.label === 'Número de seguro social' ||
                  showDoc?.label === 'CURP'
                ) {
                  onSubmitTextDoc();
                } else {
                  onSubmit();
                }
              }}
              text={
                showDoc?.label === 'RFC' || showDoc?.label === 'Número de seguro social' || showDoc?.label === 'CURP'
                  ? 'Subir'
                  : 'Subir archivo'
              }
            />
          </div>
        </Sidebar>
      )}
    </>
  );
};

export default Documents;
