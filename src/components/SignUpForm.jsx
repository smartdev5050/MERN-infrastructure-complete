import React, { Component } from "react";

/**Initializing a Class Component's State
Our <SignUpForm>is going to need the following state:

name: Name of the user
email: The email address of the user
password: The user's password
confirm: Used to confirm the password is entered correctly
error: Used to display an error message if the sign up fails
Unlike with a function component that can define multiple pieces of state by using the useStatehook multiple times, a class component's state is always a single object assigned to a stateproperty on the instance of the component.

There are two ways to initialize the stateproperty:

Using the constructormethod (the original approach).
Using the newer class fields approach.
Of course, we'll use the class fields approach that all the cool kids are using, but here's how it would look if we initialized the state using the constructormethod:

export default class SignUpForm extends Component {
  // state is always an object with a property for each "piece" of state
  constructor() {
    this.state = {
      name: '',
      email: '',
      password: '',
      confirm: '',
      error: ''
    };
  }
 */
/**
 * thisKeyword in a Class Component
When we use class components, it's important to realize that the components themselves are instances of the class instantiated by React the first time they are rendered.

❓ An instance of a class is an _______.
object

❓ An object's methods accesses other properties/methods of the object via the _______ keyword.
this

Unlike with function components, a class component accesses its props and methods using this, for example:

this.props: Accesses the class component's propsobject, e.g., this.props.someProp.
this.state: Accesses the class component's stateobject, e.g., this.state.email.
this.someMethod(): Invokes a method defined in the class component or inherited by the superclass (Component) such as this.setState()used to update state.

 */
export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };
  /**
   * Defining Event Handler Methods in a Class Component
The handleChange()method can't be defined using the usual syntax for defining an instance method of a class like that of the render()method.

The reason the usual syntax won't work is because the method will be invoked as a callback and thus will not have thisbound to the component instance as necessary if we want to be able to access this.props, this.setState(), etc.

There are two solutions to ensure that a method has thiscorrectly set to the component instance:

Define the method as usual and use JavaScript's bindmethod in the constructormethod to explicitly set the value of this.
Use the class field syntax along with an arrow function when defining the method which by its very nature fixes the issue due to the way class fields are actually initialized in the constructormethod.
FYI: The trouble with the binding of thisin class components is definitely one of the main inspirations for React hooks!

So, here's how we use class field syntax to properly define methods used to handle events in class components:} evt 
   */
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };
  /**
     Handling the onSubmitEvent
     The <form>React Element in <SignUpForm>already has an event handler method assigned to its onSubmitprop.

     💪 Practice Exercise - Stub Up the handleSubmit()Method (2 minutes)
     Using the same class field syntax used when defining handleChange(), define a method named handleSubmit()above the render()method.
     As we learned during the React Fundamentals - Handling Input and Events lesson, we need to prevent the form from being submitted to the server by including evt.preventDefault();as the first line of code.
   */
  handleSubmit = (evt) => {
    evt.preventDefault();
    // just shows what you typed
    alert(JSON.stringify(this.state));
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <label>Confirm</label>
            <input
              type="password"
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              required
            />
            <button type="submit" disabled={disable}>
              SIGN UP
            </button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
