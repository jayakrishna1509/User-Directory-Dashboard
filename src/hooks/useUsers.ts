import { useQuery } from "@tanstack/react-query";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json()),
  });

export const useUser = (id: string) =>
  useQuery<User>({
    queryKey: ["user", id],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((r) =>
        r.json()
      ),
  });
