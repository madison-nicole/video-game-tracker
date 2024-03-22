import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare, faTrash, faCircleCheck, faBan,
} from '@fortawesome/free-solid-svg-icons';
import { deleteGame, updateGame } from '../actions';

function Game(props) {
  // when clicking on to select an individual game from games
  const selectedGame = useSelector((reduxState) => reduxState.posts?.current);
  console.log(selectedGame);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // initialize the states
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(selectedGame.title);

  // functions for buttons
  // display game title changes
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // update game card
  const onSave = useCallback(() => {
    setTitle(title);
    dispatch(updateGame(selectedGame.id, navigate, title));
    setEditMode(false);
  }, [setEditMode, setTitle, dispatch, selectedGame.id, navigate, title]);

  // cancel edits with the cancel button
  const onCancel = useCallback(() => {
    setTitle(selectedGame.title);
    setEditMode(false);
  }, [selectedGame.title]);

  // delete game card
  const onDelete = useCallback(() => {
    dispatch(deleteGame(selectedGame.id, navigate));
  }, [dispatch, selectedGame.id, navigate]);

  if (editMode) {
    return (
      <div className="game-card">
        <div className="game-card-header">
          <h3><input className="game-title" placeholder="" value={title} onChange={onTitleChange} /></h3>
          <div className="top-right-icons">
            <FontAwesomeIcon className="save-button" icon={faCircleCheck} size="sm" onClick={onSave} />
            <FontAwesomeIcon className="cancel-button" icon={faBan} size="sm" onClick={onCancel} />
            <FontAwesomeIcon className="delete-button" icon={faTrash} size="sm" onClick={onDelete} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-card">
      <div className="game-card-header">
        <h3 className="game-title">{ title }</h3>
        <div className="top-right-icons">
          <FontAwesomeIcon className="edit-button" icon={faPenToSquare} size="sm" onClick={() => setEditMode(true)} />
          <FontAwesomeIcon className="delete-button" icon={faTrash} size="sm" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
}

export default Game;
