import { Component } from 'react/cjs/react.production.min';
import Form from './components/Form/Form';
import Search from './components/Search/Search';
import SearchContact from './components/SearchContact/SearchContact';
import Contact from './components/Contacts/Contacts';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contactsKey');
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevState) {
    const nextcontacts = this.state.contacts;

    if (nextcontacts !== prevState.contacts) {
      localStorage.setItem('contactsKey', JSON.stringify(nextcontacts));
    }
  }

  onSubmitForm = data => {
    this.state.contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase(),
    )
      ? alert(
          `Такой контакт с именем ${
            data.name[0].toUpperCase() + data.name.slice(1)
          } уже есть `,
        )
      : this.setState(prevState => ({
          contacts: [data, ...prevState.contacts],
        }));
  };

  onDeleteContact = data => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.name !== data),
    }));
  };

  onSearchInput = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const searchContact = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
    const { onDeleteContact } = this;

    return (
      <div>
        <Form onSubmitForm={this.onSubmitForm} />
        <Search onSearchInput={this.onSearchInput} />
        {searchContact ? (
          <SearchContact
            searchContact={searchContact}
            onDeleteContact={onDeleteContact}
          />
        ) : (
          <Contact
            contacts={this.state.contacts}
            onDeleteContact={onDeleteContact}
          />
        )}
      </div>
    );
  }
}

export default App;
