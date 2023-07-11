import { FC, useState } from "react";
import { TBook } from "./Books";
import { useMutation } from "@apollo/client";
import {
  BOOKS_QUERY,
  DELETE_BOOK_MUTATION,
  EDIT_BOOK_MUTATION,
} from "./graphql";

export const Book: FC<TBook> = (book) => {
  const [deleteMutation] = useMutation<number>(DELETE_BOOK_MUTATION, {
    refetchQueries: [{ query: BOOKS_QUERY }],
  });

  const [editMutation] = useMutation<TBook>(EDIT_BOOK_MUTATION, {
    refetchQueries: [{ query: BOOKS_QUERY }],
  });

  const deleteBook = async () => {
    await deleteMutation({
      variables: {
        id: book.id,
      },
    });
  };

  const editBook = async () => {
    await editMutation({
      variables: {
        id: book.id,
        title: title,
        year: +year,
      },
    });
    setIsEdit(false);
  };

  const discardChanges = () => {
    setIsEdit(false);
    setTitle(book.title);
    setYear(book.year);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [year, setYear] = useState(book.year);
  const [title, setTitle] = useState(book.title);

  return (
    <tr>
      <td>
        {isEdit ? (
          <input
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        ) : (
          book.title
        )}
      </td>

      <td>
        {isEdit ? (
          <input
            className="form-control"
            type="text"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          ></input>
        ) : (
          book.year
        )}
      </td>
      <td>
        {isEdit ? (
          <>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <button className="btn btn-succes mr-2" onClick={editBook}>
              SAVE
            </button>
            <button
              className="btn btn-danger mr-2"
              onClick={() => discardChanges()}
            >
              CANCEL
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-info mr-2"
              onClick={() => setIsEdit(true)}
            >
              EDIT
            </button>
          </>
        )}
      </td>

      <td>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <button className="btn btn-danger" onClick={deleteBook}>
          DELETE
        </button>
      </td>
    </tr>
  );
};
