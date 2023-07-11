import { FC } from "react";
import { Book } from "./Book";
import { useQuery } from "@apollo/client";
import { BOOKS_QUERY } from "./graphql";

export type TBook = {
  id: number;
  title: string;
  year: number;
};

export type TBooks = {
  books: TBook[];
};

export const Books: FC = () => {
  const { data, loading, error } = useQuery<TBooks>(BOOKS_QUERY);
  if (error) {
    console.log(error);
  }

  return (
    <div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Title</th>

            <th>Year</th>
            <th>Edit</th>

            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td>Loading</td>
            </tr>
          )}
          {error && (
            <tr>
              <td>Error</td>
            </tr>
          )}
          {!error &&
            !loading &&
            data?.books.map((book) => <Book {...book} key={book.id}></Book>)}
        </tbody>
      </table>
    </div>
  );
};
