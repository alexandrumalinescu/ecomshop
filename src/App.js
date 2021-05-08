import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {GlobalStyle} from './global.styles';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component.jsx";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-sign-up/singn-in-sign-up.component";
import  CheckoutPage from './pages/checkout/checkout.component';

import {selectCurrentUser} from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import {selectCollectionsForPreview} from './redux/shop/shop.selectors'
import {checkUserSession} from './redux/user/user.actions';


class App extends React.Component {
  unsubscribefromAuth = null;

  componentDidMount() {
    const {checkUserSession} = this.props;
    checkUserSession();
  }

  componentWillUnmount() {
    this.unsubscribefromAuth();
  }

  render() {
    return (
      <div>
        <GlobalStyle/>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  collectionArray: selectCollectionsForPreview
});

const mapDispacthToProps = dispatch=> ({
  checkUserSession: ()=> dispatch(checkUserSession())
})

export default connect(mapStateToProps,mapDispacthToProps)(App);
