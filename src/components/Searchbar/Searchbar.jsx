// import { Component } from 'react';
import { useState } from 'react';

import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState('');

  const handleChange = event => {
    const search = event.target.value;
    setState(search);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(state);
    setState('');
  };

  return (
    <>
      <header className={css.Searchbar}>
        <form className={css.form} onSubmit={handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.button_label}>Search</span>
          </button>

          <input
            name="search"
            value={state}
            onChange={handleChange}
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// class Searchbar extends Component {
//   state = {
//     search: '',
//   };

//   handleChange = event => {
//     const search = event.target.value;
//     this.setState({ search });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//       const { search } = this.state;
//       const { onSubmit } = this.props
//       onSubmit(search)

//     this.reset();
//   };
//   reset() {
//     this.setState({ search: '' });
//   }

//   render() {
// return (
//   <>
//     <header className={css.Searchbar}>
//       <form className={css.form} onSubmit={this.handleSubmit}>
//         <button type="submit" className={css.button}>
//           <span className={css.button_label}>Search</span>
//         </button>

//         <input
//           name="search"
//           value={this.state.search}
//           onChange={this.handleChange}
//           className={css.input}
//           type="text"
//           autoComplete="off"
//           autoFocus
//           placeholder="Search images and photos"
//         />
//       </form>
//     </header>
//   </>
// );
//   }
// }

// export default Searchbar;

// Searchbar.propTypes = {
//     onSubmit: PropTypes.func.isRequired,

// };
