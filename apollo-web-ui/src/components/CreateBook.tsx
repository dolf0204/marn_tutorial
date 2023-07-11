import { FC, useState } from "react";
import { useMutation } from "@apollo/client";
import { BOOKS_QUERY, CREATE_BOOK_MUTATION } from "./graphql";

export const CreateBook: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const [createMutation] = useMutation(CREATE_BOOK_MUTATION, {
    refetchQueries: [{ query: BOOKS_QUERY }],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.info("Createing book", title, year);
    await createMutation({
      variables: {
        title,
        year: Number(year),
      },
    }).then((mut) => console.log(mut));
    alert(`Book ${title} created`);
    setTitle("");
    setYear("");
  };
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="year">Year</label>
        <input
          type="text"
          className="form-control"
          value={year}
          onChange={(event) => setYear(event.target.value)}
        ></input>
      </div>
      <input type="submit" className="btn btn-primary" value="Create"></input>
    </form>
  );
};
