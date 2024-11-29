
import React, { Component } from "react";

class FormValidator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  validate = () => {
    const { name, email, password } = this.state.formData;
    const errors = {};

    // Validation du nom
    if (name.trim().length < 3) {
      errors.name = "Le nom doit contenir au moins 3 caractères.";
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "L'email n'est pas valide.";
    }

    // Validation du mot de passe
    if (password.length < 8) {
      errors.password = "Le mot de passe doit contenir au moins 8 caractères.";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validate()) {
      alert("Formulaire soumis avec succès !");
      this.setState({
        formData: {
          name: "",
          email: "",
          password: "",
        },
        errors: {},
      });
    }
  };

  render() {
    const { formData, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={this.handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={this.handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={this.handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <button type="submit">Soumettre</button>
      </form>
    );
  }
}

export default FormValidator;


// import React, { Component } from 'react';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       Color: 'red', 
//     };
//   }

//   handleColorChange = (event) => {
//     this.setState({ Color: event.target.value });
//   };

//   render() {
//     const colors = [
//       { name: 'Rouge', value: 'red' },
//       { name: 'Bleu', value: 'blue' },
//       { name: 'Vert', value: 'green' },
//       { name: 'Jaune', value: 'yellow' },
//       { name: 'Orange', value: 'orange' },
//       { name: 'Violet', value: 'purple' },
//       { name: 'Gris', value: 'gray' },
//     ];

//     return (
//       <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//         <select value={this.state.Color} onChange={this.handleColorChange}>
//           {colors.map((color) => (
//             <option key={color.value} value={color.value}>
//               {color.name}
//             </option>
//           ))}
//         </select>

//         <div
//           style={{
//             width: '100px',
//             height: '100px',
//             backgroundColor: this.state.Color,
//             border: '1px solid #000',
//           }}
//         ></div>
//       </div>
//     );
//   }
// }

// export default App;