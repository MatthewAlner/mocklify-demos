import { mocklify, override } from 'mocklify';

function prettyPrintUsers(users: IUser[]) {
  const appDiv: HTMLElement | null = document.getElementById("app");
  if (appDiv) {
    appDiv.innerHTML = `<pre>${JSON.stringify(users, null, 2)}</pre>`;
  }
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

export const MOCK_USERS: IUser[] = [
  {
    id: "user1",
    firstName: "Harry",
    lastName: "Potter",
    isAdmin: false
  }
];

const users = mocklify<IUser>()
  .add(5, MOCK_USERS)
  .transform(override({ isAdmin: true }))
  .getAll();

prettyPrintUsers(users);
