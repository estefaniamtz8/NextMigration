import React from 'react';
import { MdClose } from 'react-icons/md';
import { Button, CircularProgress, Popover } from '@mui/material';
import { FontsData } from 'styles/palette';
import { useMutation, useQuery } from '@tanstack/react-query';
import getTags, { createTag, deleteTag, updateUserTags } from 'services/tags';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const TagsComponent = (args) => {
  const { person, data } = args;
  const userID = person?.userID || person?.docID || person?.uid;

  const [inputValue, setInputValue] = React.useState('');
  const [tags, setTags] = React.useState([]);
  const [tagsFiltered, setTagsFiltered] = React.useState([]);
  const [tagToDelete, setTagToDelete] = React.useState(null);
  const [userTags, setUserTags] = React.useState(data?.tags || person?.tags || []);
  const [dataPopover, setDataPopover] = React.useState({
    anchorEl: null,
    open: false,
    data: null,
  });

  const adminData = useSelector((state) => state?.admins?.me);

  const handleClose = () => {
    setDataPopover({
      ...dataPopover,
      open: false,
      data: null,
    });
  };

  const {
    data: dataTags,
    isLoading: gettingTags,
    isRefetching: refetchingTags,
    isError: tagsError,
  } = useQuery({
    queryFn: () => getTags(),
    queryKey: ['getTags'],
  });
  const { mutate: mutateDeleteTag, isPending: deletingTag } = useMutation({
    mutationFn: deleteTag,
    // eslint-disable-next-line consistent-return
    onSuccess: (data) => {
      if (data.success) {
        setTags(tags?.filter((tag) => tag?.docID !== tagToDelete));
        setTagsFiltered(tags?.filter((tag) => tag?.docID !== tagToDelete));
        setTagToDelete(() => null);
        return toast.success('Se ha eliminado el tag');
      }
    },
    onError: () => toast.error('Error en el servidor, favor de avisar al departamente de IT code: 501'),
  });

  const { mutate: mutateCreateTag, isPending: creatingTag } = useMutation({
    mutationFn: createTag,
    onSuccess: (data) => {
      if (data.success) {
        setTags(() => [...tags, data.tag]);
        setTagsFiltered(() => [...tags, data.tag]);
        toast.success('Se ha creado el tag');
      }
      setInputValue('');
    },
    onError: () => toast.error('Error en el servidor, favor de avisar al departamente de IT code: 502'),
  });

  const { mutate: mutateUpdateUserTags, isPending: updatingUserTags } = useMutation({
    mutationFn: updateUserTags,
    onError: () => toast.error('Error en el servidor, favor de avisar al departamente de IT code: 500'),
  });

  const onUpdateUserTags = async (tag) => {
    const existTag = userTags?.find((userTag) => userTag?.docID === tag?.docID);
    if (existTag) {
      setUserTags(userTags?.filter((userTags) => userTags?.docID !== tag?.docID));
      return mutateUpdateUserTags({
        data: {
          tags: userTags?.filter((userTags) => userTags?.docID !== tag?.docID),
          userID,
        },
      });
    }
    setUserTags([...userTags, tag]);
    return mutateUpdateUserTags({
      data: { tags: [...userTags, tag], userID },
    });
  };

  const onCreateTag = () => {
    if (inputValue === '') {
      return toast.error('Ya existe una tag con este nombre');
    }
    return mutateCreateTag({
      value: inputValue,
      label: inputValue,
      createdBy: adminData?.names || 'Intrare',
    });
  };

  const onDeleteTag = async (docID) => {
    setTagToDelete(() => docID);
    return mutateDeleteTag(docID);
  };

  const filterTags = () => {
    setTagsFiltered(tags?.filter((tag) => tag?.value?.toLowerCase()?.includes(inputValue?.toLowerCase())));
  };

  React.useEffect(() => {
    filterTags();
  }, [inputValue]);

  const isGettingTags = gettingTags || refetchingTags || creatingTag || deletingTag || updatingUserTags;

  React.useEffect(() => {
    if (!isGettingTags && !tagsError && dataTags && isEmpty(tags)) {
      setTags(() => dataTags?.tags);
      setTagsFiltered(() => dataTags?.tags);
    }
  }, [dataTags, isGettingTags, tagsError, tags]);

  return (
    <>
      <div className="flex w-full flex-wrap gap-2.5">
        {userTags?.map((tag) => (
          <p key={tag.docID} className="w-max cursor-pointer rounded-full bg-gray px-2 pt-0.5 font-founders text-sm">
            {tag?.value}
          </p>
        ))}
        <p
          onClick={(event) => {
            setDataPopover({
              anchorEl: event.currentTarget,
              open: true,
            });
          }}
          className="w-max cursor-pointer rounded-full bg-gray px-2 pt-0.5 font-founders text-sm"
        >
          Etiquetas +
        </p>
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
            height: '100%',
            overflow: 'auto',
            padding: '10px 10px',
            color: '#453423',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            {userTags?.map((tag) => (
              <div
                style={{
                  display: 'flex',
                  gap: '2px',
                  alignItems: 'center',
                  backgroundColor: '#cccccc',
                  padding: '2px 4px',
                  borderRadius: '8px',
                }}
                key={`delete${tag?.docID}`}
              >
                <p>{tag?.value}</p>
                <MdClose
                  onClick={() => onUpdateUserTags(tag)}
                  style={{ cursor: 'pointer' }}
                  color="#706f6f"
                  size={12}
                />
              </div>
            ))}
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  onCreateTag();
                }
              }}
              style={{
                backgroundColor: '#F9F7ED',
                borderRadius: '4px',
                outline: 'none',
                border: 0,
                padding: '4px 5px',
                fontSize: '12px',
                width: '175px',
                fontFamily: FontsData.reg,
              }}
              type="text"
              placeholder="Buscar o crear etiqueta"
            />
            <div
              style={{
                overflowY: 'scroll',
                maxHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              {isGettingTags && <CircularProgress className="text-purple" />}
              {!isGettingTags && tagsFiltered?.length === 0 && <p>Pulsa Enter para crear una nueva etiqueta</p>}
              {!isGettingTags &&
                tagsFiltered?.length > 0 &&
                tagsFiltered?.map((tag) => (
                  <div
                    key={tag?.docID}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Button
                      onClick={() => onUpdateUserTags(tag)}
                      sx={{ bgcolor: 'transparent' }}
                      size="small"
                      variant="text"
                    >
                      {tag?.label}
                    </Button>
                    <MdClose
                      onClick={() => onDeleteTag(tag?.docID)}
                      style={{ cursor: 'pointer' }}
                      color="#706f6f"
                      size={16}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
};

export default TagsComponent;
