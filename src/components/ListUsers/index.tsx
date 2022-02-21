/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import React, { useRef, useState, useCallback } from 'react';
import html2canvas from 'html2canvas';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Icon import
import { BsCaretDownFill, BiCamera } from '../../utils/icons';

// Component import
import { EmptyText } from '../EmptyText';

// Hook import
import { useCharts } from '../../hooks/charts';

// Style import
import { ListFooter } from './styles';
import { api } from '../../services/api';

export const ListUsers: React.FC = () => {
  // Hooks
  const {
    usersListData,
    handleSelectUser,
    loading,
    selectedUser,
    page,
    setPage,
  } = useCharts();

  // Refs
  const anchorRef = useRef<HTMLDivElement>(null);

  // Local states
  const [image, setImage] = useState('');
  const [open, setOpen] = useState(false);
  const [hideButtons, setHideButtons] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function DataURIToBlob() {
    const splitDataURI = image.split(',');
    const byteString =
      splitDataURI[0].indexOf('base64') >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  const handleSubmit = useCallback(async () => {
    if (selectedUser?.id) {
      try {
        setSubmitLoading(true);

        // Prepare data
        const data = new FormData();

        console.log(image);

        const file = DataURIToBlob();

        data.append('picture', file);

        await api.post(`/reports/email/${selectedUser.id}`, data, {
          headers: { 'content-type': 'multipart/form-data' },
        });
      } catch (error) {
        console.error('Não foi possível enviar imagem ao backend', error);
      } finally {
        setSubmitLoading(false);
        setImage('');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DataURIToBlob, image]);

  const handleScreenshot = () => {
    setHideButtons(true);

    const element: HTMLElement | null = document.querySelector('body');

    if (element) {
      html2canvas(element, {})
        .then((canvas: HTMLCanvasElement) => {
          const url: string = canvas.toDataURL('image/png');

          setImage(url);

          handleSubmit();
        })
        .finally(() => {
          setHideButtons(false);
        });
    }
  };

  return (
    <>
      {!hideButtons && (
        <ButtonGroup variant="contained" ref={anchorRef}>
          <Button onClick={handleScreenshot} disabled={!selectedUser?.id}>
            <BiCamera />
          </Button>

          <LoadingButton
            size="small"
            onClick={() => setOpen(prevOpen => !prevOpen)}
            loading={loading || submitLoading}
            variant="contained"
          >
            Usuários
            <BsCaretDownFill style={{ marginLeft: 5 }} />
          </LoadingButton>
        </ButtonGroup>
      )}

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        style={{ maxHeight: '500px', overflow: 'auto' }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {!usersListData[0]?.id && <EmptyText />}

                  {usersListData.map(user => (
                    <MenuItem
                      key={`${user.name}-${user.id}`}
                      selected={selectedUser?.id === user.id}
                      onClick={() => {
                        handleSelectUser(user);
                        setOpen(false);
                      }}
                    >
                      {user.name}
                    </MenuItem>
                  ))}

                  {usersListData[0]?.id && (
                    <ListFooter>
                      <LoadingButton
                        size="small"
                        loading={loading || submitLoading}
                        variant="contained"
                        onClick={() => setPage(page + 1)}
                      >
                        Carregar mais
                      </LoadingButton>
                    </ListFooter>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
