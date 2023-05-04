import React from "react";
import ReactDOM from "react-dom/client";
import booksData from "./books.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import BookItem from "./BookItem.jsx";
import Image from "./Image.jsx";
import SearchPanel from "./SearchPanel.jsx";
import SortPanel from "./SortPanel.jsx";

import "./books.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      books: booksData,
      cart: this.getBookData().length ? this.getBookData() : [],
      term: "",
      isChecked: true,
    };
  }

  render() {
    const { books, cart, term, isChecked } = this.state;
    const visibleBooks = this.searchBook(this.sortBook(books, isChecked), term);

    return (
      <div>
        <Header className="header container-fluid p-5 bg-dark text-primary text-center" />
        <div className="container text-center">
          <div className="row">
            <div className="search-panel col-4 my-3">
              <SearchPanel onUpdateSearch={this.onUpdateSearch} />
            </div>
          </div>
          <div className="row">
            <div className="col-3 my-3">
              <SortPanel onUpdateSort={this.onUpdateSort} />
            </div>
          </div>

          <div className="row justify-content-center">
            {visibleBooks.map((book) => {
              //console.log(book.id);
              return (
                <div key={book.id} className="col-sm-4 col-12">
                  <div className="card text-center my-5 p-3">
                    <BookItem
                      book={book}
                      removeBook={this.removeBook}
                      addBookToCart={this.addBookToCart}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="container-fluid text-center">
          <h4>Кошик товарів</h4>
          <p>Кількість книг: {cart.length} </p>
          <ul className="list-group">
            {this.state.cart.map((book) => (
              <li key={book.id} className="list-group-item">
                <div className="row">
                  <div className="col-4">{book.name}</div>
                  <div className="col-3">{book.author}</div>
                  <div className="col-2">{book.price}</div>
                  <div className="col-1">{book.count}</div>
                  <div className="col-2">
                    <button
                      onClick={this.deleteBookFromCart.bind(this, book)}
                      type="button"
                      className="btn btn-outline-primary mt-auto mb-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="row">
            <div className="col-12">
              <Count goods={cart} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Sum goods={this.state.cart} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  removeBook = (book) => {
    const updateBooks = this.state.books.filter(function (item) {
      return item.id !== book.id;
    });
    //console.log(updateBooks);
    this.setBookData(updateBooks);
    this.setState({
      books: updateBooks,
    });
  };

  addBookToCart = (book) => {
    const goods = this.state.cart;
    if (!goods.includes(book)) goods.push(book);
    else book.count++;
    this.setBookData(goods);
    this.setState({
      cart: goods,
    });
  };

  deleteBookFromCart = (book) => {
    let goods;
    if (book.count === 1)
      goods = this.state.cart.filter((item) => item.id !== book.id);
    else
      goods = this.state.cart.filter((item) =>
        item.id === book.id ? book.count-- : book.count
      );
    this.setState({
      cart: goods,
    });
  };

  // Получаем данные из LocalStorage
  getBookData = () => {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("books"))
      : 0;
  };

  // Записываем данные в LocalStorage
  setBookData = (o) => {
    localStorage.setItem("books", JSON.stringify(o));
    return false;
  };

  searchBook = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  sortBook = (items, isChecked) => {
    if (isChecked) {
      return items.sort((a, b) =>
        a.name < b.name ? -1 : a.name === b.name ? 0 : 1
      );
    } else {
      return items.sort((a, b) => (a.id < b.id ? -1 : a.id === b.id ? 0 : 1));
    }
  };

  onUpdateSearch = (term) => {
    this.setState({ term: term });
  };

  onUpdateSort = (isChecked) => {
    this.setState({ isChecked: isChecked });
  };
}

function Header(props) {
  return (
    <div className={props.className}>
      <Image src={logo} />
      <h1 className="display-2">Книгарня</h1>
    </div>
  );
}

class Sum extends React.Component {
  render() {
    let sum = 0;
    this.props.goods.forEach((book) => {
      // console.log(book.price);
      sum += +(book.price * book.count);
    });
    return <div> Суммарна вартість: {sum.toFixed(2)} </div>;
  }
}

class Count extends React.Component {
  render() {
    let count = 0;
    this.props.goods.forEach((book) => {
      count += book.count;
    });
    return <div> Кількість книг в кошику: {count} </div>;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
