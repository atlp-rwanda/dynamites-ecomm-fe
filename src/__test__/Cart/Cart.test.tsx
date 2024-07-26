import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import cartReducer, {
  fetchCartItems,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
} from '@/features/Cart/cartSlice';
import CartItem from '@/components/Cart/CartItem';

describe('cartSlice', () => {
  let store = configureStore({ reducer: { cartItems: cartReducer } });
  let httpMock: MockAdapter;

  beforeEach(() => {
    store = configureStore({ reducer: { cartItems: cartReducer } });
    httpMock = new MockAdapter(axios);
  });

  afterEach(() => {
    httpMock.reset();
  });

  it('should fetch cart items successfully', async () => {
    const mockCartItems = [
      { id: 1, name: 'Product 1', quantity: 2, image: 'product_image.png' },
    ];
    httpMock
      .onGet(`${process.env.VITE_BASE_URL}/cart`)
      .reply(200, { cartItems: mockCartItems });

    await store.dispatch(fetchCartItems());
    const state = store.getState().cartItems;
    expect(state.cartItems).toEqual(mockCartItems);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle adding a cart item', async () => {
    const newCartItem = { id: 2, name: 'Product 2', quantity: 1 };
    httpMock
      .onPost(`${process.env.VITE_BASE_URL}/cart`)
      .reply(200, { cartItem: newCartItem });

    await store.dispatch(addCartItem({ productId: 2, quantity: 1 }));
    const state = store.getState().cartItems;
    expect(state.cartItems).toContainEqual(newCartItem);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle updating a cart item quantity', async () => {
    const mockCartItems = [{ id: 1, name: 'Product 1', quantity: 20 }];
    httpMock
      .onGet(`${process.env.VITE_BASE_URL}/cart`)
      .reply(200, { cartItems: mockCartItems });

    await store.dispatch(fetchCartItems());
    const updatedCartItem = { id: 1, quantity: 3 };
    httpMock.onPatch(`${process.env.VITE_BASE_URL}/cart/1`).reply(200);

    await store.dispatch(updateCartItemQuantity({ itemId: 1, quantity: 3 }));
    const state = store.getState().cartItems;
    expect(state.cartItems.find((item) => item.id === 1)?.quantity).toBe(
      updatedCartItem.quantity
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle removing a cart item', async () => {
    const itemIdToRemove = 1;
    httpMock.onDelete(`${process.env.VITE_BASE_URL}/cart/1`).reply(200);

    await store.dispatch(removeCartItem(itemIdToRemove));
    const state = store.getState().cartItems;
    expect(
      state.cartItems.find((item) => item.id === itemIdToRemove)
    ).toBeUndefined();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
});

describe('Cart component', () => {
  const store = configureStore({
    reducer: {},
  });

  it('renders cart item', async () => {
    render(
      <Provider store={store}>
        <CartItem
          id={1}
          price={100}
          name="Test Product"
          image="product_IMAGE.png"
          quantity={3}
        />
      </Provider>
    );

    expect(screen.getByText('$300')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
