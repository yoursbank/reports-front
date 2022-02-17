import React, { useRef, useState } from 'react';
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

// Hook import
import { useCharts } from '../../hooks/charts';

// Style import
import { ListFooter } from './styles';

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

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleScreenshot = () => {
    setHideButtons(true);

    const element: HTMLElement | null = document.querySelector('body');

    if (element) {
      html2canvas(element, {})
        .then((canvas: HTMLCanvasElement) => {
          const url: string = canvas.toDataURL();
          setImage(url);
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
          <Button onClick={handleScreenshot}>
            <BiCamera />
          </Button>

          <LoadingButton
            size="small"
            onClick={() => setOpen(prevOpen => !prevOpen)}
            loading={loading}
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
                  {usersListData.map(user => (
                    <MenuItem
                      key={user.id}
                      selected={selectedUser?.id === user.id}
                      onClick={() => {
                        handleSelectUser(user);
                        setOpen(false);
                      }}
                    >
                      {user.name}
                    </MenuItem>
                  ))}

                  <ListFooter>
                    <LoadingButton
                      size="small"
                      loading={loading}
                      variant="contained"
                      onClick={() => setPage(page + 1)}
                    >
                      Carregar mais
                    </LoadingButton>
                  </ListFooter>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <img src={image} alt="" />
    </>
  );
};
