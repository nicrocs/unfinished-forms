import Link from "next/link";
// import { Mutation } from 'react-apollo';
// import { TOGGLE_CART_MUTATION } from './Cart';
import NavStyles from "./styles/NavStyles";
import User from "./User";
// import CartCount from './CartCount';
import Signout from "./Signout";

const Nav = () => (
  <User>
    {({ data: { me } }) => {
      console.log({ me });
      return (
        <NavStyles data-test="nav">
          <Link href="/forms">
            <a>Forms</a>
          </Link>
          {me && (
            <>
              <Link href="/create">
                <a>Make</a>
              </Link>
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
            <Link href="/signup">
              <a>Sign In</a>
            </Link>
          )}
        </NavStyles>
      );
    }}
  </User>
);

export default Nav;