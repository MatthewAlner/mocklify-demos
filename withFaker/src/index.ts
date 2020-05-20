import { mocklify, override } from 'mocklify';
import { lorem, name, random } from 'faker';

function prettyPrintUsers(users: IUser[]) {
  const appDiv: HTMLElement | null = document.getElementById("app");
  if (appDiv) {
    appDiv.innerHTML = `<pre>${JSON.stringify(users, null, 2)}</pre>`;
  }
}

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  note: string;
}

const MOCK_USER_FACTORY = (index: number): IUser => {
  return {
    id: random.uuid(),
    firstName: name.firstName(),
    lastName: name.lastName(),
    isAdmin: false,
    note: lorem.sentences().split(' ').slice(0, 3).join(' ')
  }
};

const users = mocklify<IUser>()
    .generate(4, MOCK_USER_FACTORY)
    .transform(
        override({isAdmin: true})
    )
    .getAll();

prettyPrintUsers(users);
