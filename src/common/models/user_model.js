/** ****************************************************************************
 * User model describing the user model on backend. Persistent.
 **************************************************************************** */
import _ from "lodash";
import Backbone from "backbone";
import Store from "backbone.localstorage";
import CONFIG from "config";
import Log from "helpers/log";
import Validate from "helpers/validate";

const UserModel = Backbone.Model.extend({
  id: "user",

  defaults: {
    drupalID: "",
    name: "",
    firstname: "",
    secondname: "",
    email: "",
    password: "",
  },

  localStorage: new Store(CONFIG.name),

  /**
   * Initializes the user.
   */
  initialize() {
    this.fetch();
  },

  /**
   * Resets the user login information.
   */
  logOut() {
    Log("User: logging out.");

    this.set("email", "");
    this.set("password", "");
    this.set("name", "");
    this.set("firstname", "");
    this.set("secondname", "");

    this.save();
    this.trigger("logout");
  },

  /**
   * Sets the app login state of the user account.
   * Saves the user account details into storage for permanent availability.
   *
   * @param user User object or empty object
   */
  logIn(user) {
    Log("User: logging in.");

    this.set("drupalID", user.id || "");
    this.set("password", user.password || "");
    this.set("email", user.email || "");
    this.set("name", user.name || "");
    this.set("firstname", user.firstname || "");
    this.set("secondname", user.secondname || "");
    this.save();

    this.trigger("login");
  },

  /**
   * Sets user contact information.
   */
  setContactDetails(user) {
    this.set("email", user.email || "");
    this.set("firstname", user.name || "");
    this.set("secondname", user.surname || "");
    this.save();
  },

  /**
   * Returns user contact information.
   */
  hasLogIn() {
    return this.get("password");
  },

  getUser() {
    return this.get("email");
  },

  getPassword() {
    return this.get("password");
  },

  validateRegistration(attrs) {
    const errors = {};

    if (!attrs.email) {
      errors.email = t("can't be blank");
    } else if (!Validate.email(attrs.email)) {
      errors.email = t("invalid");
    }

    if (!attrs.firstname) {
      errors.firstName = t("can't be blank");
    }

    if (!attrs.secondname) {
      errors.secondname = t("can't be blank");
    }

    if (!attrs.password) {
      errors.password = t("can't be blank");
    } else if (attrs.password.length < 2) {
      errors.password = t("is too short");
    }

    if (!attrs["password-confirm"]) {
      errors["password-confirm"] = t("can't be blank");
    } else if (attrs["password-confirm"] !== attrs.password) {
      errors["password-confirm"] = t("passwords are not equal");
    }

    if (!attrs["terms-agree"]) {
      errors["terms-agree"] = t("you must agree to the terms");
    }

    if (!_.isEmpty(errors)) {
      return errors;
    }

    return null;
  },

  validateLogin(attrs) {
    const errors = {};

    if (!attrs.name) {
      errors.name = t("can't be blank");
    }

    if (!attrs.password) {
      errors.password = t("can't be blank");
    }

    if (!_.isEmpty(errors)) {
      return errors;
    }

    return null;
  },

  validateReset(attrs) {
    const errors = {};

    if (!attrs.name) {
      errors.name = t("can't be blank");
    }

    if (!_.isEmpty(errors)) {
      return errors;
    }

    return null;
  },
});

const userModel = new UserModel();
export { userModel as default, UserModel };
