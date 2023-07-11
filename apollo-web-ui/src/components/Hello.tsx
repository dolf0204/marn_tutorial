import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { FC } from "react";

type Query = {
  hello: string;
};

const HELLO_QUERY = gql`
  query Query($name: String) {
    hello(name: $name)
  }
`;

export const Hello: FC = () => {
  const { data, loading, error } = useQuery<Query>(HELLO_QUERY, {
    variables: { name: "Johan" },
  });

  if (loading) {
    return <div>...loading</div>;
  }
  if (error) {
    return <div> {error.message}</div>;
  }

  return <div>{data && data.hello}</div>;
};
