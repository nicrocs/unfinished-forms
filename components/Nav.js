import Link from "next/link";
// import { Mutation } from 'react-apollo';
// import { TOGGLE_CART_MUTATION } from './Cart';
import NavStyles from "./styles/NavStyles";
import User from "./User";
// import CartCount from './CartCount';
import Signout from "./Signout";

const Nav = () => (
  <User>
    {({ data }) => {
      const me = data ? data.me : null;
      return (
        <NavStyles data-test="nav">
          <Link href="/forms">
            <a>Forms</a>
          </Link>
          {me && (
            <>
              <Link href="/me">
                <a>Account</a>
              </Link>
              <Signout />
              {/* <Mutation mutation={TOGGLE_CART_MUTATION}>
              {(toggleCart) => (
                <button onClick={toggleCart}>
                  My Cart
                  <CartCount count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)}></CartCount>
                </button>
              )}
            </Mutation> */}
            </>
          )}
          {!me && (
            <>
              <Link href="/signin">
                <a>Sign In</a>
              </Link>
              <Link href="/signup">
                <a className="signup">Sign Up</a>
              </Link>
            </>
          )}
        </NavStyles>
      );
    }}
  </User>
);

export default Nav;
