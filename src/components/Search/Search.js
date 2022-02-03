import shortid from 'shortid';

export default function Search({ onSearchInput }) {
  const searchInput = shortid.generate();
  return (
    <div>
      <h2>Контакты</h2>
      <label htmlFor={searchInput}>Поиск контактов</label>
      <input id={searchInput} onChange={onSearchInput}></input>
    </div>
  );
}
