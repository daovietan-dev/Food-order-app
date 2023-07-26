import { useState } from 'react'
import Cart from './components/Cart/Cart'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import CartProvider from './store/CartProvider'

function App() {
  const [isCartShowed, setIsCartShowed] = useState(false)

  // quản lý hiển thị modal giỏ hàng
  const showCartHandle = () => {
    setIsCartShowed(preSate => !preSate)
  }

  return (
    <CartProvider>
      {isCartShowed && <Cart onCloseModal={showCartHandle} />}
      <Header onShowModal={showCartHandle} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App
