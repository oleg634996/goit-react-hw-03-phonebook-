import { Component } from 'react/cjs/react.production.min';
import shortid from 'shortid';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  nameId = shortid.generate();
  numberId = shortid.generate();

  formSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    const newContact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };

    this.props.onSubmitForm(newContact);
    this.reset();
  };
  inputOnChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.formSubmit}>
        <h1>Phonebook</h1>
        <label htmlFor={this.nameId}>Имя</label>
        <input
          id={this.nameId}
          type="text"
          onChange={this.inputOnChange}
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        ></input>
        <label htmlFor={this.numberId}>Телефон</label>
        <input
          id={this.numberId}
          type="tel"
          onChange={this.inputOnChange}
          value={number}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        ></input>
        <button type="submit">Добавить</button>
      </form>
    );
  }
}

export default Form;
