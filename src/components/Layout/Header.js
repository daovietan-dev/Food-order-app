import React, { Fragment } from 'react'
import mealsImage from '../../images/meals.jpg'
import classes from './Header.module.css'
import HeaderButton from './HeaderButton'

// Header sẽ nhận return 2 block: bản thân header và một ảnh cover phía dưới
const Header = ({ onShowModal }) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderButton onShowModal={onShowModal} />
      </header>
      <div className={classes[`main-image`]}>
        {/* muốn sử dụng hình ảnh trong JSX code ta cần import img thay vì dùng link như thường nhé 😂 đây là các sử dụng ảnh local store. Một cách khác là chúng ta cũng có thể paste link online nếu sử dụng ảnh online*/}
        <img src={mealsImage} alt="a table full of delicious food!" />
      </div>
    </Fragment>
  )
}

export default Header
